import { fileURLToPath } from 'node:url'
import globby from 'globby';
import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const minify = process.env.MINIFY || false;

// Use `terser` default options.
const terserOptions = {
  compress: {},
  format: {},
  nameCache: {}
};

const jsFolder = path.resolve(fileURLToPath(new URL('../node_modules/cs-commonkit/src/js', import.meta.url)));
// Some libraries are imported by other libraries so make them external and
// globals to avoid duplicated imports.
const GLOBALS = {};
// CK libraries are detected using full path, not just library name.
GLOBALS[`${jsFolder}/util`] = 'window.CommonKit.Util';
// Collapse is imported by accordion and reveal.
GLOBALS[`${jsFolder}/collapse`] = 'window.CommonKit.Collapse';
// Dropdown is imported by dropper.
GLOBALS[`${jsFolder}/dropdown`] = 'window.CommonKit.Dropdown';
// Dropper is imported by tab.
GLOBALS[`${jsFolder}/dropper`] = 'window.CommonKit.Dropper';
// Popperjs is imported by dropdown and tippyjs.
GLOBALS['@popperjs/core'] = 'window.CommonKit.Popper';

const COMMON = {
  output: {
    format: 'umd',
    // sourcemap: true
    sourcemap: false,
    globals: GLOBALS
  },
  // Make these packages be external and not compiled on each bundle.
  // These will be used on "window.CommonKit" global variables instead.
  external: [
    './util',
    './collapse',
    './dropdown',
    './dropper',
    '@popperjs/core'
  ],
  plugins: [
    // Set the NODE_ENV var required by some plugins.
    replace({
      // This is suggested by the plugin as next major version will default
      // this to `true`. Right now it defaults to `false`.
      // TODO: remove once we go to next major version.
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    json(),
    resolve({
      // Avoid import multiple times same packages.
      dedupe: ['video.js']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      // Only transpile our source code.
      // exclude: ['node_modules/**'],
      // Can not completely exlucde `node_modules` because it is required
      // to also transpile `cs-commonkit` package code.
      include: [
        'node_modules/cs-commonkit/**',
        'src/**'
      ],
      // This requires `@babel/plugin-external-helpers` plugin on config.
      // babelHelpers: 'external'
      // Bundled options seems to be pretty safe and is just adding a small
      // amount of code for the helpers. Lets try with this and change to
      // external if the helpers extra code gets bigger.
      babelHelpers: 'bundled'
    }),
    minify && terser(terserOptions)
  ],
  context: 'window'
};

// Get folders to compile based on SRC env variable. Defaults to `src`.
const src = process.env.SRC || 'src';
const folders = [
  path.resolve(fileURLToPath(new URL(`../${src}`, import.meta.url)))
];

// Do not compile anything within a "src" folder within components.
// TODO: can we compile everything with either webpack or rollup?
const ignore = [
  path.resolve(fileURLToPath(new URL(`../${src}/**/app`, import.meta.url))),
  path.resolve(fileURLToPath(new URL(`../${src}/**/src`, import.meta.url)))
];

// Generate standalone modules.
const BUNDLES = globby
  .sync(folders, { ignore: ignore })
  .filter((inputFile) => {
    let filename = path.basename(inputFile, '.js');

    // Do not process partial files. Is there a better way to flag this?
    if (filename.charAt(0) === '_') {
      return false;
    }

    // Do not process destination files ({filename}.dist.js).
    filename = path.extname(filename);
    return filename.length === 0;
  })
  .map((inputFile) => {
    const dirname = path.dirname(inputFile);
    const filename = path.basename(inputFile, '.js');
    const dest = path.resolve(dirname, `${filename}.dist.js`);

    return {
      ...COMMON,
      input: inputFile,
      output: {
        ...COMMON.output,
        file: minify ? dest.replace(/.js$/, '.min.js') : dest
      }
    };
  });

export default BUNDLES;
