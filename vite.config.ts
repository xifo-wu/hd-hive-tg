import { defineConfig } from "vite";
import { cdn } from 'vite-plugin-cdn2';
import swc from "rollup-plugin-swc3";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    swc({
      include: /\.[mc]?[jt]sx?$/,
      exclude: /node_modules/,
      tsconfig: "tsconfig.json",
      jsc: {},
    }),
    cdn({ modules: ['react'] })
  ],
});
