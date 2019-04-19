const needle = require('needle'); // aka axios
const { tr, slugify } = require('transliteration'); // translit
// NPM modules

const parseHTML = require('./api/parseHTML');
const writeToCSVFile = require('./api/writeToFile');
// My modules

console.clear();


(async() => {

    let catArr = [ 64, 499, 191 ], addToIdx = 0;

    for (let idx = 0, L = catArr.length; idx<L; idx++) {
        let URL = `http://www.inpo.ru/shop/S:${catArr[idx]}`,
            catalogTitle = 'Лепестковые круги',
            amirogen = 'Amiro_gen_90426;Amiro_gen_90353'
        ;
        
        let idTitle = slugify(delUnwritableSymbs(catalogTitle), { separator: '_' });
        // console.log("\x1b[37m", 'Картинка - ', '\x1b[33m', idTitle + '_zzmain' + addToIdx);
        
        let html = (await needle('get', URL)).body;
        
        amirogen += ';' + catalogTitle + ';false';
        
        let { data, newIdx } = parseHTML(html, catalogTitle, addToIdx, amirogen, idTitle, '');
        
        await writeToCSVFile(data, delUnwritableSymbs(catalogTitle) + '\.csv', addToIdx); 
        
        addToIdx = addToIdx + newIdx; /* using addToIdx to determine if append to file*/

        console.log(`\x1b[37m'Категория ${idx}, элементов - ]`, "\x1b[32m", newIdx, "]" );
    }
})();

function delUnwritableSymbs (str) { 
    return str.replace(/[\/\\\.,\(\)\"\']/gi,'') 
}

