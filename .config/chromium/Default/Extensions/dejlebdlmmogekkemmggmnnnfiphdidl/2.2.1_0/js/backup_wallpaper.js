$(document).ready(function() {
	set_wallpaper();
	_setting();
	sync();
	$("#range").live('change', function(event) {
		/* Act on the event */
		var value1=$(this).val();
		value1=parseInt(value1);
		var op=value1/100;
		var value=$(this).val()+'%';
		$("#range_opacity").text(value);
		$(".webs_out,.add").css('opacity',op);
		$(this).attr("iconop",op);
	});
	$(".wallpaperimg").live('mouseover', function(event) {
			$(this).css('border', 'solid 3px #0099CC');
		});
	$(".wallpaperimg").live('mouseout', function(event) {
		$(this).css('border', 'solid 3px transparent');
	});
	$(".wallpaperimg").live('mousedown', function(event) {
		var src=$(this).attr("src");
		var waitwallpaper=null;
			waitwallpaper=new Wait(chrome.i18n.getMessage("downloading_wallpaper"));
			waitwallpaper.show();
		var Language = navigator.language;
		if (Language == "zh-CN") {
			var getbg_url = 'http://s-85283.gotocdn.com/mifish/getwallpaper.php?img=';
		} else {
			var getbg_url = 'http://s-82923.gotocdn.com/mifish/getwallpaper.php?img=';
		}
		var ajax=$.ajax({
			url: getbg_url+src,
			timeout:10000
		})
		.done(function(data) {
			$('body').css('background-image', 'url('+data+')');
			localStorage.bg=data;
			localStorage.bgtype="1";
			waitwallpaper.remove();
		})
		.fail(function() {
			var warn=new Warn(chrome.i18n.getMessage("networkerror"));
				warn.show(function(){
					waitwallpaper.remove();
				})
			
		})
			
	});

	$(".wallpaperclass").live('click', function(event) {
		$("#cloud_wallpaper_content").html('');
		$("#cloud_wallpaper_content").append('<img style="width:100px;position:absolute;top:110px;left:200px;" src="img/blue.gif"/>');
		$(".wallpaperclass").css({
			"background-color": '',
			"color": '#99CC00'
		});
		$(this).css('background-color', '#33B5E5');
		$(this).css('color', '#fdfdfd');
		var type=$(this).attr("type");
		$("#cloud_wallpaper_content").attr("type",type);
		var Language = navigator.language;
			if (Language == "zh-CN") {
				var bg_url = 'http://s-85283.gotocdn.com/mifish/wallpaper.php';
			} else {
				var bg_url = 'http://s-82923.gotocdn.com/mifish/wallpaper.php';
			}
		$.ajax({
			url:bg_url,
		})
		.done(function(data) {
			$("#cloud_wallpaper_content").data('i',10);
			$("#cloud_wallpaper_content").html('');
			if(type=="0"){
				var swallpaper=$("#cloud_wallpaper_content").attr("prewallpaper");

				var obj=JSON.parse(swallpaper);
				var wpdiv='';
				for (var i = 0; i <obj.length; i++) {
						wpdiv += '<div class="wallpaperimg" src="' + obj[i].name + '" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + obj[i].src + '" /></div>';
				};
				$("#cloud_wallpaper_content").append(wpdiv);
			}else{
				
				var obj=JSON.parse(data);
				var wpdiv = '';
				var j=0;
				for (var i = 0; i <obj.pic.length; i++) {
					
					if(obj.pic[i].type==type){
						j++;
						wpdiv += '<div class="wallpaperimg" src="' + obj.pic[i].name + '" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + obj.pic[i].src + '" /></div>';
					}
					if(j==10){
						break;
					}
				};
				$("#cloud_wallpaper_content").append(wpdiv);
				var objwp=[];
				for (var i = 0; i <obj.pic.length; i++) {
					if(obj.pic[i].type==type){
						objwp.push(obj.pic[i]);

					}
				}
				var datawp=JSON.stringify(objwp);
				$("#cloud_wallpaper_content").attr('data',datawp);
			}
		})
		.fail(function() {
			var warn=new Warn(chrome.i18n.getMessage("networkerror"));
				warn.show();
		})
		
	});
});
//数组乱序
function shuffle(inputArr) {
	var valArr = [],
		k = '';

	for (k in inputArr) { // Get key and value arrays
		if (inputArr.hasOwnProperty(k)) {
			valArr.push(inputArr[k]);
		}
	}
	valArr.sort(function() {
		return 0.5 - Math.random();
	});

	return valArr;
}

function sync() {

}

function get_backup() {
	try {
		var bookmark = localStorage.bookmark;
		var openapp = localStorage.openapp;
		var openbookmark = localStorage.openbookmark;
		var opensearch = localStorage.opensearch;
		var opensite = localStorage.opensite;
		var se = localStorage.se;
		var sites = localStorage.sites;
		var usehistory = localStorage.usehistory;
		sites = ForamtValue(sites);
		var bgtype = localStorage.bgtype;
		var bg = localStorage.bg;
		var bgcolor = localStorage.bgcolor;
		var json = '{';
		json += '"style":"mifish_ext",';
		json += '"bookmark":"' + bookmark + '",';
		json += '"openapp":"' + openapp + '",';
		json += '"openbookmark":"' + openbookmark + '",';
		json += '"opensearch":"' + opensearch + '",';
		json += '"opensite":"' + opensite + '",';
		json += '"se":"' + se + '",';
		json += '"bgtype":"' + bgtype + '",';
		json += '"bg":"' + bg + '",';
		json += '"bgcolor":"' + bgcolor + '",';
		json += '"usehistory":"' + usehistory + '",';
		json += '"sites":"' + sites + '"';
		json += '}';
	} catch (e) {
		alert(chrome.i18n.getMessage("backupfail"));
	}
	return json;
}

function set_wallpaper() {
	$("#wallpaper_button").click(function() {
		var lightbox = new Layer();
		var obj = lightbox.create();
		var menu = [chrome.i18n.getMessage("wallpaper_default"), chrome.i18n.getMessage("wallpaper_local"), chrome.i18n.getMessage("wallpaper_every"), chrome.i18n.getMessage("wallpaper_color"), chrome.i18n.getMessage("cloud_wallpaper")];
		var pop = new Pop(650, "auto", "auto", menu);
		var wallpop = pop.insert(obj);
		$(wallpop).css('zoom', '1.2');
		pop.close(function() {
			lightbox.cancel();
		});
		var menu_default = pop.getContent(0);
		var menu_local_picture = pop.getContent(1);
		var menu_from_bing = pop.getContent(2);
		var menu_pure_color = pop.getContent(3);
		var menu_cloud_picture = pop.getContent(4);
		var cloud_wallpaper_button=pop.getMenu(4);
		$(menu_cloud_picture).css('overflow', 'visible');
		var cloud_div = '<div id="cloud_wallpaper_div" style="width:630px;height:255px;margin-left:10px;">';
		cloud_div += '<div id="cloud_wallpaper_menu"  style="position:absolute;width:125px;height:255px;overflow-y:scroll;overflow-x:hidden;"></div>';
		cloud_div += '<div id="cloud_wallpaper_content" type="0" style="position:absolute;left:140px;width:510px;height:255px;overflow-y:scroll;overflow-x:hidden;"></div>';
		cloud_div += '</div>';
		$(menu_cloud_picture).append(cloud_div);
		$("#cloud_wallpaper_content").html("");
		$("#cloud_wallpaper_content").append('<img style="width:100px;margin-left:125px;margin-top:70px;" src="img/blue.gif"/>');

		
		
		
		var default_bg_div = '<div id="default_bg_div" style="width:100%;height:100%;position:relative;">'
		default_bg_div += '<div style="position:absolute;bottom:20px;width:300px;height:auto;"><img src="'+_Default_bg_small+'" style="width:100%;border:6px solid transparent"/></div>';
		default_bg_div += '</div>';
		$(menu_default).append(default_bg_div);
		var button5 = new Button(chrome.i18n.getMessage("setwallpaper"), "green", "none", "width:100px;text-align:center;position:absolute;bottom:30px;left:400px;", "button_set_default_bg");
		button5.insert($("#default_bg_div")[0]);
		button5.click(function(event) {
			$("body").css("background-image", "url(" + _Default_bg + ")");
			localStorage.bgtype = "0";
		});
		var file_button2 = new File_Button(chrome.i18n.getMessage("choose_image"), "blue", 100, "margin:20px auto;", "flie_button2", "image/*");
		file_button2.insert(menu_local_picture);
		$(menu_local_picture).append('<div id="local_pic_div" style="width:100%;height:180px;bottom:0px;position:absolute;"></div>');
		file_button2.change(function(a) {
			var img = a.files[0];

			var reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = function() {
				var path = reader.result;

				$("#local_pic_div").html('<div id="local_pic" style="width:280px;height:160px;overflow:hidden;border:6px solid transparent;margin-top:8px;"><img src="' + path + '" style="width:100%;"/></div>');
				var button6 = new Button(chrome.i18n.getMessage("setwallpaper"), "green", "none", "width:100px;text-align:center;position:absolute;bottom:6px;left:400px;", "button_set_local_bg");
				button6.insert($("#local_pic_div")[0]);
				button6.click(function(event) {
					$("body").css("background-image", "url(" + path + ")");
					localStorage.bgtype = "1";
					localStorage.bg = path;
				});
			}
		})


		var bing_bg_div = '<div id="bing_bg_div" style="width:100%;height:100%;position:relative;">'
		bing_bg_div += '<div id="bing_img" style="position:absolute;bottom:20px;width:300px;height:180px;"><img src="img/blue.gif" style="width:100px;position:absolute;top:50%;left:50%;margin-top:-50px;margin-left:-50px;"/></div>';
		bing_bg_div += '</div>';
		$(menu_from_bing).append(bing_bg_div);
		var button7 = new Button(chrome.i18n.getMessage("getting_wallpaper"), "green", "none", "width:120px;text-align:center;position:absolute;bottom:30px;left:400px;", "button_set_bing_bg");
		button7.insert($("#bing_bg_div")[0]);
		button7.setlock();
		var Language = navigator.language;
		if (Language == "zh-CN") {
			var bing_url = 'http://s-85283.gotocdn.com/getbingbg.php?time=';
		} else {
			var bing_url = 'http://s-82923.gotocdn.com/getbingbg.php?time=';
		}
		$.ajax({
			url: bing_url + getTime(),
			type: 'get',
			dataType: 'text',
			success: function(img) {
				$("#bing_img").html('<img src="' + img + '" style="width:100%;"/>');
				button7.unlock();
				button7.setvalue(chrome.i18n.getMessage("setwallpaper"));
				$("#bing_bg_div").append('<p style="font-size:14px;margin:0px;position:absolute;top:30px;color:#777777">' + chrome.i18n.getMessage("pic_from") + '<a class="link_sign" target="_blank" href="http://bing.com">&nbsp;Bing</a>,' + chrome.i18n.getMessage("auto_change") + '</p>');
				button7.click(function() {
					localStorage.bgtype = "3";
					localStorage.bg = img;
					$("body").css("background-image", "url(" + img + ")");
					var D = new Date();
					var days = D.getDay();
					localStorage.yestoday = days;
				});
			}
		})

		var color_bg_div = '<div id="color_bg_div" style="width:100%;height:100%;position:relative;">'
		color_bg_div += '<div id="color_bg_picker" style="position:absolute;bottom:20px;width:250px;padding-left:50px;height:200px;background-color:#fdfdfd"></div>';
		color_bg_div += '</div>';
		$(menu_pure_color).append(color_bg_div);
		$("#color_bg_picker").farbtastic(function(color) {
			$("#color_bg_picker").css('background-color', color);
		});
		var button8 = new Button(chrome.i18n.getMessage("setwallpaper"), "green", "none", "width:130px;text-align:center;position:absolute;bottom:30px;left:400px;", "button_set_color_bg");
		button8.insert($("#color_bg_div")[0]);
		button8.click(function(event) {
			var bgcolor = $("#color_bg_picker").css('background-color');
			localStorage.bgtype = "2";
			$("body").css("background-image", "");
			$("body").css("background-color", bgcolor);
			localStorage.bgcolor = bgcolor;
		});
		var Language = navigator.language;
			if (Language == "zh-CN") {
				var bg_url = 'http://s-85283.gotocdn.com/mifish/wallpaper.php';
			} else {
				var bg_url = 'http://s-82923.gotocdn.com/mifish/wallpaper.php';
			}
		var xhr = $.ajax({
			url:bg_url,
			timeout:8000
		})
		xhr.done(function(data) {
			$("#cloud_wallpaper_content").html('');
			$("#cloud_wallpaper_content").data("i",10);
			var obj = JSON.parse(data);
			var wallpaper_menu = '';
			for (var i = 0; i < obj.menu.length; i++) {
				if (i == 0) {
					wallpaper_menu += '<div class="wallpaperclass" style="width:120px;height:auto;text-align:left;padding:8px 0px 8px 20px;font-size:16px;cursor:pointer;border-bottom:#EBEBEB 2px solid;background-color:#33B5E5;color:#fdfdfd;" type="0">'+chrome.i18n.getMessage("tuijian")+'</div>';
				}
				wallpaper_menu += '<div class="wallpaperclass" style="width:120px;height:auto;text-align:left;padding:8px 0px 8px 20px;font-size:16px;cursor:pointer;border-bottom:#EBEBEB 2px solid;" type="'+obj.menu[i].type+'">' + obj.menu[i].name + '</div>';
			};
			$("#cloud_wallpaper_menu").append(wallpaper_menu);
			var rand_wallpaper = shuffle(obj.pic);
			var wpdiv = '';
			var wallpaper10=[];
			for (var i = 0; i < 10; i++) {
				wpdiv += '<div class="wallpaperimg" src="' + rand_wallpaper[i].name + '" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + rand_wallpaper[i].src + '" /></div>';
				wallpaper10.push(rand_wallpaper[i]);
			};
			var swallpaper=JSON.stringify(wallpaper10);
			$("#cloud_wallpaper_content").attr('prewallpaper',swallpaper);
			$("#cloud_wallpaper_content").append(wpdiv);
			$("#cloud_wallpaper_content").scroll(function(e) {
				var type=$("#cloud_wallpaper_content").attr("type");
				var distanceScrollCount = 0; //滚动距离总长
		        var distanceScroll = 0;   //滚动到的当前位置
		        var divHight = $(this).height();
		        distanceScrollCount = $(this)[0].scrollHeight;
		        distanceScroll = $(this)[0].scrollTop;
		        var h=((distanceScroll + divHight )>= distanceScrollCount);
				if (type=="0") {
					var i=$("#cloud_wallpaper_content").data("i");
					if (h&&i < rand_wallpaper.length) {
						
						var wpdiv2 = '<div class="wallpaperimg" src="' + rand_wallpaper[i].name + '" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + rand_wallpaper[i].src + '" /></div><div src="' + rand_wallpaper[i+1].name + '" class="wallpaperimg" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + rand_wallpaper[i + 1].src + '" /></div><div src="' + rand_wallpaper[i+2].name + '" class="wallpaperimg" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + rand_wallpaper[i + 2].src + '" /></div>';
						i += 3;
						$("#cloud_wallpaper_content").data("i",i);
						$("#cloud_wallpaper_content").append(wpdiv2);
					} else {

					}
				}else{
					var i=$("#cloud_wallpaper_content").data("i");

					var data=$("#cloud_wallpaper_content").attr("data");
					var obj=JSON.parse(data);
					if (h&&i <obj.length) {
					var wpdiv2 = '<div class="wallpaperimg" src="' + obj[i].name + '" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + obj[i].src + '" /></div><div src="' + obj[i+1].name + '" class="wallpaperimg" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + obj[i + 1].src + '" /></div><div src="' + obj[i+2].name + '" class="wallpaperimg" style="cursor:pointer;width:160px;height:100px;float:left;border:3px solid transparent;"><img style="width:160px;height:100px;" src="' + obj[i + 2].src + '" /></div>';
						i += 3;
						$("#cloud_wallpaper_content").data("i",i);
						$("#cloud_wallpaper_content").append(wpdiv2);
					}
				}

			});
		})
		xhr.fail(function() {
			$("#cloud_wallpaper_content").html('<div style="color:#555555;position:absolute;top:100px;left:150px;">'+chrome.i18n.getMessage("networkerror")+'</div>');
		})

	})
}


function bing_bg() {
	var bgtype = localStorage.bgtype;
	if (bgtype == "3") {

	} else {
		return false;
	}
	var D = new Date();
	var days = D.getDay();

	if (localStorage.yestoday) {
		if (days == localStorage.yestoday) {
			var bg = localStorage.bg;
			$("body").css("background-image", "url(" + bg + ")");
		} else {
			if (localStorage.bg) {
				var thebg = localStorage.bg;
			} else {
				var thebg = _Default_site;
			}
			$("body").css("background-image", "url(" + thebg + ")");
			var Language = navigator.language;
			if (Language == "zh-CN") {
				var bing_url = 'http://s-85283.gotocdn.com/getbingbg.php?time=';
			} else {
				var bing_url = 'http://s-82923.gotocdn.com/getbingbg.php?time=';
			}
			$.ajax({

				url: bing_url + getTime(),
				type: 'post',
				dataType: 'text',
				success: function(img) {
					if(img==localStorage.bg){

					}else{
						localStorage.bg = img;
						$("body").css("background-image", "url(" + img + ")");
						var D = new Date();
						var days = D.getDay();
						localStorage.yestoday = days;
					}
					
				},
				error: function() {
					if (localStorage.bg) {
						var bg = localStorage.bg;
					} else {
						var bg = _Default_site;
					}
					$("body").css("background-image", "url(" + bg + ")");
					var D = new Date();
					var days = D.getDay();
				}

			})
		}

	} else {
		localStorage.yestoday = days;
	}
}

function _setting() {
	$("#setting").click(function(event) {
		var lightbox = new Layer();
		var obj = lightbox.create();
		var menu = [chrome.i18n.getMessage("setting"), chrome.i18n.getMessage("feedback")];
		var pop = new Pop(630, 410, "auto", menu);
		pop.insert(obj);
		pop.close(function() {
			var preiconop=$("#range").attr('preiconop');
			$(".webs_out,.add").css('opacity',preiconop);
			lightbox.cancel();
			
		});
		var pop_bottom = pop.getBottom();
		var set_content = pop.getContent(0);
		var menu_0 = pop.getMenu(0);
		var menu_1 = pop.getMenu(1);
		var feedback_content = pop.getContent(1);

		var feedback_input = new Input("auto", "feedback_input", "text", chrome.i18n.getMessage("email_su"), "margin-top:20px;");
		feedback_input.insert(feedback_content);

		var button_submit = new Button(chrome.i18n.getMessage("submit"), "green", "right", " ", "feedback_submit");
		button_submit.insert(pop_bottom);
		$("#feedback_submit").hide();
		$(menu_1).click(function(event) {
			var sub = $(this).attr('submit');
			if (sub == "true") {
				$("#set_finish").hide();
				return false;
			}
			try {
				if (localStorage.email != "" && localStorage.email) {
					feedback_input.setvalue(localStorage.email);
					feedback_input.remove_pre();
				}
				feedback_input.focus();
				$("#set_finish").hide();
				$("#feedback_submit").show();
			} catch (e) {

			}

		});
		$(menu_0).click(function(event) {
			$("#feedback_submit").hide();
			$("#set_finish").show();
		});
		$("#feedback_submit").click(function(event) {
			/* Act on the event */
			var user = feedback_input.getvalue();
			var chromeVersion = navigator.userAgent.toLowerCase();
			var feedback_text = $("#feedback_textarea").val() + "<br/>chrome版本是:" + chromeVersion + "<br/>版本是：米鱼&APP版";
			if ($("#feedback_textarea").val() == "") {
				var sub_warn = new Warn(chrome.i18n.getMessage("feedback_su"));
				sub_warn.show();
				return false;
			}
			$(feedback_content).html('<p style="color:#99CC00;margin-left:72px;font-size:18px;margin-top:80px;">' + chrome.i18n.getMessage("feedback_thanks") + '</p>');
			$("#feedback_submit").hide();
			$(menu_1).attr("submit", "true");

			$.ajax({
				url: 'http://s-85283.gotocdn.com/feedback.php',
				type: 'post',
				dataType: 'text',
				data: {
					user: user,
					txt: feedback_text
				},
				success: function() {

				}
			})
		});
		$(feedback_content).append('<p style="color:#ddd;font-size:14px;margin-top:10px;margin-bottom:0px;margin-left:112px;">' + chrome.i18n.getMessage("feedback_pro") + '</p><textarea id="feedback_textarea" style="color:#33B5E5;width:392px;height:150px;margin-left:112px;outline:none;resize:none;overflow-x:hidden;overflow-y:scroll;"></textarea>');
		$(set_content).css('border', 'solid #000 solid');
		var button_9 = new Button(chrome.i18n.getMessage("finish"), "green", "right", "auto", "set_finish");
		button_9.insert(pop_bottom);

		$(set_content).append('<label id="set_li_1" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("if_bookmark") + '</span></label>');
		var check1 = new Check({
			id: "radio1",
			style: "float:right;margin-right:80px;"
		});
		check1.insert("#set_li_1");
		$(set_content).append('<label id="set_li_2" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("where_site") + '</span></label>');
		var check2 = new Check({
			id: "radio2",
			style: "float:right;margin-right:80px;"
		});
		check2.insert("#set_li_2");
		$(set_content).append('<label id="set_li_3" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("where_bookmark") + '</span></label>');
		var check3 = new Check({
			id: "radio3",
			style: "float:right;margin-right:80px;"
		});
		check3.insert("#set_li_3");
		$(set_content).append('<label id="set_li_4" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("where_search") + '</span></label>');
		var check4 = new Check({
			id: "radio4",
			style: "float:right;margin-right:80px;"
		});
		check4.insert("#set_li_4");
		$(set_content).append('<label id="set_li_5" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("where_app") + '</span></label>');
		
		var check5 = new Check({
			id: "radio5",
			style: "float:right;margin-right:80px;"
		});
		check5.insert("#set_li_5");
		/*
		$(set_content).append('<label id="set_li_6" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("if_history") + '</span></label>');
		*/
		var check6 = new Check({
			id: "radio6",
			style: "float:right;margin-right:80px;"
		});
		check6.insert("#set_li_6");
		if(localStorage.iconopacity){
			var iconop=localStorage.iconopacity;
		}else{
			var iconop=1;
			localStorage.iconopacity=1;
		}
		$(set_content).append('<label id="set_li_7" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">'+chrome.i18n.getMessage("icon_opacity")+'</span><span id="range_opacity" style="width:50px;float:right;margin-right:54px;color:#33B5E5;">'+FloatMul(parseFloat(iconop),100)+'%</span><input preiconop="'+iconop+'" iconop="'+iconop+'" type="range" style="margin-right:12px;" min="0" max="100" step="0.1" value="'+parseFloat(iconop)*100+'" id="range"/></label>');
		$(set_content).append('<label id="set_li_8" style="display:block;padding:10px 0;height:22px;border-bottom:1px solid #99CC00"><span style="float:left;color:#33B5E5;font-size:16px;margin-left:80px;">' + chrome.i18n.getMessage("jijian") + '</span></label>');
		var check8 = new Check({
			id: "radio8",
			style: "float:right;margin-right:80px;"
		});
		check8.insert("#set_li_8");
		if (localStorage.bookmark == "0") {
			check1.setoff();
		} else {
			check1.seton();
		}
		if (localStorage.opensite == "0") {
			check2.setoff();
		} else {
			check2.seton();
		}
		if (localStorage.openbookmark == "0") {
			check3.setoff();
		} else {
			check3.seton();
		}
		if (localStorage.opensearch == "0") {
			check4.setoff();
		} else {
			check4.seton();
		}
		if (localStorage.openapp == "0") {
			check5.setoff();
		} else {
			check5.seton();
		}
		if (localStorage.usehistory == "0") {
			check6.setoff();
		} else {
			check6.seton();
		}
		if(localStorage.mode=="1"){
			check8.setoff();
		}else{
			check8.seton();
		}
		button_9.click(function(event) {
			var c1 = check1.getvalue();
			if (c1 == "on") {
				$(".other").remove();
				$(".book").remove();
				$(".newbook").remove();
				$(".newbook2").remove();
				localStorage.bookmark = "1";
				bookmarks();
				$("#left_top").animate({
					"padding-top": "38px"
				});
				$("#right_top").animate({
					"padding-top": "38px"
				});

			} else {
				$(".other").remove();
				$(".book").remove();
				$(".newbook").remove();
				$(".newbook2").remove();
				localStorage.bookmark = "0";
				$("#left_top").animate({
					"padding-top": "10px"
				});
				$("#right_top").animate({
					"padding-top": "10px"
				});


			}
			var c2 = check2.getvalue();
			if (c2 == "on") {
				_opensite = "_blank";
				$(".baidu_sites").attr("target", "_blank");
				localStorage.opensite = "1";
			} else {
				_opensite = "_self";
				$(".baidu_sites").attr("target", "_self");
				localStorage.opensite = "0";
			}
			var c3 = check3.getvalue();
			if (c3 == "on") {
				_openbookmark = "_blank";
				localStorage.openbookmark = "1";
			} else {
				_openbookmark = "_self";
				localStorage.openbookmark = "0";
			}
			var c4 = check4.getvalue();
			if (c4 == "on") {
				_opensearch = "_blank";
				localStorage.opensearch = "1";
			} else {
				_opensearch = "_self";
				localStorage.opensearch = "0";
			}
			var c5 = check5.getvalue();
			if (c5 == "on") {
				_openapp = "_blank";
				localStorage.openapp = "1";
			} else {
				_openapp = "_self";
				localStorage.openapp = "0";
			}
			var c6 = check6.getvalue();
			if (c6 == "on") {
				_thenum = 2;
				$("#category1").css({
					"width": "",
					"height": ""
				});
				$("#category1").text(chrome.i18n.getMessage("recently_visit"));
				localStorage.usehistory = "1";
				center();
			} else {
				_thenum = 3;
				$("#category1").css({
					"width": "0px",
					"height": "0px"
				});
				$("#category1").text("");
				localStorage.usehistory = "0";
				center();
			}
			var c8=check8.getvalue();
			if(c8=="on"){
				$("#contain").fadeOut(300);
				$("#toggle").fadeOut(300);
				$("#left,#right").hide();
				localStorage.mode="0";
			}else{
				$("#contain").fadeIn(300);
				$("#toggle").fadeIn(300);
				$("#left,#right").show();
				localStorage.mode="1";
				slideTobegin();
			}
			var iconop=$("#range").attr("iconop");
			localStorage.iconopacity=iconop;
			$(".webs_out,.add").css('opacity',iconop);
			lightbox.cancel();
			sync();
		});
	});
}

function get_recovery(a) {
	var bookmark = localStorage.bookmark;
	var openapp = localStorage.openapp;
	var openbookmark = localStorage.openbookmark;
	var opensearch = localStorage.opensearch;
	var opensite = localStorage.opensite;
	var se = localStorage.se;
	var sites = localStorage.sites;
	var usehistory = localStorage.usehistory;
	var bgtype = localStorage.bgtype;
	var bg = localStorage.bg;
	var bgcolor = localStorage.bgcolor;
	try {
		var json = JSON.parse(a);
		localStorage.bookmark = json.bookmark;
		localStorage.openapp = json.openapp;
		localStorage.openbookmark = json.openbookmark;
		localStorage.opensearch = json.opensearch;
		localStorage.opensite = json.opensite;
		localStorage.se = json.se;
		localStorage.usehistory ="0";
		if (typeof(json.bgtype) == "undefined" || json.bgtype == "undefined") {
			localStorage.bgtype = "0";
		} else {
			localStorage.bgtype = json.bgtype;
			localStorage.bg = json.bg;
			localStorage.bgcolor = json.bgcolor;
		}

		var newtab = JSON.parse(json.sites);
		var _sites = json.sites;
			localStorage.sites = _sites;
			$("#contain").children().remove();
			$(".category").remove();
			load();
			slideTobegin();
			default_setting();
			center();



	} catch (err) {
		localStorage.bookmark = bookmark;
		localStorage.openapp = openapp;
		localStorage.openbookmark = openbookmark;
		localStorage.opensearch = opensearch;
		localStorage.opensite = opensite;
		localStorage.se = se;
		localStorage.sites = sites;
		localStorage.usehistory = usehistory;
		localStorage.bgtype = bgtype;
		localStorage.bg = bg;
		localStorage.bgcolor = bgcolor;
		$("#contain").children().remove();
		$(".category").remove();
		load();
		slideTobegin();
		default_setting();
		center();
		alert(chrome.i18n.getMessage("recoverfail"));
	}
}

function slideTobegin() {
	$(".category").css({
		"border-bottom": "",
		"color": ""
	});
	$("#cate0").css({
		"border-bottom": "solid 2px #00A0E9",
		"color": "#00A0E9"
	});
	Slide.slideTo("#contain", 0, 500);
}

function FloatMul(arg1,arg2)   
 {   
  var m=0,s1=arg1.toString(),s2=arg2.toString();   
  try{m+=s1.split(".")[1].length}catch(e){}   
  try{m+=s2.split(".")[1].length}catch(e){}   
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)   
 } 