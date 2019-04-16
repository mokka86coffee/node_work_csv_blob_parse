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
		
	try {

		while (true) {
			
			iframe.src = 'https://stanok74.ru/katalog/internet-magazin/dlja-listovogo-metalla/gilotinnye-nozhnicy/gidravlicheskie-gilotiny?action=rsrtme&catid=20088&offset=124';
			iframe.onload = () => console.log(iframe.contentWindow);
			
			// console.log(iframe.contentWindow.document.querySelector('.eshop-item-list__container'));
			throw new Error('aaaaaa');
		}

	} catch(err) {
		console.log(err);
	}

})();

