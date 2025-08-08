const http = require('http');
const app = require('./scr/app');
require('dotenv').config();

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})