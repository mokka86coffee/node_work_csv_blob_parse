const parserHtml = require('./querySelector_NodeJS_edition');
const needle = require('needle'); // aka axios

(async() => {
    let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
    // let html = (await needle('get', URL)).body;
    let html = `<p><a><ul><li name="cat" id="dog" class="poop">li1</li><li>li2</li></ul></a></p>`;
    let node = parserHtml(html);
    node.querySelector('li', '.poop', true);
})();