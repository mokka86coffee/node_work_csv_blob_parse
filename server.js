const http = require('http')
const fs = require('fs')
const path = require('path')

class ResponseTransform {
    constructor(resp, url){
        this.resp = resp
        this.way = path.resolve(__dirname).match(/.+arendatika\//)[0]

        this.urlTransform(url)
    }

    get mimeTypes (){
        return {
            '.html': 'text/html',
            '.js.map': 'application/json',
            '.css.map': 'application/json',
            '.css$': 'text/css',
            '.js$': 'text/javascript',
            '.jp(e)?g': 'image/jpeg',
            '.png': 'image/png',
            '.ico': 'image/x-icon',
            '.woff|.woff2': 'application/font-woff',
            '.svg': 'image/svg+xml',
            '.otf': 'font/opentype'
        }
    }

    urlTransform (url){
        const { localway } = this

        if ( /^(dist|images|public|assets)/.test(url) ) url = 'web/' + url 
        else 
        if ( !url.includes('.html') && url.includes('.') && url.includes(localway) ) {
            url = url.replace(localway, 'web/dist')
        }
        else
        if ( url.includes('favicon.ico') ) url = 'web/images/favicons/favicon.ico'

        this.url = url
    }

    transformInclude(html) {

        const { way } = this

        const header = fs.readFileSync(`${way}/src/Client/components/header.php`).toString()
        const footer = fs.readFileSync(`${way}/src/Client/components/footer.php`).toString()

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

    testReq(){

        const { url, mimeTypes } = this

        const key = Object.keys( mimeTypes )
            .filter( type => RegExp(type.replace(/\./g,'\\.')).test(url) )
            .toString()

        
        if ( key && key !== '.html' ) {
            this.mimeType = mimeTypes[key]
            this.url = url.replace(/\?.+/,'')
        }

        else if ( key === '.html' ) {
            this.mimeType = mimeTypes[key]
            ResponseTransform.prototype.localway = path.dirname(url)
            this.fileType = 'html'
            this.url = 'src/Client/html_templates/' + url 
        } 

        else if ( /[\?\.]/.test(url) ) {
            this.mimeType = 'unknown'
        }
        
        else {
            this.url = 'src/Client/html_templates/' + url
            this.fileType = 'dir'
        }

    }

    writeResp() {
        const { mimeType, fileType } = this
        const way = this.way + this.url
        
        this.resp.writeHead( 200, { 'Content-Type': mimeType ? mimeType : 'text/html' } )

        {
            // console.log('way - ', way)
            // console.log('mimeType - ', mimeType)
            // console.log('url - ', this.url)
            // console.log()
        } //логирование

        const isHTML = fileType === 'html' ? 'utf8' : null

        if ( mimeType && mimeType !== 'unknown') { 
            fs.readFile(way, isHTML, (err, data) => {
                if (err) { 
                    this.resp.end(''); 
                    return
                }

                if ( isHTML ) data = this.transformInclude(data)

                this.resp.write(data)
                this.resp.end()
            })
                    
        } 
        else if ( fileType === 'dir' ) {

                this.resp.write(`<style>a{padding: 10px;color: #20576d;}</style>`)
                
                const url = this.url.replace(/.+\//, '')
        
                fs.readdirSync(way)
                    .filter( name => /\.html/.test(name) || !/\./.test(name) )
                    .forEach( name => 
                        this.resp.write(`<a href="${url}/${name}">${name}</a>`)
                    )

            this.resp.end()
        } 
        else {
            this.resp.end('')
        }

    }
}


http.createServer( (req, resp) => {
    let url = req.url.substr(1)

    const RespTransform = new ResponseTransform(resp, url)

    RespTransform.testReq()
    
    RespTransform.writeResp()

}).listen(2000)


{/*

let way = path.resolve(__dirname)
way = way.substr(0, way.indexOf('arendatika') +11)

let localway

const header = fs.readFileSync(`${way}/src/Client/components/header.php`).toString()
const footer = fs.readFileSync(`${way}/src/Client/components/footer.php`).toString()

http.createServer( (req, resp) => {
    let url = req.url.substr(1)
    if ( /^(dist|images|public)/.test(url) ) url = 'web/' + url 

    if ( !url.includes('.html') && url.includes('.') && url.includes(fullway) ) {
        url = url.replace(fullway, 'web/dist')
    }

    if ( url.includes('favicon.ico') ) url = 'web/images/favicons/favicon.ico'
    
    let _way = way + url

    console.log('way - ', way)
    console.log('_way - ', _way)
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
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'image/x-icon' } )
            resp.write(data)
            resp.end()
        })
    } 
    else if ( /(\.woff|\.woff2)/.test(url) ) {
        fs.readFile(_way, (err, data) => {
            resp.writeHead( 200, { 'Content-Type': 'application/font-woff' } )
            resp.write(data)
            resp.end()
        })
    } else {
        _way = way + 'src/Client/html_templates/' + url
        let data = fs.readdirSync(_way)

        resp.write(`<style>a{padding: 10px;color: #20576d;}</style>`)
        
        url = url.replace(/.+\//, '')

        data.filter( name => /\.html/.test(name) || !/\./.test(name) )
            .forEach( name => 
                resp.write(`<a href="${url}/${name}">${name}</a>`)
            )
        resp.end()
    }

}).listen(2000)

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
*/
} // функциональное решение

console.log('Сервер запущен на localhost:2000')
