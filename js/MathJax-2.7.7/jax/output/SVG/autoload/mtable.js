MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var ht=MathJax.ElementJax.mml,lt=MathJax.OutputJax.SVG,st=lt.BBOX;ht.mtable.Augment({toSVG:function(d){this.SVGgetStyles();var t=this.SVG(),o=this.SVGgetScale(t);if(0===this.data.length)return this.SVGsaveData(t),t;var m,f,c,u,S,a=this.getValues("columnalign","rowalign","columnspacing","rowspacing","columnwidth","equalcolumns","equalrows","columnlines","rowlines","frame","framespacing","align","useHeight","width","side","minlabelspacing"),w=(a.width.match(/%$/)&&(t.width=a.width=lt.Em(lt.cwidth/1e3*(parseFloat(a.width)/100))),this.SVGgetMu(t)),p=-1,e=[],G=[],n=[],i=[],V=[],N=-1,x=lt.FONTDATA.lineH*o*a.useHeight,M=lt.FONTDATA.lineD*o*a.useHeight;for(h=0,l=this.data.length;h<l;h++)for(r="mlabeledtr"===(f=this.data[h]).type?p:0,i[h]=[],e[h]=x,G[h]=M,g=r,m=f.data.length+r;g<m;g++)null==n[g]&&(N<g&&(N=g),V[g]=st.G(),n[g]=-lt.BIGDIMEN),tt=f.data[g-r],i[h][g]=tt.toSVG(),!tt.isEmbellished()||(S=(u=tt.CoreMO()).Get("minsize",!0))&&(u.SVGcanStretch("Vertical")?(c=u.SVGdata.h+u.SVGdata.d)&&((S=lt.length2em(S,w,c))*u.SVGdata.h/c>e[h]&&(e[h]=S*u.SVGdata.h/c),S*u.SVGdata.d/c>G[h]&&(G[h]=S*u.SVGdata.d/c)):u.SVGcanStretch("Horizontal")&&(S=lt.length2em(S,w,u.SVGdata.w))>n[g]&&(n[g]=S)),i[h][g].h>e[h]&&(e[h]=i[h][g].h),i[h][g].d>G[h]&&(G[h]=i[h][g].d),i[h][g].w>n[g]&&(n[g]=i[h][g].w);var I=MathJax.Hub.SplitList,A=I(a.columnspacing),E=I(a.rowspacing),b=I(a.columnalign),T=I(a.rowalign),v=I(a.columnlines),H=I(a.rowlines),D=I(a.columnwidth),y=[];for(h=0,l=A.length;h<l;h++)A[h]=lt.length2em(A[h],w);for(h=0,l=E.length;h<l;h++)E[h]=lt.length2em(E[h],w);for(;A.length<N;)A.push(A[A.length-1]);for(;b.length<=N;)b.push(b[b.length-1]);for(;v.length<N;)v.push(v[v.length-1]);for(;D.length<=N;)D.push(D[D.length-1]);for(;E.length<i.length;)E.push(E[E.length-1]);for(;T.length<=i.length;)T.push(T[T.length-1]);for(;H.length<i.length;)H.push(H[H.length-1]);for(V[p]&&(b[p]="l"===a.side.substr(0,1)?"left":"right",A[p]=-n[p]),h=0,l=i.length;h<l;h++)if(f=this.data[h],y[h]=[],f.rowalign&&(T[h]=f.rowalign),f.columnalign)for(y[h]=I(f.columnalign);y[h].length<=N;)y[h].push(y[h][y[h].length-1]);if(a.equalrows)for(var L=Math.max.apply(Math,e),J=Math.max.apply(Math,G),h=0,l=i.length;h<l;h++)r=(L+J-(e[h]+G[h]))/2,e[h]+=r,G[h]+=r;for(c=e[0]+G[i.length-1],h=0,l=i.length-1;h<l;h++)c+=Math.max(0,G[h]+e[h+1]+E[h]);var C,O=0,R=0,F=c;"none"===a.frame&&!(a.columnlines+a.rowlines).match(/solid|dashed/)||(2!=(s=I(a.framespacing)).length&&(s=I(this.defaults.framespacing)),O=lt.length2em(s[0],w),F=c+2*(R=lt.length2em(s[1],w)));var q,X,s="";if("string"!=typeof a.align&&(a.align=String(a.align)),a.align.match(/(top|bottom|center|baseline|axis)( +(-?\d+))?/)?(s=RegExp.$3||"",a.align=RegExp.$1):a.align=this.defaults.align,""!==s)for((s=(s=parseInt(s))<0?i.length+1+s:s)<1?s=1:s>i.length&&(s=i.length),X=-(c+R)+e[q=0],h=0,l=s-1;h<l;h++){var $=Math.max(0,G[h]+e[h+1]+E[h]);q+=$,X+=$}else q={top:-(e[0]+R),bottom:c+R-e[0],center:c/2-e[0],baseline:c/2-e[0],axis:c/2+lt.TeX.axis_height*o-e[0]}[a.align],X={top:-(c+2*R),bottom:0,center:-(c/2+R),baseline:-(c/2+R),axis:lt.TeX.axis_height*o-c/2-R}[a.align];var z,B=0,j=0,P=0,U=0,_=0,k=[],K=[],Q=1;if(a.equalcolumns&&"auto"!==a.width){for(z=lt.length2em(a.width,w),h=0,l=Math.min(N,A.length);h<l;h++)z-=A[h];for(z/=N,h=0,l=Math.min(N+1,D.length);h<l;h++)n[h]=z}else{for(h=0,l=Math.min(N+1,D.length);h<l;h++)"auto"===D[h]?j+=n[h]:"fit"===D[h]?(K[_]=h,_++,j+=n[h]):D[h].match(/%$/)?(k[U]=h,U++,P+=n[h],B+=lt.length2em(D[h],w,1)):(n[h]=lt.length2em(D[h],w),j+=n[h]);if("auto"===a.width)z=.98<B?(Q=P/(j+P),j+P):j/(1-B);else for(z=Math.max(j+P,lt.length2em(a.width,w)),h=0,l=Math.min(N,A.length);h<l;h++)z-=A[h];for(h=0,l=k.length;h<l;h++)n[k[h]]=lt.length2em(D[k[h]],w,z*Q),j+=n[k[h]];if(.01<Math.abs(z-j))if(_&&j<z)for(z=(z-j)/_,h=0,l=K.length;h<l;h++)n[K[h]]+=z;else for(z/=j,g=0;g<=N;g++)n[g]*=z;if(a.equalcolumns)for(var W=Math.max.apply(Math,n),g=0;g<=N;g++)n[g]=W}var Y,Z,r,tt,at=q;for(g=r=V[p]?p:0;g<=N;g++){for(V[g].w=n[g],h=0,l=i.length;h<l;h++)i[h][g]&&(r="mlabeledtr"===this.data[h].type?p:0,(tt=this.data[h].data[g-r]).SVGcanStretch("Horizontal")?i[h][g]=tt.SVGstretchH(n[g]):tt.SVGcanStretch("Vertical")&&(Z=(u=tt.CoreMO()).symmetric,u.symmetric=!1,i[h][g]=tt.SVGstretchV(e[h],G[h]),u.symmetric=Z),Z=tt.rowalign||this.data[h].rowalign||T[h],Y={top:e[h]-i[h][g].h,bottom:i[h][g].d-G[h],center:(e[h]-G[h]-(i[h][g].h-i[h][g].d))/2,baseline:0,axis:0}[Z]||0,Z=tt.columnalign||y[h][g]||b[g],V[g].Align(i[h][g],Z,0,at+Y)),h<i.length-1&&(at-=Math.max(0,G[h]+e[h+1]+E[h]));at=q}var et,nt=1.5*lt.em,it=O-nt/2;for(g=0;g<=N;g++)t.Add(V[g],it,0),it+=n[g]+A[g],"none"!==v[g]&&g<N&&g!==p&&t.Add(st.VLINE(F,nt,v[g]),it-A[g]/2,X);for(t.w+=O,t.d=-X,t.h=F+X,C=t.w,"none"!==a.frame&&(t.Add(st.HLINE(C,nt,a.frame),0,X+F-nt),t.Add(st.HLINE(C,nt,a.frame),0,X),t.Add(st.VLINE(F,nt,a.frame),0,X),t.Add(st.VLINE(F,nt,a.frame),C-nt,X)),at=q-nt/2,h=0,l=i.length-1;h<l;h++)Y=Math.max(0,G[h]+e[h+1]+E[h]),H[h]!==ht.LINES.NONE&&""!==H[h]&&t.Add(st.HLINE(C,nt,H[h]),0,at-G[h]-(Y-G[h]-e[h+1])/2),at-=Y;return t.Clean(),this.SVGhandleSpace(t),this.SVGhandleColor(t),V[p]&&(t.tw=Math.max(t.w,t.r)-Math.min(0,t.l),(s=this.getValues("indentalignfirst","indentshiftfirst","indentalign","indentshift")).indentalignfirst!==ht.INDENTALIGN.INDENTALIGN&&(s.indentalign=s.indentalignfirst),s.indentalign===ht.INDENTALIGN.AUTO&&(s.indentalign=this.displayAlign),s.indentshiftfirst!==ht.INDENTSHIFT.INDENTSHIFT&&(s.indentshift=s.indentshiftfirst),"auto"!==s.indentshift&&""!==s.indentshift||(s.indentshift="0"),o=lt.length2em(s.indentshift,w,lt.cwidth),R=lt.length2em(a.minlabelspacing,w,lt.cwidth)+V[p].w,O=0,a=t.w,et=lt.length2em(this.displayIndent,w,lt.cwidth),r=b[p]===ht.INDENTALIGN.RIGHT?-1:1,s.indentalign===ht.INDENTALIGN.CENTER?(lt.cwidth-a)/2+r*(o+=et)<R+r*O&&(s.indentalign=b[p],o=r*(R+r*O),a+=R+Math.max(0,o)):b[p]===s.indentalign?(et<0&&(O=r*et,et=0),r*(o+=r*et)<R&&(o=r*R),a+=r*(o+=O)):a-r*(o-=r*et)+R>lt.cwidth&&0<r*(o=r*(a+R-lt.cwidth))&&(a=lt.cwidth+r*o,o=0),et=t,(t=this.SVG()).hasIndent=!0,t.w=t.r=Math.max(a,lt.cwidth),t.Align(V[p],b[p],0,0,O),t.Align(et,s.indentalign,0,0,o),t.tw=a),this.SVGsaveData(t),t},SVGhandleSpace:function(t){this.hasFrame||t.width||(t.x=t.X=167),this.SUPER(arguments).SVGhandleSpace.call(this,t)}}),ht.mtd.Augment({toSVG:function(t,a){var e=this.svg=this.SVG();return this.data[0]&&(e.Add(this.SVGdataStretched(0,t,a)),e.Clean()),this.SVGhandleColor(e),this.SVGsaveData(e),e}}),MathJax.Hub.Startup.signal.Post("SVG mtable Ready"),MathJax.Ajax.loadComplete(lt.autoloadDir+"/mtable.js")});