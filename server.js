import {createServer} from 'node:http'
import {readFileSync, readFile, createReadStream} from 'node:fs'
import {json} from "node:stream/consumers"
import querystring from 'node:querystring'
import pug from 'pug'

const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: true
};

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
        pug.renderFile('./view/loggedUserTemplate.pug', {loggedUser}, (err, html) => {
            if (err) throw err;
            res.writeHead(200, {
                "Content-type": 'text/html'
            })
            res.end(html)
        })
        return
    }

    res.writeHead(404, {
        "Content-type": 'text/html'
    })
    res.end(readFileSync('404.html', 'utf8'))
})

server.listen('8888', ()=> {
    console.log(`Server running at port 8888`)
})