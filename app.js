import {createServer} from 'node:http'
import {text, json} from 'node:stream/consumers'


const server = createServer(async (req, res) => {

    const url = req.url.replace('/', '')

    const {method} = req

    if(method === 'GET') {

        if (url === 'favicon.ico') {
            res.writeHead(200, {
                "Content-type": 'image/ico'
            })
            res.end()
            return
        }

        const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
        console.log(parsedUrl)

        const name = parsedUrl.searchParams.get('name')
        console.log(`name : ${name}`)


        let {pathname} = parsedUrl
        pathname = pathname.substring(1)

        const pathPart = pathname.split('/')
        console.log(pathPart)

        if (pathPart.length === 1 && pathPart[0] === 'hello') {
            res.writeHead(200, {
                "Content-type": 'text/html'
            })
            res.write(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Mon serveur</title>
            </head>
            <body>
             <h1>Bienvenue sur mon serveur ${name}</h1>
            </body>
        </html>
    `)
        } else {
            res.writeHead(404)
        }
        res.end()
    } else if(method === 'POST') {
        const data = await json(req)
        console.log(data)
        res.end()
    }
})

server.listen('8888')