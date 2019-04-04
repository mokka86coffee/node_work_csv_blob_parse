const parserHtml = require('../../../querySelector_NodeJS_edition');
const { priceCalculation, reduceItem, workingWithName } = require('./transformHtmlToValues');
// My modules

module.exports = function (html, catalogTitle, addToIdx, amirogen, idTitle) {
    
    
    let tableRows = parserHtml(html).querySelectorAll('table.b_items_list tbody tr');
    console.log('Всего элементов - ', tableRows.length);

    amirogen += ';' + catalogTitle + ';;;false;false';

    let data = tableRows.reduce( (res, el, idx) => {
        let sku = getSKU(el);
        let price = getPrice(el);
        
        let { title, htmlBody, seoTitle, seoKeywords } = workingWithName( parserHtml(el.innerHTML).querySelector('span[itemprop="name"]').innerText, catalogTitle );
        
        let imgFileName = idTitle + '_zzmain';
        let imgLink = 'rashodniki/plastiny_tverdosplavnye/' + imgFileName + 'z.jpg';

        
        return res + `${amirogen};${idTitle}${idx + addToIdx};${title};${htmlBody};${price};${imgLink};${imgLink};${imgLink};${sku};${seoTitle};${seoKeywords};${title};false;Китай;На складе\n`;    
    }, '');

    return data;

}

function getNodeInner (nodes, selector, html = false) {
    const query = nodes.length > 1
        ? parserHtml(node.innerHTML).querySelector(selector)
        : parserHtml(node.innerHTML).querySelectorAll(selector)
    return html ? query.innerHTML : query.innerText
}

function getSKU (node) { 
    return parserHtml(node.innerHTML).querySelector('span[itemprop="sku"]').innerText;
}

function getPrice (node) {
    return priceCalculation( parserHtml(node.innerHTML).querySelector('td.bil_price').innerText );
}


