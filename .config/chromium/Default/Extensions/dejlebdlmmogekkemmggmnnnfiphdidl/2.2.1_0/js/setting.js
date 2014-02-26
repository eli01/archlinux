$(document).ready(function(){
	auto_zoom('#main');
	local_backup();

	var Language=navigator.language;
	if(Language=="zh-CN"){
		_Default_site='{"name":"爱淘宝","url":"http://ai.taobao.com/?pid=mm_29924319_4040115_13104561&eventid=101329","ico":"http://ai.taobao.com/","type":"0","color":"#FC6E1E","bgimg":"'+_DefautImg.aitaobao+'"},{"name":"亚马逊","url":"http://www.amazon.cn/?_encoding=UTF8&camp=536&creative=3200&linkCode=ur2&tag=mifish-23","ico":"http://www.amazon.cn","type":"0","color":"rgb(196, 191, 182)","bgimg":"'+_DefautImg.amazon+'"},{"name":"新浪微博","url":"http://weibo.com","ico":"http://weibo.com","type":"4","color":"rgb(158, 65, 45)","bgimg":"'+_DefautImg.weibo+'"},{"name":"Chrome商店","url":"https://chrome.google.com/webstore?utm_source=chrome-ntp-icon","ico":"https://chrome.google.com/webstore?utm_source=chrome-ntp-icon","type":"4","color":"rgb(150, 140, 129)","bgimg":"'+_DefautImg.chromestore+'"},{"name":"豆瓣FM","url":"http://douban.fm","ico":"http://douban.fm","type":"4","color":"rgb(231, 146, 113)","bgimg":"'+_DefautImg.doubanfm+'"},{"name":"QQ空间","url":"http://qzone.qq.com","ico":"http://qzone.qq.com","type":"4","color":"rgb(143, 108, 34)","bgimg":"'+_DefautImg.qzone+'"},{"name":"当当网","url":"http://union.dangdang.com/transfer.php?from=P-319540-mifish&ad_type=10&sys_id=1&backurl=http%3A%2F%2Fwww.dangdang.com","ico":"http://www.dangdang.com","type":"4","color":"rgb(126, 201, 179)","bgimg":"'+_DefautImg.dangdang+'"},{"name":"去哪儿网","url":"http://www.qunar.com/","ico":"http://www.qunar.com/","type":"4","color":"rgb(66, 170, 197)","bgimg":"'+_DefautImg.qunar+'"},{"name":"爱奇艺","url":"http://www.iqiyi.com/","ico":"http://www.iqiyi.com/","type":"4","color":"rgb(81, 122, 35)","bgimg":"'+_DefautImg.iqiyi+'"},{"name":"支付宝","url":"https://www.alipay.com/","ico":"https://www.alipay.com/","type":"4","color":"rgb(142, 62, 0)","bgimg":"'+_DefautImg.zhifubao+'"},{"name":"人人网","url":"http://www.renren.com/","ico":"http://www.renren.com/","type":"4","color":"rgb(85, 133, 204)","bgimg":"'+_DefautImg.renren+'"},{"name":"Youtube","url":"http://www.youtube.com/","ico":"http://www.youtube.com/","type":"4","color":"rgb(140,23,19)","bgimg":"'+_DefautImg.youtube+'"},{"name":"土豆网","url":"http://www.tudou.com/","ico":"http://www.tudou.com/","type":"4","color":"rgb(226, 163, 121)","bgimg":"'+_DefautImg.tudou+'"},{"name":"唯品会","url":"http://click.union.vip.com/redirect.php?url=eyJkZXN0dXJsIjoiaHR0cDpcL1wvd3d3LnZpcC5jb20iLCJ1Y29kZSI6Im1kMndncnJ1Iiwic2NoZW1lY29kZSI6ImY1YTA1ZDY2In0=","ico":"http://www.vip.com/","type":"4","color":"rgb(230, 101, 181)","bgimg":"'+_DefautImg.weipinhui+'"}';


		_shopping_site='';
	}else{
		_Default_site='{"name":"Chrome APP Store","url":"https://chrome.google.com/webstore?utm_source=chrome-ntp-icon","ico":"https://chrome.google.com/webstore?utm_source=chrome-ntp-icon","type":"0","color":"rgb(150, 140, 129)","bgimg":"'+_DefautImg.chromestore_en+'"},{"name":"Amazon","url":"http://www.amazon.com/?_encoding=UTF8&camp=1789&creative=390957&linkCode=ur2&tag=chromenewtab-20","ico":"http://www.amazon.com","type":"0","color":"rgb(196, 191, 182)","bgimg":"'+_DefautImg.amazon_en+'"},{"name":"Facebook","url":"http://www.facebook.com","ico":"http://www.facebook.com","type":"4","color":"rgb(88,106,152)","bgimg":"'+_DefautImg.facebook+'"},{"name":"Twitter","url":"https://twitter.com/","ico":"https://twitter.com/","type":"4","color":"rgb(58,144,178)","bgimg":"'+_DefautImg.twitter+'"},{"name":"Ebay","url":"http://www.ebay.com/","ico":"http://www.ebay.com/","type":"4","color":"rgb(66,55,31)","bgimg":"'+_DefautImg.ebay+'"},{"name":"CNN","url":"http://edition.cnn.com/","ico":"http://edition.cnn.com/","type":"4","color":"rgb(204,44,44)","bgimg":"'+_DefautImg.cnn+'"},{"name":"Yahoo","url":"http://www.yahoo.com/","ico":"http://www.yahoo.com/","type":"4","color":"rgb(86,28,161)","bgimg":"'+_DefautImg.yahoo+'"},{"name":"Zillow","url":"http://www.zillow.com/","ico":"http://www.zillow.com/","type":"4","color":"rgb(80,108,83)","bgimg":"'+_DefautImg.zillow+'"},{"name":"Youtube","url":"http://www.youtube.com/","ico":"http://www.youtube.com/","type":"4","color":"rgb(140,23,19)","bgimg":"'+_DefautImg.youtube+'"}';
		_shopping_site='';
	}
})


function default_setting(){
	if(!localStorage.mode){
		localStorage.mode="1";
	}
	if(!localStorage.first){
		localStorage.bg="";
		localStorage.bgtype="0";
		localStorage.bgcolor="#30A193";
		localStorage.first="1";
	}
	if(!localStorage.bookmark){
		localStorage.bookmark="1";
	}
	if(!localStorage.openbookmark){
		localStorage.openbookmark="0";
	}
	if(!localStorage.opensearch){
		localStorage.opensearch="0";
	}
	if(!localStorage.openapp){
		localStorage.openapp="0";
	}
	if(!localStorage.opensite){
		localStorage.opensite="0";
	}
	if(!localStorage.usehistory){
		localStorage.usehistory="0";
	}
	if(!localStorage.iconopacity){
		localStorage.iconopacity="1";
	}
	if(localStorage.mode=="0"){
		$("#contain").hide();
		$("#toggle").hide();
		$("#left,#right").hide();
	}else{
		$("#contain").show();
		$("#toggle").show();
		$("#left,#right").show();
	}
	if(localStorage.bookmark=="1"){
		bookmarks();
		$("#left_top").css({"padding-top":"38px"});
		$("#right_top").css({"padding-top":"38px"});
	}else{
		$(".other").remove();
		$(".book").remove();
		$(".newbook").remove();
		$(".newbook2").remove();
		$("#left_top").css({"padding-top":"10px"});
		$("#right_top").css({"padding-top":"10px"});
	}
	if(localStorage.openbookmark=="0"){
		_openbookmark="_self"
	}else{
		_openbookmark="_blank";
	}
	if(localStorage.opensearch=="0"){
		_opensearch="_self";
	}else{
		_opensearch="_blank";
	}
	if(localStorage.openapp=="0"){
		_openapp="_self";
	}else{
		_openapp="_blank";
	}
	if(localStorage.opensite=="0"){
		_opensite="_self";
	}else{
		$(".baidu_sites").attr("target","_blank");
		_opensite="_blank";
	}
	if(localStorage.usehistory=="0"){
		_thenum=3;
		$("#category1").css({"width":"0px","height":"0px"});
		$("#category1").text("");

	}else{
		_thenum=2;
		$("#category1").css({"width":"","height":""});
		$("#category1").text(chrome.i18n.getMessage("recently_visit"));
	}
	if(!localStorage.bgcolor){
		localStorage.bgcolor="#30A193";
	}
	if(!localStorage.bgtype){
		localStorage.bgtype="0";
		$("body").css("background-image","url("+_Default_bg+")");
	}else{
		if(localStorage.bgtype=="0"){
			$("body").css("background-image","url("+_Default_bg+")");
		}else{
			if(!localStorage.bg){
				localStorage.bg=_Default_bg;
			}
			if(localStorage.bgtype=="1"){
				var bg=localStorage.bg;
				$("body").css("background-image","url("+bg+")");
			}
			if(localStorage.bgtype=="2"){

				var bgcolor=localStorage.bgcolor;
				$("body").css("background-image","");
				$("body").css("background-color",bgcolor);
				
			}
		}
	}
	bing_bg();

	
}

function local_backup(){
	$("#backup_button").click(function(event) {
		/* Act on the event */
		
		var div='';
		div+='<div id="backup_lightbox" style="position:absolute;width:100%;height:100%;z-index:100;background-color:rgba(97, 97, 97, 0.3);">';
		    div+='<div id="backup_box" style="position:absolute;width:600px;height:360px;padding:0 30px 5px 30px;left:50%;top:50%;background-color:#fdfdfd;box-shadow: rgba(73, 73, 73, 1) 0px 0px 30px;margin-left:-330px;margin-top:-190px;">';
			    div+='<div id="backup_top" style="position:absolute;top:0px;left:0px;width:660px;height:30px;">';
			        div+='<div id="backup_close" style="width:50px;height:30px;float:right;background-image:url('+__Global_img_closex+');background-size:100% 100%;"></div>';
			        div+='<div id="backup_menu" style="font-size:18px;border-bottom:2px solid #0099CC;margin-left:30px;cursor:pointer;color:#0099CC;float:left;padding:3px 10px;">'+chrome.i18n.getMessage("backup_title")+'</div>';
			    div+='</div>';
			    div+='<div style="width:600px;height:260px;position:relative;margin-top:40px;">';
			    	div+='<div id="backup_content_0" style="width:600px;height:260px;position:absolute;overflow-y:scroll;"></div>';
			    div+='</div>';
			div+='</div>';
		div+='</div>';	
		$('body').append(div);

		var button3 = new Button(chrome.i18n.getMessage("product"), "green", "none", "width:120px;text-align:center;margin-left:auto;margin-right:auto;margin-top:50px;margin-bottom:30px;");
		button3.insert('#backup_content_0');
		button3.click(function() {
				var json=get_backup();
				var blob   = new Blob([json]);
				var a      = document.createElement('a');
				a.href     = window.URL.createObjectURL(blob);
				var Language=navigator.language;
				if(Language=="zh-CN"){
					var filename="米鱼新标签页备份.mifish";
				}else{
					var filename="MifishNewtabBackup.mifish";
				}
				a.download = filename;
				a.click();
				$(a).remove();
		})
		$('#backup_content_0').append('<hr style="border-top:1px solid #33B5E5" />');
		var file_button = new File_Button(chrome.i18n.getMessage("fromlocal"), "blue", 120, "margin:30px auto;", "flie_button1", ".mifish");
		file_button.insert('#backup_content_0');
		file_button.change(function(a) {
			/* Act on the event */
			var txt = a.files[0];
			var reader = new FileReader();
			reader.readAsText(txt);
			reader.type = "text";
			reader.onload=function(){
				get_recovery(reader.result);
			}
			file_button.clear();
			
		});
	});
	$("#backup_close").live('click', function(event) {
		/* Act on the event */
		$("#backup_lightbox").remove();
	});

	
}


function auto_zoom(a){
	var w=$(window).width();
			var zoom=w/1280;
			var chromeVersion=navigator.userAgent.toLowerCase();
			var reg=/chrome\/\d+/;
			var str=chromeVersion.match(reg);
			var version=str[0].replace("chrome/","");
			if(version<=26){
				var q=0.9;
			}else{
				var q=0.63;
			}

			if(zoom<=q){
				zoom=q;
			}else if(zoom>=1.3125){
				zoom=1.3125;
			}
			$(a).css("zoom",zoom);
			var mh=$(a).position().top;
			if(mh<=288){
				$(a).css({"top":"0px","margin-top":"40px"});
			}
			var ms=$(a).position().left;
			if(ms<=480){
				$(a).css({"left":"0px","margin-left":"0px"});

			}
		$(window).resize(function(){
			$(a).css({"top":"50%","margin-top":"-252px","left":"50%","margin-left":"-480px"});
			var w=$(window).width();
			var zoom=w/1280;
			var chromeVersion=navigator.userAgent.toLowerCase();
			var reg=/chrome\/\d+/;
			var str=chromeVersion.match(reg);
			var version=str[0].replace("chrome/","");
			if(version<=26){
				var q=0.9;
			}else{
				var q=0.8;
			}
			if(zoom<=q){
				zoom=q;
			}else if(zoom>=1.3125){
				zoom=1.3125;
			}
			$(a).css("zoom",zoom);
			var mh=$(a).position().top;
			if(mh<=288){
				$(a).css({"top":"0px","margin-top":"40px"});
			}
			var ms=$(a).position().left;
			if(ms<=480){
				$(a).css({"left":"0px","margin-left":"0px"});

			}

		});
		
		
}
function ForamtValue(oStr)
{
        
    sStr = String(oStr);
    
    sStr = sStr.replace(/\"/g,'\\\"'); //输入框中显示双引号问题
    return sStr;
}
function return_ForamtValue(oStr)
{
        
    sStr = String(oStr);
    
    sStr = sStr.replace(/\\\"/g,'\"'); //输入框中显示双引号问题
    return sStr;
}



















































