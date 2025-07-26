<p align="center">
  <img src="./code-scope-highlighter.gif" alt=" Language" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/lamula21/scope-highlighter" alt=" Language" />
  <img src="https://img.shields.io/github/stars/lamula21/scope-highlighter" alt=" Stars" />
  <img src="https://img.shields.io/github/issues-pr/lamula21/scope-highlighter" alt=" Pull Requests" />
  <img src="https://img.shields.io/github/issues/lamula21/scope-highlighter" alt=" Issues" />
  <img src="https://img.shields.io/github/contributors/lamula21/scope-highlighter" alt=" Contributors" />
</p>


# Code Scope Highlighter - A Highlighter Extension for Better Readability

A customizable scope highlighter, inspired by Dr Racket IDE.

## ✨ Features
- **Universal highlighting:** ScopeHighlighter works on any language!
- **Dynamic Highlighting:** Instantly see the scope of matching brackets with vibrant colors.
- **HTML Tag Support:** Highlight nested HTML tags with intelligent cursor positioning:
  - Place cursor on `<` of start tag to highlight: start tag + content + end tag
  - Place cursor on `>` of any tag to highlight: content inside the tag
- **Customizable Colors:** Personalize your highlight colors for brackets, braces, and parentheses.
- **Flexible Modes:** Choose from "near", "always", or "never" highlight modes to suit your coding style.
- **(Soon) Language Specific Settings:** Enable or disable highlighting for specific programming languages.

## 🌟 Why ScopeHighlighter?
- **Boost Productivity:** Quickly understand the structure of your code, making it easier to debug and develop.
- **Enhanced Readability:** No more squinting at matching brackets; ScopeHighlighter makes it clear and straightforward.
- **Seamless Integration:** Works effortlessly and fast within the VS Code ecosystem, either on desktop or the browser, thanks to the bundler `esbuild`.

## ⚙️ Extension Settings

The following settings are configured for the scope-highlighter extension:

### `codeScopeHighlighter.matchBrackets` - Match Brackets

For color picker: https://vuetifyjs.com/en/components/color-pickers/

- **Default**: `near`
- **Description**: Choose when the scope highlight should be active:
    - `near` for when the cursor is near the bracket,
    - `always` to always highlight,
    - `never` to never highlight.

### `codeScopeHighlighter.scopeColor` - Scope Color
- **Default**: `#4d4d4d30`
- **Description**: Color for highlighting the entire scope of matching brackets. (Hex format)

### `codeScopeHighlighter.bracketColor` - Bracket Color
- **Default**: `#4d4d4d30`
- **Description**: Color for highlighting the matching brackets. (Hex format)

## 🎯 HTML Tag Highlighting

The extension now supports HTML tag highlighting with intelligent cursor positioning:

### How it works:
- **Cursor on `<` of start tag:** Highlights the entire tag including start tag, content, and end tag
- **Cursor on `>` of any tag:** Highlights only the content inside the tag (excluding the end tag's opening bracket)
- **Cursor inside tag content:** Highlights the content and end tag

### Example:
```html
<div class="container">
    <h1>Hello World</h1>
    <p>This is a <strong>test</strong> paragraph.</p>
</div>
```

- Place cursor on `<` of `<div>` → highlights entire div block
- Place cursor on `>` of `<div>` → highlights content inside div
- Place cursor on `<` of `<h1>` → highlights h1 tag and content
- Place cursor on `>` of `</h1>` → highlights h1 content only

## 🗺️ Roadmap 

- [ ] **HTML support:** Implement highlighting for nested html tags.
- [ ] **Language Specific Settings:** Implement highlighting for specific programming languages.
- [ ] **Bracket Specific Settings:** Implement highlighting for specific matching bracket symbols.


## 📄 License

This project is licensed under the **MIT** - see the [MIT](https://github.com/xavimondev/easyreadme/blob/main/LICENSE) file for details.

## For Devs

Start Debugging right away with `F5` or Command Pallete `Debug: Start Debugging`
