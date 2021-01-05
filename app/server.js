const next = require('next');

const initExpresss = require('./backend/express-server');
const createServer = require('./backend/create-server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressServer = initExpresss();

  // catch all other routes and return the index file
  expressServer.get('*', async (req, res) => handle(req, res));

  createServer(expressServer);
});
