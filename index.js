const fs = require('fs');
const cheerio = require('cheerio'); // aka jQuery
const needle = require('needle'); // aka axios
const iconv = require('iconv-lite'); // fonts lang converter 
 
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');


{
// /*

const checkForAttr = (attr) => {
    if (!attr) return new RegExp('.','gm');
    
    let attribute = attr.match(/[^=]+=/gm)[0].replace('=','');
    let value = attr.match(/={1}[\w-_]+/gm)[0].replace('=','');
    return new RegExp( attribute + `\s?=\s?\'|\"{1}[^\'\"]?` + value +`[^\'\"]?\'|\"`, 'gm' );
}

const htmlParser = (node, attr, body) => {

    let templateArr = body.split('<' + node).slice(1);

    let tempToFind = checkForAttr(attr);
    console.log(tempToFind);

    templateArr = templateArr.filter( el => tempToFind.test(el) );
    
    console.log(templateArr.length);
    console.log(templateArr);
    // fs.writeFile('new.js', JSON.stringify(templateArr), ()=>{});
    return templateArr;

}

(async() => {
    let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
    // let html = (await needle('get', URL)).body;

    let html = '<table class="b_items_list" cellspacing="0"><thead></thead><tr class="masha sasha" data-tr="tr">111111111</tr><tr>2222222</tr><tr>eeeeeeee</tr>';

    let result = htmlParser('tr', 'class=sasha', html);
    // console.log(result);

    
})();
// */
}


