export default () => {

  $( window ).scroll(() => {
    window.requestAnimationFrame(scrollHandler);
  });

  scrollHandler();
}

export const bindScrollLock = () => {
  $( window ).on('resize', () => {
    window.requestAnimationFrame(() => {
      scrollLock( false );
    });
  });
  scrollLock( true );
}

const scrollHandler = () => {
  const w = $( window ).height();
  if( $(window).scrollTop() > w ){
    $('html').addClass('hero-fixed');
    if( $(window).scrollTop() > w*2 ){
      $('html').addClass('hero-fixed-last');
    } else {
      $('html').removeClass('hero-fixed-last');
    }
  } else {
    $('html').removeClass('hero-fixed hero-fixed-last');
  }
}

const scrollLock = ( init ) => {
  $('div[data-scroll-lock').each(function(){
    const $scrollLock = $(this);
    const width = $scrollLock.width() - 200;
    const margin = 2;
    var item = width / 3;
    if( item < 300 ){
      item = 300;
    }

    $scrollLock.find('[data-item]').width( item - margin ).height( item );
    $scrollLock.find('[data-brand]').width( 200 ).height( item );
    $scrollLock.find('.scrollable').width( item*3 + 200 );

    const start = $scrollLock.data('start');

    if( start === 'end' ){
      $scrollLock.scrollLeft(2000);
    }

    if( init ){
      bindScroll( $scrollLock );
    }
  });
}

const bindScroll = ( $scrollLock ) => {
  let tm;
  const $all = $('div[data-scroll-lock');
  const others = $all.not($scrollLock);
  $scrollLock.on('scroll', function( event ){
    $all.off('scroll');
    others.each(function(){
      const other = $( this );
      const left = other.scrollLeft();
      const dir = other.data("start") === 'end' ? -10 : 10;
      other.animate({ scrollLeft: left + dir }, 'slow', () => {
        setTimeout(() => {
          $all.each(function(){
            bindScroll($(this));
          });
        }, 1000 );
      });
    });
  });
}
