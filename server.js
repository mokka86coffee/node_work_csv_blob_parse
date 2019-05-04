const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer( (req, resp) => {
    const url = req.url.substr(1)
    const way = path.resolve(__dirname).substr(0, way.indexOf('/src')) + url
    console.log(url)
    
    if ( url.includes('.html') ) {
        fs.readFile(url, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/html' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( url.includes('.css') ) {
        fs.readFile(way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/css' } )
            resp.write(data)
            resp.end()
        })
    }
    else if ( /jp(e)g/.test(url) ) {
        fs.readFile(way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'image/jpeg' } )
            resp.write(data)
            resp.end()
        })
    } 

}).listen(2000)
