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
    return new RegExp( `${attribute}{1}\\s?=\\s?(\\'|\\"){1}[^\\'\\"]?` + value +`{1}[^\\'\\"]?(\\'|\\")`, 'gm' );
} // creating RegExp to find attr in tag

const findEndOfTag = (tag, html) => {
}

const htmlParser = (tag, attr, body) => {

    let templateArr = body.split('<' + tag).slice(1);

    let tempToFind = checkForAttr(attr);

    templateArr = templateArr
                    .filter( el => tempToFind.test(el) && el.match(tempToFind))
                    .map( el => el.trim() )
                    .sort((a,b)=>b.length-a.length);
    console.log(templateArr);
    
    let resultedNode = templateArr[0].substring(0, templateArr[0].lastIndexOf('<\/'+tag));
    console.log(resultedNode);
    fs.writeFile('new.js', JSON.stringify(resultedNode), ()=>{});
    return templateArr;

}

(async() => {
    let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
    let html = (await needle('get', URL)).body;

    // let html = `
    //     <div class = "b_items_list" cellspacing="0">
    //         <div></div>
    //         <div>
    //             <div class="masha sasha" data-tr="tr">111111111</div>
    //             <div>
    //                 <div>
    //                     <div>2222222</div>
    //                     2222222
    //                 </div>
    //                 2222222
    //             </div>
    //             <div>eeeeeeee</div>
    //         </div>
    //         <div><p>aaaa</p></div>
    //     </div>
    // `;

    // let result = htmlParser('div', '', html);

    let result = htmlParser('table', 'class=b_items_list', html);
    
    // console.log(result);

    
})();
// */
}


