#!/usr/bin/env node
/**
 * @tantuui/react postinstall
 *
 * Copies the AI context document into the user's project so that
 * AI tools (Kiro, Cursor, Copilot, etc.) understand how to use
 * TantuUI tokens and components.
 *
 * Target locations (first writable wins):
 *   .kiro/steering/implement-tantuui-token-and-component.md
 *   .cursor/rules/implement-tantuui-token-and-component.md
 *   docs/implement-tantuui-token-and-component.md
 */

const fs = require("fs");
const path = require("path");

// Don't run during development (inside the monorepo)
function isInsideMonorepo() {
  if (process.env.npm_config_workspace) return true;
  const initCwd = process.env.INIT_CWD;
  if (!initCwd) return false;
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(initCwd, "package.json"), "utf8"));
    return pkg.name === "tantuui" || pkg.name === "@tantuui/react" || pkg.name === "@tantuui/tokens";
  } catch {
    return false;
  }
}
if (isInsideMonorepo()) process.exit(0);

// Find the user's project root (where package.json lives)
function findProjectRoot() {
  // npm/yarn/pnpm set this to the user's project root
  if (process.env.INIT_CWD) return process.env.INIT_CWD;

  // Fallback: walk up from node_modules
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    dir = path.dirname(dir);
    if (fs.existsSync(path.join(dir, "package.json")) && !dir.includes("node_modules")) {
      return dir;
    }
  }
  return null;
}

const projectRoot = findProjectRoot();
if (!projectRoot) process.exit(0);

const sourcePath = path.resolve(__dirname, "../docs/implement-tantuui-token-and-component.md");
if (!fs.existsSync(sourcePath)) process.exit(0);

const sourceContent = fs.readFileSync(sourcePath, "utf8");

// Target directories to try (in priority order)
const targets = [
  { dir: ".kiro/steering", file: "implement-tantuui-token-and-component.md" },
  { dir: ".cursor/rules", file: "implement-tantuui-token-and-component.md" },
  { dir: "docs", file: "implement-tantuui-token-and-component.md" },
];

let placed = false;

for (const target of targets) {
  const targetDir = path.join(projectRoot, target.dir);
  const targetFile = path.join(targetDir, target.file);

  // Only write to .kiro/steering or .cursor/rules if the parent dir already exists
  // (meaning the user uses that tool). For docs/, always create it.
  const parentExists = fs.existsSync(path.join(projectRoot, path.dirname(target.dir))) || target.dir === "docs";

  if (parentExists) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });

      // Don't overwrite if user has modified the file
      if (fs.existsSync(targetFile)) {
        const existing = fs.readFileSync(targetFile, "utf8");
        if (existing.includes("auto-added by `@tantuui/react`")) {
          // Our file, safe to update
          fs.writeFileSync(targetFile, sourceContent);
        }
        // User-modified, skip
      } else {
        fs.writeFileSync(targetFile, sourceContent);
      }

      placed = true;
      break;
    } catch {
      // Permission denied or other error, try next
      continue;
    }
  }
}

if (placed) {
  console.log("\n  📘 TantuUI: AI context doc added for your coding assistant.");
  console.log("     AI tools will now understand TantuUI tokens & components.\n");
}

// Print VS Code extension hint
console.log("  💡 TantuUI VS Code IntelliSense: Get autocomplete for tui-* classes");
console.log("     code --install-extension node_modules/@tantuui/react/dist/tantuui-css-intellisense.vsix\n");
