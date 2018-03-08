export default () => {

  $.get('/php/twitter.php?query=default').then((data) => {
    const trends = data[0].trends;
    renderTrendImages(renderTrends(trends));
  });

}


const renderTrends = ( data ) => {
  let str = '';
  const result = [];
  for(var x = 0; x < 8; x++ ){
    if( !data[x] ){ break; }
    const trend = data[x].name;
    const count = data[x].tweet_volume;
    str += `<li><a href="${data[x].url}" target="_blank">${trend}</a><span>${count||''}</span></li>`;
    result.push(data[x]);
  }
  $('ul[data-trends]').html(str);
  return result;
}

const renderTrendImages = ( trendData ) => {

  let images = [];
  let imagesLoaded = [];
  let index = {};
  let tm;

  (function loop( i ){
    if( !trendData[i] && !tm ){
      start();
      return;
    }
    var q = trendData[i].name;
    $.get(`/php/twitter.php?query=images&q=${encodeURIComponent(q)}`).then((data) => {
      $.each(data.statuses, function( i, each ){
        if( each.extended_entities && each.extended_entities.media ){
          const url = each.extended_entities.media[0].media_url_https;
          if( ! index[url] ){
            images.unshift(url);
            index[url] = 1;
            loadImage(url).then(function(){
              imagesLoaded.push(url);
            });
          }
        }
      });
    });

    loop(++i);

  })(0);

  function start(){
    const $img = $('img[data-twitter-image]');
    let x = 0;
    tm = true;
    $( window ).on('clocktime.machine', function(){
      if( !imagesLoaded.length ){
        return;
      }

      (function next(){
        if( !imagesLoaded[x] ){ x = 0; }
        const img = imagesLoaded[x];
        if( img ){
          console.log( img );
          $img.attr('src', img );
          x++;
        } else {
          next(++x);
        }

      })();

    });
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
