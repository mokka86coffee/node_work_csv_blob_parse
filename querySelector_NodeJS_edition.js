const fs = require('fs');
const needle = require('needle'); // aka axios
const iconv = require('iconv-lite'); // fonts lang converter (optional)
 
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');


const checkForAttr = (attr) => {
    if (!attr) return new RegExp('.','gm');

    attr = attr.replace(/[\[\]\'\"]/gm,'');

    if (~attr.indexOf('\.')) { attr = `class=${attr.substr(1)}` } // attr 'class' founded
    else if (~attr.indexOf('\#')) { attr = `id=${attr.substr(1)}` } // attr 'id' founded
    if (~attr.indexOf('\*')) { attr = attr.replace('\*','') } // attr 'includes' founded

    console.log(attr);
    let attribute = attr.match(/[^=]+=/gm)[0].replace('=','');
    let value = attr.match(/={1}[\w-_]+/gm)[0].replace('=','');

    if (~attribute.indexOf('\^')) { 
        attribute = attribute.replace('\^','');
        return new RegExp( `${attribute}{1}\\s?=\\s?(\\'|\\"){1}` + value + `{1}[^\\'\\"]*(\\'|\\")`, 'gm' );
     } // attr 'start from' founded
     if (~attribute.indexOf('\$')) { 
        attribute = attribute.replace('\$','');
        return new RegExp( `${attribute}{1}\\s?=\\s?(\\'|\\"){1}[^\\'\\"]*` + value + `(\\'|\\")`, 'gm' );
    } // attr 'end with' founded
     else {
        return new RegExp( `${attribute}{1}\\s?=\\s?(\\'|\\"){1}[^\\'\\"]*` + value + `{1}[^\\'\\"]*(\\'|\\")`, 'gm' );
     }
    
} // creating RegExp to find attr inside tag

let findEntries = (tag, html) => {
    let resultedArr = [];

    // Getting quanity of children entries
    
    let openPoints = [], endPoints = [];
    const posStart = html.indexOf(`<${tag}`); // first opened tag
    let posEnd = html.indexOf(`<\/${tag}`); // first closed tag

    let cuttedHtml = html.substring(posStart+1, posEnd); // cut html to get only nested opened tags
    
    let entry = cuttedHtml.indexOf(`<${tag}`);
    let counterOfOpenedTags = 0;
    while (entry !== -1) {
        openPoints.push(entry);
        counterOfOpenedTags++;
        entry = cuttedHtml.indexOf(`<${tag}`, entry+1);
    }// counting nested opened tags and getting 'openPoints' array from them
    
    entry = posEnd;
    let counterOfClosedTags = counterOfOpenedTags+1; // +1 cause we also need the closed parent tag
    while (counterOfClosedTags) {
        endPoints.push(entry);
        counterOfClosedTags--;
        entry = html.indexOf(`<\/${tag}`, entry+1);
    }// getting 'endPoints' array from closed tags
    
    // Getting quanity of children entries

    for (let idx=1; idx <= counterOfOpenedTags +1; idx++) { // started from 1 cause of 'openPoints[!!openPoints.length-idx!!]'
        let node = idx === counterOfOpenedTags +1
            ? html.substring( posStart + tag.length+1, endPoints[idx-1])
            : html.substring( openPoints[openPoints.length-idx] + tag.length + 2, endPoints[idx-1] );
        
        resultedArr.push(node);
    }

    return resultedArr;
    // return array of founded nodes

} // return all nested tag's entries (includes parent's closed tag) as array

const findNodes = ( body, tag, startedIdxs, endedIdxs, length ) => {

    let foundedParts = [];

    for (let idx = 0; idx < startedIdxs.length; idx++) { 
        if ( startedIdxs[idx+1] < endedIdxs[idx] ) { // checking if pos of next opened tag greater then current closed tag (nested or not)
            let newBody = body.substring(startedIdxs[idx]); // cutting html to start 'findEntries' from current position
            let arrToAdd = findEntries(tag, newBody);

            foundedParts = foundedParts.concat(arrToAdd);
            
            startedIdxs.splice(idx+1, arrToAdd.length-1); // removing quanity of nested elements, except current
            endedIdxs.splice(idx+1, arrToAdd.length-1); // removing quanity of nested elements, except current
        } 
        else {
            foundedParts.push(body.substring(startedIdxs[idx] + length + 1, endedIdxs[idx]))
        }
    } // adding each node to 'foundedParts' array

    return foundedParts;
} // getting array of founded nodes

const findPositions = (tag, body) => {
    let position = body.indexOf(tag), resultedArr = [];
    while (~position) {
        resultedArr.push(position);
        position = body.indexOf(tag, position + 1);
    }
    return resultedArr;
} // getting array of each position of tag ( separate for '<' & '</' )

const htmlParser = (tag, attr, body, getText = false) => {
console.log("TCL: htmlParser -> body", body)
console.log("TCL: htmlParser -> attr", attr)
console.log("TCL: htmlParser -> tag", tag)


    let tempToFind = checkForAttr(attr),
        startedIdxs = findPositions('<' + tag, body), // getting positions of opened tags
        endedIdxs = findPositions('<\/' + tag, body) // getting positions of closed tags
    ;


    templateArr = findNodes(body, tag, startedIdxs, endedIdxs, tag.length);

    templateArr = templateArr
    .map( el => el.replace(/[\n]/gm,'') ) 
    .map( el => el.replace(/[\s]{2,}/gm,'') )
    .map( el => el.trim() ); 
    // beauty in file (for test)

    templateArr = templateArr.filter( el => {
        let str = el.substring(0, el.indexOf('>'));
        return str.match(tempToFind);
    });

    if (getText) { templateArr = templateArr.map( el => el.substring( el.indexOf('>')+1) ); }

    fs.writeFileSync('new.js', JSON.stringify(templateArr,0,'\n'), ()=>{}); //for test
    return templateArr;
} // html parser itself

const nodeHtml = (html)=>({ 
    html,
    querySelector: function (tag, attr, getText = false) { return htmlParser(tag, attr, this.html)[0] },
    querySelectorAll: function (tag, attr, getText = false) { return htmlParser(tag, attr, this.html) }
});

module.exports = nodeHtml;
