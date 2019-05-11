const http = require('http');
const fs = require('fs');
const path = require('path');

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

    get includePHPTypes (){
        function read(filename) {
            return fs.readFileSync(filename).toString()
        }
        
        const way = this.way + 'src/Client/';

        return {
            'header': read(`${way}components/header.php`),
            'footer': read(`${way}components/footer.php`),
            'addon_head': read(`${way}html_templates/website/addon_head.php`),
            'addon_footer': read(`${way}html_templates/website/addon_footer.php`)
        };
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

    transformPHPInclude(html) {

        const { includePHPTypes: types } = this;

        for (const type in types) {
            const regexp = new RegExp(`<\\?php+.+include\\(+.+${type}\\.php+.+\\?>`,'g');
            html = html.replace(regexp, types[type]);
        };
    
        return html;
    }

    testRequest(){

        const { url, mimeTypes } = this;

        const key = Object.keys( mimeTypes )
            .filter( type => RegExp( type.replace(/\./g,'\\.') ).test(url) )
            .toString();
        
        if ( key && key !== '.html' ) {
            this.mimeType = mimeTypes[key];
            this.url = url.replace(/\?.+/,'');
        }

        else if ( key === '.html' ) {
            this.mimeType = mimeTypes[key];
            ResponseTransform.prototype.localway = path.dirname(url);
            this.url = 'src/Client/html_templates/' + url;
        } 

        else if ( /[\?\.]/.test(url) ) {
            this.mimeType = 'unknown';
        }
        
        else {
            this.url = 'src/Client/html_templates/' + url;
            this.mimeType = 'dir';
        }

    }

    writeResponse() {
        const { mimeType } = this
        const way = this.way + this.url
        
        const isKnownFile = !mimeType.match(/(unknown|dir)/)
        this.resp.writeHead( 200, { 'Content-Type': isKnownFile ? mimeType : 'text/html' } )

        {
            // console.log('way - ', way)
            // console.log('mimeType - ', mimeType)
            // console.log('url - ', this.url)
            // console.log()
        } //логирование

        const isHTML = mimeType.includes( 'html' ) ? 'utf8' : null

        if ( isKnownFile ) { 

            fs.readFile(way, isHTML, (err, data) => {

                if ( isHTML ) data = this.transformPHPInclude(data)

                this.resp.end( !err ? data : '' )
            })
                    
        } 
        else if ( mimeType === 'dir' ) {

            this.resp.write(`<style>a{display: block; padding: 10px; color: #20576d; margin: 10px;}</style>`)
            
            const url = this.url.replace(/.+\//, '')
    
            fs.readdirSync(way, { withFileTypes: true })
                .filter( ({ name }) => /\.html/.test(name) || !/\./.test(name) )
                .sort( dirent => dirent.isDirectory() ? -1 : 1 )
                .forEach( dirent =>{
                    const { name } = dirent;
                    this.resp.write( dirent.isDirectory()
                        ? `<a style="background: #eee;" href="${url}/${name}">${name}</a>`
                        : `<a href="${url}/${name}">${name}</a>`
                    );        
                });

            this.resp.end()
        } 
        else {
            this.resp.end('')
        }

    }
}




http.createServer( (request, response) => {
    const url = request.url.substr(1)

    const RespTransform = new ResponseTransform(response, url);

    RespTransform.testRequest();
    
    RespTransform.writeResponse();

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

console.log('Сайт запущен на localhost:2000')
