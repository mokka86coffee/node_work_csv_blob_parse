const fs = require('fs');
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


const htmlParser = (tag, attr, body) => {

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

    fs.writeFile('new.js', JSON.stringify(templateArr), ()=>{});
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
    // let html = (await needle('get', URL)).body;

    let html = `
        <div cellspacing="0">
            <div></div>
            <div>
                <div class="masha sasha b_items_list" data-tr="tr">111111111</div>
                <div>
                    <div class='b_items_list'>
                        <div class='b_items_list'>2222222</div>
                        2222222
                    </div>
                    2222222
                </div>
                <div>eeeeeeee</div>
            </div>
            <div><p>aaaa</p></div>
        </div>
    `;

    let result = htmlParser('div', 'class=b_items_list', html);
	// console.log("TCL: result", result)

    // let result = htmlParser('div', 'class=b_items_list', html);
    
})();
// */
}
