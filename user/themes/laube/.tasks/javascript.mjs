import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';
import * as esbuild from 'esbuild';

/*
    Bundles every *.js file in assets/js (not in subfolders) as an ES module
    entry point. Dynamic import() calls are split into separate chunks that are
    only loaded when needed.

    --prod   minify, no source maps
    --watch  rebuild on change
*/

const config = {
    src: process.env.npm_package_config_js, // provided by package.json
    dist: process.env.npm_package_config_jsDist, // provided by package.json
};

const prod = process.argv.includes( '--prod' );
const watch = process.argv.includes( '--watch' );

const entryPoints = fs.readdirSync( config.src )
    .filter( file => file.endsWith( '.js' ) )
    .map( file => path.join( config.src, file ) );

// chunk names contain hashes, so remove old builds first
fs.rmSync( config.dist, { recursive: true, force: true } );

console.log( chalk.magenta( prod ? 'Generating Production JavaScript' : 'Generating Development JavaScript' ), '\n' );

const report = {
    name: 'report',
    setup( build )
    {
        build.onEnd( result =>
        {
            if ( result.errors.length ) return;

            const files = Object.keys( result.metafile.outputs ).filter( file => !file.endsWith( '.map' ) );
            const chunks = files.filter( file => file.includes( '/chunks/' ) );
            const size = file => prettyBytes( fs.statSync( file ).size );

            files
                .filter( file => !chunks.includes( file ) )
                .forEach( file => console.log( chalk.whiteBright( path.relative( config.dist, file ) ) + ' ' + chalk.green( size( file ) ) ) );

            console.log( chalk.whiteBright( chunks.length + ' chunks' ) + ' ' + chalk.green( 'created' ) );
        });
    },
};

const ctx = await esbuild.context({
    entryPoints,
    outdir: config.dist,
    bundle: true,
    format: 'esm',
    splitting: true,
    chunkNames: 'chunks/[name]-[hash]',
    target: 'es2022',
    minify: prod,
    sourcemap: !prod,
    legalComments: 'none',
    drop: prod ? [ 'debugger' ] : [],
    metafile: true,
    logLevel: 'warning',
    plugins: [ report ],
});

if ( watch )
{
    await ctx.watch();
    console.log( chalk.cyan( 'watching for changes …' ) );
}
else
{
    await ctx.rebuild();
    await ctx.dispose();
}
