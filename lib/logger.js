const chalk  = require( 'chalk' )
const format = require( 'util' ).format

/**
 * Prefix.
 */

const prefix = '   Z3'
const sep    = chalk.gray( '·' )

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function ( ...args ) {
    if ( args[0] instanceof Error ) args[0] = args[0].message.trim()
    const msg = format.apply( format, args )
    console.error( chalk.red( prefix ), sep, msg )
    process.exit( 1 )
}