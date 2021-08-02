# Blossom

<div align="center">
  <img src="./assets/logo.svg" alt="Flower" width="150px" style="padding: 1em">
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@ericrovell/blossom">
    <img alt="npm package version" src="https://badgen.net/npm/v/@ericrovell/blossom/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/blossom">
    <img alt="types included" src="https://badgen.net/npm/types/@ericrovell/blossom/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/blossom">
    <img alt="downloads count" src="https://badgen.net/npm/dt/@ericrovell/blossom/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/blossom">
    <img alt="node version" src="https://badgen.net/npm/node/@ericrovell/blossom/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/blossom">
    <img alt="licence" src="https://badgen.net/npm/license/@ericrovell/blossom/" />
  </a>
</div>

<div align="center">
  <a href="https://bundlephobia.com/package/@ericrovell/blossom">
    <img alt="minified size" src="https://badgen.net/bundlephobia/min/@ericrovell/blossom/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/blossom">
    <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@ericrovell/blossom/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/blossom">
    <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@ericrovell/blossom/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/blossom">
    <img alt="tree-shaking" src="https://badgen.net/bundlephobia/tree-shaking/@ericrovell/blossom/" />
  </a>
</div>

<p align="center">
Blossom is a JS library tool for color manipulations and transformations.
</p>

## Features:

- Chainable API;
- Ummutable;
- Written in Typescript;
- Types included;
- Dependency-free;

## Getting started

```
npm i @ericrovell/blossom
```

```
import { blossom } from "blossom";

blossom("#FF0000")
  .grayscale
  .setAlpha(0.25)
  .toStringRGB

// -> rgb(128 128 128 / 0.25)
```

## Supported color models

- Hexadecimal strings;
- RGB (strings, objects);
- HSL (strings, objects);
- HSV (objects);
- CMYK (objects).

## API

### Color parsing

<details>
  <summary>
    <code>blossom</code>
  </summary>
  
  Parses the given input and creates a new Blossom instance.

  ```js
  import { blossom } from "blossom";

  // string input
  blossom("#ABC");
  blossom("#AABBCC");
  blossom("#ADCDEF12");
  blossom("rgb(100, 200, 255)");
  blossom("rgba(100, 200, 255, 0.5)");
  blossom("rgba(10% 20% 30% / 35%)");
  blossom("hsl(180, 78%, 87%)");
  blossom("hsla(180, 78%, 87%, 0.5)");
  blossom("hsla(180deg 78% 87% / 50%)");

  // object input
  blossom({ r: 12, g: 34, b: 56 });
  blossom({ r: 12, g: 34, b: 56, a: 1 });
  blossom({ h: 180, s: 50, l: 75 });
  blossom({ h: 180, s: 50, l: 75, a: 1 });
  blossom({ h: 180, s: 50, v: 65 });
  blossom({ h: 180, s: 50, v: 65, a: 1 });
  blossom({ c: 25, m: 50, k: 75, k: 100 });
  blossom({ c: 25, m: 50, k: 75, k: 100, a: 1 });
  ```
</details>

<details>
  <summary>
    <code>getModel</code>
  </summary>

  Parses a color and returns a color model name of the given input.

  ```js
    import { getModel } from "blossom";

    getModel("#ADC123"); // -> "hex"
    getModel({ r: 13, g: 237, b: 162 }); // -> "rgb"
    getModel("hsl(180deg 50% 50%)"); // -> "hsl"
    getModel("Hi!"); // -> null
  ```
</details>

### Color transformations

<details>
  <summary>
    <code>.hex</code>
  </summary>

  Returns the hexadecimal representation of a color.
  Outputs the modern `#RRGGBBAA` opacity syntax for transparent colors.

  ```js
  blossom("rgb(0, 255, 0)").hex; // -> "#00FF00"
  blossom({ h: 300, s: 100, l: 50 }).hex; // -> "#FF00FF"
  blossom({ r: 255, g: 255, b: 255, a: 0 }).hex; // -> "#FFFFFF00"
  ```
</details>

<details>
  <summary>
    <code>.rgb</code>
  </summary>

  Returns the RGB color model object of a color.

  ```js
  blossom("#ff0000").rgb; // -> { r: 255, g: 0, b: 0, a: 1 }
  blossom({ h: 180, s: 100, l: 50, a: 0.5 }).rgb; // -> { r: 0, g: 255, b: 255, a: 0.5 }
  ```
</details>

<details>
  <summary>
    <code>.toStringRGB</code>
  </summary>

  Returns the RGB color model string of a color.
  Outputs the modern whitespace syntax.

  ```js
  blossom("#ff0000").toStringRGB; // -> "rgb(255 0 0)"
  blossom({ h: 180, s: 100, l: 50, a: 0.5 }).toStringRGB; // -> "rgb(0 255 255 / 0.5)"
  ```
</details>

<details>
  <summary>
    <code>.hsl</code>
  </summary>

  Returns the HSL color space object of a color.

  ```js
  blossom("#ffff00").hsl; // -> { h: 60, s: 100, l: 50, a: 1 }
  blossom("rgba(0, 0, 255, 0.5)").hsl; // -> { h: 240, s: 100, l: 50, a: 0.5 }
  ```
</details>

<details>
  <summary>
    <code>.toStringHSL</code>
  </summary>

  Returns the HSL color space string of a color.
  Outputs the modern whitespace syntax.

  ```js
  blossom("#ffff00").toStringHSL; // -> "hsl(60deg 100% 50%)"
  blossom("rgba(0, 0, 255, 0.5)").toStringHSL; // -> "hsl(240deg 100% 50% / 0.5)"
  ```
</details>

<details>
  <summary>
    <code>.hsv</code>
  </summary>

  Returns the HSV color space object of a color.

  ```js
  blossom("#ffff00").hsv; // -> { h: 60, s: 100, v: 100, a: 1 }
  blossom("rgba(0, 255, 255, 0.5)").hsv; // -> { h: 180, s: 100, v: 100, a: 1 }
  ```
</details>


<details>
  <summary>
    <code>.cmyk</code>
  </summary>

  Returns the CMYK color space object of a color.

  ```js
  blossom("#fffff").cmyk; // -> { c: 0, m: 0, y: 0, k: 0, a: 1 }
  blossom("#555aaa").cmyk; // -> { c: 50, m: 47, y: 0, k: 33, a: 1 }
  ```
</details>

### Color manipulation

<details>
  <summary>
    <code>.setAlpha(value)</code>
  </summary>

  Changes the alpha channel value and returns a new `Blossom` instance.

  ```js
  blossom("rgb(0, 0, 0)")
    .setAlpha(0.5)
    .toStringRGB; // -> "rgb(0 0 0 / 0.5)"
  ```
</details>

<details>
  <summary>
    <code>.inverted</code>
  </summary>

  Creates a new `Blossom` instance with an inverted color.

  ```js
  blossom("#aabbcc")
    .inverted
    .hex; // -> "#554433"
  ```
</details>

<details>
  <summary>
    <code>.saturate(amount = 0.1)</code>
  </summary>

  Increases the HSL saturation of a color by the given amount.

  ```js
  blossom("#bf4040")
    .saturate(0.25)
    .hex; // -> "#df2020"

  blossom("hsl(0, 50%, 50%)")
    .saturate(0.5)
    .toStringHSL; // -> "hsl(0deg 100% 50%)"
  ```
</details>

<details>
  <summary>
    <code>.desaturate(amount = 0.1)</code>
  </summary>

  Decreases the HSL saturation of a color by the given amount.

  ```js
  blossom("#df2020")
    .saturate(0.25)
    .hex; // -> "#bf4040"

  blossom("hsl(0, 100%, 50%)")
    .saturate(0.5)
    .toStringHSL; // -> "hsl(0deg 50% 50%)"  
  ```
</details>

<details>
  <summary>
    <code>.grayscale</code>
  </summary>

  Creates a gray color with the same lightness as a source color.
  Same result as `.desaturate(1)`.

  ```js
  blossom("#bf4040")
    .grayscale
    .hex; // -> "#808080"

  blossom("hsl(0, 100%, 50%)")
    .grayscale
    .toStringHSL; // -> "hsl(0deg 0% 50%)"
  ```
</details>

<details>
  <summary>
    <code>.lighten(amount = 0.1)</code>
  </summary>

  Increases the HSL lightness of a color by the given amount.

  ```js
  blossom("#000000")
    .lighten(0.5)
    .hex; // -> "#808080"

  blossom("#223344")
    .lighten(0.3)
    .hex; // -> "#5580aa"

  blossom("hsl(0, 50%, 50%)")
    .lighten(0.5)
    .toStringHSL; // -> "hsl(0deg 50% 100%)"
  ```
</details>

<details>
  <summary>
    <code>.darken(amount = 0.1)</code>
  </summary>

  Decreases the HSL lightness of a color by the given amount.

  ```js
  blossom("#ffffff")
    .darken(0.5)
    .hex; // -> "#808080"

  blossom("#5580aa")
    .darken(0.3)
    .hex; // -> "#223344"

  blossom("hsl(0, 50%, 100%)")
    .lighten(0.5)
    .toStringHSL; // -> "hsl(0, 50%, 50%)"
  ```
</details>

<details>
  <summary>
    <code>.setHue(value)</code>
  </summary>

  Changes the hue value and returns a new `Blossom` instance.

  ```js
  blossom("hsl(90, 50%, 50%)")
    .setHue(180)
    .toStringHSL; // -> "hsl(180deg 50% 50%)"

  blossom("hsl(90, 50%, 50%)")
    .setHue(370)
    .toStringHSL; // -> "hsl(10deg 50% 50%)"
  ```
</details>

<details>
  <summary>
    <code>.rotate(amout = 15)</code>
  </summary>

  Increases the HSL hue value of a color by the given amount.

  ```js
  blossom("hsl(90, 50%, 50%)")
    .rotate(90)
    .toStringHSL; // -> "hsl(180deg 50% 50%)"

  blossom("hsl(90, 50%, 50%)")
    .rotate(-180)
    .toStringHSL; // -> "hsl(270deg 50% 50%)"
  ```
</details>

### Color analysis

<details>
  <summary>
    <code>.valid</code>
  </summary>

  Returns a boolean indicating whether or not an input has been parsed successfully.
  On unsuccess, color value defaults to black without error.

  ```js
  blossom("#FFF").valid; // -> true
  blossom("#NaN").valid; // -> false
  blossom("hello").valid; // -> false
  blossom({ r: 0, g: 0, b: 0 }).valid; // -> true
  blossom({ r: 0, g: 0, v: 0 }).valid; // -> false
  ```
</details>

<details>
  <summary>
    <code>.alpha</code>
  </summary>

  Returns an alpha channel value of the color.

  ```js
  blossom("#FFFFFF").alpha; // -> 1
  blossom("rgba(50 100 150 / 0.5)").alpha; // -> 0.5
  ```
</details>

<details>
  <summary>
    <code>.opaque</code>
  </summary>

  Returns a boolean indicating whether or not a color is opaque.

  ```js
  blossom("#FFFFFF").opaque; // -> true
  blossom("rgba(50 100 150 / 0.5)").opaque; // -> false
  ```
</details>

<details>
  <summary>
    <code>.transparent</code>
  </summary>

  Returns a boolean indicating whether or not a color is transparent.

  ```js
  blossom("#FFFFFF").transparent; // -> false
  blossom("rgba(50 100 150 / 0.5)").transparent; // -> true
  ```
</details>

<details>
  <summary>
    <code>.hue</code>
  </summary>

  Returns the Hue value of the number on the color wheel.

  ```js
  blossom("hsl(90deg 50% 50%)").hue; // -> 90
  blossom("hsl(-10deg 50% 50%)").hue; // -> 350
  ```
</details>

<details>
  <summary>
    <code>.saturation</code>
  </summary>

  Returns the saturation value of the number.

  ```js
  blossom("hsl(90deg 50% 50%)").saturation; // -> 0.5
  blossom("hsl(-10deg 98% 50%)").saturation; // -> 0.98
  ```
</details>

<details>
  <summary>
    <code>.lightness</code>
  </summary>

  Returns the lightness value of the number.

  ```js
  blossom("hsl(90deg 50% 50%)").lightness; // -> 0.5
  blossom("hsl(-10deg 50% 46%)").lightness; // -> 0.46
  ```
</details>

<details>
  <summary>
    <code>.brightness</code>
  </summary>

  Returns the brightness of a color in range [0; 1].
  The calculation logic is modified from [Web Content Accessibility Guidelines](https://www.w3.org/TR/AERT/#color-contrast).

  ```js
  blossom("#000000").brightness; // -> 0
  blossom("#808080").brightness; // -> 0.5
  blossom("#FFFFFF").brightness; // -> 1
  ```
</details>

<details>
  <summary>
    <code>.light</code>
  </summary>

  A Boolean indicator whether or not a color is light (brightness >= 0.5).

  ```js
  blossom("#000000").light; // -> false
  blossom("#808080").light; // -> true
  blossom("#FFFFFF").light; // -> true
  ```
</details>

<details>
  <summary>
    <code>.dark</code>
  </summary>

  A Boolean indicator whether or not a color is dark (brightness < 0.5).

  ```js
  blossom("#000000").dark; // -> true
  blossom("#808080").dark; // -> false
  blossom("#FFFFFF").dark; // -> false
  ```
</details>

### Color Utilities

<details>
  <summary>
    <code>random()</code>
  </summary>

  Creates new instance with a random color.

  ```js
  import { random } from "colord";

  random().hex; // -> "#01C8EC"
  random().setAlpha(0.5).rgb; // -> { r: 13, g: 237, b: 162, a: 0.5 }
  ```
</details>

## Plugins

### Usage

To extend the functionality using plugins, the `extend` function should be used:

```js
import { blossom, extend } from "blossom";
import { plugin1, plugin2 } from "plugin-path;

extend([
  plugin1,
  plugin2
]);
```

### Developing plugins

To develop a custom plugin and extend library's functionality, the function should be created which integrates methods using prototype chain.

```js
export const plugin = (BaseClass) =>  {
  BaseClass.prototype.newMethod = function() {
    // ...
  }
}
```

After that it should be provided as the parameter for `extend` function.

### Developing plugins with TypeScript

To develop a plugin with TypeScript, module `blossom` should be declared with the `Blossom` interface described.

```ts
import { Plugin } from "@blossom/types";

declare module "blossom" {
  interface Blossom {
    newMethod(): void;
  }
}

export const pluginHarmonyColors: Plugin = (BaseClass): void =>  {
  BaseClass.prototype.newMethod = function() {
    // ...
  }
}
```

### Included plugins

<details>
  <summary>
    <code>
      Harmonies
    </code>
  </summary>

  Provides functionatity to generate [harmony colors](https://en.wikipedia.org/wiki/Harmony_(color)).

  ```js
  import { blossom, extends } from "blossom";
  import { harmonies } from "blossom/plugins/harmonies";

  const color = blossom("FF0000");

  color.harmonies("analogous")
    .map(color => color.hex); // -> [ "#FF0080", "#FF0000", "#FF8000"]
  color.harmonies("complimentary")
    .map(color => color.hex); // -> [ "#FF0000", "#00FFFF" ]
  color.harmonies("rectangle")
    .map(color => color.hex); // -> [ "#FF0000", "#FFFF00", "#00FFFF", "#0000FF" ]
  color.harmonies("tetradic")
    .map(color => color.hex); // -> [ "#FF0000", "#80FF00", "#00FFFF", "#8000FF" ]
  color.harmonies("triadic"  )
    .map(color => color.hex); // -> [ "#FF0000", "#00FF00", "#0000FF" ]
  color.harmonies("splitcomplimentary")
    .map(color => color.hex); // -> [ "#FF0000", "#00FF80", "#0080FF" ]
  ```

  Harmony color schemes is available as type:

  ```ts
  import type { Harmony } from "blossom/plugins/harmonies";
  
  const harmony: Harmony = "analogous";
  const notHarmony: Harmony = "round"; // TypeError
  ```
</details>

<details>
  <summary>
    <code>
      Monochromatic
    </code>
  </summary>

  Provides functionatity to generate [monochromatic colors](https://en.wikipedia.org/wiki/Monochromatic_color) as:

  - Tints;
  - Shades;
  - Tones.

  ```js
  import { blossom, extends } from "blossom";
  import { monochromatic } from "blossom/plugins/monochromatic";

  const color = blossom("FF0000");

  color.tints(4).map(tint => tint.hex); // -> [ "#FF0000", "#FF4242", "#FF8585", "#FFC7C7", "#FFFFFF" ]
  color.shades(4).map(shade => shade.hex); // -> [ "#FF0000", "#BD0000", "#7A0000", "#380000", "#000000" ]
  color.tones(4).map(tone => tone.hex); // -> [ "#FF0000", "#DF2020", "#BF4040", "#9F6060", "#808080" ]
  ```

  The original color is always included as first palette item.

  If there is not enough space between colors to generate **required** number of colors, less number of colors will be generated. For example, generating 10 shades for `#050505` is not practical as `#000000` is too close and all shades will be indistinguishable:

  ```js
  import { blossom, extends } from "blossom";
  import { monochromatic } from "blossom/plugins/monochromatic";

  blossom("#FAFAFA").tints(10).map(tint => tint.hex); // -> [ "#FAFAFA", "#FDFDFD", "#FFFFFF" ]
  blossom("#050505").shades(10).map(shade => shade.hex); // -> [ "#050505", "#020202", "#000000" ]
  blossom("#827D7D").tones(10).map(tone => tone.hex); // -> [ "#827D7D", "#817E7E", "#808080" ]
  ```
</details>

## Types

Blossom is written in strict TypeScript and ships with types in the library itself.

While not only typing its own functions and variables, you can also type yours. Depending on the color space you are using, the types can be also imported and used to type the code.

```js
import type { ColorRGB, ColorHSL } from "blossom/types";

const foo: ColorHSL = { h: 0, s: 0, l: 0 };
const bar: ColorRGB = { r: 0, g: 0, v: 0 }; // type error!
```

## Inspiration

It was a long time I was thinking about this project. There were two unsuccessfull attemps, it was not thoughfull enough.

This project is inspired by fantastic [colord](https://github.com/omgovich/colord) project, that gave me the idea about architecture and implementation.