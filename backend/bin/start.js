const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('../src/app');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
