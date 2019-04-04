const parserHtml = require('../../../querySelector_NodeJS_edition');
const { priceCalculation, reduceItem, workingWithName } = require('./transformHtmlToValues');
// My modules

module.exports =  (html, catalogTitle, addToIdx, amirogen, idTitle) => {
    
    let tableRows = getNodeInner(html,'table.b_items_list tbody tr');
    console.log('Всего элементов - ', tableRows.length);

    amirogen += ';' + catalogTitle + ';;;false;false';

    let data = tableRows.reduce( (res, el, idx) => {
        const sku = getInfo('sku', el);
        const price = getInfo('price', el);
        const name = getInfo('name', el);
        const { title, htmlBody, seoTitle, seoKeywords } = workingWithName( name, catalogTitle );
        
        let imgFileName = idTitle + '_zzmain';
        let imgLink = 'rashodniki/plastiny_tverdosplavnye/' + imgFileName + 'z.jpg';

        
        return res + `${amirogen};${idTitle}${idx + addToIdx};${title};${htmlBody};${price};${imgLink};${imgLink};${imgLink};${sku};${seoTitle};${seoKeywords};${title};false;Китай;На складе\n`;    
    }, '');

    return data;

}

function getNodeInner (nodes, selector, html = false) {

    if (nodes.length > 1) return parserHtml(node.innerHTML).querySelectorAll(selector);

    const query = parserHtml(node.innerHTML).querySelector(selector);

    return html ? query.innerHTML : query.innerText;
}

function getInfo (param, node) {
    switch (param) {
        case 'sku': return getNodeInner(node.innerHTML, 'span[itemprop="sku"]');

        case 'price': return priceCalculation( getNodeInner(node.innerHTML, 'td.bil_price') );

        case 'name': return getNodeInner(node.innerHTML, 'span[itemprop="name"]');
    }
}


