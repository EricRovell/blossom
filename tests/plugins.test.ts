import { blossom } from "@/blossom";
import { extend } from "@/extend";
import { pluginHarmonies } from "@plugins/harmonies";
import { pluginMonochromatic } from "@plugins/monochromatic";

describe("Harmony colors plugin", () => {
  extend([ pluginHarmonies ]);

  const color = blossom("#FF0000");

  it("Generates analogous colors", () => {
    expect(color.harmonies("analogous").map(value => value.hex)).toEqual([
      "#FF0080", "#FF0000", "#FF8000"
    ]);
  });
  it("Generates complimentary colors", () => {
    expect(color.harmonies("complimentary").map(value => value.hex)).toEqual([
      "#FF0000", "#00FFFF"
    ]);
  });
  it("Generates rectangle colors", () => {
    expect(color.harmonies("rectangle").map(value => value.hex)).toEqual([
      "#FF0000", "#FFFF00", "#00FFFF", "#0000FF"
    ]);
  });
  it("Generates tetradic colors", () => {
    expect(color.harmonies("tetradic").map(value => value.hex)).toEqual([
      "#FF0000", "#80FF00", "#00FFFF", "#8000FF"
    ]);
  });
  it("Generates triadic colors", () => {
    expect(color.harmonies("triadic").map(value => value.hex)).toEqual([
      "#FF0000", "#00FF00", "#0000FF"
    ]);
  });
  it("Generates splitcomplimentary colors", () => {
    expect(color.harmonies("splitcomplimentary").map(value => value.hex)).toEqual([
      "#FF0000", "#00FF80", "#0080FF"
    ]);
  });
});

describe("Monochromatic colors plugin", () => {
  extend([ pluginMonochromatic ]);

  it("Generates tints", () => {
    expect(blossom("#ff0000").tints(10).map(color => color.hex)).toEqual([
      "#FF0000",
      "#FF1A1A",
      "#FF3333",
      "#FF4D4D",
      "#FF6666",
      "#FF8080",
      "#FF9999",
      "#FFB3B3",
      "#FFCCCC",
      "#FFE5E5",
      "#FFFFFF"
    ]);
  });
  it("Generates shades", () => {
    expect(blossom("#ff0000").shades(10).map(color => color.hex)).toEqual([
      "#FF0000",
      "#E60000",
      "#CC0000",
      "#B30000",
      "#990000",
      "#800000",
      "#660000",
      "#4D0000",
      "#330000",
      "#190000",
      "#000000"
    ]);
  });
  it("Generates tones", () => {
    expect(blossom("#FF0000").tones(10).map(color => color.hex)).toEqual([
      "#FF0000",
      "#F20D0D",
      "#E61919",
      "#D92626",
      "#CC3333",
      "#BF4040",
      "#B34D4D",
      "#A65959",
      "#996666",
      "#8C7373",
      "#808080"
    ]);
  });
  it("Won't generate tints for pure white color", () => {
    expect(blossom("#FFF").tints().map(color => color.hex)).toEqual([]);
  });
  it("Won't generate shades for pure black color", () => {
    expect(blossom("#000").shades().map(color => color.hex)).toEqual([]);
  });
  it("Won't generate tones for pure gray color", () => {
    expect(blossom("#808080").tones().map(color => color.hex)).toEqual([]);
  });
  it("Won't generate enought tints for color too close to pure white", () => {
    expect(blossom("#FAFAFA").tints(10).map(color => color.hex)).toEqual([
      "#FAFAFA", "#FDFDFD", "#FFFFFF"
    ]);
  });
  it("Won't generate enought shades for color too close to pure black", () => {
    expect(blossom("#050505").shades(10).map(color => color.hex)).toEqual([
      "#050505", "#020202", "#000000"
    ]);
  });
  it("Won't generate enought tones for color too close to pure gray", () => {
    expect(blossom("#827D7D").tones(10).map(color => color.hex)).toEqual([
      "#827D7D", "#817E7E", "#808080"
    ]);
  });
});