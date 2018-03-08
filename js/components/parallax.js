export default () => {
  const offsets = {};
  $('[data-ease]').each(function(){
    const $el = $( this );
    offsets[$el.offset().top] = $el;
  });

  console.log( offsets );

  $( window ).scroll(function(){
    requestAnimationFrame(scrollHandler);
  });

  const scrollHandler = () => {
    const st = $( window ).scrollTop() + 100;
    for(var x in offsets ){
      const $el = offsets[x];
      if( st >= x ){
        $el.addClass('in');
        setTimeout(() => {
          $el.addClass('in-complete');
        }, 1000 );
      }
    }
  }
}
