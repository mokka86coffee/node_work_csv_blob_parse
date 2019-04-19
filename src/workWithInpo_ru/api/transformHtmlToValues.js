module.exports = {
    priceCalculation,
    workingWithName
}

function priceCalculation(price) {
    price = Math.round(price).toFixed(0);
    if (price <= 5000) return price*2;
    else if (price <=10000) return Math.round((price*1.5));
    else if (price < 30000) return +price+5000;
    else if (price >= 30000) return +price*0.25 + +price;
} // Counting price

function reduceItemRegexp (str, chkArr, resArr) {
    for(let i = 0, L = chkArr.length; i<L; i++) {
        if ( (new RegExp(chkArr[i])).test(str) ) return resArr[i]
    }
} // transform value

function reduceItemMath (param, chkArr, resArr) {
    for(let i = 0, L = chkArr.length; i<L; i++) {
        if ( chkArr[i] >= +param.replace(/,/,'.') ) return resArr[i]
    }
} // transform value

function workingWithName (title, catalogTitle) {
    // let kolvoZubiev = name.match(/Z{1}\s?={1}\s?\d{1,3}/gi)[0].replace(/Z{1}\s?={1}\s?/,'');
    // let material = name.match(/кл.т/gi)[0].replace(/Z{1}\s?={1}\s?\d{1,3}\s/,'');
    console.log(title);
    const dimensionsBuff = title.match(/[\d,]{1,5}\s?х{1}\s?[\d,]{1,5}\s?х?\s?[\d,]?/gi)[0];
    let dimensions = dimensionsBuff.match(/[\d,]{1,6}/gi);

    dimensions = {
        diametr: dimensions[0],
        // posadMesto: dimensions[1],
        posadMesto: /,/.test(dimensions[1]) ? dimensions[1] : dimensions[1] + ',0', // adding ',0'
        width: dimensions[2],
        diapDiametrov: reduceItemMath( dimensions[0], [200, 500], ['100 - 200','210 - 500'] ),
        diapPosad: reduceItemMath( dimensions[1], [2.9, 5], ['1,0 - 2,9','3,0 - 5,0'] ),
        // diapWidth: reduceItemMath( dimensions[2], [30, 40], ['20 - 30','31 - 40'] ),
        material: reduceItemRegexp( title, ['метал', 'камн', 'рельс'], ['Для металла', 'Для камня', 'Для рельс'] )
    };

    let buffer = title
                    .substr( title.indexOf(dimensionsBuff) ) // name deleted
                    .replace(dimensionsBuff, '').trim() // dimensions deleted
                    .replace(/\(.+?\)/,'') // deleted '(F**)'
                    .match(/.+?[\s\(]{1}/g);

    const plotnost = buffer[1] ? buffer[1].replace('(','').trim() : buffer[0].replace('(','').trim();
    // const shlifzernoFilter = reduceItemMath( plotnost.replace(/[\D]/g,''), [16, 100], ['4Н - 16Н','25Н - 100Н'] );
    // const tverdost = buffer[2] ? buffer[2].replace('(','').trim() : '*';


    title = title.replace(/cnic/img,'');
    title = title.replace(/&quot;/img,' ');
    title = title.replace(/(&#39)/img,'\'');
    title = title.replace(/(\n|\s{2,})/img,' ');

    let description = `${title}', нормальный электрокорунд, материал - ${plotnost}`;

    let htmlBody = `<h2>Описание</h2> <p>${description}</p>`
    let seoTitle = title + ' - ' + catalogTitle + " - Каталог оборудования | Станкопромышленная компания";
    let seoKeywords = title.replace(/[\s]+/gi,',').replace(/\(.+\)+?/gi, '').replace(/,{2,}/gi,',');
    
    // fs.appendFileSync('new.json', `${modulZubaDiap}\n`);

    return { title, htmlBody, seoTitle, seoKeywords, ...dimensions };
} // splitting title into several different values




    // let grad = name.match(/\d{1,3}(\s)?град/gi)[0].replace(/(\s)?град/gi,'');
    
    // let modulZuba = ~name.indexOf('М') ? name.match(/М{1}\s?\d{1,2},\d{1,2}/gi)[0].replace(/М(\s)?/gi,'') : 'none';
    // let klassTochn = ~name.indexOf('кл\.т\.') ? name.match(/кл\.т\.{1}\s?[авс]+\s?,/gi)[0].replace(/(кл\.т\.(\s)?|,)/gi,'') : 'none';
    // let material = name.match(/кл.т/gi) ? name.match(/кл.т[^,]+?,[^,]+?,/gi)[0].replace(/(кл.т[^,]+?,|,)/gi,'') : 'none';

    // let ugolZuba = name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi) ? name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi)[0] : 'none';