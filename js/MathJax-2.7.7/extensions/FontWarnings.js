!function(n,i){function r(e){if(!d.div){for(var t,o=MathJax.OutputJax["HTML-CSS"],a=document.body,s=(n.Browser.isMSIE?"fixed"===l.messageStyle.position&&(MathJax.Message.Init(),(a=document.getElementById("MathJax_MSIE_Frame")||a)!==document.body&&(l.messageStyle.position="absolute")):delete l.messageStyle.filter,l.messageStyle.maxWidth=document.body.clientWidth-75+"px",0);s<e.length;)MathJax.Object.isArray(e[s])?1===e[s].length&&l.HTML[e[s][0]]?e.splice.apply(e,[s,1].concat(l.HTML[e[s][0]])):"string"==typeof e[s][1]?(t=MathJax.Localization.lookupPhrase(["FontWarnings",e[s][0]],e[s][1]),t=MathJax.Localization.processMarkdown(t,e[s].slice(2),"FontWarnings"),e.splice.apply(e,[s,1].concat(t)),s+=t.length):s++:s++;d.div=o.addElement(a,"div",{id:"MathJax_FontWarning",style:l.messageStyle},e),MathJax.Localization.setCSS(d.div),l.removeAfter&&n.Register.StartupHook("End",function(){d.timer=setTimeout(m,l.removeAfter)}),i.Cookie.Set("fontWarn",{warned:!0})}}var e="http://www.stixfonts.org/",t="https://github.com/mathjax/MathJax/tree/master/fonts/HTML-CSS/TeX/otf",l=n.CombineConfig("FontWarnings",{messageStyle:{position:"fixed",bottom:"4em",left:"3em",width:"40em",border:"3px solid #880000","background-color":"#E0E0E0",color:"black",padding:"1em","font-size":"small","white-space":"normal","border-radius":".75em","-webkit-border-radius":".75em","-moz-border-radius":".75em","-khtml-border-radius":".75em","box-shadow":"4px 4px 10px #AAAAAA","-webkit-box-shadow":"4px 4px 10px #AAAAAA","-moz-box-shadow":"4px 4px 10px #AAAAAA","-khtml-box-shadow":"4px 4px 10px #AAAAAA",filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=3, OffY=3, Color='gray', Positive='true')"},Message:{webFont:[["closeBox"],["webFont","MathJax is using web-based fonts to display the mathematics on this page.  These take time to download, so the page would render faster if you installed math fonts directly in your system's font folder."],["fonts"]],imageFonts:[["closeBox"],["imageFonts","MathJax is using its image fonts rather than local or web-based fonts. This will render slower than usual, and the mathematics may not print at the full resolution of your printer."],["fonts"],["webFonts"]],noFonts:[["closeBox"],["noFonts","MathJax is unable to locate a font to use to display its mathematics, and image fonts are not available, so it is falling back on generic unicode characters in hopes that your browser will be able to display them.  Some characters may not show up properly, or possibly not at all."],["fonts"],["webFonts"]]},HTML:{closeBox:[["div",{style:{position:"absolute",overflow:"hidden",top:".1em",right:".1em",border:"1px outset",width:"1em",height:"1em","text-align":"center",cursor:"pointer","background-color":"#EEEEEE",color:"#606060","border-radius":".5em","-webkit-border-radius":".5em","-moz-border-radius":".5em","-khtml-border-radius":".5em"},onclick:function(){d.div&&0===d.fade&&(d.timer&&clearTimeout(d.timer),d.div.style.display="none")}},[["span",{style:{position:"relative",bottom:".2em"}},["x"]]]]],webFonts:[["p"],["webFonts","Most modern browsers allow for fonts to be downloaded over the web. Updating to a more recent version of your browser (or changing browsers) could improve the quality of the mathematics on this page."]],fonts:[["p"],["fonts","MathJax can use either the [STIX fonts](%1) or the [MathJax TeX fonts](%2).  Download and install one of those fonts to improve your MathJax experience.",e,t]],STIXfonts:[["p"],["STIXPage","This page is designed to use the [STIX fonts](%1).  Download and install those fonts to improve your MathJax experience.",e]],TeXfonts:[["p"],["TeXPage","This page is designed to use the [MathJax TeX fonts](%1).  Download and install those fonts to improve your MathJax experience.",t]]},removeAfter:12e3,fadeoutSteps:10,fadeoutTime:1500}),d=(MathJax.Hub.Browser.isIE9&&9<=document.documentMode&&delete l.messageStyle.filter,{div:null,fade:0}),m=function(){var e;d.fade++,d.timer&&delete d.timer,d.fade<l.fadeoutSteps?(e=1-d.fade/l.fadeoutSteps,d.div.style.opacity=e,d.div.style.filter="alpha(opacity="+Math.floor(100*e)+")",setTimeout(m,l.fadeoutTime/l.fadeoutSteps)):d.div.style.display="none"};i.Cookie.Get("fontWarn").warned||n.Startup.signal.Interest(function(e){var t,o,a,s;e.match(/HTML-CSS Jax - /)&&!d.div&&((s=(o=(t=MathJax.OutputJax["HTML-CSS"]).config.availableFonts)&&o.length)?1===o.length&&(l.HTML.fonts=l.HTML[o[0]+"fonts"]):l.HTML.fonts=[""],t.allowWebFonts&&(l.HTML.webfonts=[""]),e.match(/- Web-Font/)?s&&(a="webFont"):e.match(/- using image fonts/)?a="imageFonts":e.match(/- no valid font/)&&(a="noFonts"),a&&l.Message[a]&&MathJax.Localization.loadDomain("FontWarnings",[r,l.Message[a]]))})}(MathJax.Hub,MathJax.HTML),MathJax.Ajax.loadComplete("[MathJax]/extensions/FontWarnings.js");