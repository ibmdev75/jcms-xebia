(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(b){b.defineOption("rulers",false,function(e,g,f){if(f&&f!=b.Init){a(e);e.off("refresh",d)}if(g&&g.length){c(e);e.on("refresh",d)}});function a(e){for(var f=e.display.lineSpace.childNodes.length-1;f>=0;f--){var g=e.display.lineSpace.childNodes[f];if(/(^|\s)CodeMirror-ruler($|\s)/.test(g.className)){g.parentNode.removeChild(g)}}}function c(m){var e=m.getOption("rulers");var j=m.defaultCharWidth();var g=m.charCoords(b.Pos(m.firstLine(),0),"div").left;var l=-m.display.scroller.offsetHeight;for(var k=0;k<e.length;k++){var h=document.createElement("div");var f,n=null;if(typeof e[k]=="number"){f=e[k]}else{f=e[k].column;n=e[k].className}h.className="CodeMirror-ruler"+(n?" "+n:"");h.style.cssText="left: "+(g+f*j)+"px; top: -50px; bottom: "+l+"px";m.display.lineSpace.insertBefore(h,m.display.cursorDiv)}}function d(e){a(e);c(e)}});