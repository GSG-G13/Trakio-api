import { log } from 'console';
import server from './app';
import PORT from './config';

server.listen(PORT, () => {
  log(`App started work successfully on http://localhost:${PORT}`);
});
