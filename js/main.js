import $ from 'jquery';
import 'jquery-easing/jquery.easing.1.3';

// import 'bootstrap/js/src/alert';
// import 'bootstrap/js/src/button';
// import 'bootstrap/js/src/carousel';
// import 'bootstrap/js/src/collapse';
// import 'bootstrap/js/src/dropdown';
// import 'bootstrap/js/src/modal';
// import 'bootstrap/js/src/popover';
// import 'bootstrap/js/src/scrollspy';
// import 'bootstrap/js/src/tab';
// import 'bootstrap/js/src/tooltip';

// import Sliders from "./components/sliders";
// import ScrollTo from './components/scroll-to';
// import MailchimpSubscibe from './components/mailchimp-subscribe';

const Site = {};

$(document).ready(() => {
  Site.vars = {
    window:   $(window),
    document: $(document),
    body:     $('body'),
    htmlBody: $('html, body'),
    header:   $('#header'),
    footer:   $('#footer')
  };

  const s = Site.vars;

  // Sliders(s, $sliders);
  // ScrollTo(s, id);
  // MailchimpSubscibe(s, formId);
});

export default Site;
