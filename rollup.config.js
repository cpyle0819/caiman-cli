export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    banner: "#!/usr/bin/env node",
    compact: true,
    format: "cjs",
  },
};
