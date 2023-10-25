import {createServer} from 'node:http'
import {readFileSync} from 'node:fs'
import {shuffle} from './src/utils.js'


const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

const server = createServer(async (req, res) => {

    if (req.url === '/favicon.ico') {
        res.writeHead(200, {
            "Content-type": "image/x-icon"
        });
        res.end()
        return
    }

    if(req.url === '/') {
        let html = readFileSync('__header.html', 'utf8')
        html += '<ul>'
        users.forEach((user) => {
            html += `<li>${user}</li>`
        })
        html += '</ul><a href="/shuffle">Shuffle</a>'
        html += readFileSync('__footer.html', 'utf8')
        res.end(html)
    } else if(req.url === '/shuffle') {
        let html = readFileSync('__header.html', 'utf8')
        const htmlBody = shuffle(users)
        html += htmlBody
        html += readFileSync('__footer.html', 'utf8')
        res.end(html)
    } else {
        res.writeHead(404)
        res.end()
    }

})

server.listen('8888')