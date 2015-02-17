(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("go",function(c){var f=c.indentUnit;var e={"break":true,"case":true,chan:true,"const":true,"continue":true,"default":true,defer:true,"else":true,fallthrough:true,"for":true,func:true,go:true,"goto":true,"if":true,"import":true,"interface":true,map:true,"package":true,range:true,"return":true,select:true,struct:true,"switch":true,type:true,"var":true,bool:true,"byte":true,complex64:true,complex128:true,float32:true,float64:true,int8:true,int16:true,int32:true,int64:true,string:true,uint8:true,uint16:true,uint32:true,uint64:true,"int":true,uint:true,uintptr:true};var g={"true":true,"false":true,iota:true,nil:true,append:true,cap:true,close:true,complex:true,copy:true,imag:true,len:true,make:true,"new":true,panic:true,print:true,println:true,real:true,recover:true};var b=/[+\-*&^%:=<>!|\/]/;var k;function d(q,o){var n=q.next();if(n=='"'||n=="'"||n=="`"){o.tokenize=m(n);return o.tokenize(q,o)}if(/[\d\.]/.test(n)){if(n=="."){q.match(/^[0-9]+([eE][\-+]?[0-9]+)?/)}else{if(n=="0"){q.match(/^[xX][0-9a-fA-F]+/)||q.match(/^0[0-7]+/)}else{q.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/)}}return"number"}if(/[\[\]{}\(\),;\:\.]/.test(n)){k=n;return null}if(n=="/"){if(q.eat("*")){o.tokenize=i;return i(q,o)}if(q.eat("/")){q.skipToEnd();return"comment"}}if(b.test(n)){q.eatWhile(b);return"operator"}q.eatWhile(/[\w\$_]/);var p=q.current();if(e.propertyIsEnumerable(p)){if(p=="case"||p=="default"){k="case"}return"keyword"}if(g.propertyIsEnumerable(p)){return"atom"}return"variable"}function m(n){return function(s,q){var r=false,p,o=false;while((p=s.next())!=null){if(p==n&&!r){o=true;break}r=!r&&p=="\\"}if(o||!(r||n=="`")){q.tokenize=d}return"string"}}function i(q,p){var n=false,o;while(o=q.next()){if(o=="/"&&n){p.tokenize=d;break}n=(o=="*")}return"comment"}function l(r,o,n,q,p){this.indented=r;this.column=o;this.type=n;this.align=q;this.prev=p}function h(p,n,o){return p.context=new l(p.indented,n,o,null,p.context)}function j(o){var n=o.context.type;if(n==")"||n=="]"||n=="}"){o.indented=o.context.indented}return o.context=o.context.prev}return{startState:function(n){return{tokenize:null,context:new l((n||0)-f,0,"top",false),indented:0,startOfLine:true}},token:function(q,p){var n=p.context;if(q.sol()){if(n.align==null){n.align=false}p.indented=q.indentation();p.startOfLine=true;if(n.type=="case"){n.type="}"}}if(q.eatSpace()){return null}k=null;var o=(p.tokenize||d)(q,p);if(o=="comment"){return o}if(n.align==null){n.align=true}if(k=="{"){h(p,q.column(),"}")}else{if(k=="["){h(p,q.column(),"]")}else{if(k=="("){h(p,q.column(),")")}else{if(k=="case"){n.type="case"}else{if(k=="}"&&n.type=="}"){n=j(p)}else{if(k==n.type){j(p)}}}}}}p.startOfLine=false;return o},indent:function(r,o){if(r.tokenize!=d&&r.tokenize!=null){return 0}var n=r.context,q=o&&o.charAt(0);if(n.type=="case"&&/^(?:case|default)\b/.test(o)){r.context.type="}";return n.indented}var p=q==n.type;if(n.align){return n.column+(p?0:1)}else{return n.indented+(p?0:f)}},electricChars:"{}):",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}});a.defineMIME("text/x-go","go")});