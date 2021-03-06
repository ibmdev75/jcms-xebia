/*!
 * jQuery UI Effects Drop 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/drop-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function(a,b){a.effects.effect.drop=function(d,h){var e=a(this),j=["position","top","bottom","left","right","opacity","height","width"],i=a.effects.setMode(e,d.mode||"hide"),l=i==="show",k=d.direction||"left",f=(k==="up"||k==="down")?"top":"left",m=(k==="up"||k==="left")?"pos":"neg",g={opacity:l?1:0},c;a.effects.save(e,j);e.show();a.effects.createWrapper(e);c=d.distance||e[f==="top"?"outerHeight":"outerWidth"](true)/2;if(l){e.css("opacity",0).css(f,m==="pos"?-c:c)}g[f]=(l?(m==="pos"?"+=":"-="):(m==="pos"?"-=":"+="))+c;e.animate(g,{queue:false,duration:d.duration,easing:d.easing,complete:function(){if(i==="hide"){e.hide()}a.effects.restore(e,j);a.effects.removeWrapper(e);h()}})}})(jQuery);