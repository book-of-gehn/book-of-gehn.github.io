MathJax.Extension["TeX/newcommand"]={version:"2.7.7"},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.InputJax.TeX,r=a.Definitions;r.Add({macros:{newcommand:"NewCommand",renewcommand:"NewCommand",newenvironment:"NewEnvironment",renewenvironment:"NewEnvironment",def:"MacroDef",let:"Let"}},null,!0),a.Parse.Augment({NewCommand:function(t){var e=this.trimSpaces(this.GetArgument(t)),i=this.GetBrackets(t),s=this.GetBrackets(t),r=this.GetArgument(t);(e="\\"===e.charAt(0)?e.substr(1):e).match(/^(.|[a-z]+)$/i)||a.Error(["IllegalControlSequenceName","Illegal control sequence name for %1",t]),i&&((i=this.trimSpaces(i)).match(/^[0-9]+$/)||a.Error(["IllegalParamNumber","Illegal number of parameters specified in %1",t])),this.setDef(e,["Macro",r,i,s])},NewEnvironment:function(t){var e=this.trimSpaces(this.GetArgument(t)),i=this.GetBrackets(t),s=this.GetBrackets(t),r=this.GetArgument(t),n=this.GetArgument(t);i&&((i=this.trimSpaces(i)).match(/^[0-9]+$/)||a.Error(["IllegalParamNumber","Illegal number of parameters specified in %1",t])),this.setEnv(e,["BeginEnv",[null,"EndEnv"],r,n,i,s])},MacroDef:function(t){var e=this.GetCSname(t),i=this.GetTemplate(t,"\\"+e),t=this.GetArgument(t);i instanceof Array?this.setDef(e,["MacroWithTemplate",t].concat(i)):this.setDef(e,["Macro",t,i])},Let:function(t){var e,i=this.GetCSname(t),s=this.GetNext();if("="===s&&(this.i++,s=this.GetNext()),"\\"===s){if(t=this.GetCSname(t),!(e=this.csFindMacro(t)))if(r.mathchar0mi.hasOwnProperty(t))e=["csMathchar0mi",r.mathchar0mi[t]];else if(r.mathchar0mo.hasOwnProperty(t))e=["csMathchar0mo",r.mathchar0mo[t]];else if(r.mathchar7.hasOwnProperty(t))e=["csMathchar7",r.mathchar7[t]];else{if(!r.delimiter.hasOwnProperty("\\"+t))return;e=["csDelimiter",r.delimiter["\\"+t]]}}else e=["Macro",s],this.i++;this.setDef(i,e)},GetCSname:function(t){return"\\"!==this.GetNext()&&a.Error(["MissingCS","%1 must be followed by a control sequence",t]),this.trimSpaces(this.GetArgument(t)).substr(1)},GetTemplate:function(t,e){for(var i=[],s=0,r=this.GetNext(),n=this.i;this.i<this.string.length;){if("#"===(r=this.GetNext()))n!==this.i&&(i[s]=this.string.substr(n,this.i-n)),(r=this.string.charAt(++this.i)).match(/^[1-9]$/)||a.Error(["CantUseHash2","Illegal use of # in template for %1",e]),parseInt(r)!=++s&&a.Error(["SequentialParam","Parameters for %1 must be numbered sequentially",e]),n=this.i+1;else if("{"===r)return n!==this.i&&(i[s]=this.string.substr(n,this.i-n)),0<i.length?[s,i]:s;this.i++}a.Error(["MissingReplacementString","Missing replacement string for definition of %1",t])},MacroWithTemplate:function(t,e,i,s){if(i){var r=[];this.GetNext(),s[0]&&!this.MatchParam(s[0])&&a.Error(["MismatchUseDef","Use of %1 doesn't match its definition",t]);for(var n=0;n<i;n++)r.push(this.GetParameter(t,s[n+1]));e=this.SubstituteArgs(r,e)}this.string=this.AddArgs(e,this.string.slice(this.i)),this.i=0,++this.macroCount>a.config.MAXMACROS&&a.Error(["MaxMacroSub1","MathJax maximum macro substitution count exceeded; is there a recursive macro call?"])},BeginEnv:function(t,e,i,s,r){if(s){var n,a=[];null!=r&&(n=this.GetBrackets("\\begin{"+name+"}"),a.push(null==n?r:n));for(var h=a.length;h<s;h++)a.push(this.GetArgument("\\begin{"+name+"}"));e=this.SubstituteArgs(a,e),i=this.SubstituteArgs([],i)}return this.string=this.AddArgs(e,this.string.slice(this.i)),this.i=0,t},EndEnv:function(t,e,i,s){t="\\end{\\end\\"+t.name+"}";return this.string=this.AddArgs(i,t+this.string.slice(this.i)),this.i=0,null},GetParameter:function(t,e){if(null==e)return this.GetArgument(t);for(var i=this.i,s=0,r=0;this.i<this.string.length;){var n=this.string.charAt(this.i);if("{"===n)this.i===i&&(r=1),this.GetArgument(t),s=this.i-i;else{if(this.MatchParam(e))return r&&(i++,s-=2),this.string.substr(i,s);"\\"===n?(this.i++,s++,r=0,(n=this.string.substr(this.i).match(/[a-z]+|./i))&&(this.i+=n[0].length,s=this.i-i)):(this.i++,s++,r=0)}}a.Error(["RunawayArgument","Runaway argument for %1?",t])},MatchParam:function(t){return this.string.substr(this.i,t.length)!==t||t.match(/\\[a-z]+$/i)&&this.string.charAt(this.i+t.length).match(/[a-z]/i)?0:(this.i+=t.length,1)}}),a.Environment=function(t){r.environment[t]=["BeginEnv",[null,"EndEnv"]].concat([].slice.call(arguments,1)),r.environment[t].isUser=!0},MathJax.Hub.Startup.signal.Post("TeX newcommand Ready")}),MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/newcommand.js");