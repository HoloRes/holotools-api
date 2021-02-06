const HoloapiClient = require('./src/index');

const client = new HoloapiClient();

client.videos.getLive().then(console.log);
