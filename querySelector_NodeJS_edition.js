const fs = require('fs');
const iconv = require('iconv-lite'); // fonts lang converter (optional)
 
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');


const checkForAttr = (attr) => {
    if (!attr) return '';

    attr = attr.replace(/[\[\]\'\"]/gm,'');

    if (~attr.indexOf('\.')) { attr = `class=${attr.substr(1)}` } // attr 'class' founded
    else if (~attr.indexOf('\#')) { attr = `id=${attr.substr(1)}` } // attr 'id' founded
    if (~attr.indexOf('\*')) { attr = attr.replace('\*','') } // attr 'includes' founded

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

const getHtmlFromPoints = (html, foundedPoints, tagLength) => {
    let resultedArr = [];

    foundedPoints.forEach( pointsObj => {
        let node = html.substring( pointsObj.start, pointsObj.end + tagLength + 3 );
        resultedArr.push(node);
    });

    return resultedArr;

} // return array of html nodes

const findEntriesUsingArrays = (startedIdxs, endedIdxs) => {
    let resultedArr = [];
    let nullsArr = [];
    let startIdx = 0;
    endedIdxs.forEach( (endPoint, endIdx) => {
        while(startedIdxs[startIdx] < endPoint && startedIdxs[startIdx] !== undefined) {
            resultedArr.push({
                start: startedIdxs[startIdx],
                end: null
            });
            nullsArr.push(startIdx);
            startIdx++;
        }

        if ( endPoint < startedIdxs[startIdx] || startedIdxs[startIdx] === undefined ) {
            Object.assign(resultedArr[nullsArr[nullsArr.length-1]], {end: endPoint});
            nullsArr.pop();
        }
        
    });
    return resultedArr;
} // return array of all start/end points

const findNodes = ( html, startedIdxs, endedIdxs, tagLength ) => {

    let foundedPoints = findEntriesUsingArrays(startedIdxs, endedIdxs);
    let nodesArray = getHtmlFromPoints(html, foundedPoints, tagLength);

    return nodesArray;
} // getting array of founded nodes

const findPositions = (tag, html) => {
    let position = html.indexOf(tag), resultedArr = [];
    while (~position) {
        resultedArr.push(position);
        position = html.indexOf(tag, position + 1);
    }
    return resultedArr;
} // getting array of each position of tag ( separate for '<' & '</' )

const htmlParser = ( str, html, config ) => {
    let nodesArr = [];
    
    str.split(' ').forEach( attr => {
        let ifAttr = /[\.\#\[]/.test(attr);
        
        let tag = ifAttr ? attr.match(/[^\.\#\[]+[\.\#\[]+/)[0] : attr;
        tag = ifAttr ? tag.substring(0, tag.length-1) : tag;

        let attrToFind = ifAttr ? checkForAttr(attr.substring(tag.length)) : null;
        
        let startedIdxs = findPositions('<' + tag, html); // getting positions of opened tags
        let endedIdxs = findPositions('<\/' + tag, html); // getting positions of closed tags
    
        nodesArr = findNodes(html, startedIdxs, endedIdxs, tag.length);
    
        if (attrToFind) {
            nodesArr = nodesArr.filter( el => {
                let str = el.substring(0, el.indexOf('>'));
                return str.match(attrToFind);
            })
        }

        html = nodesArr.join('');
    });

    if (config.text) { nodesArr = nodesArr.map( el => el.substring( el.indexOf('>') + 1, el.lastIndexOf('<\/') ) ); }

    
    if (config.file) {
        // beauty in file (for test)
        nodesArr = nodesArr
        .map( el => el.replace(/[\n]/gm,'') ) 
        .map( el => el.replace(/[\s]{2,}/gm,'') )
        .map( el => el.trim() ); 
        // beauty in file (for test)
        fs.writeFileSync('new.js', JSON.stringify(nodesArr,0,'\n'), ()=>{}); //for test
    }

    return nodesArr;
} // html parser itself


const nodeHtml = (html)=>({ 
    html,
    querySelector: function (str, config = {text: false, file: false}) { return htmlParser(str, this.html, config)[0] },
    querySelectorAll: function (str, config = {text: false, file: false}) { return htmlParser(str, this.html, config) }
});

module.exports = nodeHtml;
