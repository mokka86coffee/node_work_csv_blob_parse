let getFileFromBlob = (data, config = { type: 'json' }) => {
    let blob = new Blob([JSON.stringify(data, null, '\t')], config);
    let file = URL.createObjectURL(blob);
    
    let link = document.createElement('a'); 
    link.href = file; 
    link.download = 'data.json'; 
    link.click();
}

let data = Array.from(document.querySelectorAll('.product__name a')).map( el => el.href ).filter( (_,idx) => idx !== 0);
getFileFromBlob(data);