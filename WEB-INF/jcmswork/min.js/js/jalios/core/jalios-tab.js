!function(f){if(!f.jalios){f.jalios={}}if(!f.jalios.ui){f.jalios.ui={}}var d=function(){f(document).on("click",".nav-tabs A",e);f(document).on("click",".widget .nav-pills A",b);f(document).on("jalios:refresh",c);g();a.delay(0.1)};var c=function(i){var h=f.jalios.Event.match(i,"refresh","after");if(!h){return}if(!h.target){return}h.target.each(function(){g(this);a.delay(0.1,this)})};var e=function(j){var l=f(j.currentTarget);if(l.attr("href").indexOf("#")<0){return}var i=l.closest(".nav-tabs");if(i.hasClass("nav-static")){return}j.preventDefault();l.tab("show");var k=i.attr("data-jalios-prefs");if(k){var n=l.parent().index();f.jalios.Prefs.data(k,n)}var h=l.attr("href");h=h&&h.replace(/.*(?=#[^\s]*$)/,"");var m=jQuery.Event("jalios:tab");m.tab={trigger:l,pane:f(h)};f(document).trigger(m)};var b=function(h){var i=f(h.currentTarget);h.preventDefault();i.tab("show");var j=i.data("jalios-fieldgroup");if(j){f("A[data-jalios-fieldgroup="+j+"]").tab("show")}};var a=function(h){f(h||document).find(".nav-tabs").each(function(){var k=f(this);var i=k.attr("data-jalios-prefs");if(!i){return}var l=f.jalios.Prefs.data(i);if(!l){return}var j=k.find("LI A").get(l);f.jalios.DOM.follow(j)})};var g=function(h){f(h||document).find(".nav-pills, .nav-tabs").not(".no-tab-drop").tabdrop({text:'<span class="fa fa-bars"></span>'});f(h||document).find(".tab-pane").each(function(){var j=f(this);var i=f(this).children(".tab-page").children(".tab");if(!i.exists()){return}j.addClass("tab-content").removeClass("tab-pane");i.each(function(k){var m=k==0?" active":"";var o=f(this).closest(".tab-page").addClass("tab-pane").addClass(m).removeClass("tab-page").identify().attr("id");var l='<a href="#'+o+'">'+this.innerHTML+"</a>";var n=f(this).find("A").first();if(n.exists()){n.attr("href","#"+o);l=this.innerHTML}f(this).replaceWith(f('<li class="tab'+m+'">'+l+"</li>"))});i=f('<ul class="nav nav-tabs br"></ul>').insertBefore(j).append(f(".tab-pane > .tab",this));if(j.attr("id")=="mainTab"&&f("#tab-pane-anchor").exists()){f("#tab-pane-anchor").append(i)}});f(".inner-tabs",h||document).each(function(){f(this).find("> UL").addClass("nav nav-tabs nav-static").find("LI").addClass("tab").filter(".enabled").removeClass("enabled").addClass("active")})};f.jalios.ui.Tab={upgrade:g,select:a};f(document).ready(function(h){d()})}(window.jQuery);function setSelectedTab(b,a){var c=$(b);jQuery(c).prev("UL.nav-tabs").find("LI:nth-child("+(a+1)+") A").tab("show")}if(Event.observe){Event.observe(document,"refresh:after",function(a){if(a&&a.memo&&a.memo.wrapper){var b=document.getElementById(a.memo.wrapper);jQuery.jalios.ui.Tab.upgrade(b)}})}jQuery(document).on("jalios:tab",function(a){document.fire("tabpane:change",{tabPage:a.tab.trigger.identify().attr("id")})});