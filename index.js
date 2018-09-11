var Promise = require('bluebird'),
	JsBarcode = require('jsbarcode'),
	Canvas = require("canvas"),
	path = require('path'),
	fs = Promise.promisifyAll(require("fs"));

var canvas = new Canvas();

function useJsBarcode(value, type) {
	return new Promise(function(resolve, reject) {
		try {
			JsBarcode(canvas, value, {
				format: type
			});
			canvas.toBuffer((err, buf) => {
				if (err) reject(err); // encoding failed
				resolve(buf);
			});
		} catch (err) {
			reject(err);
		}
	});
}


var methods = {
	/**
	 * Creates a buffer by accepting barcode type
	 * @param valueToGenrate
	 * @param barcodeType
	 * @returns {Promise}
	 */
	getBuffer: function(valueToGenrate, barcodeType) {
		return new Promise(function(resolve, reject) {
			useJsBarcode().then(function(buffer) {
				resolve(buffer);
			}).catch(function(err) {
				console.log('err: ' + err);
				reject(err);
			});
		});
	},
	/**
	 * Creates a image file in respective directory and folder name
	 * @param valueToGenrate
	 * @param barcodeType
	 * @param directory
	 * @param folderName
	 * @param fileName
	 * @returns {Promise}
	 */
	getFile: function(valueToGenrate, barcodeType, directory, folderName, fileName) {
		return new Promise(function(resolve, reject) {
			var outfile = path.join(directory, folderName, fileName);
			useJsBarcode(valueToGenrate, barcodeType).then(function(buffer) {
				fs.writeFileAsync(outfile, buffer).then(function(result) {
					resolve('created')
				}).catch(function(err) {
					console.log('err: ' + err);
					reject(err);
				});
			}).catch(function(err) {
				console.log('err: ' + err);
				reject(err);
			});
		});
	}
};

module.exports = methods;

methods.getFile('13234234', 'CODE39', __dirname, 'output', 'barcode.png').then(function(result) {
	console.dir(result);
}).catch(function(err) {
	console.log('err: ' + err);
});

methods.getBuffer('13234234', 'CODE39').then(function(result) {
	console.dir(result);
}).catch(function(err) {
	console.log('err: ' + err);
});