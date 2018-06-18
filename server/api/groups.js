const tradfri = require('../tradfri');
const groups = {};

const marshallGroup = (({ client, ...rest }) => rest);

module.exports = {
  register(sock) {
    let sockConnection;
    sock.on('connection', conn => sockConnection = conn);
    try {
      tradfri
        .on('group updated', async ({ client, ...group }) => {
          group.moodIDs = [];
          sockConnection && sockConnection.write(JSON.stringify({
            type: 'group',
            id: group.instanceId,
            payload: group
          }));
          groups[group.instanceId] = group;
        })
        .on('group removed', (id) => {
          //console.log(`Group removed: ${id})`);
          delete groups[id];
        })
        .on('scene updated', async (groupId, { client, ...mood }) => {
          if (groups[groupId]) {
            groups[groupId].moodIDs.push(mood.instanceId);
          } else {
            console.log(`Got mood update for ${mood.instanceId} but group ${groupId} does not exist yet`);
          }
        })
        .on('scene removed', (groupId, id) => {
          const index = groups[groupId].moodIDs.indexOf(id);
          if (groups[groupId] && index > -1) {
            //console.log(`Mood removed: ${id})`);
            groups[groupId].moodIDs.splice(index, 1);
          } else {
            console.log(`Got mood deletion for ${mood.instanceId} but group ${groupId} does not exist of mood is not part of group`);
          }
        })
        .on('error', ({ message }) => {
          console.log('group error', message);
        })
        .observeGroupsAndScenes();
    } catch (err) {
      console.log('ERROR', err); //???
    }
  },
  get(req, res) {
    const group = groups[+req.params.id];
    if (group) {
      res.json(marshallGroup(group));
    } else {
      res.status(404).send();
    }
  },
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
        res.json(marshallGroup(group));
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
        res.json(marshallGroup(newGroup));
      } else {
        res.status(404).send();
      }
    } catch ({ message }) {
      res.json({ status: 'error', error: message });
    }
  },
};
