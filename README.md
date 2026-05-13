![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# pin-button

A two-state pinned/unpinned button web component built on the [`@scalable.software/component`](https://github.com/scalable-software/component) framework, following the specification-driven implementation policies declared in [`component.template`](https://github.com/scalable-software/component.template).

Originally implemented as a vanilla custom element ([round 1](https://github.com/callmehuyv/flippie-game)), this round-2 repository ports the component into the canonical template structure: a specification file, metadata, validation, component class, template, stylesheet, demo, and unit tests.

## Public Contract

The complete public contract is declared in [`specifications/pin.specifications.json`](./specifications/pin.specifications.json). At a glance:

| Layer       | Members                                |
| ----------- | -------------------------------------- |
| Tag         | `pin-button`                           |
| Composition | `template → div.icon → svg.pinned, svg.unpinned` |
| State       | `status` — compulsory, values `pinned \| unpinned`, default `unpinned` |
| Operations  | `pin()`, `unpin()`, `toggle()`         |
| Events      | `onpin`, `onunpin` (detail: `{ status }`) |
| Gestures    | `click` (triggers `toggle`), `hover` & `focus` (visual) |

### Imperative API

```ts
import { Pin, Status } from "@callmehuyv/pin-button";

await Pin.Template.load("pin.template.html");
customElements.define(Pin.Tag, Pin);

const pin = document.querySelector("pin-button") as Pin;
pin.pin();      // status → "pinned"
pin.unpin();    // status → "unpinned"
pin.toggle();   // flips
pin.status;     // "pinned" | "unpinned"

pin.onpin = (e) => console.log((e as CustomEvent).detail.status);
```

### Declarative API

```html
<pin-button></pin-button>                  <!-- defaults to status="unpinned" -->
<pin-button status="pinned"></pin-button>  <!-- starts pinned -->
```

The `status` attribute is **compulsory**: it is always present in the DOM and always reflects the canonical internal value.

## Project Layout

```
src/
  pin.meta.ts          — canonical vocabulary: Tag, CSS, Attributes, State, Status, Operation, Event, Gesture
  pin.validation.ts    — runtime enforcement of declared value domains
  pin.ts               — component class
  pin.template.html    — realized composition
  pin.style.css        — presentation + state-reflective styling
  index.ts             — public entry point

specifications/
  pin.specifications.json          — source of truth
  component.specification.schema.json

test/unit/
  pin.meta.test.ts       — metadata vocabulary
  pin.validation.test.ts — Validate.status
  pin.test.ts            — composition, state, operation, event behavior

demo/
  index.html, index.js   — local browser demo
```

## Install

```bash
npm install
```

## Test

```bash
npm test
```

Coverage and test reports land in `coverage/` and `report/`, respectively.

## Build

```bash
npm run build
```

Compiles TypeScript to `dist/`, copies the template HTML and stylesheet next to the compiled JS.

## Serve the Demo

```bash
npm run serve
```

Opens `demo/index.html` with `@web/dev-server`. The demo uses [`importmap/importmap.build.js`](./importmap/importmap.build.js) to resolve `@callmehuyv/pin-button` from `dist/`.

## Document

```bash
npm run document
```

Generates TypeDoc API docs into `docs/`.

## Policies

Implementation policies live under [`.claude/context/`](./.claude/context/) and are summarized in [`.claude/CLAUDE.md`](./.claude/CLAUDE.md). The policies in use here are: composition, state, validation, operation, event, gesture, testing, and workflow. The vocabulary (`status`, `pinned`, `unpinned`, `onpin`, `onunpin`, `toggle`, `Attributes.STATUS`, etc.) is the canonical example used throughout those policy documents.

## License

This software is released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). See the [full license](https://creativecommons.org/licenses/by-nc-sa/4.0/).
