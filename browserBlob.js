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
	if (document.getElementsByClassName.length) {
  
	  const pager = document.querySelector('.pager');
	  const btnShowAll = document.createElement('button');
	  btnShowAll.className = 'btn btn-info ml-4 btn-showall';
	  btnShowAll.innerText = 'Показать все';
	  btnShowAll.onclick = iframeLoad;
  
	  try { 
		pager.appendChild(btnShowAll); 
	  } catch(err) {
  
	  }
  
	  let iframe = document.createElement('iframe');
	  iframe.style.display = 'none';
	  document.body.appendChild(iframe);
  
	  async function iframeLoad() {
	  
		const container = document.querySelector('.eshop-item-list__container');
	  
		let href = document.querySelector('.pager__button.pager__button_state_active').nextSibling.href; 
		href = href.substr(0, href.length - 2);
		pager.removeChild(btnShowAll);
		pager.innerHTML = '<p>Загрузка...</p>';
  
		for( let offset = 12; ; offset += 12 ) {
	  
		  try {
			await new Promise ( (resolve,reject) => {
		  
			  iframe.src = `${href}&offset=${offset}`;//?action=rsrtme&catid=20088&offset=12
  
			  iframe.onload = () => {
				  
				const items = iframe.contentWindow.document.querySelectorAll('.eshop-item-list__container > span');
				
				if (!items.length) reject( Error('no pages left') );
	  
				items.forEach( span => container.appendChild(span) );
				resolve();
			  
			  }
	  
			});
		  }
		  catch(err) {
			pager.style.display = 'none';
			break;
		  }
		}
	  
		document.body.removeChild(iframe);
	  
	  } // iframeLoad
  
	} // if
  }

https://stanok74.ru/katalog/internet-magazin/dlja-listovogo-metalla/gidravlicheskie-pressy/vertikalno-gibochnye-s-chpu?&catid=20093&ext_custom_75[]=Более%203100&search_subcats=1&pf=1&flt_force_values=1&action=search&search_subcats=1
https://stanok74.ru/katalog/internet-magazin/dlja-listovogo-metalla/gidravlicheskie-pressy/vertikalno-gibochnye-s-chpu?&catid=20093&ext_custom_75[]=Более%203100&search_subcats=1&pf=1&flt_force_values=1&action=search&search_subcats=1&action=search&offset=12&pf=1&flt_force_values=1&submit_url=https%3A%2F%2Fstanok74.ru%2Fkatalog