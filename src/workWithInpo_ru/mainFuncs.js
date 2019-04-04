const needle = require('needle'); // aka axios
const { tr, slugify } = require('transliteration'); // translit
// NPM modules

const parseHTML = require('./api/parseHTML');
const writeToCSVFile = require('./api/writeToFile');
// My modules

(async() => {

let URL = `http://www.inpo.ru/shop/S:${397}`,
    catalogTitle = 'Ромбические',
    addToIdx = 0, 
    amirogen = 'Amiro_gen_90511;Amiro_gen_90362'
;


let idTitle = slugify(delUnwritableSymbs(catalogTitle), { separator: '_' });
console.log('Название - ', idTitle);

let html = (await needle('get', URL)).body;
let data = parseHTML(html, catalogTitle, addToIdx, amirogen, idTitle);

writeToCSVFile(data, delUnwritableSymbs(catalogTitle) + '\.csv', addToIdx); 
/* using addToIdx to determine if append */

})();

function delUnwritableSymbs (str) { 
    return str.replace(/[\/\\\.,\(\)\"\']/gi,'') 
}

