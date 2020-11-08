import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss-modules';

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true,
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        }
    },
    external: ['react', 'react-dom'],
    plugins: [
        postcss({
            modules: true,
            extract: true,
            writeDefinitions: true,
        }),
        typescript(),
    ]
};