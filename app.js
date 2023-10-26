import {createServer} from 'node:http'
import {readFileSync, readFile, createReadStream} from 'node:fs'
import {json} from "node:stream/consumers"

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

        const readStream = createReadStream('./src/Data/all.json', {encoding: 'utf8'})

        json(readStream).then((studObj) => {
            res.writeHead(200, {
                "Content-type": "text/html"
            })
            html += JSON.stringify(studObj.students)
            html += readFileSync('__footer.html', 'utf8')
            res.end(html)
        })


    } else if(req.url.match(/^\/search\//)) {
        // /search/alan
        const arg = req.url.substring(1).split('/')[1]

        let html = readFileSync('__header.html', 'utf8')

        readFile(`./src/Data/${arg}.json`, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    "Content-type": "text/html"
                })
                res.end(readFileSync('404.html', 'utf8'))
                return
            }

            html += data
            html += readFileSync('__footer.html', 'utf8')
            res.end(html)
        })



    } else {
        res.writeHead(404, {
            "Content-type": 'text/html'
        })
        res.end(readFileSync('404.html', 'utf8'))
    }
})

server.listen('8888', ()=> {
    console.log(`Server running at port 8888`)
})