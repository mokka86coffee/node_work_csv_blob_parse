module.exports = {
    priceCalculation,
    reduceItem,
    workingWithName
}

function priceCalculation(price) {
    price = Math.round(price).toFixed(0);
    if (price <= 5000) return price*2;
    else if (price <=10000) return Math.round((price*1.5));
    else if (price < 30000) return +price+5000;
    else if (price >= 30000) return +price*0.25 + +price;
} // Counting price

function reduceItem (param) {
    if (/0/.test(param)) return `0°1' - 0°9'`;
    else if (/1/.test(param)) return `1°1' - 1°9'`;
    else if (/2/.test(param)) return `2°1' - 2°9'`;
    else if (/3/.test(param)) return `3°1' - 3°9'`;
    else if (/4/.test(param)) return `4°1' - 4°9'`;
    return `5°1' - 5°9'`;
} // transform value

function workingWithName (title, catalogTitle) {
    // let kolvoZubiev = name.match(/Z{1}\s?={1}\s?\d{1,3}/gi)[0].replace(/Z{1}\s?={1}\s?/,'');
    // let material = name.match(/кл.т/gi)[0].replace(/Z{1}\s?={1}\s?\d{1,3}\s/,'');
    const dimensionsBuff = title.match(/[\d,]{1,5}\s?х{1}\s?[\d,]{1,5}\s?х{1}\s?[\d,]{1,5}/gi)[0];
    let dimensions = dimensionsBuff.match(/[\d,]{1,6}/gi);
    dimensions = {
        diametr: dimensions[0],
        posadMesto: /,/.test(dimensions[1]) ? dimensions[1] : dimensions[1] + ',0',
        width: dimensions[2]
    };

    let buffer = title
                    .substr( title.indexOf(dimensionsBuff) ) // name deleted
                    .replace(dimensionsBuff, '').trim() // dimensions deleted
                    .replace(/\(.+?\)/,'') // deleted '(F**)'
                    .match(/.+?[\s\(]{1}/g);

    const plotnost = buffer[1] ? buffer[1].replace('(','').trim() : buffer[0].replace('(','').trim();
    const tverdost = buffer[2] ? buffer[2].replace('(','').trim() : '*';

    let description = `${title}', нормальный электрокорунд, плотность - ${plotnost}, твердость - ${tverdost}`;

    title = title.replace(/(cnic|;)/img,'');
    title = title.replace(/&quot{1}(\s)?(&quot)?/img,' ');
    title = title.replace(/(&#39)/img,'\'');
    title = title.replace(/(\n|\s{2,})/img,' ');

    let htmlBody = `<h2>Описание</h2> <p>${title}</p>`
    let seoTitle = title + ' - ' + catalogTitle + " - Каталог оборудования | Станкопромышленная компания";
    let seoKeywords = title.replace(/[\s]+/gi,',').replace(/\(.+\)+?/gi, '').replace(/,{2,}/gi,',');
    
    // let ugolZubaDiap = reduceItem(ugolZuba);
    // fs.appendFileSync('new.json', `${modulZubaDiap}\n`);

    return { title, htmlBody, seoTitle, seoKeywords, ...dimensions, description };
} // splitting title into several different values




    // let grad = name.match(/\d{1,3}(\s)?град/gi)[0].replace(/(\s)?град/gi,'');
    
    // let modulZuba = ~name.indexOf('М') ? name.match(/М{1}\s?\d{1,2},\d{1,2}/gi)[0].replace(/М(\s)?/gi,'') : 'none';
    // let klassTochn = ~name.indexOf('кл\.т\.') ? name.match(/кл\.т\.{1}\s?[авс]+\s?,/gi)[0].replace(/(кл\.т\.(\s)?|,)/gi,'') : 'none';
    // let material = name.match(/кл.т/gi) ? name.match(/кл.т[^,]+?,[^,]+?,/gi)[0].replace(/(кл.т[^,]+?,|,)/gi,'') : 'none';

    // let ugolZuba = name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi) ? name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi)[0] : 'none';