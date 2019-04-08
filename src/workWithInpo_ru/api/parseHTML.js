const parserHtml = require('../../../querySelector_NodeJS_edition');
const { priceCalculation, reduceItem, workingWithName } = require('./transformHtmlToValues');
// My modules

module.exports =  (html, catalogTitle, addToIdx, amirogen, idTitle, testStr ) => {
    
    let tableRows = parserHtml(html).querySelectorAll('table.b_items_list tbody tr');
    console.log("\x1b[37m",'Всего элементов - ', "\x1b[32m", tableRows.length);

    testStr =   testStr && RegExp(testStr, 'gim') 
                || 
                RegExp(/.+/, 'gim');

    let data = tableRows.reduce( (res, el, idx) => {

        const name = getInfo('name', el);
       

        if ( !testStr.test(name) ) return res;

        const sku = getInfo('sku', el);
        const price = getInfo('price', el);

        const { title, htmlBody, seoTitle, seoKeywords } = workingWithName( name, catalogTitle );
        
        let imgFileName = idTitle + '_zzmain';
        let imgLink = 'rashodniki/izmeritelnyy_instrument/' + imgFileName + addToIdx + '.jpg';

        return res + `${amirogen};${idTitle}${idx + addToIdx};${title};${htmlBody};${price};${imgLink};${imgLink};${imgLink};${sku};${seoTitle};${seoKeywords};${title};false;Китай;На складе\n`;    
            
    }, '');

    return data;

}

function getNodeInner (node, selector, html = false) {

    const query = parserHtml(node.innerHTML).querySelector(selector);

    return html ? query.innerHTML : query.innerText;
}

function getInfo (param, node) {
    switch (param) {
        case 'sku': return getNodeInner(node, 'span[itemprop="sku"]');

        case 'price': return priceCalculation( getNodeInner(node, 'td.bil_price') );

        case 'name': return getNodeInner(node, 'span[itemprop="name"]');
    }
}


