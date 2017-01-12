import 'jquery';



const Site = {};

$(document).ready(function () {
  Site.vars = {
    body:   $('body'),
    window: $(window)
  };

  const s = Site.vars;
});

export default Site;
