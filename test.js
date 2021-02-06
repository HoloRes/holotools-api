const HoloApiClient = require('./dist/index');

const client = new HoloApiClient();

client.videos.getLive().then(console.log);
