let getFileFromBlob = (data, config = { type: 'json' }) => {
	let blob = new Blob([JSON.stringify(data, null, '\t')], config);
	let file = URL.createObjectURL(blob);
	let link = document.createElement('a');
	link.href = file;
	link.download = 'data.json';
	link.click();
};
let data = Array.from(document.querySelectorAll('.product__name a'))
	.map(el => el.href)
	.filter((_, idx) => idx !== 0);
getFileFromBlob(data);


function getUrl(part) {
	let link = document.createElement('a');
	link.setAttribute('href', part);
	console.log(link.href);

}

// work with parsing elements from other sites/pages

(async() => {

	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	document.body.appendChild(iframe);

	const container = document.querySelector('.eshop-item-list__container');
	let href = window.location.href;
		
	for( let offset = 12; ; offset += 12 ) {
		try {
			await new Promise ( resolve => {
		
				src = `${href}&offset=${offset}`;
				iframe.onload = () => {
						
					const items = iframe.contentWindow.document.querySelectorAll('.eshop-item-list__container > span');
					
					if (!items.length) throw Error('no pages left');

					items.forEach( span => container.appendChild(span) );
					resolve();
				
				}

			});
		}
		
		catch(err) {
			console.log(err);
			break;
		}
	}

	document.body.removeChild(iframe);

})();

