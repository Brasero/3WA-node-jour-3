import http from 'node:http'

http.get('http://localhost:8888/', (res) => {
    let response = '';
    res.on('data', (data) => {
        response += data
    })
    res.on('end', () => {
        console.log(response)
    })
})