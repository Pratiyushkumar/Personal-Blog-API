import config from './src/config/config.ts';
import createServer from './server.ts';

const port = config.port;
const server = createServer();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
