"JCMS.form.Widget"._namespace({init:function(){var b=new Date().getTime();Util.observeFocusClass("formTextfield",JCMS.form.Widget._handleBlurFocus);Util.observeFocusClass("formTextarea",JCMS.form.Widget._handleBlurFocus);Util.observeDocument("click",JCMS.form.Widget._handleTagsClick);var a=new Date().getTime();JcmsLogger.info("Widget","Init Widgets"," in "+(a-b)+" ms")},_handleTagsClick:function(c){if(!(c.eventName==="jcms:click"||Util.isLeftClick(c))){return}var f=Event.element(c);if(!f||!f.fastUp){return}var a=f.fastUp("OL","wdg-list",true,2);if(!a){return}var e=a.fastUp("DIV","keyword",true,4);if(!e){return}var d=a.fastLastChild("LI");var b=d.hasClassName("placeholder")?d.fastPrevious("LI").fastChild("INPUT"):d.fastChild("INPUT");if(!b||!b.value.blank()){JCMS.form.Widget.add(f);return}JCMS.form.Widget._list("_handlePlaceholder",f)},_handlePlaceholder:function(b){var c=b.fastLastChild("LI");var a=c.hasClassName("placeholder")?c.fastPrevious("LI").fastChild("INPUT"):c.fastChild("INPUT");if(a&&a.value.blank()){a.fastUp("LI").show();InputUtil.focus(a)}},_initResizer:function(a){var b=$(a.memo.elmId);if(!b||b.tagName!="TEXTAREA"||$(b.parentNode).hasClassName("noresize")){return}JCMS.form.Widget.autoResize(b);if(b.retrieve("resizable",false)){return}b.addClassName("resizable");b.store("resizable",true);Event.observe(b,"mousedown",JCMS.form.Widget.dragStart);Event.observe(b,"keypress",function(d){var c=d.which||d.keyCode;if(!c||c!=Event.KEY_RETURN){return}JCMS.form.Widget.autoResize(Event.element(d))})},_drag:false,_dragX:0,_dragY:0,_dragW:0,_dragH:0,dragStart:function(a){var e=Event.element(a);if(e.tagName!="DIV"&&e.tagName!="TEXTAREA"){return}var j=Event.pointerX(a)-10;var h=Event.pointerY(a)-10;var b=e.cumulativeOffset();var g=e.getWidth();var c=e.getHeight();var f=b.left;var d=b.top;if((j>f+g)||(h>d+c)||(j<f+g-32)||(h<d+c-32)){return}e.style.cursor="se-resize";if(e.hasClassName("wikitoolbar")){e=e.previous("TEXTAREA");g=e.getWidth();c=e.getHeight()}JCMS.form.Widget._drag=e.identify();JCMS.form.Widget._dragX=j;JCMS.form.Widget._dragY=h;JCMS.form.Widget._dragW=g;JCMS.form.Widget._dragH=c;Event.observe(document,"mousemove",JCMS.form.Widget.dragMove);Event.observe(document,"mouseup",JCMS.form.Widget.dragEnd)},dragEnd:function(a){var c=$(JCMS.form.Widget._drag);if(!c){return}c.style.cursor="";var b=c.next("DIV.wikitoolbar");if(b){b.style.cursor=""}JCMS.form.Widget._drag=false;Event.stopObserving(document,"mousemove",JCMS.form.Widget.dragMove);Event.stopObserving(document,"mouseup",JCMS.form.Widget.dragEnd)},dragMove:function(d){var j=$(JCMS.form.Widget._drag);var a=Event.pointerX(d);var g=Event.pointerY(d);var b=JCMS.form.Widget._dragW+(a-JCMS.form.Widget._dragX);var c=JCMS.form.Widget._dragH+(g-JCMS.form.Widget._dragY);if(b>15){j.style.width=b+"px"}if(c>15){j.style.height=c+"px"}var f=j.fastNext("DIV","wikitoolbar");if(b>15&&f){f.style.width=b+6+"px"}var e=j.fastNext("DIV","wikipreview");if(b>15&&e){e.style.width=(b-7)+"px"}if(c>15&&e){e.style.marginTop="-"+(c+6)+"px"}if(c>15&&e){e.style.height=(c-5)+"px"}},autoResize:function(b){var a=b.value.split("\n");var c=1;for(i=0;i<a.length;i++){if(a[i].length>=b.cols){c+=Math.floor(a[i].length/b.cols)}}c+=a.length;if(c>b.rows){b.rows=Math.min(c,20)}},_lastFocusId:false,_handleBlurFocus:function(c,d,b,a){var d=$(d);if(a==="focus:in"){JCMS.form.Widget.fireFocus.delay(0.1,c,d,b)}else{if(a==="focus:out"){JCMS.form.Widget.fireBlur.delay(0.1,c,d,b)}}},fireBlur:function(b,a){var c=JCMS.form.Widget.getWidget(a);if(!c||c.hasClassName("disabled")){return}document.fire("jcms:blur",{elmId:a.identify()})},fireFocus:function(b,a){var c=JCMS.form.Widget._lastFocusId;if(!JCMS.form.Widget._focusClasses(a,$(c))){return}document.fire("jcms:focus",{elmId:a.identify(),lastId:c})},_focusClasses:function(c,d){if(c==d){return false}var b=JCMS.form.Widget.getWrapper(c);var a=JCMS.form.Widget.getWidget(c);if(a&&a.hasClassName("disabled")){return false}jQuery.jalios.ui.Widget.clearFocusClasses(d);if(!c){return false}JCMS.form.Widget._lastFocusId=c.identify();if(b&&!b.hasClassName("tab-page")){b.addClassName("focus-field")}if(a&&!a.hasClassName("tab-page")){a.addClassName("focus-widget")}return true},clearFocusClasses:function(b){var b=b||$(JCMS.form.Widget._lastFocusId);if(!b){return}JCMS.form.Widget._lastFocusId=false;var c=JCMS.form.Widget.getWrapper(b);if(c){c.removeClassName("focus-field")}var a=JCMS.form.Widget.getWidget(b);if(a){a.removeClassName("focus-widget")}},toggleUploadField:function(a){var a=$(a)||$(CtxMenuManager.latestElement);return JCMS.form.Widget._toggleUpload(a)},_toggleUpload:function(f,d){var e=JCMS.form.Widget.getWrapper(f);var a=e.down("INPUT.formUploadfield");if(!a||(a.disabled&&d)){return}var c=e.down("INPUT.formChooserLabelfield");var b=e.down("INPUT.formChooserfield");if(!a.disabled){a.disable();a.hide();c.show();c.enable();b.enable()}else{c.disable();b.disable();c.hide();b.hide();a.show();a.enable()}return false},UI_EDITOR_COLORCHOOSER:"F",UI_EDITOR_IMAGEPATH:"I",UI_EDITOR_SIMPLEIMAGEPATH:"I",UI_EDITOR_MEDIAPATH:"M",UI_EDITOR_SIMPLEMEDIAPATH:"M",UI_EDITOR_DATECHOOSER:"V",UI_EDITOR_MEMBERCHOOSER:"EHJY",UI_EDITOR_GROUPCHOOSER:"EGY",UI_EDITOR_PUBLICATIONCHOOSER:"ELXMSCcY",UI_EDITOR_PUBLICATIONSCHOOSER:"ELXMSCcY",UI_EDITOR_CATEGORYCHOOSER:"EZY",UI_EDITOR_CATEGORIESCHOOSER:"EZY",UI_EDITOR_WORKSPACECHOOSER:"EOY",UI_EDITOR_QUERYCHOOSER:"QY",UI_EDITOR_ACLCHOOSER:"Y",UI_EDITOR_SQLQUERY:"",UI_EDITOR_DBRECORDCHOOSER:"",getWidget:function(b){var a=jQuery.jalios.ui.Widget.getWidget(b);return a.exists()?$(a[0]):false},getWrapper:function(b){var a=jQuery.jalios.ui.Widget.getWrapper(b);return a.exists()?$(a[0]):false},fillCtxMenuHook:function(k,c){try{var k=$(k);var j="";var a=JCMS.form.Widget.getWrapper(k);var g=JCMS.form.Widget.getWidget(k);var e=k.fastUp(["DIV"],"wdglang",true,10);if(!a){return}var d=e&&e.className.match(/wdglang-(\S+)/);if(d){d=d[1]}if(g&&g.className){$w(g.className).each(function(m){if(JCMS.form.Widget[m]){j+=JCMS.form.Widget[m]}})}if(a.tagName=="LI"){j=(a.parentNode.tagName=="OL"&&!g.hasClassName("nodnd"))?("R"+j+"-ATUD-"):(j+"-AT-")}else{j="R"+j}if(g.hasClassName("ml")){j+="y"}var l=a.down("INPUT.formChooserfield");if(!l){return j+"','"+d+"','','"}var b="";if(l.value){b=l.value}var f=g.className.match(/super_([\w\.]+)/);f=(f&&f.length>1)?f[1]:"";return j+"t','"+d+"','"+f+"','"+b}catch(h){alert(h||h.message)}},isInKeyword:function(a){return jQuery.jalios.ui.Widget.Keyword.isInKeyword(a)},showChooserId:function(c){var c=$(c)||$(CtxMenuManager.latestElement);var d=JCMS.form.Widget.getWrapper(c);var a=d.down("INPUT");var b=a.next("INPUT");JCMS.form.Widget._toggleUpload(c,true);b.toggle();return false},_initKeypress:function(a){var c=$(a.memo.elmId);if(!c||c.type!="text"||c.retrieve("_keyField",false)||c.hasClassName("autocomplete")){return}var b=JCMS.form.Widget.getWrapper(c);if(!b||b.tagName!="LI"){return}c.store("_keyField",true);Event.observe(c,"keypress",function(f){var e=f.which||f.keyCode;if(!e||e!=Event.KEY_RETURN){return}var d=Event.element(f);if(!d.value){Event.stop(f);return}if($(d).hasClassName("formChooserLabelfield")){return}if(JCMS.form.Widget.add(d)){Event.stop(f)}})},_popupCallback:function(d){if(!d.memo){return}var c=$(d.memo.linkId);if(!JCMS.form.Widget.getWidget(c)){c=$(CtxMenuManager.latestElement);if(!JCMS.form.Widget.getWidget(c)){return}}var e=JCMS.form.Widget.getWrapper(c);var a=e.down("INPUT");var b=[a.identify()].concat($A(d.memo.args));JCMS.form.Widget._chooserCallback.apply(this,b);JCMS.form.Widget._toggleUpload(a,true)},_chooserCallback:function(b,g,f,e,c){var a=$(b);var d=a.next("INPUT");if(d){d.value=g||"";a.value=g?f:"";a.fire("JCMS:widgetChange",{elmId:a.identify()})}else{a.value=c;a.fire("JCMS:widgetChange",{elmId:a.identify()})}},openColorChooser:function(d){var d=$(d)||$(CtxMenuManager.latestElement);var f=JCMS.form.Widget.getWrapper(d);var b=f.down("INPUT");var c=JcmsJsContext.getContextPath()+"/work/colorChooser.jsp?color="+b.value.slice(1);var a=b.identify();var e=function(h){var g=$(a);g.value=h;g.fire("JCMS:widgetChange",{elmId:g.identify()});g.style.backgroundColor=h};return Popup.popupWindow(c,"ColorChooser",235,220,"no","no","yes",false,false,e)},openDocChooser:function(f,l,e){var f=$(f)||$(CtxMenuManager.latestElement);var d=JCMS.form.Widget.getWidget(f);var b=Element.getJcmsId(document.body,"WS_");e=e?e.replace("&amp;","&"):"";if(!d){var k=JcmsJsContext.getContextPath()+"/work/docChooser.jsp?nbElt=1&ws="+b+"&"+e;var j=function(m,n){Popup.reload()};return Popup.popupWindow(k,"DocChooser",640,600,"no","yes","yes",false,false,j)}var a=JCMS.form.Widget.getWrapper(f);var g=a.down("INPUT.formChooserfield");var c=a.hasClassName("wdglang")?1:(a.nextSiblings().size()+1);var k=JcmsJsContext.getContextPath()+"/work/docChooser.jsp?nbElt="+c+"&hideUnzip=true&ws="+b+"&"+e;if(l){k=JcmsJsContext.getContextPath()+"/work/docChooser.jsp?nbElt=1&hideUnzip=true&ws="+b+"&id="+g.value+"&"+e}var h=a.identify();var j=function(n,p){n=Object.isString(n)?[n]:n;p=Object.isString(p)?[p]:p;var o=$(h);var m=[o].concat(o.nextSiblings());m.each(function(s,q){if(q>=n.size()){return}var r=s.down("INPUT.formChooserLabelfield");var t=s.down("INPUT.formChooserfield");r.value=p[q];t.value=n[q];JCMS.form.Widget._toggleUpload(r,true)})};return Popup.popupWindow(k,"DocChooser",640,600,"no","yes","yes",false,false,j)},_closeDateChooser:function(b){var a=$("calendar-container");if(!a||!a.visible()){return false}if(b&&b.identify&&a.inputId!=b.identify()){return false}a.hide();return true},openDataChooser:function(g,d,b,f,h,e,c,k){var j=getFormName(g.document,b);var a=getFormElementPos(b,f)+h;var l=d+e+"targetInput=document."+j+".elements["+a+"].value&targetLabel=document."+j+".elements["+(a-1)+"].value";popupWindow(l,"DataChooser",c,k,"no","yes","yes",false)},toggle:function(){return JCMS.form.Widget._list.apply(this,["_toggle"].concat($A(arguments)))},add:function(){return JCMS.form.Widget._list.apply(this,["_add"].concat($A(arguments)))},remove:function(){return JCMS.form.Widget._list.apply(this,["_remove"].concat($A(arguments)))},up:function(){return JCMS.form.Widget._list.apply(this,["_up"].concat($A(arguments)))},down:function(){return JCMS.form.Widget._list.apply(this,["_down"].concat($A(arguments)))},reorder:function(){return JCMS.form.Widget._list.apply(this,["_reorder"].concat($A(arguments)))},_add:function(e,a,f){var c=$(e.childElements()[a]);if(!c){return}var b=c.clone(true);jQuery(b).find("*").off().removeData();Util.cleanDOMElements(b,true,"generated");b.removeAttribute("id");var g=jQuery(".typeahead-menu",b);if(g){g.remove()}b.stopObserving();Element.removeClassName(b,"showPrev");var d=c.fastNext("LI");if(d){e.insertBefore(b,d)}else{e.appendChild(b)}jQuery.jalios.ui.Widget.clear(b,true);JCMS.form.Widget._renumber(e,true,a+1);JCMS.form.Widget._retoggle(e,a+1,f);if(e.className.indexOf("wdg-tab-grp")<0){document.fire("refresh:widget",{wrapper:b.identify()})}if(f){JCMS.form.Widget._focus.defer(b)}},_remove:function(d,b,e){var a=$(d.childElements()[b]);var f=a.siblings();if(f.length<=0){jQuery.jalios.ui.Widget.clear(a,true);return}if(f.length==1&&f[0].hasClassName("placeholder")){jQuery.jalios.ui.Widget.clear(a,true);a.hide();jQuery.jalios.ui.Widget.clearFocusClasses(a);return}var g=b-1;var c=a.fastPrevious("LI");if(!c){c=$(a.parentNode).firstDescendant();g=0}a.remove();JCMS.form.Widget._renumber(d,true,g);JCMS.form.Widget._retoggle(d,g,false);if(e){JCMS.form.Widget._focus.defer(c)}},_focus:function(b){if(!b){return}var b=$(b);var a=b.down(["INPUT","TEXTAREA","SELECT"]);if(a){InputUtil.focus(a)}},_blur:function(b){if(!b){return}var b=$(b);var a=b.down(["INPUT","TEXTAREA","SELECT"]);if(a){InputUtil.blur(a)}},_up:function(e,a,f){var g=$(e).hasClassName("wdg-tab")?2:1;var d=e.childElements();var c=d[a];var b=a-1<0?d[d.length-g]:d[a-1];e.insertBefore(c,b);if(a-1<0){e.insertBefore(b,c)}JCMS.form.Widget._renumber(e,true)},_down:function(e,a,f){var g=$(e).hasClassName("wdg-tab")?1:0;var d=e.childElements();var c=$(d[a]);var b=a+1>=d.length-g?d[0]:d[a+1];if(a+1>=d.length-g){e.insertBefore(c,b)}else{e.insertBefore(b,c)}JCMS.form.Widget._renumber(e,true)},_toggle:function(b,a,c){JCMS.form.Widget._renumber(b,false,a);JCMS.form.Widget._retoggle(b,a,c)},_reorder:function(e,b,f,a){if(e._skip){JCMS.form.Widget._renumber(e,true);return}var e=$(e);var d=e.childElements();var c=$A();a.each(function(g){c.push(d[g])});e.childElements().each(function(h,g){e.removeChild(h);if(c.indexOf(h)<0){c.push(h)}});c.each(function(h,g){if(!h){return}e.appendChild(h)});JCMS.form.Widget._renumber(e,true)},_renumber:function(f,c,d){if(!f.hasClassName("wdg-tab-grp")){return}var a=$(f);var e=0;var h=0;for(var j=a.firstChild;j;j=j.nextSibling){if(j.nodeType!=1){continue}var j=$(j);if(c){var g=j.fastChild("A");if(g&&g.innerHTML*1!=h+1){g.innerHTML=h+1}}if(j.className.indexOf("selected")>=0){e=h;j.removeClassName("selected")}h++}if(d!=undefined){e=d}var b=a.fastChild("LI",false,e);if(b){b.addClassName("selected")}return e},_retoggle:function(e,c,g){if(!e.hasClassName("wdg-tabpane")){return}var d=JCMS.form.Widget.isInKeyword(e);var f=$(e);var b=0;for(var a=f.firstChild;a;a=a.nextSibling){if(a.nodeType!=1){continue}if(d){$(a).removeClassName("focus-field")}else{if(b++!=c){$(a).hide()}}}if(c!="undefined"){index=c}var h=f.fastChild("LI",false,index);if(!h){return}if(d){h.addClassName("focus-field");return}h.show();if(h.fastVisible()){document.fire("tabwdg:change",{tabPage:$(h).identify()})}},_list:function(g,f,c){var f=$(f)||$(CtxMenuManager.latestElement);var h=JCMS.form.Widget.getWidget(f);if(!h){return false}var b=f.fastUp("LI",null,true,10);if(!b){b=$(f.parentNode).down(".wdg-list > LI:last-child")}if(!b){return}if(b.hasClassName("placeholder")){b=b.fastPrevious("LI")}if(!b){return}var d=$(b.parentNode);var a=d.childElements().indexOf(b);if(h.hasClassName("wdg-group")){JCMS.form.Widget._listGroup(g,h,a,c)}else{if(h.hasClassName("ml")){JCMS.form.Widget._listML(g,d,a,c)}else{var e=d.fastNext("OL","wdg-list");if(e){JCMS.form.Widget[g](e,a,true,c)}JCMS.form.Widget[g](d,a,true,c)}}return true},_listML:function(c,d,a,b){if(d.tagName=="UL"){var e=d.fastNext("DIV","wdglang",true,4);if(!e){return}JCMS.form.Widget[c]($(d),a,false,b);d=e}var e=d.fastUp("DIV","wdglang",true,4);if(!e){return}$(e.parentNode).fastEach("DIV","wdglang",function(g){var f=$(g).fastChild(["OL","UL"]);if(!f){return}JCMS.form.Widget[c](f,a,f.fastVisible(),b)})},_listGroup:function(f,g,a,d){var h=g.className.match(/wdggrp-(\S+)/);var b="DIV."+h[0];var e=g.fastUp("FORM",null,false,20);var c=e.retrieve(b);if(!c){c=$A([]);e.store(b,c);e.select(b).each(function(j){var k=j.select(["UL.wdg-list","OL.wdg-list"]);c.addAll(k)})}c.each(function(j){var k=j.fastVisible()&&JCMS.form.Widget.getWidget(j)==g;JCMS.form.Widget[f](j,a,k,d)})},_toggleKeyword:function(b){var a=$(b.memo.elmId);JCMS.form.Widget.toggle(a)}});Event.observe(window,"load",function(){JCMS.form.Widget.init.defer()});Event.observe(document,"jcms:focus",JCMS.form.Widget._initResizer);Event.observe(document,"jcms:focus",JCMS.form.Widget._initKeypress);Event.observe(document,"jcms:focus",JCMS.form.Widget._closeDateChooser);Event.observe(document,"jcms:focus",JCMS.form.Widget._toggleKeyword);Event.observe(document,"jcms:blur",JCMS.form.Widget._formatDate);Event.observe(document,"popup:callback",JCMS.form.Widget._popupCallback);"JCMS.wysiwyg.TinyMceCB"._namespace({editorsNbr:0,initInstanceCB:function(a){JCMS.wysiwyg.TinyMceCB.editorsNbr=JCMS.wysiwyg.TinyMceCB.editorsNbr-1;JCMS.wysiwyg.TinyMceCB._checkWysiwygEditorInitialization(a)},_checkWysiwygEditorInitialization:function(a){if(a){JcmsLogger.debug("TinyMCE_JcmsPluginCB","[",a.id,"] [_checkWysiwyg] - editorsNbr:",JCMS.wysiwyg.TinyMceCB.editorsNbr)}else{JcmsLogger.debug("TinyMCE_JcmsPluginCB","[_checkWysiwyg] - editorsNbr:",JCMS.wysiwyg.TinyMceCB.editorsNbr)}if(JCMS.wysiwyg.TinyMceCB.editorsNbr!=0){return}if(window.document.editForm&&window.document.editForm.pageLoaded){window.document.editForm.pageLoaded.value="true"}},_countWysiwygEditorOnPage:function(){var b=new Date().getTime();JCMS.wysiwyg.TinyMceCB.editorsNbr+=$$("TEXTAREA.formRichText").size();JCMS.wysiwyg.TinyMceCB.editorsNbr+=$$("TEXTAREA.formWikiwyg").size();JCMS.wysiwyg.TinyMceCB._checkWysiwygEditorInitialization();var a=new Date().getTime();JcmsLogger.info("Widget","Init WysiwygEditor Count"," in "+(a-b)+" ms")}});Event.observe(window,"load",function(){JCMS.wysiwyg.TinyMceCB._countWysiwygEditorOnPage()});function fillOpenerField(d,c,e,g,f,a){var b=getFormElementPos(c,e)+g;c.elements[b].value=f;c.elements[b-1].value=a;d.close()}function submitAddCount(e,d,f,b,c,a,h){var g=getFormElementCount(d,f,h)/a;b.value=g+c;simpleSubmitForm(e,d,"opRefresh","Wait WYSIWYG")}function getFormElementCount(e,a,f){var c=e.elements;var d=0;for(var b=0;b<c.length;b++){if(c[b].name!=a){continue}if(!f){d++;continue}if((c[b].id==f)||(c[b].id.indexOf(f)>-1)){d++}}return d}function getFormElementPos(d,a,e){var c=d.elements;for(var b=0;b<c.length;b++){if(c[b].name!=a){continue}if(!e){return b}if((c[b].id==e)||(c[b].id==e+"0")||(c[b].id&&c[b].id.startsWith(e))){return b}}return -1}function getFormElementLastPos(e,a,f,g){var c=e.elements;var d=-1;for(var b=0;b<c.length;b++){if(c[b].name!=a){if(d>0&&f){break}continue}if(!g){d=b;continue}if(c[b].id.indexOf(g)>-1){d=b;continue}if(d>0&&f){break}}return d}function simpleSubmitForm(g,k,c,f,j,a){if(k.pageLoaded&&k.pageLoaded.value=="false"){alert(f);return}if(j){k.anchor.value=j}var b=c;if(jQuery.isArray(c)){b=c[0];for(var d=1;d<c.length;d++){var h=new Element("input",{type:"hidden",name:c[1],value:"true"});k.appendChild(h)}}var e=k.elements.action;if(b&&!e){e=new Element("input",{type:"hidden",name:"action",value:"true"});k.appendChild(e)}if(b&&e){e.name=b;if(a){e.value=a}}jQuery(k).submit()}function confirmSubmitForm(c,b,d,f,g,a,e){if(top.confirm(f)){simpleSubmitForm(c,b,d,g,a,e)}}function confirmSubmitFormLightBox(c,b,d,f,g,a,e){JCMS.window.Modal.confirm(f,function(h){if(h){simpleSubmitForm(c,b,d,g,a,e)}})}function getFormName(a,b){if(a.all){if(b.attributes){if(b.attributes.getNamedItem){return b.attributes.getNamedItem("NAME").value}else{if(b.attributes.name){return b.attributes.name}else{if(b.attributes.NAME){return b.attributes.NAME}else{return"editForm"}}}}else{return"editForm"}}else{return b.getAttribute("NAME")}}function restrictToNumerics(a){var b=new RegExp("[^0-9]");var d=a.value;var c=d.replace(b,"");a.value=c}function submitForm(c,b,a){simpleSubmitForm(window,window.document.editForm,c,"Error",b,a)}function confirmSubmit(d,c,b,a){confirmSubmitForm(window,window.document.editForm,c,d,b,a)}function submitAction(b,a){simpleSubmitForm(window,window.document.editForm,b,"Error",null,a)};