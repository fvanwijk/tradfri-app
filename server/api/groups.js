const tradfri = require('../tradfri');
const groups = {};

tradfri
  .on('group updated', async group => {
    console.log(`Group update: ${group.name} (${group.instanceId})`);
    groups[group.instanceId] = group;
  })
  .on('group removed', (id) => {
    console.log(`Group removed: ${id})`);
    delete groups[id];
  })
  .on('error', ({ message }) => {
    console.log('group error', message);
  })
  .observeGroupsAndScenes();

module.exports = {
  getAll(req, res) {
    res.json({
      items: Object.values(groups).map(({ client, ...group }) => group),
      status: 'ok'
    });
  },
  async control(req, res) {
    try {
      const group = groups[+req.params.id];
      if (group) {
        const success = await tradfri.operateGroup(group, req.body);
        res.json((({ client, ...rest }) => rest)(group));
      } else {
        res.status(404).send();
      }
    } catch ({ message }) {
      res.json({ status: 'error', error: message });
    }
  },
  async update(req, res) {
    try {
      const group = groups[+req.params.id];
      if (group) {
        const newGroup = group.clone().merge(req.body);
        const success = await tradfri.updateGroup(newGroup);
        res.json((({ client, ...rest }) => rest)(newGroup));
      } else {
        res.status(404).send();
      }
    } catch ({ message }) {
      res.json({ status: 'error', error: message });
    }
  },
};
