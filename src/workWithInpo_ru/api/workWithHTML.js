const parserHtml = require('../../../querySelector_NodeJS_edition');
const { priceCalculation, reduceItem, workingWithName } = require('./transformHtmlToValues');
// My modules

module.exports = function (html, catalogTitle, addToIdx, amirogen, idTitle) {
    
    let data = 'META.CSV::CATEGORY_ID_EXTERNAL|CATALOG_ID_PARENT_EXTERNAL;CATEGORY_ID_PARENT_EXTERNAL;CATEGORY_DESCRIPTION;CATEGORY_ANNOUNCE;CATEGORY_FULL_DESCRIPTION;CATEGORY_IS_DELETED;CATALOG_IS_DELETED;CATALOG_ID_EXTERNAL;CATALOG_DESCRIPTION;CATALOG_NAME_FULL;CATALOG_MAIN_PRICE;IMAGE_IMAGE_MAIN;IMAGE_IMAGE_SMALL;IMAGE_IMAGE_POPUP;CATALOG_CODE;CATALOG_HTML_TITLE;CATALOG_HTML_KEYWORDS;CATALOG_HTML_DESCRIPTION;CATALOG_HTML_IS_AUTOGEN;CATALOG_CUSTOM_FIELD_12;CATALOG_CUSTOM_FIELD_25\n';

    let tableRows = parserHtml(html).querySelectorAll('table.b_items_list tbody tr');


    tableRows.forEach( (el,idx) => {
        let sku = parserHtml(el.innerHTML).querySelector('span[itemprop="sku"]').innerText;
        let price = priceCalculation( parserHtml(el.innerHTML).querySelector('td.bil_price').innerText );
        
        let { title, htmlBody, seoTitle, seoKeywords } = workingWithName( parserHtml(el.innerHTML).querySelector('span[itemprop="name"]').innerText, catalogTitle );
        
        let imgFileName = idTitle + '_zzmain';
        let imgLink = 'rashodniki/metchiki_plashki/' + imgFileName + '.jpg';

        amirogen += ';' + catalogTitle + ';;;false;false';
        
        data += `${amirogen};${idTitle}${idx + addToIdx};${title};${htmlBody};${price};${imgLink};${imgLink};${imgLink};${sku};${seoTitle};${seoKeywords};${title};false;Китай;На складе\n`;    
    });

    console.log('Всего элементов - ', tableRows.length);
    return data;

}



