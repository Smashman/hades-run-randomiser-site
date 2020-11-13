import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import imageInliner from 'postcss-image-inliner';

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
            plugins: [
                imageInliner({
                    assetPaths: ['src/img/**'],
                    maxFileSize: 50 * 1024,
                    strict: true,
                })
            ]
        }),
        commonjs(),
        typescript(),
        nodeResolve(),
        image({
            include: 'src/img/**',
        })
    ]
};