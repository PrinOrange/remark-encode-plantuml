# Remark Encoding PlantUML

[![npm version](https://img.shields.io/npm/v/remark-encode-plantuml?style=flat-square)](https://www.npmjs.com/package/remark-encode-plantuml)
[![license](https://img.shields.io/github/license/PrinOrange/remark-encode-plantuml?style=flat-square)](./LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/min/remark-encode-plantuml?style=flat-square)](https://bundlephobia.com/package/remark-encode-plantuml)
[![unified compatibility](https://img.shields.io/badge/unified.js-100%25%20compatible-9cf?style=flat-square)](https://unifiedjs.com)

A Unified/Remark plugin to automatically encode PlantUML diagrams into embeddable image URLs. Transform UML code blocks into visual diagrams.

## Installation

```bash
npm install remark-encode-plantuml
```

## Usage

**Input Markdown**:

````markdown
## Hello World

This is the PlantUML diagram.

```plantuml
@startuml
Bob -> Alice : Hello Remark!
@enduml
```
````

Use this plugin in your code,

```typescript
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkEncodingPlantUml from 'remark-encode-plantuml';

const processor = unified()
  .use(remarkParse)
  .use(remarkEncodingPlantUml, {format: 'svg'})
  .use(remarkStringify);

const output = await processor.process(input);
```

It will output,

```markdown
## Hello World

This is the PlantUML diagram.
![PlantUML Diagram](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuU8gp69mB2v9ICrB0NeF)
```

## API

This package is **ESM-only** and provides a default export: `remarkEncodingPlantUml`. You can integrate it with `unified.js`, `react-markdown` and so on.

### `unified().use(remarkEncodingPlantUml, options?)`

### Options

#### `format?: 'png' | 'svg'`

Specifies the output format. Defaults to `'png'`. Only `'svg'` and `'png'` are supported.

#### `darkMode?: boolean`

Enables **dark mode** for diagrams. Default to `false`.

#### `url?: string`

The Plantuml server used to generate the diagram hyperlinks, you can use your deployed one. Default to the official server instance [https://www.plantuml.com](https://www.plantuml.com/plantuml) if you are ok with sending data to it.

## Contributing

We welcome contributions! Please read our [Contribution Guide](CONTRIBUTION.md) before submitting PRs.

## License

[MIT](./LICENSE) © [但为君故](https://github.com/PrinOrange)
