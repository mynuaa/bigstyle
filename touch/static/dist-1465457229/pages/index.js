define(function(require){var IndexTab=require("./index_tab");var conf=require("conf");var frame=require("frame");var ajax=require("ajax");var o={};var h5page;var tab;var allfids;function init(){h5page=new MWT.H5Page({render:frame.getRender(),header:frame.createHeader({items:[{label:"<h1>"+dz.bbname+"</h1>"}]}),bodyStyle:"background-color:#f2f2f2;padding:0;",pagebody:'<div id="indexbannerdiv" style="width:100%;height:160px;background:#eee;"></div>'+'<div id="indexhotdiv" style="background:#fff;"></div>'+'<div id="indexbodydiv" style="margin-top:10px;"></div>'+require("common/copyright").footer()});h5page.on("open",function(){init_banner();allfids=require("data/forum").getAllForumIds();tab=new IndexTab("indexbodydiv",query);tab.init();init_hot_forum()})}function init_banner(){var images=[];for(var i=0;i<conf.banners.length;++i){var bn=conf.banners[i];images.push({url:bn.image,handler:function(){window.location=bn.href}})}var slide=new MWT.Slide({render:"indexbannerdiv",autoplay:0,images:images});slide.create()}function init_hot_forum(){var hotforums=require("data/forum").getHotForums();if(hotforums.length==0)return;var code='<div class="weui_cells_title mwt-border-bottom" style="margin:0;">热门版块</div>'+'<div id="indexhotdiv-f"></div>';jQuery("#indexhotdiv").html(code);var n=hotforums.length<4?hotforums.length:4;var list=[];for(var i=0;i<n;++i){var fim=hotforums[i];var code='<div name="ffsasdw" data-fid="'+fim.fid+'"><img src="'+fim.icon+'" style="width:30px;height:30px;">'+'<br><span style="font-size:14px;">'+fim.name+"</span></div>";list.push({html:code})}var tabbox=new MWT.TabBox({render:"indexhotdiv-f",size:"1x"+n,border:false,cellStyle:"text-align:center;padding:5px 0;line-height:20px;",items:list});tabbox.on("show",function(){jQuery("[name=ffsasdw]").click(function(){var fid=jQuery(this).data("fid");require("pages/forum/forumdisplay").open(fid,"slideRight")})});tabbox.show()}function query(idx,page){var api="version=4";var limit=20;switch(idx){case 1:var start=(page-1)*limit;api+="&module=newthreads&fids="+allfids.join(",")+"&start="+start+"&limit="+limit;break;case 2:api+="&module=hotthread";break;default:return}MWT.show_loading();ajax.post(api,{},function(res){MWT.hide_loading();var pageSize=idx==1?limit:parseInt(res.Variables.perpage);tab.show_list(res,page,pageSize)})}o.open=function(animate){if(!h5page)init();h5page.setAnimate(animate).open()};return o});