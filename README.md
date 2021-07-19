# Blossom

![Blossom](assets/logo.svg)

Blossom is a JS library tool for color manipulations and transformations.

Inspired by [colord](https://github.com/omgovich/colord).
Written for studying purposes and usage in pet projects.

## Features:

- Chainable API;
- Ummutable;
- Written in Typescript;
- Types included;
- Dependency-free;

## Getting started

```
npm i blossom
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

## Types

Blossom is written in strict TypeScript and ships with types in the library itself.

While not only typing its own functions and variables, you can also type yours. Depending on the color space you are using, the types can be also imported and used to type the code.

```js
import type { ColorRGB, ColorHSL } from "blossom/types";

const foo: ColorHSL = { h: 0, s: 0, l: 0 };
const bar: ColorRGB = { r: 0, g: 0, v: 0 }; // type error!
```