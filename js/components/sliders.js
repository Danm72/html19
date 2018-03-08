import 'slick-carousel/slick/slick';

export default function(s, $sliders) {

  $(".slider.slider-testimonials").slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: false
  });

  let tm;
  const $clients = $(".slider-clients").slick({
    dots: false,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 200,
    infinite: true
  }).on('mouseover', function(){
    clearTimeout(tm);
    pause( $clients );
  }).on('mouseleave', function(){
    clearTimeout(tm);
    tm = setTimeout(() => {
      play( $clients );
    }, 100 );
  }).on('beforeChange', function( event, slick, currentSlide, nextSlide ){
    $nav.find('a[data-slide]').removeClass('active');
    const $target = $nav.find(`a[data-slide="${nextSlide}"]`);
    $target.addClass('active');
  });

  const $nav = $('.slider-clients-nav');

  $nav.find('a[data-slide]').on('mouseover', function(){
    pause( $clients );
    clearTimeout(tm);
    tm = setTimeout(() => {
      $clients.slick('slickGoTo', $(this).data('slide'));
    }, 200 );
  });

  $nav.on('mouseleave', function(){
    tm = setTimeout(() => {
      play( $clients );
    }, 200 );
  });

}


const pause = ( slider ) => {
  $(slider).slick('slickPause');
}

const play = ( slider ) => {
  $(slider).slick('slickPlay');
}

const enableAutoplay = ( slider ) => {
  $(slider).slick('slickPlay');
}
