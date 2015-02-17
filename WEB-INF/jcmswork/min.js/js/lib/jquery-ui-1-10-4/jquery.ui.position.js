/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function(e,c){e.ui=e.ui||{};var j,k=Math.max,o=Math.abs,m=Math.round,d=/left|center|right/,h=/top|center|bottom/,a=/[\+\-]\d+(\.[\d]+)?%?/,l=/^\w+/,b=/%$/,g=e.fn.position;function n(r,q,p){return[parseFloat(r[0])*(b.test(r[0])?q/100:1),parseFloat(r[1])*(b.test(r[1])?p/100:1)]}function i(p,q){return parseInt(e.css(p,q),10)||0}function f(q){var p=q[0];if(p.nodeType===9){return{width:q.width(),height:q.height(),offset:{top:0,left:0}}}if(e.isWindow(p)){return{width:q.width(),height:q.height(),offset:{top:q.scrollTop(),left:q.scrollLeft()}}}if(p.preventDefault){return{width:0,height:0,offset:{top:p.pageY,left:p.pageX}}}return{width:q.outerWidth(),height:q.outerHeight(),offset:q.offset()}}e.position={scrollbarWidth:function(){if(j!==c){return j}var q,p,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),r=s.children()[0];e("body").append(s);q=r.offsetWidth;s.css("overflow","scroll");p=r.offsetWidth;if(q===p){p=s[0].clientWidth}s.remove();return(j=q-p)},getScrollInfo:function(t){var s=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),r=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),q=s==="scroll"||(s==="auto"&&t.width<t.element[0].scrollWidth),p=r==="scroll"||(r==="auto"&&t.height<t.element[0].scrollHeight);return{width:p?e.position.scrollbarWidth():0,height:q?e.position.scrollbarWidth():0}},getWithinInfo:function(q){var r=e(q||window),p=e.isWindow(r[0]),s=!!r[0]&&r[0].nodeType===9;return{element:r,isWindow:p,isDocument:s,offset:r.offset()||{left:0,top:0},scrollLeft:r.scrollLeft(),scrollTop:r.scrollTop(),width:p?r.width():r.outerWidth(),height:p?r.height():r.outerHeight()}}};e.fn.position=function(z){if(!z||!z.of){return g.apply(this,arguments)}z=e.extend({},z);var A,w,u,y,t,p,v=e(z.of),s=e.position.getWithinInfo(z.within),q=e.position.getScrollInfo(s),x=(z.collision||"flip").split(" "),r={};p=f(v);if(v[0].preventDefault){z.at="left top"}w=p.width;u=p.height;y=p.offset;t=e.extend({},y);e.each(["my","at"],function(){var D=(z[this]||"").split(" "),C,B;if(D.length===1){D=d.test(D[0])?D.concat(["center"]):h.test(D[0])?["center"].concat(D):["center","center"]}D[0]=d.test(D[0])?D[0]:"center";D[1]=h.test(D[1])?D[1]:"center";C=a.exec(D[0]);B=a.exec(D[1]);r[this]=[C?C[0]:0,B?B[0]:0];z[this]=[l.exec(D[0])[0],l.exec(D[1])[0]]});if(x.length===1){x[1]=x[0]}if(z.at[0]==="right"){t.left+=w}else{if(z.at[0]==="center"){t.left+=w/2}}if(z.at[1]==="bottom"){t.top+=u}else{if(z.at[1]==="center"){t.top+=u/2}}A=n(r.at,w,u);t.left+=A[0];t.top+=A[1];return this.each(function(){var C,L,E=e(this),G=E.outerWidth(),D=E.outerHeight(),F=i(this,"marginLeft"),B=i(this,"marginTop"),K=G+F+i(this,"marginRight")+q.width,J=D+B+i(this,"marginBottom")+q.height,H=e.extend({},t),I=n(r.my,E.outerWidth(),E.outerHeight());if(z.my[0]==="right"){H.left-=G}else{if(z.my[0]==="center"){H.left-=G/2}}if(z.my[1]==="bottom"){H.top-=D}else{if(z.my[1]==="center"){H.top-=D/2}}H.left+=I[0];H.top+=I[1];if(!e.support.offsetFractions){H.left=m(H.left);H.top=m(H.top)}C={marginLeft:F,marginTop:B};e.each(["left","top"],function(N,M){if(e.ui.position[x[N]]){e.ui.position[x[N]][M](H,{targetWidth:w,targetHeight:u,elemWidth:G,elemHeight:D,collisionPosition:C,collisionWidth:K,collisionHeight:J,offset:[A[0]+I[0],A[1]+I[1]],my:z.my,at:z.at,within:s,elem:E})}});if(z.using){L=function(P){var R=y.left-H.left,O=R+w-G,Q=y.top-H.top,N=Q+u-D,M={target:{element:v,left:y.left,top:y.top,width:w,height:u},element:{element:E,left:H.left,top:H.top,width:G,height:D},horizontal:O<0?"left":R>0?"right":"center",vertical:N<0?"top":Q>0?"bottom":"middle"};if(w<G&&o(R+O)<w){M.horizontal="center"}if(u<D&&o(Q+N)<u){M.vertical="middle"}if(k(o(R),o(O))>k(o(Q),o(N))){M.important="horizontal"}else{M.important="vertical"}z.using.call(this,P,M)}}E.offset(e.extend(H,{using:L}))})};e.ui.position={fit:{left:function(t,s){var r=s.within,v=r.isWindow?r.scrollLeft:r.offset.left,x=r.width,u=t.left-s.collisionPosition.marginLeft,w=v-u,q=u+s.collisionWidth-x-v,p;if(s.collisionWidth>x){if(w>0&&q<=0){p=t.left+w+s.collisionWidth-x-v;t.left+=w-p}else{if(q>0&&w<=0){t.left=v}else{if(w>q){t.left=v+x-s.collisionWidth}else{t.left=v}}}}else{if(w>0){t.left+=w}else{if(q>0){t.left-=q}else{t.left=k(t.left-u,t.left)}}}},top:function(s,r){var q=r.within,w=q.isWindow?q.scrollTop:q.offset.top,x=r.within.height,u=s.top-r.collisionPosition.marginTop,v=w-u,t=u+r.collisionHeight-x-w,p;if(r.collisionHeight>x){if(v>0&&t<=0){p=s.top+v+r.collisionHeight-x-w;s.top+=v-p}else{if(t>0&&v<=0){s.top=w}else{if(v>t){s.top=w+x-r.collisionHeight}else{s.top=w}}}}else{if(v>0){s.top+=v}else{if(t>0){s.top-=t}else{s.top=k(s.top-u,s.top)}}}}},flip:{left:function(v,u){var t=u.within,z=t.offset.left+t.scrollLeft,C=t.width,r=t.isWindow?t.scrollLeft:t.offset.left,w=v.left-u.collisionPosition.marginLeft,A=w-r,q=w+u.collisionWidth-C-r,y=u.my[0]==="left"?-u.elemWidth:u.my[0]==="right"?u.elemWidth:0,B=u.at[0]==="left"?u.targetWidth:u.at[0]==="right"?-u.targetWidth:0,s=-2*u.offset[0],p,x;if(A<0){p=v.left+y+B+s+u.collisionWidth-C-z;if(p<0||p<o(A)){v.left+=y+B+s}}else{if(q>0){x=v.left-u.collisionPosition.marginLeft+y+B+s-r;if(x>0||o(x)<q){v.left+=y+B+s}}}},top:function(u,t){var s=t.within,B=s.offset.top+s.scrollTop,C=s.height,p=s.isWindow?s.scrollTop:s.offset.top,w=u.top-t.collisionPosition.marginTop,y=w-p,v=w+t.collisionHeight-C-p,z=t.my[1]==="top",x=z?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,D=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,r=-2*t.offset[1],A,q;if(y<0){q=u.top+x+D+r+t.collisionHeight-C-B;if((u.top+x+D+r)>y&&(q<0||q<o(y))){u.top+=x+D+r}}else{if(v>0){A=u.top-t.collisionPosition.marginTop+x+D+r-p;if((u.top+x+D+r)>v&&(A>0||o(A)<v)){u.top+=x+D+r}}}}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments);e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments);e.ui.position.fit.top.apply(this,arguments)}}};(function(){var t,v,q,s,r,p=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(p?"div":"body");q={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(p){e.extend(q,{position:"absolute",left:"-1000px",top:"-1000px"})}for(r in q){t.style[r]=q[r]}t.appendChild(u);v=p||document.documentElement;v.insertBefore(t,v.firstChild);u.style.cssText="position: absolute; left: 10.7432222px;";s=e(u).offset().left;e.support.offsetFractions=s>10&&s<11;t.innerHTML="";v.removeChild(t)})()}(jQuery));