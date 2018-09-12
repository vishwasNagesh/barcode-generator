var expect = require('chai').expect,
	chai = require('chai'),
	assertArrays = require('chai-arrays'),
	barcode = require('../index.js');

chai.use(assertArrays);

describe('get barcode', function() {
	it('it should return buffer', function() {
		barcode.getBuffer('1234234gfgd', 'CODE39').then(function(result) {
			console.dir(result);
			expect(result).to.be.array();
		}).catch(function(err) {
			console.log('err ' + err);
		});
	});
})