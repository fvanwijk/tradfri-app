const tradfri = require('../tradfri');
const moods = {};

module.exports = {
  register(sock) {
    let sockConnection;
    sock.on('connection', conn => sockConnection = conn);

    tradfri
      .on('scene updated', async (groupId, { client, ...mood }) => {
        sockConnection && sockConnection.write(JSON.stringify({
          type: 'mood',
          id: mood.instanceId,
          payload: mood
        }));
        moods[mood.instanceId] = mood;
        //console.log(`Mood updated: ${mood.instanceId})`);
      })
      .on('scene removed', (groupId, id) => {
        //console.log(`Mood removed: ${id})`);
        delete moods[id];
      })
      .on('error', ({ message }) => {
        console.log('mood error', message);
      })
      .observeGroupsAndScenes();
  },
  getAll(req, res) {
    res.json({
      items: Object.values(moods).map(({ client, ...mood }) => mood),
      status: 'ok'
    });
  },
}
