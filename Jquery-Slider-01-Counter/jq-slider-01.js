$(() => {
    let path = 'img/';
    let image = ['koshka.jpg', 'dubai.jpg', 'covid.jpg', 'maldivi.jpg', 'ozero.jpg', 'tayga.jpg', 'vecher.jpg', 'voda.jpg', 'zakat.jpg'];
    let x = 0;
    let timer = setTimeout(change, 300);

    const slider = $('#mySlider01');

    slider
        .css({
            position: 'relative',
            margin: 'auto',
            width: '95%',
            height: '80vh',
            'box-shadow': '0 0 10px #666',
            overflow: 'hidden',
            'background': 'url(' + path + image[x] + ') center/cover'
        })
        .append('<div id = "slide"></div>')
        .append('<div id = "tumbs"></div>')
        .append('<p id = "p"></p>') // Adding a counter 
        .click((e) => {
            change(e.pageX < $(window).width() / 2 ? -1 : 1);
        })

    const slide = $('#slide');

    slide.css({
        position: 'absolute',
        left: slider.width(),
        width: slider.width(),
        height: slider.height(),
        'background': '#eee center/cover'
    })

    const tumbs = $('#tumbs');

    tumbs.css({
        position: 'absolute',
        bottom: '0',
        width: '100%',
        display: 'flex',
        'justify-content': 'center'
    })

    image.forEach(item => tumbs.append('<img src="' + path + item + '" />' ) );

    tumbs.children()
        .css({
            width: '30px',
            height: '30px',
            'border-radius': '50%',
            border: '2px solid #fff',
            margin: '10px',
            cursor: 'pointer',
            transition: '.2s'
        })
        .mouseenter(function(){
            tumbsScale( $(this), 1.3);
            $(this).css({ border: '2px solid #00FF00' });
        })
        .mouseleave(function(){
            tumbsScale( $(this), 1);
            $(this).css({ border: '2px solid #fff' });
        })
        .click(function(e){
            e.stopPropagation();
            x = $(this).index();
            change(0);
        })

    function change(d = 1) {
        clearTimeout(timer);
        x += d;
        if( x > image.length - 1) x = 0;
        if( x < 0) x = image.length - 1;

        slide
            .css({
                left: ( d ? d : 1 ) * slider.width(),
                'background-image': 'url(' + path + image[x] + ')'
            })
            .animate({left: 0}, 'slow', () => {
                slider.css('background-image', 'url(' + path + image[x] + ')');
                tumbsScale(tumbs.children(), 1);
                tumbsScale(tumbs.children().eq(x), 1.3);
            })  

        timer = setTimeout(change, 3000);
    }

    function tumbsScale(elem, coof){
        elem.css({
            transform: 'scale(' + coof + ')', 
        })
    }

    // Adding a counter

    let p = $('#p');
    let count = setTimeout(changeNum, 300);
   

    function changeNum(){

        clearTimeout(count);

        $('p').html(x+1 + '/9')
        
        p.css({
        position: 'absolute',
        font: 'italic bold 1.3em Lucida Handwriting, Cursive',
        color: 'white',
        padding: '10px'
        })
        count = setTimeout(changeNum, 3000);

    }
})