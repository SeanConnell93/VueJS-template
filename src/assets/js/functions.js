

$(document).ready(function(){


	new Nav_scroll({
		element: '.navbar-default',
		toggleClass: 'hide-navbar'
	});

	

	
	new Slow_text({
		slow_down: 2,
		scale_img: true
	});

	new Appear({
		element: '.element_hide',
		addClass: 'element_show',
		offset: window.innerHeight / 8,
		remove_old_class: true
	});

	new Slow_bg({
		element: '#slow_bg',
		variant: 'background'
	});

	// new Slow_bg({
	// 	element: '.text_parallax',
	// 	variant: 'forground',
	// 	slow_down: 3
	// });

});




/*=======================================
makes background element move slower when in view
=            SELF ACTIVATING            =
=======================================*/
var Slow_bg = function(obj) {
	obj.element ? this.element = obj.element : this.element = '#Slow_bg';  
	obj.slow_down ? this.slow_down = obj.slow_down : this.slow_down = 2;
	obj.variant ? this.variant = obj.variant : this.variant = 'background';
	obj.container ? this.container = obj.container : this.container = '.jumbotron-full';
	if ($(this.element).length <= 0 ) return;

	this.container_top = $(this.container).position().top;
	this.container_height = $(this.container).outerHeight();
	this.scroll_pos;

	

	// gets computed translateY
	if (this.variant === 'background') this.element_half = $(this.element).css('transform').split('(')[1].split(')')[0].split(',')[5];

	var self = this;
	$(document).on('touchstart touchend touchmove scroll', function(){
		self.scroll_pos = $(window).scrollTop();
		switch(self.variant){
			case 'background':
				self.background();
			break;
			case 'forground':
				self.forground();
			break;	
		}		
	});
};

/*----------  this is used for relative positioned forground elements  ----------*/
Slow_bg.prototype.forground = function(){
	var slow_move = this.scroll_pos - this.container_top;

	if ( this.scroll_pos > this.container_top && this.scroll_pos < this.container_top + this.container_height ) {
		$(this.element).css({ 
			transform: 'translate3d( 0px, ' + (slow_move / this.slow_down) + 'px, 0px)'
		});
	}
};

/*----------  this is used for absolute positioned background elements  ----------*/
Slow_bg.prototype.background = function(){
	var slow_move = this.scroll_pos - this.container_top;

	if ( this.scroll_pos > this.container_top && this.scroll_pos < this.container_top + this.container_height ) {
		$(this.element).css({ 
			transform: 'translate3d( -50%, -' + (-this.element_half - slow_move / this.slow_down) + 'px, 0px)'
		});
	}
};






/*=========================================================================================
									 SELF ACTIVATING
=            creates a parallax effect with slow moving text and scaling bg            =
=========================================================================================*/
var Slow_text = function(obj){

	// find values when instantiated but check if container exists 
	this.container = $('.jumbotron-half');
	if ( this.container.length <= 0 ) return;
	this.container_top = this.container.position().top;
	this.container_height = this.container.outerHeight();
	this.image = $('.jumbotron-half--img');
	this.image_opacity = this.image.css('opacity'); // get rendered opacity value of image

	// set defaults
	obj.element ? this.element = $(obj.element) : this.element = '#parallax-scroll'; // STRING class(es) name
	obj.slow_down ? this.slow_down = obj.slow_down : this.slow_down = 2; // INT
	obj.img_scale_speed ? this.img_scale_speed = obj.img_scale_speed : this.img_scale_speed = 4; // INT
	obj.scale_img ? this.scale_img = obj.scale_img : this.scale_img = false; // BOOL

	var self = this;
	$(document).on('touchstart touchend touchmove scroll', function() {
	    self.render();
	});	

};

Slow_text.prototype.render = function(){
	var scroll_pos = $(window).scrollTop(),
		slow_move = scroll_pos - this.container_top; // how far past the element

	// check if container is near the top first, then check if it has past the users screen
	if ( scroll_pos > this.container_top && scroll_pos < this.container_top + this.container_height ) {

		$(this.element).css({ 
			transform: 'translate3d( -50%, ' + (slow_move / this.slow_down) + 'px, 0px)',
			opacity: 1 - slow_move / this.container_height
		});

		// if img is set to true it will scale
		if ( this.scale_img ) {
			this.image.css({
				transform: 'translate(-50%, -50%) scale(' + (1 + slow_move / this.container_height / this.img_scale_speed) + ')',
				opacity: this.image_opacity - slow_move / this.container_height / this.img_scale_speed
			});
		}
	}

	// reset if in view or above
	if ( scroll_pos < this.container_top ) {
		$(this.element).css({
			opacity: 1,
			transform: 'translate3d(-50%, 0px, 0px)'
		});

		this.image.css({
			transform: 'translate(-50%, -50%) scale(1)',
			opacity: this.image_opacity
		});
	}
};





/*=======================================
	Makes elements appear by adding class
=            SELF ACTIVATING            =
=======================================*/
var Appear = function(obj){

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





/*====================================================================================
								SELF ACTIVATING
=            toogle a class based on whether user is scrolling up or down            =
====================================================================================*/
var Nav_scroll = function(obj) {
	this.element = obj.element; // STRING element to add class to.
	this.toggleClass = obj.toggleClass; // STRING name of class to add

	//	OPT INT for a delay on the class removing and adding in ms
	obj.delay ? this.delay = obj.delay : this.delay = 100;

	// do not change
	this.last_scroll_amount = 0;

	var self = this;

	$(document).on('scroll', function() {
	    self.render();
	});

};
/*==============================================================
=            call this method with the scroll event            =
==============================================================*/
Nav_scroll.prototype.render = function(){
	var self = this,
		mobile_is_open = $(self.element).children('.in').length,
		new_scroll_amount = $(window).scrollTop();
	
	if ( mobile_is_open <= 0 ) {
		if ( self.last_scroll_amount > new_scroll_amount ) {
			setTimeout(function(){
				$(self.element).removeClass(self.toggleClass);
			}, self.delay);
		} else {
			setTimeout(function(){
				$(self.element).addClass(self.toggleClass);
			}, self.delay);
		}
	}

	this.last_scroll_amount = new_scroll_amount;

};









