$.fn.displayWindow = function(options) {
    // 'var' as private variable
    var _counter = 0;
    var _totalElement = this.find('li').size();
    var _elementOuterWidth = 0;

    this.flipLeft = function(times){
        times = typeof times !== 'undefined' ? times : 1;
        _counter += times;
        $('.lun-zhuan-item').animate({ left: "-=" + times * _elementOuterWidth + "px" });
    }
    this.flipRight = function(times){
        times = typeof times !== 'undefined' ? times : 1;
        _counter -= times;
        $('.lun-zhuan-item').animate({ left: "+=" + times * _elementOuterWidth + "px" });
    }
    
    // 'this' as public method.. wishfully
    this.resetButton = function(){
        /*
        if ( _totalElement <= 4 ){
            $('.lun-zhuan-button-right').attr('disabled', true);
            $('.lun-zhuan-button-left').prop('disabled', true);
            $('.lun-zhuan-button-left img').attr('src', '/assets/images/ButtonLeftGray.png');
            $('.lun-zhuan-button-right img').attr('src', '/assets/images/ButtonRightGray.png');
            return;          
        }
        */
        $('.lun-zhuan-button-right').attr('disabled', false);
        $('.lun-zhuan-button-left').prop('disabled', false);
        $('.lun-zhuan-button-left img').attr('src', '/assets/images/ButtonLeft.png');
        $('.lun-zhuan-button-right img').attr('src', '/assets/images/ButtonRight.png');
        

        
//        if ( _totalElement - _counter <= 4 ){
        if ( _totalElement - _counter <= 0 ){
            console.log('rightest');
            var move_to = Math.ceil(_totalElement/4) * 4;
            _counter = 0;
            var obj = { left: '+=' +  move_to * _elementOuterWidth + "px" };
//            var obj = { left: '+=' +  500 + "px" };
            console.log(obj);
            $('.lun-zhuan-item').animate(obj);            
        }
        
        
        
        if ( _counter == -4 ){
            console.log("it's me here");
            var move_to = Math.floor(_totalElement/4) * 4;
            _counter = move_to - 4;
            var obj = { left: '-=' +  move_to * _elementOuterWidth + "px" };
//            var obj = { left: '+=' +  500 + "px" };
            console.log(obj);
            $('.lun-zhuan-item').animate(obj);
        }
        
    }
    
    // This is the easiest way to have default options.
    var settings = $.extend({
        // These are the defaults.
        itemClass: '',
        buttonClass: ''
    }, options );
    
  
    this.find('li').wrapAll( "<div class='lun-zhuan-border'></div>");
    
    this.find('li').parent().css({
        // border: '1px solid pink',
        width: 250 * _totalElement + 'px',
    });            
  
    this.find('li').css({ 
        width: '220px',
        position: 'relative',
        float: 'left'
    });
    
    this.find('li').addClass('lun-zhuan-item');
    this.find('li').addClass(settings.itemClass);

    _elementOuterWidth = this.find('li').first().outerWidth(true);

    this.addClass('lun-zhuan-container');
    this.css({
        'list-style': 'none',
        // border: '1px solid orange',
        // width: '970px',
        width: 4 * _elementOuterWidth + 'px',
        padding: '0',
        overflow: 'hidden',
        float: 'left'        
    });

    
    this.find('div').append('<div style="clear: both;"></div>');
    
    this.before("<div><button class='lun-zhuan-button-left'><<</button></div>");
    this.after("<div><button class='lun-zhuan-button-right'>>></button></div>");
    
    $('.lun-zhuan-button-right').parent().after("<div style='clear: both;'></div>");
    
    $('.lun-zhuan-button-left').parent().addClass(settings.buttonClass);
    $('.lun-zhuan-button-right').parent().addClass(settings.buttonClass);

    $('.lun-zhuan-button-left').parent().css({
        float: 'left'
    });
    $('.lun-zhuan-button-right').parent().css({
        float: 'left'
    });

    var self = this;

    // flip twice. let user can click either left or right button
    if ( _totalElement >= 20 ){
        self.flipLeft(8);
    }
    // initialize the buttons    
    self.resetButton();
      _elementOuterWidth = this.find('li').first().outerWidth(true);
      console.log(_elementOuterWidth + 'aya');

    // register the click event for both buttons
    $('.lun-zhuan-button-left').click(function(){
        self.flipRight(4);
        self.resetButton();
    });
    
    $('.lun-zhuan-button-right').click(function(){
        self.flipLeft(4);
        self.resetButton();
    });
};      
