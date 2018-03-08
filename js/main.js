import $ from 'jquery';
import 'jquery-easing/jquery.easing.1.3';
import scrolling, {bindScrollLock} from './components/scrolling';

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

import Sliders from "./components/sliders";
// import ScrollTo from './components/scroll-to';
// import MailchimpSubscibe from './components/mailchimp-subscribe';

import hero from './components/hero';
import progress from './components/progress';
import social from './components/social';
import twitter from './components/twitter';
import maps from './components/google-map';
import clock from './components/clock';
import parallax from './components/parallax';

const Site = {};

$(document).ready(() => {
  Site.vars = {
    window: $(window),
    document: $(document),
    body: $('body'),
    htmlBody: $('html, body'),
    header: $('#header'),
    footer: $('#footer')
  };

  const s = Site.vars;

  hero();

  Sliders();
  // ScrollTo(s, id);
  // MailchimpSubscibe(s, formId);

  social(() => {
    bindScrollLock();
  });

  scrolling();

  clock();

  twitter();

  setTimeout(() => {
    progress();
  }, 1000 );

});

$( window ).on('load', () => {
  parallax();
});

window.initMaps = () => {
  maps();
}

export default Site;

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
