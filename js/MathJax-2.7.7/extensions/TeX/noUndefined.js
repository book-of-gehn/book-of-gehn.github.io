MathJax.Extension["TeX/noUndefined"]={version:"2.7.7",config:MathJax.Hub.CombineConfig("TeX.noUndefined",{disabled:!1,attributes:{mathcolor:"red"}})},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var n=MathJax.Extension["TeX/noUndefined"].config,a=MathJax.ElementJax.mml,t=MathJax.InputJax.TeX.Parse.prototype.csUndefined;MathJax.InputJax.TeX.Parse.Augment({csUndefined:function(e){if(n.disabled)return t.apply(this,arguments);MathJax.Hub.signal.Post(["TeX Jax - undefined control sequence",e]),this.Push(a.mtext(e).With(n.attributes))}}),MathJax.Hub.Startup.signal.Post("TeX noUndefined Ready")}),MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/noUndefined.js");