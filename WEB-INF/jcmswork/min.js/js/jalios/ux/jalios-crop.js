!function(e){var a,k;var c=function(){e("#cropImgWrap").imagesLoaded(function(){e(".cropper SELECT.ratio-controller").change(f);e(".cropper SELECT.rotate-controller").change(b);a=e("#cropImgArea").width();k=e("#cropImgArea").height();if(e("#crop-preview").exists()){var n=e("#crop-preview").data("jalios-crop-max-size");if(a>k){var m=(n*a)/k;e("#crop-preview").css("width",m);e("#crop-preview").css("height",140)}else{var l=(n*k)/a;e("#crop-preview").css("height",l);e("#crop-preview").css("width",140)}}h()})};var j=false;var h=function(o){if(j){j.destroy()}var n=e("#cropImgArea").data("jalios-crop-ratio")?e("#cropImgArea").data("jalios-crop-ratio"):n;if(o){n=o}var l=Math.ceil(a*n);var m=Math.ceil(k*n);e("#cropDisable").hide();e("#cropImgArea").css("width",l+"px").css("height",m+"px");j=e.Jcrop("#cropImgArea",{onSelect:g,onChange:g,aspectRatio:n});if(d!=0){j.ui.holder.addClass("r"+d);j.disable();e("#cropDisable").show()}var p=e("#cropResults");p.find("INPUT[name=x1]").val("");p.find("INPUT[name=y1]").val("");p.find("INPUT[name=x2]").val("");p.find("INPUT[name=y2]").val("");p.find("INPUT[name=width]").val("");p.find("INPUT[name=height]").val("")};var g=function(r){var n=e("#cropResults");n.find("INPUT[name=x1]").val(Math.ceil(r.x*1/i));n.find("INPUT[name=y1]").val(Math.ceil(r.y*1/i));n.find("INPUT[name=x2]").val(Math.ceil(r.x2*1/i));n.find("INPUT[name=y2]").val(Math.ceil(r.y2*1/i));n.find("INPUT[name=width]").val(Math.ceil(r.w*1/i));n.find("INPUT[name=height]").val(Math.ceil(r.h*1/i));var q=n.data("jalios-crop-preview-width");var p=n.data("jalios-crop-preview-height");q=q>0?q:100;p=p>0?p:100;var o=q/r.w;var m=p/r.h;var l=e("#cropImgArea");e("#crop-preview").css({width:Math.round(o*l.width())+"px",height:Math.round(m*l.height())+"px",marginLeft:"-"+Math.round(o*r.x)+"px",marginTop:"-"+Math.round(m*r.y)+"px"})};var i=1;var f=function(m){var l=e(m.currentTarget);i=l.val();h(i)};var d=0;var b=function(m){var l=e(m.currentTarget);d=l.val();h()};e(document).on("jalios:ready",c)}(window.jQuery);