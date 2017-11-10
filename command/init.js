/**
 * @file
 * @author
 */

/* global module, __dirname */

'use strict';

let process = require( 'process' );
let path    = require( 'path' );

let co     = require( 'co' );
let prompt = require( 'co-prompt' );
let chalk  = require( 'chalk' );

let download = require( '../lib/download' );
let build    = require( '../lib/build' );
let logger   = require( '../lib/logger' );
let pkg      = require( '../package.json' );

module.exports = function ( templateName ) {
    return download( pkg.z3conf.template, function ( scaffold, tempPath ) {
        deliver( scaffold, {
            tempPath    : tempPath,
            templateName: templateName
        } );
    } );
};

function deliver( scaffold, options ) {

    let {tempPath, templateName} = options;

    let cwd      = process.cwd();
    let fromPath = path.join( tempPath, 'templates', templateName );

    let files = scaffold.util.find( fromPath );

    if ( files.length === 0 ) {
        return logger.fatal( 'Failed to download repo [ ' + templateName + ' ]' );
    }

    co( function* () {
        let namespace = yield prompt( '? Project Name: ' );
        process.stdin.pause();

        files.forEach( val => {
            val = val.replace( fromPath, '' ).replace( /^\\/g, '' );
            console.log( chalk.yellow( '  Installing ' ) + val );
        } );

        scaffold.util.move(
            fromPath,
            cwd
        );

        build( namespace, cwd );
    } );
}