require('dotenv').config();
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server Listening On Port ${port}...at ` + new Date(Date.now()));
})

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});
module.exports = server;