const fs = require('fs');
const needle = require('needle'); // aka axios
const iconv = require('iconv-lite'); // fonts lang converter (optional)
 
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');


const checkForAttr = (attr) => {
    if (!attr) return new RegExp('.','gm');
    
    if (~attr.indexOf('\.')) { attr = `class=${attr.substr(1)}` } // attr 'class' founded
    if (~attr.indexOf('\#')) { attr = `id=${attr.substr(1)}` } // attr 'id' founded

    console.log(attr);
    let attribute = attr.match(/[^=]+=/gm)[0].replace('=','');
    let value = attr.match(/={1}[\w-_]+/gm)[0].replace('=','');
    return new RegExp( `^${attribute}{1}\\s?=\\s?(\\'|\\"){1}[^\\'\\"]*` + value + `{1}[^\\'\\"]*(\\'|\\")`, 'gm' );
} // creating RegExp to find attr in tag

const findNodes = ( body, tag, startedIdxs, endedIdxs, length ) => {

    let foundedParts = [];

    for (let idx = 0; idx < startedIdxs.length; idx++) { 
        if ( startedIdxs[idx+1] < endedIdxs[idx] ) {
            let newBody = body.substring(startedIdxs[idx]);
            let arrToAdd = findEntries(tag, newBody);
            foundedParts = foundedParts.concat(arrToAdd);
            startedIdxs.splice(idx+1, arrToAdd.length-1);
            endedIdxs.splice(idx+1, arrToAdd.length-1);
        } 
        else {
            foundedParts.push(body.substring(startedIdxs[idx]+length+1, endedIdxs[idx]))
        }
    }

    return foundedParts;
}

const findPositions = (tag, body) => {
    let position = body.indexOf(tag), resultedArr = [];
    while (~position) {
        resultedArr.push(position);
        position = body.indexOf(tag, position + 1);
    }
    return resultedArr;
}


const htmlParser = (tag, attr, body, getText = false) => {

    let 
        tempToFind = checkForAttr(attr),
        startedIdxs = findPositions('<' + tag, body),
        endedIdxs = findPositions('<\/' + tag, body);


    templateArr = findNodes(body, tag, startedIdxs, endedIdxs, tag.length);

    templateArr = templateArr
    .map( el => el.replace(/[\n]/gm,'') )
    .map( el => el.replace(/[\s]{2,}/gm,'') )
    .map( el => el.trim() )
    .filter( el => {
        // console.log( el.match(tempToFind) );
        return el.match(tempToFind);
    });

    if (getText) { templateArr = templateArr.map( el => el.substring( el.indexOf('>')+1) ); }

    fs.writeFileSync('new.js', JSON.stringify(templateArr,0,'\n'), ()=>{});
    return templateArr;

}

let findEntries = (tag, html) => {
    let resultedArr = [];

    // Getting quanity of children entries
    let openPoints = [], endPoints = [];
    const posStart = html.indexOf(`<${tag}`);
    let posEnd = html.indexOf(`<\/${tag}`);

    let cuttedHtml = html.substring(posStart+1, posEnd);
    
    let entry = cuttedHtml.indexOf(`<${tag}`);
    let counterOfOpenedTags = 0;
    while (entry !== -1) {
        openPoints.push(entry);
        counterOfOpenedTags++;
        entry = cuttedHtml.indexOf(`<${tag}`, entry+1);
    }
    
    entry = posEnd;
    let counterOfClosedTags = counterOfOpenedTags+1;
    while (counterOfClosedTags) {
        endPoints.push(entry);
        counterOfClosedTags--;
        entry = html.indexOf(`<\/${tag}`, entry+1);
    }
    // Getting quanity of children entries

    for (let idx=1; idx <= counterOfOpenedTags +1; idx++) {
        let node = idx === counterOfOpenedTags +1
            ? html.substring( posStart + tag.length+1, endPoints[idx-1])
            : html.substring( openPoints[openPoints.length-idx] + tag.length + 2, endPoints[idx-1] );
        
        resultedArr.push(node);
    }

    return resultedArr;

}


(async() => {
    let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
    let html = (await needle('get', URL)).body;
    html = htmlParser('table', '#b_items_list', html)[0];
    // html = htmlParser('span', 'itemprop=name', html, true);
})();
