+function(b){function a(){var e=document.createElement("bootstrap");var d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in d){if(e.style[c]!==undefined){return{end:d[c]}}}return false}b.fn.emulateTransitionEnd=function(e){var d=false;var c=this;b(this).one("bsTransitionEnd",function(){d=true});var f=function(){if(!d){b(c).trigger(b.support.transition.end)}};setTimeout(f,e);return this};b(function(){b.support.transition=a();if(!b.support.transition){return}b.event.special.bsTransitionEnd={bindType:b.support.transition.end,delegateType:b.support.transition.end,handle:function(c){if(b(c.target).is(this)){return c.handleObj.handler.apply(this,arguments)}}}})}(jQuery);