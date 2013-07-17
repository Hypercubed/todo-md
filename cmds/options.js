module.exports = function (program) {

	program
		.option('-N, --no-line-numbers', 'Disable line numbers')
		.option('-i, --input [file]')
		.option('-o, --output [file]')
		.option('-g, --global')
		;

	//program.on('global', function() {
	//	console.log("global");
	//});
	
};