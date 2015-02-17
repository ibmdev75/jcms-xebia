/*!
 * jQuery UI Autocomplete 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.ui.menu.js
 */
(function(a,b){a.widget("ui.autocomplete",{version:"1.10.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,c,f,h=this.element[0].nodeName.toLowerCase(),g=h==="textarea",d=h==="input";this.isMultiLine=g?true:d?false:this.element.prop("isContentEditable");this.valueMethod=this.element[g||d?"val":"text"];this.isNewMenu=true;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off");this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly")){e=true;f=true;c=true;return}e=false;f=false;c=false;var j=a.ui.keyCode;switch(i.keyCode){case j.PAGE_UP:e=true;this._move("previousPage",i);break;case j.PAGE_DOWN:e=true;this._move("nextPage",i);break;case j.UP:e=true;this._keyEvent("previous",i);break;case j.DOWN:e=true;this._keyEvent("next",i);break;case j.ENTER:case j.NUMPAD_ENTER:if(this.menu.active){e=true;i.preventDefault();this.menu.select(i)}break;case j.TAB:if(this.menu.active){this.menu.select(i)}break;case j.ESCAPE:if(this.menu.element.is(":visible")){this._value(this.term);this.close(i);i.preventDefault()}break;default:c=true;this._searchTimeout(i);break}},keypress:function(i){if(e){e=false;if(!this.isMultiLine||this.menu.element.is(":visible")){i.preventDefault()}return}if(c){return}var j=a.ui.keyCode;switch(i.keyCode){case j.PAGE_UP:this._move("previousPage",i);break;case j.PAGE_DOWN:this._move("nextPage",i);break;case j.UP:this._keyEvent("previous",i);break;case j.DOWN:this._keyEvent("next",i);break}},input:function(i){if(f){f=false;i.preventDefault();return}this._searchTimeout(i)},focus:function(){this.selectedItem=null;this.previous=this._value()},blur:function(i){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching);this.close(i);this._change(i)}});this._initSource();this.menu=a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().data("ui-menu");this._on(this.menu.element,{mousedown:function(i){i.preventDefault();this.cancelBlur=true;this._delay(function(){delete this.cancelBlur});var j=this.menu.element[0];if(!a(i.target).closest(".ui-menu-item").length){this._delay(function(){var k=this;this.document.one("mousedown",function(l){if(l.target!==k.element[0]&&l.target!==j&&!a.contains(j,l.target)){k.close()}})})}},menufocus:function(j,k){if(this.isNewMenu){this.isNewMenu=false;if(j.originalEvent&&/^mouse/.test(j.originalEvent.type)){this.menu.blur();this.document.one("mousemove",function(){a(j.target).trigger(j.originalEvent)});return}}var i=k.item.data("ui-autocomplete-item");if(false!==this._trigger("focus",j,{item:i})){if(j.originalEvent&&/^key/.test(j.originalEvent.type)){this._value(i.value)}}else{this.liveRegion.text(i.value)}},menuselect:function(k,l){var j=l.item.data("ui-autocomplete-item"),i=this.previous;if(this.element[0]!==this.document[0].activeElement){this.element.focus();this.previous=i;this._delay(function(){this.previous=i;this.selectedItem=j})}if(false!==this._trigger("select",k,{item:j})){this._value(j.value)}this.term=this._value();this.close(k);this.selectedItem=j}});this.liveRegion=a("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element);this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching);this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");this.menu.element.remove();this.liveRegion.remove()},_setOption:function(c,d){this._super(c,d);if(c==="source"){this._initSource()}if(c==="appendTo"){this.menu.element.appendTo(this._appendTo())}if(c==="disabled"&&d&&this.xhr){this.xhr.abort()}},_appendTo:function(){var c=this.options.appendTo;if(c){c=c.jquery||c.nodeType?a(c):this.document.find(c).eq(0)}if(!c){c=this.element.closest(".ui-front")}if(!c.length){c=this.document[0].body}return c},_initSource:function(){var e,c,d=this;if(a.isArray(this.options.source)){e=this.options.source;this.source=function(g,f){f(a.ui.autocomplete.filter(e,g.term))}}else{if(typeof this.options.source==="string"){c=this.options.source;this.source=function(g,f){if(d.xhr){d.xhr.abort()}d.xhr=a.ajax({url:c,data:g,dataType:"json",success:function(h){f(h)},error:function(){f([])}})}}else{this.source=this.options.source}}},_searchTimeout:function(c){clearTimeout(this.searching);this.searching=this._delay(function(){if(this.term!==this._value()){this.selectedItem=null;this.search(null,c)}},this.options.delay)},search:function(d,c){d=d!=null?d:this._value();this.term=this._value();if(d.length<this.options.minLength){return this.close(c)}if(this._trigger("search",c)===false){return}return this._search(d)},_search:function(c){this.pending++;this.element.addClass("ui-autocomplete-loading");this.cancelSearch=false;this.source({term:c},this._response())},_response:function(){var c=++this.requestIndex;return a.proxy(function(d){if(c===this.requestIndex){this.__response(d)}this.pending--;if(!this.pending){this.element.removeClass("ui-autocomplete-loading")}},this)},__response:function(c){if(c){c=this._normalize(c)}this._trigger("response",null,{content:c});if(!this.options.disabled&&c&&c.length&&!this.cancelSearch){this._suggest(c);this._trigger("open")}else{this._close()}},close:function(c){this.cancelSearch=true;this._close(c)},_close:function(c){if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.blur();this.isNewMenu=true;this._trigger("close",c)}},_change:function(c){if(this.previous!==this._value()){this._trigger("change",c,{item:this.selectedItem})}},_normalize:function(c){if(c.length&&c[0].label&&c[0].value){return c}return a.map(c,function(d){if(typeof d==="string"){return{label:d,value:d}}return a.extend({label:d.label||d.value,value:d.value||d.label},d)})},_suggest:function(c){var d=this.menu.element.empty();this._renderMenu(d,c);this.isNewMenu=true;this.menu.refresh();d.show();this._resizeMenu();d.position(a.extend({of:this.element},this.options.position));if(this.options.autoFocus){this.menu.next()}},_resizeMenu:function(){var c=this.menu.element;c.outerWidth(Math.max(c.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(d,c){var e=this;a.each(c,function(f,g){e._renderItemData(d,g)})},_renderItemData:function(c,d){return this._renderItem(c,d).data("ui-autocomplete-item",d)},_renderItem:function(c,d){return a("<li>").append(a("<a>").text(d.label)).appendTo(c)},_move:function(d,c){if(!this.menu.element.is(":visible")){this.search(null,c);return}if(this.menu.isFirstItem()&&/^previous/.test(d)||this.menu.isLastItem()&&/^next/.test(d)){this._value(this.term);this.menu.blur();return}this.menu[d](c)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(d,c){if(!this.isMultiLine||this.menu.element.is(":visible")){this._move(d,c);c.preventDefault()}}});a.extend(a.ui.autocomplete,{escapeRegex:function(c){return c.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(e,function(f){return d.test(f.label||f.value||f)})}});a.widget("ui.autocomplete",a.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(c){return c+(c>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(d){var c;this._superApply(arguments);if(this.options.disabled||this.cancelSearch){return}if(d&&d.length){c=this.options.messages.results(d.length)}else{c=this.options.messages.noResults}this.liveRegion.text(c)}})}(jQuery));