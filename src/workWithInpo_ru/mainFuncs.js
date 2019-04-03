const needle = require('needle'); // aka axios
const { tr, slugify } = require('transliteration'); // translit
// NPM modules

const parseHTML = require('./api/workWithHTML');
const writeToCSVFile = require('./api/writeToFile');
// My modules

(async() => {

let URL = `http://www.inpo.ru/shop/S:${575}`,
    catalogTitle = 'Метчики ручные',
    addToIdx = 200, 
    appendToFile = true,
    amirogen = 'Amiro_gen_90488;Amiro_gen_90359'.trim();


let idTitle = slugify(delUnwritableSymbs(catalogTitle), { separator: '_' });
console.log(idTitle);

let html = (await needle('get', URL)).body;
let data = parseHTML(html, catalogTitle, addToIdx, amirogen, idTitle);

writeToCSVFile(data, delUnwritableSymbs(catalogTitle) + '\.csv', appendToFile);

})();

function delUnwritableSymbs (str) { return str.replace(/[\/\\\.,\(\)\"\']/gi,'') }

