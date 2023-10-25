import {createServer} from 'node:http'
import {readFileSync} from 'node:fs'

const server = createServer(async (req, res) => {
    //Répond à la demande de favicon (icon de l'onglet de page)
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {
            "Content-type": "image/x-icon"
        });
        res.end()
        return
    }

    if(req.url === '/') {
        let html = readFileSync('__header.html', 'utf8')

        //Contenu >>

        html += readFileSync('__footer.html', 'utf8')
        res.end(html)

    } else if(req.url === '/shuffle') { // << Todo : Url à modifier
        let html = readFileSync('__header.html', 'utf8')

        //Contenu >>

        html += readFileSync('__footer.html', 'utf8')
        res.end(html)

    } else {
        res.writeHead(404, {
            "Content-type": 'text/html'
        })
        res.end(`
            <h1>Page introuvable</h1>
            <a href="/"><button>Go Home</button></a>
        `)
    }
})

server.listen('8888')