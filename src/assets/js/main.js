

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
	scrollPos;
	
	$(document).on('touchstart touchend touchmove scroll', function(){
		
		this.render(containerTop, containerHeight, scrollPos);
		
	}.bind(this));
	
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
	
	let self = this;
	
	function addClassDelay(i) {

		setTimeout( function() { 
			// the "this" value dosen't work here, even with bind, weird?
			$(self.element).eq(i).toggleClass( self.addClass );
		}.bind(this), self.delay * (i+1));

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
	
	let bodyHeight, scrollPos;
	
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








/*=======================================
	Makes elements appear by adding class
=            SELF ACTIVATING            =
=======================================*/
export var Appear = function(obj){

	this.element = obj.element; // STRING element that will trigger and get class added to
	this.addClass = obj.addClass; // STRING class that will be added

	// required for show_all_children
	this.trigger = obj.trigger;

	obj.variant ? this.variant = obj.variant : this.variant = 'show_element'; // STRING function name to call

	// === for show_element method only ===
	// OPT BOOL whether to remove old element after class was added 
	obj.remove_old_class ? this.remove_old_class = obj.remove_old_class : this.remove_old_class = false;

	// INT OPT delay some classes being added to a element
	obj.delay ? this.delay = obj.delay : this.delay = 800;

	// OPT INT how far the element must be on screen before being triggered. e.g 100px from the bottom
	obj.offset ? this.offset = obj.offset : this.offset = 100;

	// render selected func when scrolled
	var self = this;
	$(document).on('scroll', function(){
		switch(self.variant){
			default:
			case 'show_element':
				self.show_element();
			break;
			case 'show_all_elements':
				self.show_all_elements();
			break;
			case 'show_all_children':
				self.show_all_children();
			break;
		}
	});
};

/*========================================================================================
=            adds class to all children of trigger with a delay on each child when in view           =
========================================================================================*/
Appear.prototype.show_all_children = function(){

	var _self = this; // keep context of Appear constructor

	$(_self.trigger).each(function(){

        var top_of_el = $(this).offset().top - ($(window).height() - _self.offset),
        	scroll_pos = $(window).scrollTop(),
        	_trigger = this; // keep context of this trigger element

        if ( scroll_pos > top_of_el ){
    		$(_self.trigger).children(_self.element).each(function(i){
    			var _child = this; // keep context of this child element
    			setTimeout(function(){
    				$(_trigger).children(_child).eq(i).addClass(_self.addClass);
    			}, _self.delay * (i+1) );
    		});
        } 
    });
};



/*================================================================
=            fades in element when X amount on screen            =
================================================================*/
Appear.prototype.show_element = function(){
	var i = 0,
		top_of_el,
		element = $(this.element),
    	scroll_pos = $(window).scrollTop(),
    	element_lenght = element.length;

	for (i; i < element_lenght; i++) {
		top_of_el = element.eq(i).offset().top - ($(window).height() - this.offset);

		if ( scroll_pos > top_of_el ){
            element.eq(i).addClass(this.addClass);
            if ( this.remove_old_class ) element.eq(i).removeClass(this.element.replace('.', ''));
        }
	}
};


/*=====================================================================
=            fades in all elements when x amount on screen            =
=====================================================================*/
Appear.prototype.show_all_elements = function(){
	var _self = this,
		srcoll_pos = $(window).scrollTop(),
		element_exists = $(_self.element).length;
		
	if ( element_exists ) {
		var top_of_element = $(_self.element).offset().top - ($(window).height() - _self.offset);

        if (srcoll_pos > top_of_element) {
	        $( _self.element ).each(function(i){
	            setTimeout( function(){
	               $(_self.element).eq(i).addClass( _self.addClass );
	            }, _self.delay * (i+1));
	        });
    	}   
    }
};








