!function(t,n,o){var e=n.config.menuSettings,a=MathJax.Extension.AssistiveMML={version:"2.7.7",config:n.CombineConfig("AssistiveMML",{disabled:!1,styles:{".MJX_Assistive_MathML":{position:"absolute!important",top:0,left:0,clip:n.Browser.isMSIE&&(document.documentMode||0)<8?"rect(1px 1px 1px 1px)":"rect(1px, 1px, 1px, 1px)",padding:"1px 0 0 0!important",border:"0!important",height:"1px!important",width:"1px!important",overflow:"hidden!important",display:"block!important","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"},".MJX_Assistive_MathML.MJX_Assistive_MathML_Block":{width:"100%!important"}}}),Config:function(){this.config.disabled||null!=e.assistiveMML||n.Config({menuSettings:{assistiveMML:!0}}),t.Styles(this.config.styles),n.Register.MessageHook("End Math",function(t){if(e.assistiveMML)return a.AddAssistiveMathML(t[1])})},AddAssistiveMathML:function(t){t={jax:n.getAllJax(t),i:0,callback:MathJax.Callback({})};return this.HandleMML(t),t.callback},RemoveAssistiveMathML:function(t){for(var e,a=n.getAllJax(t),i=0,s=a.length;i<s;i++)(e=document.getElementById(a[i].inputID+"-Frame"))&&e.getAttribute("data-mathml")&&(e.removeAttribute("data-mathml"),e.lastChild&&e.lastChild.className.match(/MJX_Assistive_MathML/)&&e.removeChild(e.lastChild))},HandleMML:function(e){for(var t,a,i,s=e.jax.length;e.i<s;){if(i=e.jax[e.i],a=document.getElementById(i.inputID+"-Frame"),"NativeMML"!==i.outputJax&&"PlainSource"!==i.outputJax&&a&&!a.getAttribute("data-mathml")){try{t=i.root.toMathML("").replace(/\n */g,"").replace(/<!--.*?-->/g,"")}catch(t){if(!t.restart)throw t;return MathJax.Callback.After(["HandleMML",this,e],t.restart)}a.setAttribute("data-mathml",t),i=o.addElement(a,"span",{isMathJax:!0,unselectable:"on",className:"MJX_Assistive_MathML"+("block"===i.root.Get("display")?" MJX_Assistive_MathML_Block":"")});try{i.innerHTML=t}catch(t){}a.style.position="relative",a.setAttribute("role","presentation"),a.firstChild.setAttribute("aria-hidden","true"),i.setAttribute("role","presentation")}e.i++}e.callback()}};n.Startup.signal.Post("AssistiveMML Ready")}(MathJax.Ajax,(MathJax.Callback,MathJax.Hub),MathJax.HTML),MathJax.Callback.Queue(["Require",MathJax.Ajax,"[MathJax]/extensions/toMathML.js"],["loadComplete",MathJax.Ajax,"[MathJax]/extensions/AssistiveMML.js"],function(){MathJax.Hub.Register.StartupHook("End Config",["Config",MathJax.Extension.AssistiveMML])});