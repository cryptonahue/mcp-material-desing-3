# Material Design 3 MCP

A Model Context Protocol (MCP) server that provides tools and resources for generating Material Design 3 components with pure CSS and optional Tailwind CSS integration.


**What this MCP generates:**
- ✅ **Pure CSS Material Design 3 components** with semantic class names (`md-button`, `md-card`, etc.)
- ✅ **Scientific HCT color system** using Google's official algorithm
- ✅ **Optional Tailwind CSS themes** for design system integration
- ✅ **Framework-agnostic HTML/CSS** that works everywhere

### ✅ Implemented Features

- **6 fully functional MCP tools**
- **23+ supported Material Design 3 components** 
- **Scientific HCT algorithm** for theme generation
- **Complete database** with 2209+ Material Design icons
- **3 supported frameworks** (CSS-only, Alpine.js, Vanilla JS)
- **6 configured and documented MCP resources**
- **Robust type system** with TypeScript + Zod
- **Complete testing** and scientific validation

## 📦 Installation

```bash
# Clone and setup
git clone <repository>
cd material-design-3-mcp
npm install
npm run build
```

## 🛠️ Available Tools

### `generate_component`
Generates HTML/CSS code for 23+ Material Design 3 components.

**Supported components:**
- **Basic**: Button, Card, Checkbox, Radio, Switch, Text Field, Select
- **Navigation**: Tabs, Menu, NavigationBar, IconButton, Divider
- **Feedback**: Dialog, Snackbar, Progress, Tooltip, Badge
- **Containers**: FAB, Chip, List, Table, Slider

**Parameters:**
```typescript
{
  type: "button" | "card" | "checkbox" | ...,
  variant: "filled" | "outlined" | "text",
  props: {
    text?: string,
    icon?: "leading" | "trailing",
    iconName?: string,
    size?: "small" | "medium" | "large"
  },
  framework: "css-only" | "alpine" | "vanilla-js",
  includeJS: boolean
}
```

### `generate_theme`
Creates complete themes using the scientific HCT algorithm from Material Design 3.

**Features:**
- **Official Google HCT algorithm** (`@material/material-color-utilities`)
- **Perceptually uniform palettes** with 13 tones each
- **6 complete palettes**: Primary, Secondary, Tertiary, Neutral, Neutral Variant, Error
- **Scientific CSS variables** (23+ system colors)
- **Automatic light/dark theme**

**Output formats:**
- **`"css"`** - Pure CSS variables for Material Design 3 components
- **`"tailwind"`** - Tailwind CSS theme configuration for design system integration
- **`"both"`** - Both CSS variables and Tailwind config

**Parameters:**
```typescript
{
  seedColor: "#6750A4",
  name: "purple-theme",
  darkMode: true,
  outputFormat: "css" | "tailwind" | "both",
  includeUtilities: boolean
}
```

### `search_icons`
Searches the complete Material Design icons database.

**Database:**
- **2209+ categorized icons**
- **Search by name and category**
- **Multiple styles**: filled, outlined, round, sharp, two-tone
- **Complete metadata** per icon

**Parameters:**
```typescript
{
  query: "home",
  category?: string,
  style?: "filled" | "outlined" | "round" | "sharp" | "two_tone",
  size?: 16 | 20 | 24 | 32 | 40 | 48
}
```

### `create_layout`
Generates complete responsive layouts with integrated components.

**Parameters:**
```typescript
{
  type: "page" | "section" | "grid" | "flex",
  components: ["button", "card", "textfield"],
  responsive: true,
  theme?: "theme-name"
}
```

### `get_component_info`
Gets detailed information about available components.

### `get_version`
Version information and MCP capabilities.

## 📚 Available Resources

- `material://components/catalog` - Complete component catalog
- `material://themes/default` - Default Material Design 3 theme
- `material://icons/catalog` - Complete icons database
- `material://patterns/common` - Common UI patterns
- `material://examples/components` - Code examples
- `material://guidelines/design` - Material Design 3 guidelines

## ⚙️ Claude Desktop Configuration

### 1. Configure Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "material-design-3": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "D:\\path\\to\\material-design-3-mcp",
      "env": {
        "DEBUG": "false"
      }
    }
  }
}
```

### 2. Restart Claude Desktop

### 3. Test functionality

```bash
npm run test:manual
```

## 🎯 Usage Examples

### Generate a Material Design button
```
Create a filled button with "Get Started" text and a leading icon
```

### Create a custom theme
```
Generate a purple theme for my application
```

### Build a contact form
```
I need a form with name, email, message fields and a submit button
```

### Search for icons
```
Search for icons related to "home"
```

## 🧪 Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Start server
npm start

# Manual tests
npm run test:manual

# TypeScript check
npm run typecheck
```

## 🎨 Framework Support

### CSS-Only (22/23 components)
- **Works in any project** without JavaScript dependencies
- **Static components**: Button, Card, Radio, Switch, Text Field, etc.
- **Requires JS**: Dialog, Menu, Snackbar

### Alpine.js (23/23 components)
- **Complete interactivity** with minimal JavaScript
- **Automatic reactive state**
- **Events handled** by Alpine.js

### Vanilla JS (21/23 components)
- **Complete control** with standard JavaScript
- **Native events** and CustomEvents
- **Modular scripts** per component

## 🏗️ Project Architecture

```
mcp/
├── src/
│   ├── index.ts              # Main MCP server
│   ├── tools/                # 6 implemented tools
│   │   ├── component-generator.ts
│   │   ├── theme-generator.ts
│   │   ├── icon-search.ts
│   │   ├── layout-generator.ts
│   │   ├── component-info.ts
│   │   └── version.ts
│   ├── resources/            # 6 MCP resources
│   │   ├── material-icons.ts
│   │   └── reader.ts
│   ├── types/                # TypeScript types
│   └── utils/                # Utilities (logger, etc.)
├── dist/                     # Compiled code
├── test/                     # Manual tests
├── examples/                 # Configuration examples
├── M3-icons.json            # Icons database (5.4MB)
└── claude-desktop-config.json # Claude Desktop config
```

## 🔬 Scientific HCT Algorithm

### HCT System Advantages

- **Perceptually uniform**: Colors appear consistent to the human eye
- **Scientifically exact**: Uses Google's official algorithm
- **Complete palettes**: 13 tones per palette (0-100)
- **System variables**: 23+ semantic role colors

### Comparison with Traditional Methods

| Aspect | Traditional HSL/RGB | Scientific HCT Algorithm |
|---------|------------------------|---------------------------|
| **Precision** | Approximate color generation | Scientifically exact |
| **Uniformity** | Visually inconsistent steps | Perceptually uniform progression |
| **Palettes** | 11 basic tones | 13 scientifically calibrated tones |
| **Library** | Custom color functions | Official Google `@material/material-color-utilities` |
| **Output** | CSS/Tailwind variables | CSS variables + optional Tailwind config |
| **Compatibility** | Generic color system | Official Material Design 3 standard |

## 📊 Implementation Status

### ✅ Completed (v0.1.0)
- [x] Functional MCP server
- [x] 6 implemented tools
- [x] 23+ Material Design 3 components
- [x] Scientific HCT algorithm
- [x] Complete icons database
- [x] 3 supported frameworks
- [x] Complete documentation
- [x] Testing and validation

### 🔄 Future Improvements

#### v0.2.0 - Enhanced Tools
- [ ] Automatic WCAG validator
- [ ] Bundle size analyzer
- [ ] Automatic test generator
- [ ] CSS optimizer

#### v0.3.0 - Advanced Generation
- [ ] Dashboard generator
- [ ] Multi-step form builder
- [ ] Live preview server
- [ ] Figma exporter

#### v0.4.0 - AI Integration
- [ ] Intelligent component suggestions
- [ ] Automatic variant generation
- [ ] Design consistency analysis
- [ ] Design system integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-tool`
3. Make changes and add tests
4. Commit: `git commit -m "feat: add tool X"`
5. Push: `git push origin feature/new-tool`
6. Create Pull Request

### Contribution Areas

- **New MCP tools**
- **Additional components**
- **Accessibility improvements**
- **Performance optimizations**
- **Documentation and examples**
- **Automated testing**

## 🐛 Troubleshooting

### Server won't start
```bash
# Check dependencies
npm install
npm run build

# Check compilation
npm run typecheck
```

### Claude Desktop doesn't detect MCP
1. Verify path in `claude-desktop-config.json`
2. Completely restart Claude Desktop
3. Verify that `dist/index.js` exists

### Icon errors
- The `M3-icons.json` file (5.4MB) is required for icon functionality
- It loads automatically from the project root

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

- **Issues**: GitHub Issues for bugs and features
- **Documentation**: See `docs/` folder for detailed guides
- **Examples**: See `examples/` folder for configurations

---

**Material Design 3 MCP v0.1.0** - Production ready ✅

*Last updated: August 2024*