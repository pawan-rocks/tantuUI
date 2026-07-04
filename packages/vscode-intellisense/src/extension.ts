import * as vscode from "vscode";
import { getAllTokens, getTokenMap, TokenEntry } from "./tokenData";

// ── Activation ────────────────────────────────────────────────────────────

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("tantuui");
  if (!config.get<boolean>("enable", true)) return;

  const languages = config.get<string[]>("languages", [
    "html", "typescriptreact", "javascriptreact", "vue", "svelte", "astro", "css", "scss", "php",
  ]);

  const selectors: vscode.DocumentSelector = languages.map((lang) => ({
    scheme: "file",
    language: lang,
  }));

  // Register providers
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(selectors, new TuiCompletionProvider(), "t", "-", ":", " ", '"', "'", "`", "!"),
    vscode.languages.registerHoverProvider(selectors, new TuiHoverProvider()),
  );

  // Color decorators
  if (config.get<boolean>("showColorDecorators", true)) {
    const decorator = new TuiColorDecorator();
    context.subscriptions.push(decorator);
  }

  console.log("TantuUI CSS IntelliSense activated");
}

export function deactivate() {}

// ── Pseudo-class and responsive prefix definitions ────────────────────────

const PSEUDO_PREFIXES = [
  { prefix: "hover", pseudo: ":hover", description: "On mouse hover" },
  { prefix: "focus", pseudo: ":focus", description: "When focused" },
  { prefix: "focus-visible", pseudo: ":focus-visible", description: "When focused via keyboard" },
  { prefix: "focus-within", pseudo: ":focus-within", description: "When child is focused" },
  { prefix: "active", pseudo: ":active", description: "While being pressed" },
  { prefix: "disabled", pseudo: ":disabled", description: "When disabled" },
  { prefix: "visited", pseudo: ":visited", description: "Visited link" },
  { prefix: "first", pseudo: ":first-child", description: "First child" },
  { prefix: "last", pseudo: ":last-child", description: "Last child" },
  { prefix: "odd", pseudo: ":nth-child(odd)", description: "Odd children" },
  { prefix: "even", pseudo: ":nth-child(even)", description: "Even children" },
  { prefix: "placeholder", pseudo: "::placeholder", description: "Input placeholder" },
];

const GROUP_PREFIXES = [
  { prefix: "group-hover", parent: ".group:hover", description: "When parent .group is hovered" },
  { prefix: "group-focus", parent: ".group:focus", description: "When parent .group is focused" },
  { prefix: "group-active", parent: ".group:active", description: "When parent .group is pressed" },
];

const RESPONSIVE_PREFIXES = [
  { prefix: "sm", mediaQuery: "(min-width: 640px)", description: "≥ 640px" },
  { prefix: "md", mediaQuery: "(min-width: 768px)", description: "≥ 768px" },
  { prefix: "lg", mediaQuery: "(min-width: 1024px)", description: "≥ 1024px" },
  { prefix: "xl", mediaQuery: "(min-width: 1280px)", description: "≥ 1280px" },
  { prefix: "2xl", mediaQuery: "(min-width: 1536px)", description: "≥ 1536px" },
];

// ── Completion Provider ───────────────────────────────────────────────────

class TuiCompletionProvider implements vscode.CompletionItemProvider {
  private items: vscode.CompletionItem[] | null = null;

  private getItems(): vscode.CompletionItem[] {
    if (this.items) return this.items;

    const tokens = getAllTokens();
    const items: vscode.CompletionItem[] = [];

    // Base classes
    for (const token of tokens) {
      const item = new vscode.CompletionItem(token.label, vscode.CompletionItemKind.Value);
      item.detail = token.css;
      item.documentation = new vscode.MarkdownString(this.formatDocs(token.label, token.css, token.description, token.color));
      item.insertText = token.label;
      item.filterText = token.label;
      item.sortText = `0_${token.label}`;

      if (token.color) {
        item.kind = vscode.CompletionItemKind.Color;
      }

      items.push(item);
    }

    // Pseudo-class prefixed variants
    for (const { prefix, pseudo, description: prefixDesc } of PSEUDO_PREFIXES) {
      for (const token of tokens) {
        const label = `${prefix}:${token.label}`;
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
        item.detail = `${pseudo} → ${token.css}`;
        item.documentation = new vscode.MarkdownString(
          this.formatPrefixedDocs(label, token.css, pseudo, prefixDesc, token.color)
        );
        item.insertText = label;
        item.filterText = label;
        item.sortText = `1_${label}`;
        if (token.color) item.kind = vscode.CompletionItemKind.Color;
        items.push(item);
      }
    }

    // Group pseudo prefixed variants
    for (const { prefix, parent, description: prefixDesc } of GROUP_PREFIXES) {
      for (const token of tokens) {
        const label = `${prefix}:${token.label}`;
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
        item.detail = `${parent} → ${token.css}`;
        item.documentation = new vscode.MarkdownString(
          this.formatGroupDocs(label, token.css, parent, prefixDesc, token.color)
        );
        item.insertText = label;
        item.filterText = label;
        item.sortText = `2_${label}`;
        if (token.color) item.kind = vscode.CompletionItemKind.Color;
        items.push(item);
      }
    }

    // Responsive prefixed variants
    for (const { prefix, mediaQuery, description: prefixDesc } of RESPONSIVE_PREFIXES) {
      for (const token of tokens) {
        const label = `${prefix}:${token.label}`;
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
        item.detail = `@media ${mediaQuery} → ${token.css}`;
        item.documentation = new vscode.MarkdownString(
          this.formatResponsiveDocs(label, token.css, mediaQuery, prefixDesc, token.color)
        );
        item.insertText = label;
        item.filterText = label;
        item.sortText = `3_${label}`;
        if (token.color) item.kind = vscode.CompletionItemKind.Color;
        items.push(item);
      }
    }

    // !important variants
    for (const token of tokens) {
      const label = `!${token.label}`;
      const importantCss = token.css.split(";").map((d) => d.trim()).filter(Boolean).map((d) => `${d} !important`).join("; ");
      const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value);
      item.detail = `${importantCss}`;
      item.documentation = new vscode.MarkdownString(this.formatImportantDocs(label, token.label, importantCss, token.color));
      item.insertText = label;
      item.filterText = label;
      item.sortText = `4_${label}`;
      if (token.color) item.kind = vscode.CompletionItemKind.Color;
      items.push(item);
    }

    this.items = items;
    return this.items;
  }

  private formatDocs(label: string, css: string, description: string, color?: string): string {
    let md = `**${label}**\n\n`;
    md += "```css\n";
    md += `.${label} {\n  ${css}\n}`;
    md += "\n```";
    if (color) md += `\n\n🎨 ${color}`;
    md += `\n\n---\n*${description}*`;
    return md;
  }

  private formatImportantDocs(label: string, baseClass: string, css: string, color?: string): string {
    const escaped = label.replace(/!/g, "\\!");
    let md = `**${label}** — *!important override*\n\n`;
    md += "```css\n";
    md += `.${escaped} {\n  ${css};\n}`;
    md += "\n```";
    if (color) md += `\n\n🎨 ${color}`;
    md += `\n\n---\n*Forces ${baseClass} with !important*`;
    return md;
  }

  private formatPrefixedDocs(label: string, css: string, pseudo: string, desc: string, color?: string): string {
    const escaped = label.replace(/:/g, "\\:");
    let md = `**${label}** — *${desc}*\n\n`;
    md += "```css\n";
    md += `.${escaped}${pseudo} {\n  ${css}\n}`;
    md += "\n```";
    if (color) md += `\n\n🎨 ${color}`;
    return md;
  }

  private formatGroupDocs(label: string, css: string, parent: string, desc: string, color?: string): string {
    const escaped = label.replace(/:/g, "\\:");
    let md = `**${label}** — *${desc}*\n\n`;
    md += "```css\n";
    md += `${parent} .${escaped} {\n  ${css}\n}`;
    md += "\n```";
    if (color) md += `\n\n🎨 ${color}`;
    return md;
  }

  private formatResponsiveDocs(label: string, css: string, mq: string, desc: string, color?: string): string {
    const escaped = label.replace(/:/g, "\\:");
    let md = `**${label}** — *${desc}*\n\n`;
    md += "```css\n";
    md += `@media ${mq} {\n  .${escaped} {\n    ${css}\n  }\n}`;
    md += "\n```";
    if (color) md += `\n\n🎨 ${color}`;
    return md;
  }

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.CompletionItem[] | undefined {
    // Check if we're inside a class attribute or className prop
    const lineText = document.lineAt(position).text;
    const linePrefix = lineText.substring(0, position.character);

    // Match class="...", className="...", className={`...`}, or @apply context
    const isInClassContext =
      /(?:class(?:Name)?=["'`{]|@apply\s).*$/i.test(linePrefix) ||
      /(?:class(?:Name)?=["'`{])/.test(lineText);

    // In CSS files, always suggest for @apply
    const isCssFile = ["css", "scss", "less", "postcss"].includes(document.languageId);
    const isInApply = /@apply\s+[\w\-:]*$/.test(linePrefix);

    if (!isInClassContext && !isInApply && !isCssFile) {
      // Check if the user typed "tui" or a prefix like "hover:" anywhere
      if (!/tui|hover:|focus:|active:|disabled:|sm:|md:|lg:|xl:|group-/.test(linePrefix)) return undefined;
    }

    return this.getItems();
  }
}

// ── Arbitrary value resolution for hover ──────────────────────────────────

const ARBITRARY_PROP_MAP: Record<string, { css: string; label: string }> = {
  "p":      { css: "padding", label: "Padding" },
  "px":     { css: "padding-inline", label: "Padding inline" },
  "py":     { css: "padding-block", label: "Padding block" },
  "pt":     { css: "padding-top", label: "Padding top" },
  "pr":     { css: "padding-right", label: "Padding right" },
  "pb":     { css: "padding-bottom", label: "Padding bottom" },
  "pl":     { css: "padding-left", label: "Padding left" },
  "m":      { css: "margin", label: "Margin" },
  "mx":     { css: "margin-inline", label: "Margin inline" },
  "my":     { css: "margin-block", label: "Margin block" },
  "mt":     { css: "margin-top", label: "Margin top" },
  "mr":     { css: "margin-right", label: "Margin right" },
  "mb":     { css: "margin-bottom", label: "Margin bottom" },
  "ml":     { css: "margin-left", label: "Margin left" },
  "w":      { css: "width", label: "Width" },
  "h":      { css: "height", label: "Height" },
  "min-w":  { css: "min-width", label: "Min width" },
  "max-w":  { css: "max-width", label: "Max width" },
  "min-h":  { css: "min-height", label: "Min height" },
  "max-h":  { css: "max-height", label: "Max height" },
  "gap":    { css: "gap", label: "Gap" },
  "gap-x":  { css: "column-gap", label: "Column gap" },
  "gap-y":  { css: "row-gap", label: "Row gap" },
  "text":   { css: "font-size", label: "Font size" },
  "leading":{ css: "line-height", label: "Line height" },
  "tracking":{ css: "letter-spacing", label: "Letter spacing" },
  "rounded":{ css: "border-radius", label: "Border radius" },
  "border": { css: "border-width", label: "Border width" },
  "top":    { css: "top", label: "Top" },
  "right":  { css: "right", label: "Right" },
  "bottom": { css: "bottom", label: "Bottom" },
  "left":   { css: "left", label: "Left" },
  "inset":  { css: "inset", label: "Inset" },
  "z":      { css: "z-index", label: "Z-index" },
  "grid-cols": { css: "grid-template-columns", label: "Grid columns" },
  "rotate":     { css: "transform: rotate", label: "Rotate" },
  "scale":      { css: "transform: scale", label: "Scale" },
  "scale-x":    { css: "transform: scaleX", label: "Scale X" },
  "scale-y":    { css: "transform: scaleY", label: "Scale Y" },
  "skew-x":     { css: "transform: skewX", label: "Skew X" },
  "skew-y":     { css: "transform: skewY", label: "Skew Y" },
  "translate-x":{ css: "transform: translateX", label: "Translate X" },
  "translate-y":{ css: "transform: translateY", label: "Translate Y" },
  "blur":       { css: "filter: blur", label: "Blur" },
  "brightness": { css: "filter: brightness", label: "Brightness" },
  "contrast":   { css: "filter: contrast", label: "Contrast" },
  "saturate":   { css: "filter: saturate", label: "Saturate" },
  "hue-rotate": { css: "filter: hue-rotate", label: "Hue rotate" },
  "backdrop-blur": { css: "backdrop-filter: blur", label: "Backdrop blur" },
  "opacity":    { css: "opacity", label: "Opacity" },
  "basis":      { css: "flex-basis", label: "Flex basis" },
  "order":      { css: "order", label: "Order" },
  "indent":     { css: "text-indent", label: "Text indent" },
  "duration":   { css: "transition-duration", label: "Duration" },
  "delay":      { css: "transition-delay", label: "Delay" },
  "columns":    { css: "columns", label: "Columns" },
};

function resolveArbitraryHover(prop: string, rawValue: string): { css: string; description: string } | null {
  const mapping = ARBITRARY_PROP_MAP[prop];
  if (!mapping) return null;

  // Auto-space calc operators + underscore→space (same as runtime)
  let value = rawValue.replace(/_/g, " ");
  value = value.replace(/([a-zA-Z%)])([+-])(\d)/g, "$1 $2 $3");

  // Handle transform functions
  if (mapping.css.startsWith("transform:")) {
    const fn = mapping.css.split(": ")[1];
    const unit = (fn === "rotate" || fn === "skewX" || fn === "skewY") ? "deg" : "";
    const finalValue = value.match(/[a-z%]/) ? value : `${value}${unit}`;
    return { css: `transform: ${fn}(${finalValue});`, description: `${mapping.label}: ${finalValue} (arbitrary)` };
  }

  // Handle filter functions
  if (mapping.css.startsWith("filter:") || mapping.css.startsWith("backdrop-filter:")) {
    const [cssProp, fn] = mapping.css.split(": ");
    return { css: `${cssProp}: ${fn}(${value});`, description: `${mapping.label}: ${value} (arbitrary)` };
  }

  return {
    css: `${mapping.css}: ${value};`,
    description: `${mapping.label}: ${value} (arbitrary value)`,
  };
}

// ── Hover Provider ────────────────────────────────────────────────────────

class TuiHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.Hover | undefined {
    const range = document.getWordRangeAtPosition(position, /[!\w\-:\[\]()%.\/]+/);
    if (!range) return undefined;

    const word = document.getText(range);

    // Parse prefixes: !responsive:pseudo:tui-class
    let responsivePrefix: string | null = null;
    let pseudoPrefix: string | null = null;
    let groupPrefix: string | null = null;
    let isImportant = false;
    let className = word;

    // Check !important prefix
    if (className.startsWith("!")) {
      isImportant = true;
      className = className.slice(1);
    }

    // Check responsive prefix
    const respMatch = className.match(/^(sm|md|lg|xl|2xl):(.*)/);
    if (respMatch) {
      responsivePrefix = respMatch[1];
      className = respMatch[2];
    }

    // Check group pseudo prefix
    const groupMatch = className.match(/^(group-hover|group-focus|group-active):(.*)/);
    if (groupMatch) {
      groupPrefix = groupMatch[1];
      className = groupMatch[2];
    }

    // Check pseudo prefix
    if (!groupPrefix) {
      const pseudoMatch = className.match(/^(hover|focus|focus-visible|focus-within|active|disabled|visited|first|last|odd|even|placeholder):(.*)/);
      if (pseudoMatch) {
        pseudoPrefix = pseudoMatch[1];
        className = pseudoMatch[2];
      }
    }

    const tokenMap = getTokenMap();
    const token = tokenMap.get(className);

    // Handle arbitrary value classes like tui-h-[100vh], tui-w-[300px]
    if (!token) {
      const arbitraryMatch = className.match(/^tui-([\w-]+)-\[([^\]]+)\]$/);
      if (arbitraryMatch) {
        const [, prop, value] = arbitraryMatch;
        const resolved = resolveArbitraryHover(prop, value);
        if (resolved) {
          const md = new vscode.MarkdownString();
          md.appendMarkdown(`**TantuUI** — \`${word}\`\n\n`);
          const cssBlock = this.buildCssBlock(word, className, resolved.css, responsivePrefix, pseudoPrefix, groupPrefix, isImportant);
          md.appendCodeblock(cssBlock, "css");
          md.appendMarkdown(`\n\n---\n*${resolved.description}${isImportant ? " (!important)" : ""}*`);
          return new vscode.Hover(md, range);
        }
      }
      return undefined;
    }

    const md = new vscode.MarkdownString();
    md.appendMarkdown(`**TantuUI** — \`${word}\`${isImportant ? " ⚡ !important" : ""}\n\n`);
    const cssBlock = this.buildCssBlock(word, token.label, token.css, responsivePrefix, pseudoPrefix, groupPrefix, isImportant);
    md.appendCodeblock(cssBlock, "css");

    if (token.color) {
      md.appendMarkdown(`\n\n🎨 \`${token.color}\``);
    }

    md.appendMarkdown(`\n\n---\n*${token.description}${isImportant ? " (forced with !important)" : ""}*`);

    return new vscode.Hover(md, range);
  }

  private buildCssBlock(
    fullClass: string,
    baseClass: string,
    css: string,
    responsive: string | null,
    pseudo: string | null,
    group: string | null,
    important: boolean = false,
  ): string {
    const escaped = fullClass.replace(/!/g, "\\!").replace(/:/g, "\\:").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/%/g, "\\%");

    // Add !important to declarations if flagged
    let finalCss = css;
    if (important) {
      finalCss = css
        .split(";")
        .map((d) => d.trim())
        .filter(Boolean)
        .map((d) => `${d} !important`)
        .join(";\n  ");
    }

    // Build selector
    let selector: string;
    if (group) {
      const parentPseudo = GROUP_PREFIXES.find((g) => g.prefix === group)?.parent || `.group:hover`;
      selector = `${parentPseudo} .${escaped}`;
    } else if (pseudo) {
      const pseudoSuffix = PSEUDO_PREFIXES.find((p) => p.prefix === pseudo)?.pseudo || `:${pseudo}`;
      selector = `.${escaped}${pseudoSuffix}`;
    } else {
      selector = `.${escaped}`;
    }

    let rule = `${selector} {\n  ${finalCss};\n}`;

    if (responsive) {
      const mq = RESPONSIVE_PREFIXES.find((r) => r.prefix === responsive)?.mediaQuery || `(min-width: 768px)`;
      rule = `@media ${mq} {\n  ${rule}\n}`;
    }

    return rule;
  }
}

// ── Color Decorator ───────────────────────────────────────────────────────

class TuiColorDecorator implements vscode.Disposable {
  private disposables: vscode.Disposable[] = [];
  private decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();
  private timeout: NodeJS.Timeout | undefined;

  constructor() {
    // Initial decoration
    this.updateDecorations();

    // Listen for changes
    this.disposables.push(
      vscode.window.onDidChangeActiveTextEditor(() => this.triggerUpdate()),
      vscode.workspace.onDidChangeTextDocument(() => this.triggerUpdate()),
    );
  }

  private triggerUpdate() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.updateDecorations(), 200);
  }

  private updateDecorations() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();
    const tokenMap = getTokenMap();

    // Find all tui-bg-* and tui-text-* classes with colors
    const classRegex = /tui-(?:bg|text|border)-[\w-]+/g;
    const decorationsMap: Map<string, vscode.DecorationOptions[]> = new Map();

    let match: RegExpExecArray | null;
    while ((match = classRegex.exec(text)) !== null) {
      const className = match[0];
      const token = tokenMap.get(className);
      if (!token?.color) continue;

      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(startPos, endPos);

      if (!decorationsMap.has(token.color)) {
        decorationsMap.set(token.color, []);
      }
      decorationsMap.get(token.color)!.push({ range });
    }

    // Clear old decorations
    for (const [, type] of this.decorationTypes) {
      editor.setDecorations(type, []);
    }

    // Apply new decorations
    for (const [color, ranges] of decorationsMap) {
      let decorationType = this.decorationTypes.get(color);
      if (!decorationType) {
        decorationType = vscode.window.createTextEditorDecorationType({
          before: {
            contentText: "■",
            color: color,
            margin: "0 4px 0 0",
            fontWeight: "bold",
          },
        });
        this.decorationTypes.set(color, decorationType);
      }
      editor.setDecorations(decorationType, ranges);
    }
  }

  dispose() {
    for (const d of this.disposables) d.dispose();
    for (const [, type] of this.decorationTypes) type.dispose();
    if (this.timeout) clearTimeout(this.timeout);
  }
}
