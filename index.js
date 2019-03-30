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
    return new RegExp( `${attribute}{1}\\s?=\\s?(\\'|\\"){1}[^\\'\\"]?` + value +`{1}[^\\'\\"]?(\\'|\\")`, 'gm' );
} // creating RegExp to find attr in tag

const findNode = ( body, startedIdxs, endedIdxs, length ) => {

    let foundedParts = [];
    html = '<a class="vasya">start1<p><a>2</a>ds</p>end1</a>';

    for (let idx = 0; idx < startedIdxs.length; idx++) { 
        if ( startedIdxs[idx+1] <  endedIdxs[idx]) {
            foundedParts.concat( findEntries(body, startedIdxs.slice(idx+1), endedIdxs.slice(idx, endedIdxs.length-1), length) )
        } 
        else {
            foundedParts.push(body.substring(startedIdxs[idx]+length+2, endedIdxs[idx]))
        }
    }
    console.log("TCL: findNode -> foundedParts", foundedParts)

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


    templateArr = findNode(body, startedIdxs, endedIdxs, tag.length);
    
    // let resultedNode = templateArr[0].substring(0, templateArr[0].lastIndexOf('<\/'+tag));
    // fs.writeFile('new.js', JSON.stringify(resultedNode), ()=>{});
    return templateArr;

}

let findEntries = (tag, html) => {
    let resultedArr = [];

    // Getting quanity of children entries
    let openPoints = [], endPoints = [];
    let posStart = html.indexOf(`<${tag}`);
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
    let counterOfClosedTags = counterOfOpenedTags;
    while (counterOfClosedTags) {
        endPoints.push(entry);
        counterOfClosedTags--;
        entry = html.indexOf(`<\/${tag}`, entry+1);
    }
    // Getting quanity of children entries

    for (let idx=1; idx <= counterOfOpenedTags; idx++) {
        let node = html.substring( openPoints[openPoints.length-idx] + tag.length + 2, endPoints[idx-1] );
        resultedArr.push(node);
        // break;
    }
    console.log("TCL: findEntries -> openPoints", openPoints)
    console.log("TCL: findEntries -> endPoints", endPoints)

    return resultedArr;

}


(async() => {
    let URL = 'http://www.inpo.ru/shop/S:214#.XJ30jyMueUl';
    // let html = (await needle('get', URL)).body;

    let html = `
        <div class = "b_items_list" cellspacing="0">
            <div></div>
            <div>
                <div class="masha sasha" data-tr="tr">111111111</div>
                <div>
                    <div>
                        <div>2222222</div>
                        2222222
                    </div>
                    2222222
                </div>
                <div>eeeeeeee</div>
            </div>
            <div><p>aaaa</p></div>
        </div>
    `;



    html = '<a>start1<a>start2<a>start3<a>start4a1end</a>a2end</a>a3end</a>a4end</a>';
    // html = '<a>1start<a>2</a>1end</a><a>3</a><a>4</a>';
    // html = '<a>1</a><a>2</a><a>3</a><a>4</a>';
    html = '<a class="vasya">start1<p><a>2</a>ds</p>end1</a>';

    let result = htmlParser('a', '', html);
	// console.log("TCL: result", result)

    // let result = htmlParser('div', 'class=b_items_list', html);
    
})();
// */
}
