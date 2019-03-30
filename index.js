const parserHtml = require('./querySelector_NodeJS_edition');
const needle = require('needle'); // aka axios

(async() => {
    let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
    let html = (await needle('get', URL)).body;
    let node = parserHtml(html);
    node.querySelector('table', '[class$="ist"]');
})();