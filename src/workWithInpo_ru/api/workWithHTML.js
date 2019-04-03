const parserHtml = require('../../../querySelector_NodeJS_edition');
const { priceCalculation, reduceItem, workingWithName } = require('./transformHtmlToValues');
// My modules

module.exports = function (html, catalogTitle, addToIdx, amirogen, idTitle) {
    
    
    let tableRows = parserHtml(html).querySelectorAll('table.b_items_list tbody tr');

    amirogen += ';' + catalogTitle + ';;;false;false';

    let data = tableRows.reduce( (res, el, idx) => {
        let sku = parserHtml(el.innerHTML).querySelector('span[itemprop="sku"]').innerText;
        let price = priceCalculation( parserHtml(el.innerHTML).querySelector('td.bil_price').innerText );
        
        let { title, htmlBody, seoTitle, seoKeywords } = workingWithName( parserHtml(el.innerHTML).querySelector('span[itemprop="name"]').innerText, catalogTitle );
        
        let imgFileName = idTitle + '_zzmain';
        let imgLink = 'rashodniki/metchiki_plashki/' + imgFileName + '.jpg';

        
        return res + `${amirogen};${idTitle}${idx + addToIdx};${title};${htmlBody};${price};${imgLink};${imgLink};${imgLink};${sku};${seoTitle};${seoKeywords};${title};false;Китай;На складе\n`;    
    }, '');

    console.log('Всего элементов - ', tableRows.length);
    return data;

}



