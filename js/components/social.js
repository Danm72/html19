export default ( ready ) => {
  instagram().then(function( media ){
    let html = '';
    $.each( media, function(i, each ){
      if( i > 2 ){
        return false;
      }
      html += `<a target="_blank" data-item href="//instagram.com/p/${each.code}"><img src="${each.thumbnail_src}" /></a>`;
    });
    $('.instagram.scroll-lock > .scrollable').prepend( html );
    ready();
  });

}

const twitter = () => {
  const defer = jQuery.Deferred();
  setTimeout(() => {
    defer.resolve()
  });
  return defer.promise();
}

const instagram = () => {
  const defer = jQuery.Deferred();
  const url = 'https://www.instagram.com/bmb.agency/?__a=1';
  var insta = {};
  if(!sessionStorage.instagram){
    $.get(url).then((json) => {
      insta = json;
      sessionStorage.instagram = JSON.stringify(json);
    });
  } else {
    insta = JSON.parse(sessionStorage.instagram);
  }
  console.log(insta);
  defer.resolve(insta.user.media.nodes || []);
  return defer.promise();
}
