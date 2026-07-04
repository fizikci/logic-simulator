# Logic Simulator

Logic Simulator is a small, browser-based digital electronics sandbox for building and testing simple logic circuits. It renders an interactive SVG workspace with AngularJS, lets you place input/output pins and common gates, and continuously evaluates the circuit so pin and wire states update while you work.

## Features

- Build circuits from input pins, output pins, clocks, LEDs, and standard logic gates.
- Connect pins visually and watch signal values propagate through the design.
- Create reusable integrated circuits (ICs) from a working circuit and add them back to the gate palette.
- Inspect the currently selected component or the active IC as JSON while editing.
- Arrange selected components with alignment, spread, and gather tools.

## Running the Simulator

No build step or package installation is required. The project is a static web app.

### Option 1: Open `index.html` directly

1. Clone or download this repository.
2. Open the project folder in your file browser.
3. Double-click `index.html`, or drag it into a modern web browser.

### Option 2: Serve the folder locally

Some browsers handle local files more predictably when served over HTTP. From the repository root, run one of the following commands and open the printed local URL:

```bash
# Python 3
python3 -m http.server 8000
```

Then visit <http://localhost:8000/index.html>.

## Basic Usage

- Use the left toolbar to add `PIN IN`, `PIN OUT`, or a gate from the palette.
- Click a pin to toggle its value; active/high signals are shown in red.
- Select a component or pin by clicking it.
- Hold <kbd>Alt</kbd>, click a source pin, then click a destination pin to connect them.
- Hold <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> while clicking to select multiple items.
- Drag selected items to reposition them on the workspace.
- Use **SAVE** to turn the current circuit into a reusable IC prototype. The circuit must include at least one output pin.
- Select a saved IC and use **SCOPE** to inspect/edit its internals; use **GO BACK** to return to the parent view.

## Folder Structure

```text
.
├── index.html           # Main HTML page and AngularJS/SVG UI shell
├── assets/
│   ├── angular.min.js   # Bundled AngularJS runtime used by the app
│   ├── app.css          # Layout and presentation styles
│   ├── app.js           # Simulator controller, editing actions, and evaluation loop
│   └── gates.js         # Built-in gate prototype definitions
├── LICENSE              # Project license
└── README.md            # Project documentation
```

The application entry point is `index.html`. It loads AngularJS first, then `assets/gates.js`, then `assets/app.js`.

## Gate Prototypes

Built-in gate prototypes live in `assets/gates.js`. The `setGates()` function initializes `_.gatePrototypes`, which drives the gate buttons shown in the left toolbar. Each prototype is stored as a two-item array:

```js
[
  "AND",
  {
    type: "AND",
    name: "AND",
    W: 70,
    H: 70,
    pins: [/* input and output pin definitions */]
  }
]
```

Each pin definition includes an `id`, `type`, `name`, and relative `pos` coordinate. `PIN_IN` pins receive values from other pins, and `PIN_OUT` pins expose calculated output values.

## Extending the Simulator

When adding or changing functionality, these areas are the usual starting points:

- **Add a new built-in gate shape/prototype:** update `assets/gates.js`, either by adding a prototype to `_.gatePrototypes` in `setGates()` or by appending entries in `addOtherGates()`.
- **Add gate evaluation behavior:** update the calculation logic in `assets/app.js` so the simulator knows how to compute output pin values for the new gate `type`.
- **Change the UI:** update `index.html` for toolbar or SVG markup changes, and `assets/app.css` for styling.
- **Reuse existing conventions:** keep gate `type` values consistent between prototypes and calculation logic, use relative pin positions from `0` to `1`, and ensure output pins are clearly marked with `type: "PIN_OUT"`.
- **Test manually in the browser:** after changes, refresh `index.html`, place the affected gates, connect simple inputs/outputs, and verify signal colors and JSON state update as expected.

## Contribution Tips

- Keep the app dependency-free unless a new dependency is truly necessary; it currently runs as static files.
- Prefer small, focused changes that are easy to validate in a browser.
- Document any new interaction pattern or gate behavior in this README.
- If you add a built-in gate, include both its visual/prototype definition and its simulation logic.
- Check the browser console for JavaScript errors after making changes.
