(function(b){var a={series:{curvedLines:{active:false,apply:false,fit:false,curvePointFactor:20,fitPointDist:0.0001}}};function c(f){f.hooks.processOptions.push(g);function g(i,h){if(h.series.curvedLines.active){i.hooks.processDatapoints.push(e)}}function e(p,n,q){if(n.curvedLines.apply==true){if(n.lines.fill){var u=d(q,n.curvedLines,1),r=d(q,n.curvedLines,2);q.pointsize=3;q.points=[];var m=0;var l=0;var o=0;var h=2;while(o<u.length||m<r.length){if(u[o]==r[m]){q.points[l]=u[o];q.points[l+1]=u[o+1];q.points[l+2]=r[m+1];m+=h;o+=h}else{if(u[o]<r[m]){q.points[l]=u[o];q.points[l+1]=u[o+1];q.points[l+2]=l>0?q.points[l-1]:null;o+=h}else{q.points[l]=r[m];q.points[l+1]=l>1?q.points[l-2]:null;q.points[l+2]=r[m+1];m+=h}}l+=3}if(n.lines.lineWidth>0){var t=b.extend({},n);t.lines=b.extend({},n.lines);t.lines.fill=undefined;t.label=undefined;t.datapoints={};t.datapoints.points=u;t.datapoints.pointsize=2;t.curvedLines.apply=false;var s=p.getData();for(o=0;o<s.length;o++){if(s[o]==n){p.getData().splice(o+1,0,t);break}}n.lines.lineWidth=0}}else{if(n.lines.lineWidth>0){q.points=d(q,n.curvedLines,1);q.pointsize=2}}}}function d(m,W,E){var O=m.points,I=m.pointsize;var v=W.curvePointFactor*(O.length/I);var l=new Array;var F=new Array;var r=0;var o=E;var x=-1;var w=-1;var M=0;if(W.fit){var z=W.fitPointDist;for(var P=0;P<O.length;P+=I){var u=new Array;var H=new Array;x=P;w=P+E;u[r]=O[x]-z;u[o]=O[w];H[r]=O[x]+z;H[o]=O[w];var R=O[w];var A=O[w];if(P>=I){R=O[w-I]}if((P+I)<O.length){A=O[w+I]}if((R<=O[w]&&A<=O[w])||(R>=O[w]&&A>=O[w])){l[M]=u[r];F[M]=u[o];M++;l[M]=O[x];F[M]=O[w];M++;l[M]=H[r];F[M]=H[o];M++}else{l[M]=O[x];F[M]=O[w];M++}}}else{for(var P=0;P<O.length;P+=I){x=P;w=P+E;l[M]=O[x];F[M]=O[w];M++}}var G=l.length;var q=new Array();var U=new Array();q[0]=0;q[G-1]=0;U[0]=0;for(var P=1;P<G-1;++P){var S=(l[P+1]-l[P-1]);if(S==0){return null}var B=(l[P]-l[P-1])/S;var D=B*q[P-1]+2;q[P]=(B-1)/D;U[P]=(F[P+1]-F[P])/(l[P+1]-l[P])-(F[P]-F[P-1])/(l[P]-l[P-1]);U[P]=(6*U[P]/(l[P+1]-l[P-1])-B*U[P-1])/D}for(var M=G-2;M>=0;--M){q[M]=q[M]*q[M+1]+U[M]}var t=(l[G-1]-l[0])/(v-1);var C=new Array;var L=new Array;var y=new Array;C[0]=l[0];L[0]=F[0];y.push(C[0]);y.push(L[0]);for(M=1;M<v;++M){C[M]=C[0]+M*t;var N=G-1;var J=0;while(N-J>1){var K=Math.round((N+J)/2);if(l[K]>C[M]){N=K}else{J=K}}var Q=(l[N]-l[J]);if(Q==0){return null}var V=(l[N]-C[M])/Q;var T=(C[M]-l[J])/Q;L[M]=V*F[J]+T*F[N]+((V*V*V-V)*q[J]+(T*T*T-T)*q[N])*(Q*Q)/6;y.push(C[M]);y.push(L[M])}return y}}b.plot.plugins.push({init:c,options:a,name:"curvedLines",version:"0.5"})})(jQuery);