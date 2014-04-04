module.exports = function (program) {

  program
    .option('-N, --no-line-numbers', 'Disable line numbers')
    .option('-i, --input [file]')
    .option('-o, --output [file]')
    .option('-C, --no-color', 'Disable line numbers')
    .option('-S, --no-stats', 'Disable stats')
    .option('-q, --quiet', 'Quiet mode')
    ;

};
