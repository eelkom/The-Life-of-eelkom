import { defineConfig } from "vite";
import { sync } from "glob";
import path from "path";

const htmlFiles = sync("./src/**/*.html");

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles.reduce((entries, file) => {
        const name = path.parse(file).name;
        entries[name] = file;
        return entries;
      }, {}),
    },
  },
});
