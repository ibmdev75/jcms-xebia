(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(e){var d=/MSIE \d/.test(navigator.userAgent)&&(document.documentMode==null||document.documentMode<8);var i=e.Pos;var a={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"};function f(q,m,p,k){var s=q.getLineHandle(m.line),o=m.ch-1;var n=(o>=0&&a[s.text.charAt(o)])||a[s.text.charAt(++o)];if(!n){return null}var l=n.charAt(1)==">"?1:-1;if(p&&(l>0)!=(o==m.ch)){return null}var j=q.getTokenTypeAt(i(m.line,o+1));var r=g(q,i(m.line,o+(l>0?1:0)),l,j||null,k);return{from:i(m.line,o),to:r&&r.pos,match:r&&r.ch==n.charAt(0),forward:l>0}}function g(w,r,n,k,m){var l=(m&&m.maxScanLineLength)||10000;var t=(m&&m.maxScanLines)||500;var v=[],x=/[(){}[\]]/;var q=n>0?Math.min(r.line+t,w.lastLine()+1):Math.max(w.firstLine()-1,r.line-t);for(var o=r.line;o!=q;o+=n){var y=w.getLine(o);if(!y){continue}var u=n>0?0:y.length-1,p=n>0?y.length:-1;if(y.length>l){continue}if(o==r.line){u=r.ch-(n<0?1:0)}for(;u!=p;u+=n){var j=y.charAt(u);if(x.test(j)&&(k===undefined||w.getTokenTypeAt(i(o,u+1))==k)){var s=a[j];if((s.charAt(1)==">")==(n>0)){v.push(j)}else{if(!v.length){return{pos:i(o,u),ch:j}}else{v.pop()}}}}}}function b(s,n,m){var k=s.state.matchBrackets.maxHighlightLineLength||1000;var r=[],l=s.listSelections();for(var o=0;o<l.length;o++){var q=l[o].empty()&&f(s,l[o].head,false,m);if(q&&s.getLine(q.from.line).length<=k&&q.to&&s.getLine(q.to.line).length<=k){var j=q.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket";r.push(s.markText(q.from,i(q.from.line,q.from.ch+1),{className:j}));if(q.to){r.push(s.markText(q.to,i(q.to.line,q.to.ch+1),{className:j}))}}}if(r.length){if(d&&s.state.focused){s.display.input.focus()}var p=function(){s.operation(function(){for(var t=0;t<r.length;t++){r[t].clear()}})};if(n){setTimeout(p,800)}else{return p}}}var c=null;function h(j){j.operation(function(){if(c){c();c=null}c=b(j,false,j.state.matchBrackets)})}e.defineOption("matchBrackets",false,function(j,l,k){if(k&&k!=e.Init){j.off("cursorActivity",h)}if(l){j.state.matchBrackets=typeof l=="object"?l:{};j.on("cursorActivity",h)}});e.defineExtension("matchBrackets",function(){b(this,true)});e.defineExtension("findMatchingBracket",function(k,j){return f(this,k,j)});e.defineExtension("scanForBracket",function(l,j,k){return g(this,l,j,k)})});