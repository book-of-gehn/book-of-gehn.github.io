MathJax.Extension.jsMath2jax={version:"2.7.7",config:{preview:"TeX"},PreProcess:function(e){this.configured||(this.config=MathJax.Hub.CombineConfig("jsMath2jax",this.config),this.config.Augment&&MathJax.Hub.Insert(this,this.config.Augment),void 0===this.config.previewTeX||this.config.previewTeX||(this.config.preview="none"),this.previewClass=MathJax.Hub.config.preRemoveClass,this.configured=!0);for(var t=(e=(e="string"==typeof e?document.getElementById(e):e)||document.body).getElementsByTagName("span"),a=t.length-1;0<=a;a--)String(t[a].className).match(/(^| )math( |$)/)&&this.ConvertMath(t[a],"");var i=e.getElementsByTagName("div");for(a=i.length-1;0<=a;a--)String(i[a].className).match(/(^| )math( |$)/)&&this.ConvertMath(i[a],"; mode=display")},ConvertMath:function(e,t){var a;0===e.getElementsByTagName("script").length&&(a=e.parentNode,t=this.createMathTag(t,e.innerHTML),e.nextSibling?a.insertBefore(t,e.nextSibling):a.appendChild(t),"none"!==this.config.preview&&this.createPreview(e),a.removeChild(e))},createPreview:function(e){var t=MathJax.Hub.config.preRemoveClass,a=this.config.preview;"none"!==a&&(e.previousSibling||{}).className!==t&&(a="TeX"===a?[this.filterPreview(e.innerHTML)]:a)&&(a=MathJax.HTML.Element("span",{className:t},a),e.parentNode.insertBefore(a,e))},createMathTag:function(e,t){t=t.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");var a=document.createElement("script");return a.type="math/tex"+e,MathJax.HTML.setScript(a,t),a},filterPreview:function(e){return e}},MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.jsMath2jax],8),MathJax.Ajax.loadComplete("[MathJax]/extensions/jsMath2jax.js");