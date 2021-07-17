# Blossom

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
import { petal } from "blossom";

petal("#FF0000")
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
    <code>petal</code>
  </summary>
  
  Parses the given input and creates a new Blossom instance.

  ```js
  import { petal } from "blossom";

  // string input
  petal("#ABC");
  petal("#AABBCC");
  petal("#ADCDEF12");
  petal("rgb(100, 200, 255)");
  petal("rgba(100, 200, 255, 0.5)");
  petal("rgba(10% 20% 30% / 35%)");
  petal("hsl(180, 78%, 87%)");
  petal("hsla(180, 78%, 87%, 0.5)");
  petal("hsla(180deg 78% 87% / 50%)");

  // object input
  petal({ r: 12, g: 34, b: 56 });
  petal({ r: 12, g: 34, b: 56, a: 1 });
  petal({ h: 180, s: 50, l: 75 });
  petal({ h: 180, s: 50, l: 75, a: 1 });
  petal({ h: 180, s: 50, v: 65 });
  petal({ h: 180, s: 50, v: 65, a: 1 });
  petal({ c: 25, m: 50, k: 75, k: 100 });
  petal({ c: 25, m: 50, k: 75, k: 100, a: 1 });
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

