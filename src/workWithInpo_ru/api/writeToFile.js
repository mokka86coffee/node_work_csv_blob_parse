const fs = require('fs');
const iconv = require('iconv-lite'); // fonts lang converter (optional)
//NPM modules
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');

module.exports = async (data, fileName, appendToFile) => {
    const meta = `META.CSV::CATEGORY_ID_EXTERNAL|CATALOG_ID_PARENT_EXTERNAL;CATEGORY_ID_PARENT_EXTERNAL;CATEGORY_DESCRIPTION;CATALOG_IS_DELETED;CATALOG_ID_EXTERNAL;CATALOG_DESCRIPTION;CATALOG_NAME_FULL;CATALOG_MAIN_PRICE;IMAGE_IMAGE_MAIN;IMAGE_IMAGE_SMALL;IMAGE_IMAGE_POPUP;CATALOG_CODE;CATALOG_HTML_TITLE;CATALOG_HTML_KEYWORDS;CATALOG_HTML_DESCRIPTION;CATALOG_HTML_IS_AUTOGEN;CATALOG_CUSTOM_FIELD_12;CATALOG_CUSTOM_FIELD_25;
    CATALOG_CUSTOM_FIELD_494;
    CATALOG_CUSTOM_FIELD_495;
    CATALOG_CUSTOM_FIELD_499;
    CATALOG_CUSTOM_FIELD_500;
    `.replace(/[\n\t\s]+/g, '') + '\n';

    const bufferStr = appendToFile ? iconv.encode(data, 'win1251') : iconv.encode(meta + data, 'win1251');
    
    let wayToDir = 'C:/Users/UserEvg/Desktop/Stanok/csv/CSV на dva/'; 
    wayToDir += 'Расходники и оснастка/';
    wayToDir += 'Абразивный инструмент/';

    if ( !fs.existsSync(wayToDir) ) fs.mkdirSync(wayToDir);
    
    const way = wayToDir + fileName;

    writeToFile( bufferStr, way, appendToFile ); 

    // getImgsNamesFromFile(way);

}

function getImgsNamesFromFile(way) {
    fs.readFile(way, 'utf8', (err, data) => {
        let readArr = data.split('_zzmain')
        .map( el => el.substring(0, el.indexOf('\.')) )
        .reduce( (names,el) => ~names.indexOf(el) || ~el.indexOf('META') ? names : names.concat(el), [] )
        console.log('\x1b[36m%s\x1b[0m', readArr.join(' \/ '));
    });
}

function writeToFile ( bufferStr, way, appendToFile ) {
    if (appendToFile) fs.appendFileSync(way, bufferStr); 
    else fs.writeFileSync(way, bufferStr);
}