/*!
 * jQuery UI Effects Clip 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/clip-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function(a,b){a.effects.effect.clip=function(f,i){var g=a(this),m=["position","top","bottom","left","right","height","width"],l=a.effects.setMode(g,f.mode||"hide"),p=l==="show",n=f.direction||"vertical",k=n==="vertical",q=k?"height":"width",j=k?"top":"left",h={},d,e,c;a.effects.save(g,m);g.show();d=a.effects.createWrapper(g).css({overflow:"hidden"});e=(g[0].tagName==="IMG")?d:g;c=e[q]();if(p){e.css(q,0);e.css(j,c/2)}h[q]=p?c:0;h[j]=p?0:c/2;e.animate(h,{queue:false,duration:f.duration,easing:f.easing,complete:function(){if(!p){g.hide()}a.effects.restore(g,m);a.effects.removeWrapper(g);i()}})}})(jQuery);