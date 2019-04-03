module.exports = {
    priceCalculation,
    reduceItem,
    workingWithName
}

function priceCalculation(price) {
    price = Math.round(price).toFixed(0);
    if (price <= 5000) return price*2;
    if (price <=10000) return Math.round((price*1.5));
    if (price > 10000) return +price+5000;
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
    // let diametr = name.match(/град{1},?\s{1}[^х]+х/gi) ? name.match(/град{1},?\s{1}[^х]+х/gi)[0].replace(/(град{1},?\s{1}|х)/gi,'') : 'none';
    // let dlina = name.match(/\d{1,3},?\d{1,3}\s?х/gi)[1].replace('х','');
    // let grad = name.match(/\d{1,3}(\s)?град/gi)[0].replace(/(\s)?град/gi,'');
    
    // let modulZuba = ~name.indexOf('М') ? name.match(/М{1}\s?\d{1,2},\d{1,2}/gi)[0].replace(/М(\s)?/gi,'') : 'none';
    // let klassTochn = ~name.indexOf('кл\.т\.') ? name.match(/кл\.т\.{1}\s?[авс]+\s?,/gi)[0].replace(/(кл\.т\.(\s)?|,)/gi,'') : 'none';
    // let material = name.match(/кл.т/gi) ? name.match(/кл.т[^,]+?,[^,]+?,/gi)[0].replace(/(кл.т[^,]+?,|,)/gi,'') : 'none';

    // let ugolZuba = name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi) ? name.match(/\s?\d{1,2}°{1}\s?\d{1,3}/gi)[0] : 'none';

    title = title.replace(/(cnic|;)/ig,'');
    title = title.replace(/&quot{1}(\s)?(&quot)?/ig,' ');
    title = title.replace(/(&#39)/ig,'\'');
    let htmlBody = `<h2>Описание</h2> <p>${title}</p>`
    let seoTitle = title + ' - ' + catalogTitle + " - Каталог оборудования | Станкопромышленная компания";
    let seoKeywords = title.replace(/[\s]+/gi,',').replace(/\(.+\)+?/gi, '').replace(/,{2,}/gi,',');
    
    // let ugolZubaDiap = reduceItem(ugolZuba);
    // fs.appendFileSync('new.json', `${modulZubaDiap}\n`);

    return { title, htmlBody, seoTitle, seoKeywords };
    // return `${name};${htmlBody};${seoTitle};${diametr};${modulZuba};${klassTochn};${material};${ugolZuba};${ugolZubaDiap}`;
} // splitting title into several different values