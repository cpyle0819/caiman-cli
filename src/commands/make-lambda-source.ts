import {mkdir, writeFile} from "fs/promises";

const mkPackage = async (path: string) => {
  const pkgJson = {
    name: path,
    version: "1.0.0",
    scripts: {
      build: "rollup -c",
    },
    license: "ISC",
    type: "module",
    devDependencies: {
      "@rollup/plugin-commonjs": "^25.0.4",
      "@rollup/plugin-node-resolve": "^15.2.1",
      rollup: "^3.28.1",
    },
  };

  await writeFile(`${path}/package.json`, JSON.stringify(pkgJson, null, 2));
};

const mkRollupConfig = async (path: string) => {
  const rollupConfig = `import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    /**
     * The Lambda NodeJS runtime requires .mjs extensions to use ESM.
     */
    file: "dist/index.mjs",
    compact: true,
    format: "es",
  },

  plugins: [
    /**
     * By default Rollup will not bundle node_modules. This plugin allows that.
     */
    nodeResolve({ preferBuiltins: true }),
    /**
     * Allows CJS files to be included in bundle.
     */
    commonjs(),
  ],
  external: [
    /**
     * Don't bundle the @aws-sdk. It's included in the Lambda NodeJS runtime.
     */
    /@aws-sdk/,
  ],
};
`;

  await writeFile(`${path}/rollup.config.js`, rollupConfig);
};

const mkLambda = async (path: string) => {
  await mkdir(`${path}/src`);
  const lambda = "export const handler = async () => {}";
  await writeFile(`${path}/src/index.js`, lambda);
};

export async function makeLambdaSource(lambdaName: string) {
  const path = `lambda-${lambdaName}`;

  await mkdir(path);
  await mkPackage(path);
  await mkRollupConfig(path);
  await mkLambda(path);
}
