export default () => {

  $('div[data-clock]').each(function(){
    const $clock = $( this );
    const tz = $clock.data('clock');

    setInterval(update, 1000 );

    function update(){
      $clock.find('span').first().text(
        tz === 'machine'
          ? getMachineTime()
          : getGMTTime()
      );
      $( window ).trigger('clocktime.' + tz);
    }

    if( tz === 'machine' ){
      try {
        var zone = new Date().toLocaleTimeString('en-GB',{ timeZoneName:'short' } ).split(' ')[1]
        console.log(zone);
        $clock.find('span').last().text( zone );
      } catch(e){
        $clock.find('span').last().text('Local time');
      }
    }

    $clock.css({
      width: $clock.outerWidth()
    })

  });

}

const getMachineTime = () => {
  var d = new Date();
  // d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
  return d.toLocaleTimeString('en-GB');
}

const getGMTTime = () => {
  var d = new Date();
  d.setTime( d.getTime() + (d.getTimezoneOffset() *60*1000) );
  return d.toLocaleTimeString('en-GB');
}
