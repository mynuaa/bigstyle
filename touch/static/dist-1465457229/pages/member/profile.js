define(function(require){var frame=require("frame");var ajax=require("ajax");var o={};var h5page;function init(){h5page=new MWT.H5Page({render:"uc-profile",header:frame.createHeader({items:[{icon:"icon icon-left",iconStyle:"font-size:20px;margin-top:5px;",width:40,handler:function(){h5page.close()}},{label:"<h1>我的资料</h1>"},{label:"",width:40}]}),bodyStyle:"background-color:#f2f2f2;padding:0;",pagebody:'<div class="weui_cells" id="uc-profile-body"></div>'});h5page.on("open",function(){query()})}function query(){var api="version=4&module=profile";ajax.post(api,{},function(res){var list=[["积分",res.Variables.space.credits]];for(var i in res.Variables.extcredits){var im=res.Variables.extcredits[i];var sc=res.Variables.space["extcredits"+i];list.push([im.title,sc])}var code="";for(var i=0;i<list.length;++i){var im=list[i];code+='<div class="weui_cell">'+'<div class="weui_cell_bd weui_cell_primary">'+"<p>"+im[0]+"</p>"+"</div>"+'<div class="weui_cell_ft">'+im[1]+"</div>"+"</div>"}jQuery("#uc-profile-body").html(code)})}o.open=function(animate){if(dz.uid==0){require("./login").open()}else{if(!h5page)init();h5page.setAnimate(animate).open()}};return o});