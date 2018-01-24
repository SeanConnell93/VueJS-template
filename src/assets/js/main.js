

/*====================================================
=            Slow bg effect on jumbotrons            =
====================================================*/
 export var SlowBgEffect = function(obj) {
	obj.element ? this.element = obj.element : this.element = '';  
	obj.slowDown ? this.slowDown = obj.slowDown : this.slowDown = 2;
	obj.container ? this.container = obj.container : this.container = '';

	// double check element exists
	if ($(this.element).length <= 0 ) return;

	var containerTop = $(this.container).position().top,
		containerHeight = $(this.container).outerHeight(),
		scrollPos,
		self = this;

	$(document).on('touchstart touchend touchmove scroll', function(){

		self.render(containerTop, containerHeight, scrollPos);
			
	});

};

/*----------  this is run on scroll  ----------*/
SlowBgEffect.prototype.render = function( conTop, conHeight, scrollPos){
	
	scrollPos = $(window).scrollTop();

	if ( scrollPos > conTop && scrollPos < conTop + conHeight ) {
		$(this.element).css({ 
			transform: 'translate3d( 0px, ' + ((scrollPos - conTop) / this.slowDown) + 'px, 0px)'
		});
	}
};

/*=====  End of Slow bg effect on jumbotrons  ======*/


/*===========================================
=            PopIn effect on nav            =
===========================================*/
export var PopIn = function(obj) {

	obj.element ? this.element = obj.element : this.element = '';
	obj.delay ? this.delay = obj.delay : this.delay = 100;
	obj.addClass ? this.addClass = obj.addClass : this.addClass = '';
	obj.hasClass ? this.hasClass = obj.hasClass : this.hasClass = '';

};

PopIn.prototype.run = function() {

	var self = this;

	function addClassDelay(i) {
	  setTimeout(function() { 
	  	$(self.element).eq(i).toggleClass( self.addClass );
	  }, self.delay * (i+1));
	}

	// toggle element class if has this.hasClass 
	if ( !$(this.hasClass).hasClass( this.hasClass ) ) {

		for (var i = 0; i < $(this.element).length; i++) {
			addClassDelay(i);
		}

	} else {
		addClassDelay(200);
	}

}
/*=====  End of PopIn effect on nav  ======*/




/*==============================================
=            handle new loaded data            =
==============================================*/

export var loadMoreData = function(obj, callback) {

	this.dataContainer = obj.dataContainer;
	obj.offset ? this.offset = obj.offset : this.offset = 2;

	this.isRequesting = false;

	var bodyHeight,
		scrollPos;

	$(document).on('scroll', function() {

		this.render(scrollPos, bodyHeight, callback);

	}.bind(this));

}

loadMoreData.prototype.render = function(scrollPos, bodyHeight, callback) {

	scrollPos = $(window).scrollTop() + $(window).height() * this.offset;
	bodyHeight = $('body').height();

	if ( bodyHeight < scrollPos && !this.isRequesting) {

		this.isRequesting = true;
		callback();
		return;
	}
	
}



/*=====  End of handle new loaded data  ======*/




/*=====================================
=            ripple effect            =
=====================================*/

export var Ripple = function(obj) {

	if (!obj.timeOut) obj.timeOut = 600;

	$(document).on('click', obj.element, function(e) {
		$(this).append('<div class="ripple"></div>');

		setTimeout(function() {
			$('.ripple').remove();
		}, obj.timeOut);

	});

}

/*=====  End of ripple effect  ======*/








