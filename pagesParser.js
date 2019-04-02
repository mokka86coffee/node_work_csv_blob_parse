let parserHtml = require('./querySelector_NodeJS_edition');
const needle = require('needle'); // aka axios

let mainURL = 'https://stanok74.ru/katalog/internet-magazin/';
let categoryLink = 'rashodniki-i-osnastka/rezcy/rezcy-rezbovye';

const URL = mainURL + categoryLink;

let idx = 0;
(async () => {

    try {
        while (true) {
            let html = (await needle('get', URL)).body;
            let itemsLinks = parserHtml(html).querySelectorAll('a.eshop-item-small__visual-link');
            let href = itemsLinks[0].getAttr('href');
            break;
        }
    } catch (err) {}


})();