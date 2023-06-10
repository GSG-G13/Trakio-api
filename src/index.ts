import server from './app';
import PORT from './config';

server.listen(PORT, () => {
  console.log(`App started work successfully on http://localhost:${PORT}`);
  
});
