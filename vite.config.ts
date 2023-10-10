import { defineConfig, loadEnv } from 'vite';
import { cdn } from 'vite-plugin-cdn2';
import swc from 'rollup-plugin-swc3';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  if (mode === 'development') {
    return {
      server: {
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: env.VITE_API_BASE_URL,
            changeOrigin: true,
          }
        },
      },
      plugins: [
        swc({
          include: /\.[mc]?[jt]sx?$/,
          exclude: /node_modules/,
          tsconfig: 'tsconfig.json',
          jsc: {},
        }),
      ],
    };
  }

  return {
    plugins: [
      swc({
        include: /\.[mc]?[jt]sx?$/,
        exclude: /node_modules/,
        tsconfig: 'tsconfig.json',
        jsc: {},
      }),
      cdn({
        url: 'https://cdn.bootcdn.net/ajax/libs/',
        modules: [{ name: 'react', relativeModule: 'umd/react.production.min.js' }],
        apply: command,
        resolve(baseURL, { name, version, relativeModule }) {
          return new URL(`${name}/${version}/${relativeModule}`, baseURL).href;
        },
      }),
    ],
  };
});
