import { blossom } from "@/blossom";
import { extend } from "@/extend";
import { pluginHarmonies } from "@plugins/harmonies";

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