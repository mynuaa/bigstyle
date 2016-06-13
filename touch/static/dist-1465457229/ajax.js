define(function(require){var _cache={};var o={};var formhash="";o.getAjaxUrl=function(module){return dz.mobileapi+"?"+module};o.getFormHash=function(){return formhash};o.ajaxrequest=function(method,url,params,callbackfun,sync){jQuery.ajax({url:url,type:method,dataType:"json",data:params,async:sync?false:true,complete:function(res){},success:function(res){if(res.Variables.formhash)formhash=res.Variables.formhash;callbackfun(res)},error:function(XMLHttpRequest,textStatus,errorThrown){var errmsg="Error("+XMLHttpRequest.readyState+") : "+textStatus;alert(errmsg)}})};o.post=function(cachekey,params,callbackfun,noanimation){var url=o.getAjaxUrl(cachekey);o.ajaxrequest("post",url,params,callbackfun,noanimation)};o.get=function(method,cachekey,params,callbackfun,noanimation){var url=o.getAjaxUrl(cachekey);o.ajaxrequest("get",url,params,callbackfun,noanimation)};o.loadcache=function(cachekey,callbackfun,noanimation){if(_cache[cachekey]){callbackfun(_cache[cachekey])}else{this.post(cachekey,{},function(res){_cache[cachekey]=res;callbackfun(res)},noanimation)}};o.unsetcache=function(cachekey){_cache[cachekey]=null};o.clearcache=function(){_cache={}};return o});