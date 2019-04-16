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
	const pager = document.querySelector('.pager');
	const btnShowAll = document.createElement('button');
	btnShowAll.className = 'btn btn-info';
	btnShowAll.innerText = 'Показать все';
	pager.appendChild(btnShowAll);

	const href = window.location.href;
		
	for( let offset = 12; ; offset += 12 ) {
		// pager.innerHTML = '<p>Загрузка...</p>';

		try {
			await new Promise ( (resolve,reject) => {
		
				iframe.src = `${href}&offset=${offset}`;
				iframe.onload = () => {
						
					const items = iframe.contentWindow.document.querySelectorAll('.eshop-item-list__container > span');
					
					if (!items.length) reject( Error('no pages left') );

					items.forEach( span => container.appendChild(span) );
					resolve();
				
				}

			});
		}
		
		catch(err) {
			// pager.style.display = 'none';
			break;
		}
	}

	// document.body.removeChild(iframe);

})();

jQuery(document).ready(function($){

	let catMenuLinks = document.querySelectorAll('.menu_catAll--first_lvl a');
	let  menuSmCatIcon_LinkFollow = function(e) {
		 if (e.target.href) { location.assign(e.target.href) }
	}
	catMenuLinks.forEach(el=>el.addEventListener('click', menuSmCatIcon_LinkFollow) );

  //-----------------Видос на главной
	$('.block3-sliderr').hover(
		function(){ 
			 $(this).addClass('video-vstavka'); 
		}, 
		function(){ 
			 $(this).addClass('video-vstavka'); 
		});
  //-----------------Видос на главной

  //-----------------Перемещение поиска
	
  if ( document.documentElement.clientWidth < 816 ) { 
	let search = document.querySelector('[name="small_search"]');
	let lay_f1 = document.querySelector('#lay_f2');
	lay_f1.append(search);
  }

  //-----------------Перемещение поиска

  //-----------------Раскрытие меню

  if ( document.documentElement.clientWidth < 816 ) { 
	let menu_catAll = document.querySelector('.menu_catAll');
	let mobileMenu = document.querySelector('.mobile-menu');

	menu_catAll.addEventListener('click',(e)=>{
		 menu_catAll.classList.toggle('mobile-catalog--opened');
		 mobileMenu.classList.remove('mobile-menu--opened'); 
		 return false;
	});

	mobileMenu.addEventListener('click',(e)=>{
		 mobileMenu.classList.toggle('mobile-menu--opened'); 
		 menu_catAll.classList.remove('mobile-catalog--opened');
		 return false;
	});
  }

  //-----------------Раскрытие меню



//    <!-- Скрытие email -->
	  jQuery('.name_bttm:contains(info@stanok74.ru)').text('')
		  .append('<div class="btn btn-info">Показать e-mail</div>')
		  .on('click', function(){yaCounter21066178.reachGoal('SHOW_EMAIL_PRESSED');});
	  jQuery('.name_bttm div.btn').on('click',function(){
		  jQuery(this).hide().parent().text('info@stanok74.ru');
		  
	  });
//    <!-- Скрытие email -->

});

{
	(async() => {

		let iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
	
		const container = document.querySelector('.eshop-item-list__container');
		const pager = document.querySelector('.pager');
		const btnShowAll = document.createElement('button');
		btnShowAll.className = 'btn btn-info';
		btnShowAll.innerText = 'Показать все';
		pager.appendChild(btnShowAll);
	
		const href = window.location.href;
			
		for( let offset = 12; ; offset += 12 ) {
			// pager.innerHTML = '<p>Загрузка...</p>';
	
			try {
				await new Promise ( (resolve,reject) => {
			
					iframe.src = `${href}&offset=${offset}`;
					iframe.onload = () => {
							
						const items = iframe.contentWindow.document.querySelectorAll('.eshop-item-list__container > span');
						
						if (!items.length) reject( Error('no pages left') );
	
						items.forEach( span => container.appendChild(span) );
						resolve();
					
					}
	
				});
			}
			
			catch(err) {
				// pager.style.display = 'none';
				break;
			}
		}
	
		// document.body.removeChild(iframe);
	
	})();
}