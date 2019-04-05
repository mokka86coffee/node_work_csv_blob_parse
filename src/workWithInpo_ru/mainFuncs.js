const needle = require('needle'); // aka axios
const { tr, slugify } = require('transliteration'); // translit
// NPM modules

const parseHTML = require('./api/parseHTML');
const writeToCSVFile = require('./api/writeToFile');
// My modules

(async() => {

let URL = `http://www.inpo.ru/shop/S:${592}`,
    catalogTitle = 'Оправки и втулки',
    addToIdx = 120, 
    amirogen = 'Amiro_gen_90493;Amiro_gen_90360'
;


let idTitle = slugify(delUnwritableSymbs(catalogTitle), { separator: '_' });
console.log('Название - ', idTitle + '_zzmain' + addToIdx);

let html = (await needle('get', URL)).body;

amirogen += ';' + catalogTitle + ';false';

let data = parseHTML(html, catalogTitle, addToIdx, amirogen, idTitle);

writeToCSVFile(data, delUnwritableSymbs(catalogTitle) + '\.csv', addToIdx); 
/* using addToIdx to determine if append to file*/

})();

function delUnwritableSymbs (str) { 
    return str.replace(/[\/\\\.,\(\)\"\']/gi,'') 
}

