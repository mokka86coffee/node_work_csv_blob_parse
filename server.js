const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer( (req, resp) => {
    let url = req.url.substr(1)
    if ( /^dist/.test(url) ) url = 'web/' + url 

    let way = path.resolve(__dirname)
    way = way.substr(0, way.indexOf('/src')) + '/' + url

    console.log('url - ', url)
    console.log('way - ', way)
    console.log()
    
    if ( url.includes('.html') ) {
        fs.readFile(url, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/html' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( url.includes('.map') ) {
        fs.readFile(way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'application/json' } )
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
    else if ( /\.ico/.test(url) ) {
        fs.readFile('/home/evgen/Desktop/arendatika/web/images/favicons/favicon.ico', (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'image/x-icon' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( url.includes('.js') ) {
        fs.readFile(way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/javascript' } )
            resp.write(data)
            resp.end()
        })
    }
    else if ( /(\.woff|\.woff2)/.test(url) ) {
        fs.readFile(way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'pplication/font-woff' } )
            resp.write(data)
            resp.end()
        })
    } else {
        resp.end()
    }

}).listen(2000)
