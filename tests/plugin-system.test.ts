import { blossom, extend } from "@/.";
import type { Plugin } from "@types";

declare module "blossom" {
  interface Blossom {
    hexLength(): number;
  }
}

const testPlugin: Plugin = (BaseClass): void => {
  BaseClass.prototype.hexLength = function(): number {
    return this.hex.length - 1;
  }
}

extend([ testPlugin ]);

it("Extends the functionality of the base class", () => {
  const instance = blossom("#123");
  expect(typeof instance.hexLength).toBe("function");
  // @ts-ignore
  expect(instance.nonexistentMethod).toBeUndefined();
});

it("The method implementation is correct", () => {
  const hex3 = blossom("#123");
  const hex6 = blossom("#123456");
  const hex8 = blossom("rgb(255 0 0 / 0.5)");

  expect(hex3.hexLength()).toBe(6);
  expect(hex6.hexLength()).toBe(6);
  expect(hex8.hexLength()).toBe(8);
});