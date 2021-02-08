const chai = require('chai');

chai.use(require('chai-as-promised'));
chai.should();

const HoloApiClient = require('../dist');

const client = new HoloApiClient();

describe('Videos', function () {
	describe("#get()", function () {
		it('should ', () => {
			client.videos.getLivestreams().should.eventually.have.keys('live', 'upcoming', 'ended', 'cached');
		});
	});
});
