

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

export var loadMoreData = function(obj) {

	this.data = obj.data;
	this.addData = obj.addData;
	obj.offset ? obj.offset = this.offset : this.offset = 1000;

	this.isRequesting = false;

	var bodyHeight  = $('#posts').height(),
		scrollPos = $(window).scrollTop();


	$(document).on('scroll', function() {

		this.render(scrollPos, bodyHeight);

	}.bind(this));

}

loadMoreData.prototype.render = function(scrollPos, bodyHeight) {

	scrollPos = $(window).scrollTop();
	bodyHeight = $('#posts').height();

	if ( bodyHeight < (scrollPos + $(window).height()) && !this.isRequesting ) {

		this.isRequesting = true;

		return this.data = this.addData;


	}
	

}


/*=====  End of handle new loaded data  ======*/




/*=====================================
=            ripple effect            =
=====================================*/

export var Ripple = function(obj) {

	this.element = obj.element;

	if (!obj.timeOut) obj.timeOut = 600;

	$(document).on('click', this.element, function(e) {
		$(this).append('<div class="ripple"></div>');

		setTimeout(function() {
			$('.ripple').remove();
		}, obj.timeOut);

	});

}

/*=====  End of ripple effect  ======*/








