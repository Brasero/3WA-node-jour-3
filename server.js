import {createServer} from 'node:http'
import {readFileSync, readFile, createReadStream} from 'node:fs'
import {json} from "node:stream/consumers"
import querystring from 'node:querystring'
import pug from 'pug'

const students = [
    { name : "Sonia"},
    { name : "Antoine"}
];

const server = createServer(async (req, res) => {
    //Répond à la demande de favicon (icon de l'onglet de page)
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {
            "Content-type": "image/x-icon"
        });
        res.end()
        return
    }

    if(req.method === 'GET' && req.url === '/bootstrap') {
        const css = readFileSync('./assets/css/bootstrap.min.css', 'utf8')
        res.writeHead(200, {'Content-type': 'text/css'})
        res.end(css)
        return
    }

    if(req.url === '/') {
        if(req.method === 'GET') {
            const home = readFileSync("./view/home.html", 'utf8')
            res.writeHead(200, {
                'Content-type': 'text/html'
            })
            res.end(home)
            return
        } else if(req.method === 'POST') {
            let data = ''
            req.on('data', chunk => {
                data += chunk
            })
            req.on("end", () => {
                console.log(data)
                // const dataArray = data.split('&')
                // const dataObj = {}
                // dataArray.forEach((part) => {
                //     const [key, value] = part.split('=')
                //     dataObj[key] = value
                // })
                // console.log(dataObj)

                //Ce qui est fait au dessus 'a la main' et facilité par l'utilisation de querystring.parse()

                const dataObj = querystring.parse(data)
                console.log(dataObj.name)
                if(dataObj.name?.trim() === '') {
                    console.log('aucune donnée reçue.')
                    res.end()
                    return
                }

                students.push({...dataObj})

                res.writeHead(301, {
                    'Location': '/'
                })
                res.end()
            })
        }
    } else if(req.url === "/users") {
        res.writeHead(200, {'Content-type': 'text/html'})

        let html = "<ul>"

        students.map((student)=> html += `<li>${student.name}</li>`)
        html += '</ul>'

        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>Les etudiants</title>
                </head>
                <body>
                    <h1>Liste des étudiants</h1>
                    ${html}
                    <a href="/">Home</a>
                </body>
            </html>
        `)

    }  else if(req.url === '/pug') {
        const template = `
if age >= 18
    h1 Access Granted
else
    h1 Permission denied
        `
        // const compileTemplate = pug.compile(template);
        // const html = compileTemplate({age: 17})

        pug.render(template, { age: 17 }, (err, html) => {
            if (err) throw err;
            res.writeHead(200, {'Content-type': 'text/html'})
            res.end(html)
        })

    } else if(req.url === '/pugFile') {
        pug.renderFile('./view/page.pug', {name: 'Pierre'}, (err, html) => {
            if(err) throw err;
            res.writeHead(200, {'Content-type': 'text/html'})
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