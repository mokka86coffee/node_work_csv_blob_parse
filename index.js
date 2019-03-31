const parserHtml = require('./querySelector_NodeJS_edition');
const needle = require('needle'); // aka axios
const fs = require('fs');

(async() => {

let getFileFromBlob = (data) => {
    fs.writeFileSync('new.js', JSON.stringify(data));
}

let priceCalculation = (price) => {
    price = Math.round(price);
    if (price <= 5000) return price*2;
    if (price <=10000) return price*1.5;
    if (price > 10000) return price+5000;
}

//Фреза цилиндрическая насадная 100х125х40 Z=14 Р6М5
let workingWithName = (name) => {
    
    let kolvoZubiev = name.match(/Z{1}\s?={1}\s?\d{1,3}/gi)[0].replace(/Z{1}\s?={1}\s?/,'');
    let material = name.match(/Z{1}\s?={1}\s?\d{1,3}\s.+/gi)[0].replace(/Z{1}\s?={1}\s?\d{1,3}\s/,'');
    let diametr = name.match(/\d{1,3},?\d{1,3}\s?х/gi)[0].replace('х','');
    let dlina = name.match(/\d{1,3},?\d{1,3}\s?х/gi)[1].replace('х','');
    
    let htmlBody = 
        '<h2 class="header_group">Описание</h2><p><b>' 
        + name.replace(/Z.+/, `, количество зубьев - ${kolvoZubiev}, материал - ${material}`) 
        + '</b></p>';

    let seoTitle = name + ' - Цилиндрические насадные' + " - Каталог оборудования | Станкопромышленная компания";
    let seoKeyWords = 'фреза, цилиндрическая, насадная, материал, ' + material + ', диаметр, ' + diametr;

    return { htmlBody, diametr, kolvoZubiev, material, dlina, seoTitle, seoDescription: name, seoKeyWords };
}


let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
// let html = (await needle('get', URL)).body;

const html = `<div>level1start</div>
    <table>
        level1start
        <ul>
            level2start
            <div class="level3">level3</div>
            <div class="level3">level3</div>
            level2end
        </ul>
        <div>
            level2start
            <div class="level3">level3</div>
            <div class="level3">level3</div>
            level2end
        </div>
        level1end
    </table>
    
    <div class="level1">level1start</div>`;

// let parsedHtml = parserHtml(html).querySelector('div', {file: true, text: true});
let tableRows = parserHtml(html).querySelectorAll('table ul div.level3', {text: true,file: true});
// parsedHtml = parserHtml(parsedHtml).querySelector('tbody');
// let tableRows = parserHtml(parsedHtml).querySelectorAll('tr');

// let arr = [];
// tableRows.forEach( (el,idx) => {
//     let sku = parserHtml(el).querySelector('span[itemprop="sku"]', {text: true});
// //     let price = priceCalculation( +el.querySelector('.bil_price').innerText );
// //     let additionInfo = workingWithName( el.querySelector('[itemprop="url"] span').innerText );

//     let data = { sku };
//     // let data = { sku, price, id: `cilind_nasad_${idx}`, ...additionInfo };
//     arr.push( JSON.stringify(data) );
// });


// getFileFromBlob(arr);

})();
