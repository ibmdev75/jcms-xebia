/*!
 * jQuery UI Progressbar 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/progressbar/
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(a,b){a.widget("ui.progressbar",{version:"1.10.4",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue();this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min});this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.valueDiv.remove()},value:function(c){if(c===b){return this.options.value}this.options.value=this._constrainedValue(c);this._refreshValue()},_constrainedValue:function(c){if(c===b){c=this.options.value}this.indeterminate=c===false;if(typeof c!=="number"){c=0}return this.indeterminate?false:Math.min(this.options.max,Math.max(this.min,c))},_setOptions:function(c){var d=c.value;delete c.value;this._super(c);this.options.value=this._constrainedValue(d);this._refreshValue()},_setOption:function(c,d){if(c==="max"){d=Math.max(this.min,d)}this._super(c,d)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var d=this.options.value,c=this._percentage();this.valueDiv.toggle(this.indeterminate||d>this.min).toggleClass("ui-corner-right",d===this.options.max).width(c.toFixed(0)+"%");this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate);if(this.indeterminate){this.element.removeAttr("aria-valuenow");if(!this.overlayDiv){this.overlayDiv=a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv)}}else{this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":d});if(this.overlayDiv){this.overlayDiv.remove();this.overlayDiv=null}}if(this.oldValue!==d){this.oldValue=d;this._trigger("change")}if(d===this.options.max){this._trigger("complete")}}})})(jQuery);