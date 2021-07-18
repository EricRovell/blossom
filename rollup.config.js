import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

/**
 * Bundle everything into ESM module.
 */
export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [
    typescript({
      declaration: true,
    }),
    terser({
      ecma: 2018,
      module: true,
      toplevel: true,
      compress: { pure_getters: true },
      format: { wrap_func_args: false }
    })
  ]
};