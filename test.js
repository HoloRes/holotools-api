const HoloApiClient = require('./dist/index');

const client = new HoloApiClient();

client.videos.getLivestreams().then(console.log);
