const fs = require('fs');
const iconv = require('iconv-lite'); // fonts lang converter (optional)
//NPM modules
 
// // Convert from an encoded buffer to js string.
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
 
// // Convert from js string to an encoded buffer.
// buf = iconv.encode("Sample input string", 'win1251');

module.exports = (data, fileName, appendToFile = false) => {
    const meta = 'META.CSV::CATEGORY_ID_EXTERNAL|CATALOG_ID_PARENT_EXTERNAL;CATEGORY_ID_PARENT_EXTERNAL;CATEGORY_DESCRIPTION;CATEGORY_ANNOUNCE;CATEGORY_FULL_DESCRIPTION;CATEGORY_IS_DELETED;CATALOG_IS_DELETED;CATALOG_ID_EXTERNAL;CATALOG_DESCRIPTION;CATALOG_NAME_FULL;CATALOG_MAIN_PRICE;IMAGE_IMAGE_MAIN;IMAGE_IMAGE_SMALL;IMAGE_IMAGE_POPUP;CATALOG_CODE;CATALOG_HTML_TITLE;CATALOG_HTML_KEYWORDS;CATALOG_HTML_DESCRIPTION;CATALOG_HTML_IS_AUTOGEN;CATALOG_CUSTOM_FIELD_12;CATALOG_CUSTOM_FIELD_25\n';
    
    const bufferStr = appendToFile ? iconv.encode(data, 'win1251') : iconv.encode(meta + data, 'win1251');
   
    const fullWay = 'C:/Users/UserEvg/Desktop/Stanok/csv/CSV на dva/Расходники и оснастка/';
    const dirName = 'Метчики плашки/';

    const way = fullWay + dirName + fileName;

    if (appendToFile) fs.appendFileSync(way, bufferStr); 
    else fs.writeFileSync(way, bufferStr);
}