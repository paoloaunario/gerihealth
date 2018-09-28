import * as Swiper from 'swiper';

new (Swiper as any).default('.swiper-container', {
	loop: true,
	noSwipingClass: 'no-swiping',
	slidesPerView: 'auto',

	autoplay: {
		delay: 5000,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	pagination: {
		clickable: true,
		el: '.swiper-pagination',
	},
});
