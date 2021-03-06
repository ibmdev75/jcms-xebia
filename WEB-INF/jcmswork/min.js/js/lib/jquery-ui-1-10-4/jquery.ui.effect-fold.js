/*!
 * jQuery UI Effects Fold 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function(a,b){a.effects.effect.fold=function(e,i){var f=a(this),n=["position","top","bottom","left","right","height","width"],k=a.effects.setMode(f,e.mode||"hide"),r=k==="show",l=k==="hide",t=e.size||15,m=/([0-9]+)%/.exec(t),s=!!e.horizFirst,j=r!==s,g=j?["width","height"]:["height","width"],h=e.duration/2,d,c,q={},p={};a.effects.save(f,n);f.show();d=a.effects.createWrapper(f).css({overflow:"hidden"});c=j?[d.width(),d.height()]:[d.height(),d.width()];if(m){t=parseInt(m[1],10)/100*c[l?0:1]}if(r){d.css(s?{height:0,width:t}:{height:t,width:0})}q[g[0]]=r?c[0]:t;p[g[1]]=r?c[1]:0;d.animate(q,h,e.easing).animate(p,h,e.easing,function(){if(l){f.hide()}a.effects.restore(f,n);a.effects.removeWrapper(f);i()})}})(jQuery);