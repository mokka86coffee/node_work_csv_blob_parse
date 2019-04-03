let parserHtml = require('./querySelector_NodeJS_edition');
const needle = require('needle'); // aka axios
const fs = require('fs');

const originURL = 'https://stanok74.ru/';
const mainURL = `${originURL}katalog/internet-magazin/rashodniki-i-osnastka/metchiki-plashki/`;
const categoryLink = 'mashinno-ruchnye';

const URL = mainURL + categoryLink;

let idx = 0;

(async () => {
    
    await new Promise( r => fs.writeFile('no_meta_keywords','', () => r()) );

    try {
        while (true) {
            if (idx) console.log( !(idx - 12) ? 'start' : `Проверено товаров - ${idx - 12}` );
            let html = (await needle('get', URL + '?action=rsrtme&catid=20465&offset=' + idx)).body;
            let itemsLinks = parserHtml(html).querySelectorAll('a.eshop-item-small__visual-link');
            
            for (let item of itemsLinks) {
                let href = item.getAttr('href');
                let itemHtml = (await needle('get', originURL + href)).body;
                
                let ifAttr = /name=\"keywords\"/.test(itemHtml); 
                
                if (!ifAttr) fs.appendFileSync('no_meta_keywords', originURL + href + '\n');
            }
            

            
            idx += 12;
        }
    } catch (err) {
        console.log('done');
    }


})();
