const http = require('http')
const fs = require('fs')
const path = require('path')

let fullway
let way = path.resolve(__dirname)
way = way.substr(0, way.indexOf('arendatika') +11)

const header = fs.readFileSync(`${way}/src/Client/components/header.php`).toString()
const footer = fs.readFileSync(`${way}/src/Client/components/footer.php`).toString()

http.createServer( (req, resp) => {
    let url = req.url.substr(1)
    if ( /^(dist|images|public)/.test(url) ) url = 'web/' + url 
    if ( fullway && url.includes(fullway) ) url = url.replace(fullway, 'web/dist')
    
    let _way = way + url

    console.log('way - ', _way)
    console.log('fullway - ', fullway)
    console.log('url - ', url)
    console.log()


    if ( url.includes('.html') ) {
        _way = way + 'src/Client/html_templates/' + url
        
        fullway = path.dirname(url)
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/html' } )
            data = transformInclude(data.toString())

            resp.write(data)
            resp.end()
        })
    } 
    else if ( url.includes('.map') ) {
        
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'application/json' } )
            resp.write(data)
            resp.end()
        })
    }
    else if ( url.includes('.css') ) {

        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/css' } )
            resp.write(data)
            resp.end()
        })
    }
    else if ( url.includes('.js') ) {

        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'text/javascript' } )
            resp.write(data)
            resp.end()
        })
    }
    else if ( /\.jp(e)?g/.test(url) ) {
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'image/jpeg' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( /\.png/.test(url) ) {
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'image/png' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( /\.ico/.test(url) ) {
        fs.readFile(`${way}web/images/favicons/favicon.ico`, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'image/x-icon' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( /(\.woff|\.woff2)/.test(url) ) {
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'pplication/font-woff' } )
            resp.write(data)
            resp.end()
        })
    } else {
        _way = way + 'src/Client/html_templates/' + url
        let data = fs.readdirSync(_way)

        resp.write(`<style>a{padding: 10px;color: #20576d;}</style>`)
        
        url = url.replace(/\w+?\//,'')
        
        data.filter( name => /\.html/.test(name) || !/\./.test(name) )
        .forEach( name => 
            resp.write(`<a href="${url}/${name}">${name}</a>`)
        )
        resp.end()
    }

}).listen(2000)

console.log('Сервер запущен на localhost:2000')

function transformInclude(html) {

    html = html.replace(
        /<\?php include\(.+header.+\); \?>/g,
        header
    )

    html = html.replace(
        /<\?php include\(.+footer.+\); \?>/g,
        footer
    )

    return html
}
