MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var t=MathJax.ElementJax.mml,L=MathJax.OutputJax["HTML-CSS"];t.mmultiscripts.Augment({toHTML:function(p,t,l){p=this.HTMLcreateSpan(p);for(var c=this.HTMLgetScale(),a=L.createStack(p),s=L.createBox(a),l=(this.data[this.base]?(e=this.data[this.base].toHTML(s),null!=l?this.data[this.base].HTMLstretchV(s,t,l):null!=t&&this.data[this.base].HTMLstretchH(s,t),L.Measured(e,s)):s.bbox=this.HTMLzeroBBox(),L.TeX.x_height*c),t=L.TeX.scriptspace*c*.75,e=this.HTMLgetScripts(a,t),a=e[0],m=e[1],b=e[2],e=e[3],M=c,u=1;u<this.data.length;u++)if(this.data[u]&&this.data[u].spanID){M=this.data[u].HTMLgetScale();break}var n,d,T=L.TeX.sup_drop*M,i=L.TeX.sub_drop*M,o=s.bbox.h-T,i=s.bbox.d+i,H=0,h=(s.bbox.ic&&(H=s.bbox.ic),!this.data[this.base]||"mi"!==this.data[this.base].type&&"mo"!==this.data[this.base].type||L.isChar(this.data[this.base].data.join(""))&&1===s.bbox.scale&&!this.data[this.base].Get("largeop")&&(o=i=0),this.getValues("subscriptshift","superscriptshift")),x=this.HTMLgetMu(p),x=(h.subscriptshift=""===h.subscriptshift?0:L.length2em(h.subscriptshift,x),h.superscriptshift=""===h.superscriptshift?0:L.length2em(h.superscriptshift,x),0),r=(b?x=b.bbox.w+H:e&&(x=e.bbox.w-H),L.placeBox(s,x=x<0?0:x,0),m||e?a||b?(i=Math.max(i,L.TeX.sub2*c),n=L.TeX.rule_thickness*c,d=(a||b).bbox.h,r=(m||e).bbox.d,b&&(d=Math.max(d,b.bbox.h)),o-(r=e?Math.max(r,e.bbox.d):r)-(d-i)<3*n&&(i=3*n-o+r+d,0<(T=.8*l-(o-r))&&(o+=T,i-=T)),o=Math.max(o,h.superscriptshift),i=Math.max(i,h.subscriptshift),m&&L.placeBox(m,x+s.bbox.w+t,o),e&&L.placeBox(e,x+H-e.bbox.w,o),a&&L.placeBox(a,x+s.bbox.w+t-H,-i),b&&L.placeBox(b,x-b.bbox.w,-i)):(n=this.getValues("displaystyle","texprimestyle"),d=L.TeX[n.displaystyle?"sup1":n.texprimestyle?"sup3":"sup2"],o=Math.max(o,d*c,h.superscriptshift),m&&(o=Math.max(o,m.bbox.d+.25*l)),e&&(o=Math.max(o,e.bbox.d+.25*l)),m&&L.placeBox(m,x+s.bbox.w+t,o),e&&L.placeBox(e,0,o)):(i=Math.max(i,L.TeX.sub1*c,h.subscriptshift),a&&(i=Math.max(i,a.bbox.h-.8*l)),b&&(i=Math.max(i,b.bbox.h-.8*l)),a&&L.placeBox(a,x+s.bbox.w+t-H,-i),b&&L.placeBox(b,0,-i)),this.HTMLhandleSpace(p),this.HTMLhandleColor(p),p.bbox);return r.dx=x,r.s=t,r.u=o,r.v=i,r.delta=H,r.px=x+s.bbox.w,p},HTMLgetScripts:function(p,l){for(var t=[],a=1,c=this.data.length,s=0,e=0;e<4;e+=2){for(;a<c&&"mprescripts"!==(this.data[a]||{}).type;){for(var b=[null,null,null,null],i=e;i<e+2;i++)this.data[a]&&"none"!==this.data[a].type&&"mprescripts"!==this.data[a].type?(t[i]||(t[i]=L.createBox(p),t[i].bbox=this.HTMLemptyBBox({}),s&&(L.createBlank(t[i],s),t[i].bbox.w=t[i].bbox.rw=s)),b[i]=this.data[a].toHTML(t[i])):b[i]=MathJax.HTML.Element("span",{bbox:this.HTMLemptyBBox({})}),"mprescripts"!==(this.data[a]||{}).type&&a++;var o,h=2===e,x=t[e],r=t[e+1];x&&r?(0<(o=b[e+1].bbox.w-b[e].bbox.w)?h?(this.HTMLmoveColor(b[e],o,1),t[e].w+=o):L.createBlank(x,o):o<0&&(h?(this.HTMLmoveColor(b[e+1],-o,-1),t[e+1].w+=-o):L.createBlank(r,-o)),this.HTMLcombineBBoxes(b[e],x.bbox),this.HTMLcombineBBoxes(b[e+1],r.bbox),0<o?(x.bbox.w=r.bbox.w,x.bbox.rw=Math.max(x.bbox.w,x.bbox.rw)):o<0&&(r.bbox.w=x.bbox.w,r.bbox.rw=Math.max(r.bbox.w,r.bbox.rw))):(x&&this.HTMLcombineBBoxes(b[e],x.bbox),r&&this.HTMLcombineBBoxes(b[e+1],r.bbox)),x?s=x.bbox.w:r&&(s=r.bbox.w)}a++,s=0}for(i=0;i<4;i++)t[i]&&(t[i].bbox.w+=l,t[i].bbox.rw=Math.max(t[i].bbox.w,t[i].bbox.rw),t[i].bbox.name=["sub","sup","presub","presup"][i],this.HTMLcleanBBox(t[i].bbox));return t},HTMLmoveColor:function(t,a,s){a/=t.scale||1,t.style.paddingLeft=L.Em(a),t=t.previousSibling;t&&(t.id||"").match(/^MathJax-Color-/)&&(t.style.marginLeft=L.Em(a+parseFloat(t.style.marginLeft)),t.style.marginRight=L.Em(s*(a-parseFloat(t.style.marginRight))))},HTMLstretchH:t.mbase.HTMLstretchH,HTMLstretchV:t.mbase.HTMLstretchV}),MathJax.Hub.Startup.signal.Post("HTML-CSS mmultiscripts Ready"),MathJax.Ajax.loadComplete(L.autoloadDir+"/mmultiscripts.js")});