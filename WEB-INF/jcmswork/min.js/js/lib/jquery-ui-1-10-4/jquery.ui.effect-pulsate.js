/*!
 * jQuery UI Effects Pulsate 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/pulsate-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function(a,b){a.effects.effect.pulsate=function(c,g){var e=a(this),k=a.effects.setMode(e,c.mode||"show"),p=k==="show",l=k==="hide",q=(p||k==="hide"),m=((c.times||5)*2)+(q?1:0),f=c.duration/m,n=0,j=e.queue(),d=j.length,h;if(p||!e.is(":visible")){e.css("opacity",0).show();n=1}for(h=1;h<m;h++){e.animate({opacity:n},f,c.easing);n=1-n}e.animate({opacity:n},f,c.easing);e.queue(function(){if(l){e.hide()}g()});if(d>1){j.splice.apply(j,[1,0].concat(j.splice(d,m+1)))}e.dequeue()}})(jQuery);