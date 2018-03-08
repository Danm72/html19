export default () => {
  const $img = $('img[data-hero-img]');
  const images = [
    '/img/hero-logo-1.png',
    '/img/hero-logo-2.png',
    '/img/hero-logo-3.png'
  ];

  let loaded = 0;
  $.each( images, function( i, each ){
    loadImage( each ).then(function(){
      loaded++;
      if( loaded === 3 ){
        render( 0 );
      }
    });
  });

  function render(x){
    setTimeout(() => {
      if( images[x] ){
        $img.attr('src', images[x]);
        render(++x);
      }
    }, 1000 );
  }
}

const loadImage = ( url ) => {
  const img = new Image();
  const defer = jQuery.Deferred();
  img.onload = () => {
    defer.resolve( url );
  }
  img.src = url;
  return defer.promise();
}
