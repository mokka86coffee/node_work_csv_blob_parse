const needle = require('needle'); // aka axios
const { tr, slugify } = require('transliteration'); // translit
// NPM modules

const parseHTML = require('./api/parseHTML');
const writeToCSVFile = require('./api/writeToFile');
// My modules

console.clear();


(async() => {

const allCategs = [
    
]

for (let i = 0, L = allCategs.length; i<L; i++) {
    let URL = `http://www.inpo.ru/shop/S:${191}`,
            catalogTitle = 'Лепестковые круги_',
            addToIdx = 30, 
            amirogen = 'Amiro_gen_90426;Amiro_gen_90353'
        ;
        
        let idTitle = slugify(delUnwritableSymbs(catalogTitle), { separator: '_' });
        console.log("\x1b[37m", 'Картинка - ', '\x1b[33m', idTitle + '_zzmain' + addToIdx);
        
        let html = (await needle('get', URL)).body;
        
        amirogen += ';' + catalogTitle + ';false';
        
        let data = parseHTML(html, catalogTitle, addToIdx, amirogen, idTitle, '');
        
        writeToCSVFile(data, delUnwritableSymbs(catalogTitle) + '\.csv', addToIdx); 
        /* using addToIdx to determine if append to file*/
        
    }
})();

function delUnwritableSymbs (str) { 
    return str.replace(/[\/\\\.,\(\)\"\']/gi,'') 
}

