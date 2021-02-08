import chai from 'chai';

chai.use(require('chai-as-promised'));
chai.should();

const HoloApiClient = require('../src');

const client = new HoloApiClient();

const NextColorPlanetData = {
	id: 12853,
	yt_video_key: 'vQHVGXdcqEQ',
	bb_video_id: null,
	title: 'NEXT COLOR PLANET / 星街すいせい',
	thumbnail: null,
	published_at: '2020-03-22T11:00:12.000Z',
	status: 'past',
	live_schedule: '2020-03-22T11:00:00.000Z',
	live_start: '2020-03-22T11:00:12.000Z',
	live_end: '2020-03-22T11:06:26.000Z',
	is_uploaded: false,
	duration_secs: 374,
	is_captioned: true,
	channel: {
		id: 46,
		yt_channel_id: 'UC5CwaMl1eIgY8h02uZw7u8A',
		bb_space_id: null,
		name: 'Suisei Channel',
		description: 'アイドルVtuberの星街すいせいです！\n歌とお絵かきとアニメが大好きな１８歳です☄☄\n\n目指すはバーチャルライブ！！\nぜったい叶えるから応援よろしくね✯\n\n▼配信情報etcはTwitterにてチェック！▼\nhttps://twitter.com/suisei_hosimati',
		photo: 'https://yt3.ggpht.com/ytc/AAUvwnjdAl5rn3IjWzl55_0-skvKced7znPZRuPC5xLB=s800-c-k-c0x00ffffff-no-rj',
		published_at: '2018-03-18T08:32:39.000Z',
		twitter_link: 'suisei_hosimati',
		view_count: 57243734,
		subscriber_count: 748000,
		video_count: 239,
	},
};

describe('Videos', () => {
	describe('#getLivestreams()', () => {
		it('should have all the keys and not error', () => {
			client.videos.getLivestreams().should.eventually.have.keys('live', 'upcoming', 'ended', 'cached');
		});
	});
	describe('#get()', () => {
		it('should have all the keys and not error', () => {
			client.videos.get().should.eventually.have.keys('videos', 'count', 'cached');
		});
	});
	describe('#getById()', () => {
		it('should be correct', () => {
			client.videos.getById(12853).should.eventually.equal(NextColorPlanetData)
		});
	});
	describe('#getByYoutubeId()', () => {
		it('should be correct', () => {
			client.videos.getByYoutubeId('vQHVGXdcqEQ').should.eventually.equal(NextColorPlanetData)
		});
	});
	/* Doesn't seem to be in the DB yet
	describe('#getByBilibiliId()', () => {
		it('should be correct', () => {
			client.videos.getByBilibiliId('BV1FE411c7co').should.eventually.equal(NextColorPlanetData)
		});
	});
	*/
});
