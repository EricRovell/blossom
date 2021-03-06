# Blossom Changelog

# 1.10.0 (2021-09-26):

- [feature]: extended `LAB` plugin functionality with `.delta()` method for perceived color difference calculations using [Delta E2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000);

# 1.9.0 (2021-09-04):

- [feature]: new build-in plugin `names` plugin with [named colors](https://css-tricks.com/snippets/css/named-colors-and-hex-equivalents/) support;
- [fix]: missing color models type exports;

# 1.8.0 (2021-08-12):

- [feature]: new build-in plugin with [HWB](https://en.wikipedia.org/wiki/HWB_color_model) color space support ❤️ [@omgovich](https://github.com/omgovich);
- [feature]: new build-in plugin `mix` with color mixing using [CIE LAB](https://en.wikipedia.org/wiki/Lab_color_space) color space for better results ❤️ [@omgovich](https://github.com/omgovich);

## 1.7.0 (2021-08-10):

- [feature]: `.toStringLAB` property for string representation of color;
- [feature]: `.toStringXYZ` property for string representation of color;
- [feature]: new build-in plugin with [CIE LCH](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/) color space support ❤️ [@omgovich](https://github.com/omgovich);

## 1.6.0 (2021-08-08):

- [feature]: new harmony pallete "double-split-complimentary" available via `Harmonies` plugin;
- [feature]: new build-in plugin with [CIE XYZ](https://www.sttmedia.com/colormodel-xyz) color space support ❤️ [@omgovich](https://github.com/omgovich);
- [feature]: new build-in plugin with [CIE LAB](https://en.wikipedia.org/wiki/Lab_color_space) color space support ❤️ [@omgovich](https://github.com/omgovich);

## 1.5.0 (2021-08-06):

- [feature]: parsing CMYK strings;
- [feature]: string output for CMYK Color models via `.toStringCMYK` property;
- [feature]: string output for HSV Color models via `.toStringHSV` property;
- [fix]: `.luminance` property valid type signature;

## 1.4.2 (2021-08-06):

- [fix]: build-in plugins exports;
- [fix]: build-in plugins types;
- [fix]: types from declaration files works as intended.

## 1.4.0 (2021-08-06):

- [feature]: new build-in `a11y` plugin ❤️ [@omgovich](https://github.com/omgovich).

## 1.3.2 (2021-08-03):

- [fix]: `.saturation` and `.lightness` properties precision degree now has fixed value.

## 1.3.1 (2021-08-02)

- [improvement]: Providing CommonJS build;

## 1.3.0 (2021-07-28)

- [feature]: build-in `Monochromatic` plugin that provides functionatity to generate [monochromatic color](https://en.wikipedia.org/wiki/Monochromatic_color) palletes (tints, shades, tones);
- [feature]: `.saturation` getter for more precise value of HSL color model saturation;
- [feature]: `.lightness` getter for more precise value of HSL color model lightness;

## 1.2.0 (2021-07-23)

- [feature]: *Harmonies* plugin implementation;

## 1.1.0 (2021-07-22)

- [feature]: **Plugin API** implementation;

## 1.0.0 (2021-07-19)

- Initial release. Basic API.