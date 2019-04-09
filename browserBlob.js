let getFileFromBlob = (data, config = { type: 'text/plain' }) => {
    let blob = new Blob([JSON.stringify(data)], config);
    let file = URL.createObjectURL(blob);
    
    let link = document.createElement('a'); 
    link.href = file; 
    link.download = 'cilindr_nasad.json'; 
    link.click();
}

let data = Array.from(document.querySelectorAll('.product__name a')).map( el => el.href );
getFileFromBlob(data);