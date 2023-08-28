import typescript from "@rollup/plugin-typescript";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    banner: "#!/usr/bin/env node",
    compact: true,
    format: "es",
  },
  plugins: [typescript(), nodeResolve({preferBuiltins: true}), commonjs()],
};
