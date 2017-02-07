var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/node-jwt-intro',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'mongodb://rikarsen:rikarsen6951600@ds139869.mlab.com:39869/coc-clan-manager',
		port: process.env.PORT || 80
	}
};