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
			useJsBarcode(valueToGenrate, barcodeType).then(function(buffer) {
				resolve(buffer);
			}).catch(function(err) {
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
					reject(err);
				});
			}).catch(function(err) {
				reject(err);
			});
		});
	}
};

module.exports = methods;

methods.getBuffer('1234234gfgd', 'CODE39').then(function(result) {
	console.dir(result);
}).catch(function(err) {

});