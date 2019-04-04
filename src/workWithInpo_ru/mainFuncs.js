const needle = require('needle'); // aka axios
const { tr, slugify } = require('transliteration'); // translit
// NPM modules

const parseHTML = require('./api/workWithHTML');
const writeToCSVFile = require('./api/writeToFile');
// My modules

(async() => {

let URL = `http://www.inpo.ru/shop/S:${398}`,
    catalogTitle = 'Пятигранные',
    addToIdx = 0, 
    appendToFile = false,
    amirogen = 'Amiro_gen_90511;Amiro_gen_90362'.trim();


let idTitle = slugify(delUnwritableSymbs(catalogTitle), { separator: '_' });
console.log(idTitle);

let html = (await needle('get', URL)).body;
let data = parseHTML(html, catalogTitle, addToIdx, amirogen, idTitle);

writeToCSVFile(data, delUnwritableSymbs(catalogTitle) + '\.csv', appendToFile);

})();

function delUnwritableSymbs (str) { 
    return str.replace(/[\/\\\.,\(\)\"\']/gi,'') 
}

