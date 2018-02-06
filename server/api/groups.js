const tradfri = require('../tradfri');
const groups = {};

tradfri
  .on('group updated', async group => {
    groups[group.instanceId] = group;
    //console.log(`Added group ${group.name} (${group.instanceId})`);
  })
  .on('group removed', (id) => {
    console.log(`Group removed: ${id})`);
    delete groups[id];
  })
  .on('error', e => {
    console.log('group error', e);
  })
  .observeGroupsAndScenes();

module.exports = {
  getAll(req, res) {
    res.json({
      items: Object.values(groups).map(({ client, ...group }) => group),
      status: 'ok'
    });
  }
};
