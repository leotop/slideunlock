(function($){
$.fn.scrollbar = function (options){
	var defaults = {
		onDrag: function(){return true;},
		onDrop: function () {},
		handle: '.handle'
	}; 
	var o =$.extend({},defaults,options);
	return this.each(function(){
	
		var $this = $(this);
		
		var scrollbar = $this.find('.handle');
		var scrollbar_width = scrollbar.outerWidth(true);
		var viewport_width = $this.parent().width();


		var scrollbar_moving_spaceX = viewport_width - scrollbar_width;

		scrollbar.mousedown(function(e){
			e.preventDefault();
			var x = get_scrollbar_Xpos();
			var lastMouseX	= e.pageX;
			var minMouseX	= e.pageX - x;
			var maxMouseX	= minMouseX + scrollbar_moving_spaceX;


			$(document).on('mousemove', function(e){
				var ex	= e.pageX;
				x = get_scrollbar_Xpos();
				ex = Math.max(ex, minMouseX);
				ex = Math.min(ex, maxMouseX);
				var nx = x + (ex - lastMouseX);
				set_scrollbar_Xpos(nx);
				lastMouseX	= ex;
				if(o.onDrag.call(this,x) === false) $(document).unbind('mousemove');
			});

			$(document).on('mouseup', function(e){
				$(document).unbind('mousemove');
				$(document).unbind('mouseup');
				x = get_scrollbar_Xpos();
				o.onDrop.call(this,x);
			});
		});
		scrollbar.on('touchstart',function(e){



			e.preventDefault();
			var x = get_scrollbar_Xpos();
			var lastMouseX	= e.originalEvent.touches[0].pageX;
			var minMouseX	= e.originalEvent.touches[0].pageX - x;
			var maxMouseX	= minMouseX + scrollbar_moving_spaceX;


			scrollbar.on('touchmove', function(e){
				var ex	= e.originalEvent.touches[0].pageX;
				x = get_scrollbar_Xpos();
				ex = Math.max(ex, minMouseX);
				ex = Math.min(ex, maxMouseX);
				var nx = x + (ex - lastMouseX);
				set_scrollbar_Xpos(nx);
				lastMouseX	= ex;
				if(o.onDrag.call(this,x) === false) scrollbar.unbind('touchmove');
			});

			scrollbar.on('touchend', function(e){
				scrollbar.unbind('touchmove');
				scrollbar.unbind('touchend');
				x = get_scrollbar_Xpos();
				o.onDrop.call(this,x);
			});


		});
		get_scrollbar_Xpos = function(){
			return parseInt(scrollbar.css('left'));
		};

		set_scrollbar_Xpos = function (sdelta) {
			scrollbar.css({left:Math.abs(sdelta) +'px'});
		};


	});	
};
})(jQuery);