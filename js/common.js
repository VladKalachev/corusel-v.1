$(document).ready(function() {

(function( $ ) {
	$.fn.slideshow = function( options ) {
		options = $.extend({
			wrapper: ".slider-wrapper",
			previous: ".slider-previous",
			next: ".slider-next",
			slides: ".slide",
			nav: ".slider-nav",
			speed: 500,
			easing: "linear"
			
		}, options);
		
		var slideTo = function( slide, element ) { // отвечает за анимацию слайдов 
			var $currentSlide = $( options.slides, element ).eq( slide );
			
			$( options.wrapper, element ).
			animate({
				left: - $currentSlide.position().left
			}, options.speed, options.easing );	
			
		};
		
		return this.each(function() {
			var $element = $( this ),
				$previous = $( options.previous, $element ),
				$next = $( options.next, $element ),
				index = 0,
				total = $( options.slides ).length;
				
				$( options.slides, $element ).width( $( window ).width() ).each(function() {
					var $slide = $( this );
					var image = $slide.data( "image" );
					$slide.css( "backgroundImage", "url(" + image + ")" );
				});
				$( options.wrapper, $element ).width( $( window ).width() * total );
				
				$element.hover(function() {
					$( options.nav, $element ).stop( true, true ).show();	// показывает анимацию элемента
				}, function() {
					$( options.nav, $element ).stop( true, true ).hide();	// скрывает анимацию элемента
					
				});
				
			$next.on( "click", function() { // обработка события нажатие кнопки вперед
				index++;
				$previous.show(); //анимация вперед
				
				if( index == total - 1 ) {
					index = total - 1;
					$next.hide();	
				}
				
				slideTo( index, $element );	
				
			});
			
			$previous.on( "click", function() { // обработка события нажатие кнопки назад
				index--;
				$next.show();
				
				if( index == 0 ) {
					index = 0;
					$previous.hide();	
				}
				
				slideTo( index, $element );	
				
			});

			
		});
	};
	
	$(function() {
		$( "#main-slider" ).slideshow();
		
	});
	
})( jQuery );


	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				
				$("#form").trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
