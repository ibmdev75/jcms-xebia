/*! elementQuery | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function(e,j,d){var m=e.Sizzle||jQuery.find;var q={};var f=null;var p=function(){if(j.styleSheets[0]){f=(j.styleSheets[0].cssRules!==d)?"cssRules":"rules"}};var o=function(r,s,w,t,u){r=c(r);if(r!=""){var v;if(!t&&!u){v=/^([0-9]*.?[0-9]+)(px|em)$/.exec(w);if(v!=null){t=Number(v[1]);if(t+""!="NaN"){u=v[2]}}}if(u){if(m.compile){m.compile(r)}if(q[r]===d){q[r]={}}if(q[r][s]===d){q[r][s]={}}q[r][s][w]=[t,u]}}};var l=function(u,v){var t,s,r;for(t in u){for(s in u[t]){if(typeof u[t][s]=="string"){o(t,s,u[t][s])}else{if(typeof u[t][s]=="object"){for(r=0;r<u[t][s].length;r++){o(t,s,u[t][s][r])}}}}}if(v==true){g()}};var i=function(r){if(r){var z=/(\[(min\-width|max\-width|min\-height|max\-height)\~\=(\'|\")([0-9]*.?[0-9]+)(px|em)(\'|\")\])(\[(min\-width|max\-width|min\-height|max\-height)\~\=(\'|\")([0-9]*.?[0-9]+)(px|em)(\'|\")\])?/gi;var A=r.split(",");var x,u,C,w,s,v,y,B;for(x=0;x<A.length;x++){u=null;s=0;v=0;while(v==0||C!=null){C=z.exec(A[x]);if(C!=null){w=Number(C[4]);if(w+""!="NaN"){if(u==null){u=A[x].substring(s,C.index);y=A[x].substring(C.index+C[1].length);if(y.length>0){B=y.indexOf(" ");if(B!=0){if(B>0){y=y.substring(0,B)}y=y.replace(/(\[(min\-width|max\-width|min\-height|max\-height)\~\=(\'|\")([0-9]*.?[0-9]+)(px|em)(\'|\")\])/gi,"");u+=y}}}o(u,C[2],C[4]+C[5],w,C[5])}if(C[7]===d||C[7]==""){s=C.index+C[1].length;u=null}else{z.lastIndex=C.index+C[1].length}}v++}}}};var b=function(w,t){if(f==null){p()}if(w[f]&&w[f].length>0){var v=w.ownerNode||w.owningElement;if(t||(v.getAttribute("data-elementquery-bypass")===null&&v.getAttribute("data-elementquery-processed")===null)){var s,r,u;for(s=0;s<w[f].length;s++){u=w[f][s];if(u[f]&&u[f].length>0){for(r=0;r<u[f].length;r++){i(u[f][r].selectorText)}}else{i(u.selectorText)}}v.setAttribute("data-elementquery-processed","")}}};var c=function(s){if(s==null){return""}else{var r="".trim;if(r&&!r.call("\uFEFF\xA0")){return r.call(s)}else{return(s+"").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}}};var h=function(s,r){var t=s.getAttribute(r);return t?(" "+t+" ").replace(/[\t\r\n]/g," "):" "};var a=function(s,r,t){if(s.nodeType===1){var v=c(t);if(v!=""){var u=h(s,r);if(u.indexOf(" "+v+" ")<0){s.setAttribute(r,c(u+v))}}}};var k=function(t,r,u){if(t.nodeType===1){var w=c(u);if(w!=""){var v=h(t,r);var s=false;while(v.indexOf(" "+w+" ")>=0){v=v.replace(" "+w+" "," ");s=true}if(s){t.setAttribute(r,c(v))}}}};var n=function(){var r;for(r=0;r<j.styleSheets.length;r++){b(j.styleSheets[r])}g()};var g=function(){var u,x,s,r,w,t,y;for(u in q){w=m(u);if(w.length>0){for(x=0;x<w.length;x++){t=w[x];for(s in q[u]){for(r in q[u][s]){y=q[u][s][r][0];if(q[u][s][r][1]=="em"){y=y*(e.getEmPixels?getEmPixels(t):16)}if((s=="min-width"&&t.offsetWidth>=y)||(s=="max-width"&&t.offsetWidth<=y)||(s=="min-height"&&t.offsetHeight>=y)||(s=="max-height"&&t.offsetHeight<=y)){a(t,s,r)}else{k(t,s,r)}}}}}}if(!e.addEventListener&&e.attachEvent){var v=j.documentElement.className;j.documentElement.className=" "+v;j.documentElement.className=v}};e.elementQuery=function(s,r){if(s&&typeof s=="object"){if(s.cssRules||s.rules){b(s,true);if(r==true){g()}}else{l(s,r)}}else{if(!s&&!r){g()}}};e.elementQuery.selectors=function(){var u={};var t,s,r;for(t in q){for(s in q[t]){for(r in q[t][s]){if(u[t]===d){u[t]={}}if(u[t][s]===d){u[t][s]=[]}u[t][s][u[t][s].length]=r}}}return u};if(e.addEventListener){e.addEventListener("resize",g,false);e.addEventListener("DOMContentLoaded",n,false);e.addEventListener("load",n,false)}else{if(e.attachEvent){e.attachEvent("onresize",g);e.attachEvent("onload",n)}}}(this,document,undefined));
/*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function(a,d){var b="!important;";var c="position:absolute"+b+"visibility:hidden"+b+"width:1em"+b+"font-size:1em"+b+"padding:0"+b;window.getEmPixels=function(e){var h;if(!e){e=h=a.createElement("body");h.style.cssText="font-size:1em"+b;d.insertBefore(h,a.body)}var g=a.createElement("i");g.style.cssText=c;e.appendChild(g);var f=g.clientWidth;if(h){d.removeChild(h)}else{e.removeChild(g)}return f}}(document,document.documentElement));