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
		
	await new Promise( resolve => {
		const container = document.querySelector('.eshop-item-list__container');
		let href = window.location.href;
		try {

			for( let offset = 12222; ; offset += 12 ) {
				
				iframe.src = `${href}&offset=${offset}`;
				iframe.onload = () => {
					const items = iframe.contentWindow.document.querySelectorAll('.eshop-item-list__container > span');
					items.forEach( span => container.appendChild(span) );
					resolve();
				}
				
				// console.log(iframe.contentWindow.document.querySelector('.eshop-item-list__container'));
				throw new Error('aaaaaa');
			}
	
		} catch(err) {}

	});

	document.body.removeChild(iframe);

})();

