const bodyParser = require('body-parser');
const express = require('express');
const sockjs  = require('sockjs');
const config = require('./config.json');
const init = require('./init');

const app = express();
app.use(bodyParser.json());
const sock = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
init(app, sock);

const port = process.env.PORT || config.port || 3000;
const server = app.listen(port);
sock.installHandlers(server, { prefix: '/updates' });

console.log(`Trådfri service running on port ${port}`);

async function auth() {
  try {
    const { identity, psk } = await tradfri.authenticate('c1GIax27MMYPowO1');
    // store identity and psk
    console.log(identity, psk);
    tradfri.destroy();
  } catch (e) {
    if (e instanceof TradfriError) {
      switch (e.code) {
        case TradfriErrorCodes.ConnectionFailed: {
          // Gateway unreachable or security code wrong
          console.log('Gateway unreachable or security code wrong', e);
          break;
        }
        case TradfriErrorCodes.AuthenticationFailed: {
          // Something went wrong with the authentication.
          // It might be that this library has to be updated to be compatible with a new firmware.
          console.log('Something went wrong with the authentication', e)
        }
      }
    } else {
      console.log('Iets anders ging mis', e)
    }
  }
}
