const chai = require('chai');

chai.use(require('chai-as-promised'));

chai.should();

const HoloApiClient = require('../dist');

const client = new HoloApiClient();

describe('Videos', () => {
	describe('#getLivestreams()', () => {
		it('should work', () => client.videos.getLivestreams().should.eventually.be.fulfilled);
	});
	describe('#get()', () => {
		it('should work', () => client.videos.get().should.eventually.be.fulfilled);
	});
	describe('#getById()', () => {
		it('should work', () => client.videos.getById(12853).should.eventually.be.fulfilled);
	});
	describe('#getByYoutubeId()', () => {
		it('should work', () => client.videos.getByYoutubeId('vQHVGXdcqEQ').should.eventually.be.fulfilled);
	});
	/* Doesn't seem to be in the DB yet
	describe('#getByBilibiliId()', () => {
		it('should be correct', () => {
			client.videos.getByBilibiliId('BV1FE411c7co').should.eventually.equal(NextColorPlanetData)
		});
	});
	*/
});

describe('Channels', () => {
	describe('#get()', () => {
		it('should work', () => client.channels.get().should.eventually.be.fulfilled);
	});
	describe('#getById()', () => {
		it('should work', () => client.channels.getById(46).should.eventually.be.fulfilled);
	});
	describe('#getYoutubeById()', () => {
		it('should work', () => client.channels.getByYouTubeId('UC5CwaMl1eIgY8h02uZw7u8A').should.eventually.be.fulfilled);
	});
	/* Doesn't seem to be in the DB yet
	describe('#getByBilibiliId()', () => {
		it('should work', () => {
			return client.channels.getByBilibiliId('9034870').should.eventually.be.fulfilled;
		});
	});
	*/
});

describe('Comments', () => {
	describe('#search()', () => {
		it('should work', () => client.comments.search('hololive').should.eventually.be.fulfilled);
	});
});
