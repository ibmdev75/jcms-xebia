/*!
 * jQuery UI Menu 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function(a,b){a.widget("ui.menu",{version:"1.10.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element;this.mouseHandled=false;this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,a.proxy(function(c){if(this.options.disabled){c.preventDefault()}},this));if(this.options.disabled){this.element.addClass("ui-state-disabled").attr("aria-disabled","true")}this._on({"mousedown .ui-menu-item > a":function(c){c.preventDefault()},"click .ui-state-disabled > a":function(c){c.preventDefault()},"click .ui-menu-item:has(a)":function(c){var d=a(c.target).closest(".ui-menu-item");if(!this.mouseHandled&&d.not(".ui-state-disabled").length){this.select(c);if(!c.isPropagationStopped()){this.mouseHandled=true}if(d.has(".ui-menu").length){this.expand(c)}else{if(!this.element.is(":focus")&&a(this.document[0].activeElement).closest(".ui-menu").length){this.element.trigger("focus",[true]);if(this.active&&this.active.parents(".ui-menu").length===1){clearTimeout(this.timer)}}}}},"mouseenter .ui-menu-item":function(c){var d=a(c.currentTarget);d.siblings().children(".ui-state-active").removeClass("ui-state-active");this.focus(c,d)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,c){var d=this.active||this.element.children(".ui-menu-item").eq(0);if(!c){this.focus(e,d)}},blur:function(c){this._delay(function(){if(!a.contains(this.element[0],this.document[0].activeElement)){this.collapseAll(c)}})},keydown:"_keydown"});this.refresh();this._on(this.document,{click:function(c){if(!a(c.target).closest(".ui-menu").length){this.collapseAll(c)}this.mouseHandled=false}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var c=a(this);if(c.data("ui-menu-submenu-carat")){c.remove()}});this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(i){var d,h,j,g,f,c=true;function e(k){return k.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}switch(i.keyCode){case a.ui.keyCode.PAGE_UP:this.previousPage(i);break;case a.ui.keyCode.PAGE_DOWN:this.nextPage(i);break;case a.ui.keyCode.HOME:this._move("first","first",i);break;case a.ui.keyCode.END:this._move("last","last",i);break;case a.ui.keyCode.UP:this.previous(i);break;case a.ui.keyCode.DOWN:this.next(i);break;case a.ui.keyCode.LEFT:this.collapse(i);break;case a.ui.keyCode.RIGHT:if(this.active&&!this.active.is(".ui-state-disabled")){this.expand(i)}break;case a.ui.keyCode.ENTER:case a.ui.keyCode.SPACE:this._activate(i);break;case a.ui.keyCode.ESCAPE:this.collapse(i);break;default:c=false;h=this.previousFilter||"";j=String.fromCharCode(i.keyCode);g=false;clearTimeout(this.filterTimer);if(j===h){g=true}else{j=h+j}f=new RegExp("^"+e(j),"i");d=this.activeMenu.children(".ui-menu-item").filter(function(){return f.test(a(this).children("a").text())});d=g&&d.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):d;if(!d.length){j=String.fromCharCode(i.keyCode);f=new RegExp("^"+e(j),"i");d=this.activeMenu.children(".ui-menu-item").filter(function(){return f.test(a(this).children("a").text())})}if(d.length){this.focus(i,d);if(d.length>1){this.previousFilter=j;this.filterTimer=this._delay(function(){delete this.previousFilter},1000)}else{delete this.previousFilter}}else{delete this.previousFilter}}if(c){i.preventDefault()}},_activate:function(c){if(!this.active.is(".ui-state-disabled")){if(this.active.children("a[aria-haspopup='true']").length){this.expand(c)}else{this.select(c)}}},refresh:function(){var e,d=this.options.icons.submenu,c=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length);c.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var h=a(this),g=h.prev("a"),f=a("<span>").addClass("ui-menu-icon ui-icon "+d).data("ui-menu-submenu-carat",true);g.attr("aria-haspopup","true").prepend(f);h.attr("aria-labelledby",g.attr("id"))});e=c.add(this.element);e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()});e.children(":not(.ui-menu-item)").each(function(){var f=a(this);if(!/[^\-\u2014\u2013\s]/.test(f.text())){f.addClass("ui-widget-content ui-menu-divider")}});e.children(".ui-state-disabled").attr("aria-disabled","true");if(this.active&&!a.contains(this.element[0],this.active[0])){this.blur()}},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(c,d){if(c==="icons"){this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(d.submenu)}this._super(c,d)},focus:function(d,c){var f,e;this.blur(d,d&&d.type==="focus");this._scrollIntoView(c);this.active=c.first();e=this.active.children("a").addClass("ui-state-focus");if(this.options.role){this.element.attr("aria-activedescendant",e.attr("id"))}this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");if(d&&d.type==="keydown"){this._close()}else{this.timer=this._delay(function(){this._close()},this.delay)}f=c.children(".ui-menu");if(f.length&&d&&(/^mouse/.test(d.type))){this._startOpening(f)}this.activeMenu=c.parent();this._trigger("focus",d,{item:c})},_scrollIntoView:function(f){var i,e,g,c,d,h;if(this._hasScroll()){i=parseFloat(a.css(this.activeMenu[0],"borderTopWidth"))||0;e=parseFloat(a.css(this.activeMenu[0],"paddingTop"))||0;g=f.offset().top-this.activeMenu.offset().top-i-e;c=this.activeMenu.scrollTop();d=this.activeMenu.height();h=f.height();if(g<0){this.activeMenu.scrollTop(c+g)}else{if(g+h>d){this.activeMenu.scrollTop(c+g-d+h)}}}},blur:function(d,c){if(!c){clearTimeout(this.timer)}if(!this.active){return}this.active.children("a").removeClass("ui-state-focus");this.active=null;this._trigger("blur",d,{item:this.active})},_startOpening:function(c){clearTimeout(this.timer);if(c.attr("aria-hidden")!=="true"){return}this.timer=this._delay(function(){this._close();this._open(c)},this.delay)},_open:function(d){var c=a.extend({of:this.active},this.options.position);clearTimeout(this.timer);this.element.find(".ui-menu").not(d.parents(".ui-menu")).hide().attr("aria-hidden","true");d.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(c)},collapseAll:function(d,c){clearTimeout(this.timer);this.timer=this._delay(function(){var e=c?this.element:a(d&&d.target).closest(this.element.find(".ui-menu"));if(!e.length){e=this.element}this._close(e);this.blur(d);this.activeMenu=e},this.delay)},_close:function(c){if(!c){c=this.active?this.active.parent():this.element}c.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(d){var c=this.active&&this.active.parent().closest(".ui-menu-item",this.element);if(c&&c.length){this._close();this.focus(d,c)}},expand:function(d){var c=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();if(c&&c.length){this._open(c.parent());this._delay(function(){this.focus(d,c)})}},next:function(c){this._move("next","first",c)},previous:function(c){this._move("prev","last",c)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(f,d,e){var c;if(this.active){if(f==="first"||f==="last"){c=this.active[f==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1)}else{c=this.active[f+"All"](".ui-menu-item").eq(0)}}if(!c||!c.length||!this.active){c=this.activeMenu.children(".ui-menu-item")[d]()}this.focus(e,c)},nextPage:function(e){var d,f,c;if(!this.active){this.next(e);return}if(this.isLastItem()){return}if(this._hasScroll()){f=this.active.offset().top;c=this.element.height();this.active.nextAll(".ui-menu-item").each(function(){d=a(this);return d.offset().top-f-c<0});this.focus(e,d)}else{this.focus(e,this.activeMenu.children(".ui-menu-item")[!this.active?"first":"last"]())}},previousPage:function(e){var d,f,c;if(!this.active){this.next(e);return}if(this.isFirstItem()){return}if(this._hasScroll()){f=this.active.offset().top;c=this.element.height();this.active.prevAll(".ui-menu-item").each(function(){d=a(this);return d.offset().top-f+c>0});this.focus(e,d)}else{this.focus(e,this.activeMenu.children(".ui-menu-item").first())}},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(c){this.active=this.active||a(c.target).closest(".ui-menu-item");var d={item:this.active};if(!this.active.has(".ui-menu").length){this.collapseAll(c,true)}this._trigger("select",c,d)}})}(jQuery));