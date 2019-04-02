// /*
const parserHtml = require('./querySelector_NodeJS_edition');
const needle = require('needle'); // aka axios
const fs = require('fs');
const iconv = require('iconv-lite'); // fonts lang converter (optional)
 
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');

(async() => {

let getFileFromBlob = (data) => {
    const bufferStr = iconv.encode(data, 'win1251');
    fs.writeFileSync('new.csv', bufferStr);
}

let priceCalculation = (price) => {
    price = Math.round(price).toFixed(0);
    if (price <= 5000) return price*2;
    if (price <=10000) return Math.round((price*1.5));
    if (price > 10000) return +price+5000;
}

let reduceItem = (param) => {
    if (/0/.test(param)) return `0°1' - 0°9'`;
    else if (/1/.test(param)) return `1°1' - 1°9'`;
    else if (/2/.test(param)) return `2°1' - 2°9'`;
    else if (/3/.test(param)) return `3°1' - 3°9'`;
    else if (/4/.test(param)) return `4°1' - 4°9'`;
    return `5°1' - 5°9'`;
}

// Фреза червячная М 3,0  кл.т.А, Р6М5, 20град 80х71х32мм; 2°24' (2510-4161) ГОСТ 9324-80 тип 2 "CNIC"
let workingWithName = (name) => {
    // let kolvoZubiev = name.match(/Z{1}\s?={1}\s?\d{1,3}/gi)[0].replace(/Z{1}\s?={1}\s?/,'');
    // let material = name.match(/кл.т/gi)[0].replace(/Z{1}\s?={1}\s?\d{1,3}\s/,'');
    // let diametr = name.match(/град{1},?\s{1}[^х]+х/gi) ? name.match(/град{1},?\s{1}[^х]+х/gi)[0].replace(/(град{1},?\s{1}|х)/gi,'') : 'none';
    // let dlina = name.match(/\d{1,3},?\d{1,3}\s?х/gi)[1].replace('х','');
    // let grad = name.match(/\d{1,3}(\s)?град/gi)[0].replace(/(\s)?град/gi,'');
    
    // let modulZuba = ~name.indexOf('М') ? name.match(/М{1}\s?\d{1,2},\d{1,2}/gi)[0].replace(/М(\s)?/gi,'') : 'none';
    // let klassTochn = ~name.indexOf('кл\.т\.') ? name.match(/кл\.т\.{1}\s?[авс]+\s?,/gi)[0].replace(/(кл\.т\.(\s)?|,)/gi,'') : 'none';
    // let material = name.match(/кл.т/gi) ? name.match(/кл.т[^,]+?,[^,]+?,/gi)[0].replace(/(кл.т[^,]+?,|,)/gi,'') : 'none';

    // let ugolZuba = name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi) ? name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi)[0] : 'none';

    name = name.replace(/(cnic|;)/ig,'');
    name = name.replace(/(&quot{1}(\s)?&quot{1})/ig,'');
    name = name.replace(/(&#39)/ig,'\'');
    let htmlBody = `<h2>Описание</h2> <p>${name}</p>`
    let seoTitle = name + ' - Резцы расточные' + " - Каталог оборудования | Станкопромышленная компания";

    // let ugolZubaDiap = reduceItem(ugolZuba);
    // fs.appendFileSync('new.json', `${modulZubaDiap}\n`);

    return `${name};${htmlBody};${seoTitle}`;
    // return `${name};${htmlBody};${seoTitle};${diametr};${modulZuba};${klassTochn};${material};${ugolZuba};${ugolZubaDiap}`;
}


let URL = 'http://www.inpo.ru/shop/S:739';
let html = (await needle('get', URL)).body;
let tableRows = parserHtml(html).querySelectorAll('table.b_items_list tbody tr');

let data = '';
tableRows.forEach( (el,idx) => {
    let sku = parserHtml(el.innerHTML).querySelector('span[itemprop="sku"]').innerText;
    let price = priceCalculation( parserHtml(el.innerHTML).querySelector('td.bil_price').innerText );
    let additionInfo = workingWithName( parserHtml(el.innerHTML).querySelector('span[itemprop="name"]').innerText );

    data += `rezcy_rastoch_${idx};${additionInfo};${price};${sku};\n`;    
});

getFileFromBlob(data);

})();
// */

