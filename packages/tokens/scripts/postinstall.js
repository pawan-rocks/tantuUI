#!/usr/bin/env node
/**
 * @tantuui/tokens postinstall
 *
 * Copies the AI context document into the user's project so that
 * AI tools (Kiro, Cursor, Copilot, etc.) understand how to use
 * TantuUI tokens.
 *
 * Target locations (first writable wins):
 *   .kiro/steering/implement-tantuui-token.md
 *   .cursor/rules/implement-tantuui-token.md
 *   docs/implement-tantuui-token.md
 *
 * NOTE: If @tantuui/react is also installed, its postinstall will place
 * the full token+component doc instead (which supersedes this one).
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

// Find the user's project root
function findProjectRoot() {
  if (process.env.INIT_CWD) return process.env.INIT_CWD;

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

// If @tantuui/react is installed, skip — it has the full doc
const reactPkg = path.join(projectRoot, "node_modules", "@tantuui", "react", "package.json");
if (fs.existsSync(reactPkg)) process.exit(0);

const sourcePath = path.resolve(__dirname, "../docs/implement-tantuui-token.md");
if (!fs.existsSync(sourcePath)) process.exit(0);

const sourceContent = fs.readFileSync(sourcePath, "utf8");

// Target directories to try (in priority order)
const targets = [
  { dir: ".kiro/steering", file: "implement-tantuui-token.md" },
  { dir: ".cursor/rules", file: "implement-tantuui-token.md" },
  { dir: "docs", file: "implement-tantuui-token.md" },
];

let placed = false;

for (const target of targets) {
  const targetDir = path.join(projectRoot, target.dir);
  const targetFile = path.join(targetDir, target.file);

  const parentExists = fs.existsSync(path.join(projectRoot, path.dirname(target.dir))) || target.dir === "docs";

  if (parentExists) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });

      if (fs.existsSync(targetFile)) {
        const existing = fs.readFileSync(targetFile, "utf8");
        if (existing.includes("auto-added by `@tantuui/tokens`")) {
          fs.writeFileSync(targetFile, sourceContent);
        }
      } else {
        fs.writeFileSync(targetFile, sourceContent);
      }

      placed = true;
      break;
    } catch {
      continue;
    }
  }
}

if (placed) {
  console.log("\n  📘 TantuUI: AI context doc added for your coding assistant.");
  console.log("     AI tools will now understand TantuUI tokens.\n");
}
