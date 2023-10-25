import {createServer} from 'node:http'


const server = createServer(async (req, res) => {

    if (req.url === '/favicon.ico') {
        res.writeHead(200, {
            "Content-type": "image/x-icon"
        });
        res.end()
        return
    }

})

server.listen('8888')