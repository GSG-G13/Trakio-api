const server = require('./app');

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`App started work successfully on http://localhost:${PORT}`);
  
});
