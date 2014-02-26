window.globevar = {
	next_lock: false
}

function Lightbox() {
	this.create = function() {

		$("body").append('<div id="new_lightbox" style="width:100%;height:100%;position:fixed;z-index:100;background-color:rgba(97, 97, 97, 0.3)"></div>');
		var obj = $("#new_lightbox");
		this.a = obj;

		$(obj).mousedown(function(event) {
			if (event.target.className != "theinput"&&event.target.className !="ClassInput") {
				return false;
			}

		});
	
	}
	this.cancel = function() {
		$(this.a).remove();
	}
}


$(document).ready(function() {
	editlive();
	$(".edit").live('mousedown', function(e) {
		/* Act on the event */
		window.globevar.next_lock = false;
		try {
			var a = e.target.parentNode.parentNode;
			var type = $(a).attr("type");
			var j = $(a).index();
			var i = $(a.parentNode).index();
			var data = localStorage.sites;
			var newtab = JSON.parse(data);
		} catch (e) {
			return false;
		}
		if(newtab[i].icons[j].type=="2"){
			var src_url=newtab[i].icons[j].ico;
			var _theico=newtab[i].icons[j].ico;
		}
		if(newtab[i].icons[j].type=="3"){
			var src_url=newtab[i].icons[j].img;
			var _theico=newtab[i].icons[j].img;
		}
		if(newtab[i].icons[j].type=="4"){
			edit_normal(newtab,i,j);
			return false;
		}

		var demo = '<div class="webs_demo" id="icodemo" draggable="false" color="'+newtab[i].icons[j].color+'" pre_color="'+newtab[i].icons[j].color+'" style="background-color:' + newtab[i].icons[j].color + '" i="' + i + '" j="' + j + '" appid="'+newtab[i].icons[j].appid+'" pre_type="' + newtab[i].icons[j].type + '" pre_ico="' + src_url + '" ico="' + _theico + '" url="' + newtab[i].icons[j].url + '" type="' + newtab[i].icons[j].type + '" name="' + newtab[i].icons[j].name + '"><img id="demoimg" src="' + src_url + '" class="favicon" ico="' + newtab[i].icons[j].ico + '"/><span class="name" id="demospan">' + newtab[i].icons[j].name + '</span></div>';

		var lightbox = new Lightbox();
		lightbox.create();
		var icotype = newtab[i].icons[j].type;
		var edit_box = '<div id="editbox">';
		edit_box += '<div id="edit_back"></div>';
		edit_box += '<div id="edit_title"><h2>' + chrome.i18n.getMessage("edit_edit") + '</h2>' + demo + '</div>';
		edit_box += '<div id="edit_main">';
		edit_box += '<div class="edit_main_in" id="edit1" style="display:block;">';
		edit_box += '<div class="edit_list"><p class="p_input">' + chrome.i18n.getMessage("edit_name") + '</p><input type="text" class="theinput" value="' + newtab[i].icons[j].name + '" id="edit_name"/></div>';
		if (newtab[i].icons[j].type == "2" && newtab[i].icons[j].url == "") {
			edit_box += '<div class="edit_list"><p class="p_input">' + chrome.i18n.getMessage("edit_site") + '</p><input type="text" class="theinput"  readonly value="' + chrome.i18n.getMessage("edit_app_not") + '" id="edit_site"/></div>';
		} else {
			edit_box += '<div class="edit_list"><p class="p_input">' + chrome.i18n.getMessage("edit_site") + '</p><input type="text" class="theinput" value="' + newtab[i].icons[j].url + '" id="edit_site"/></div>';
		}

		edit_box += '</div>';
		edit_box += '<div class="edit_main_in" id="edit2">';
		edit_box += '<div class="edit_list" style="margin-top:0px;font-size:20px;"><p class="p_input">' + chrome.i18n.getMessage("edit_icon") + '</p><div class="ico_edit_sele" style="border-bottom: solid 2px #33B5E5;" to="#edit_img1" id="pre_ico">' + chrome.i18n.getMessage("edit_preicon") + '</div><div class="ico_edit_sele" id="edit_auto" to="#edit_img2">' + chrome.i18n.getMessage("edit_zd") + '</div><div class="ico_edit_sele" id="select_edit_ico" to="#edit_img3">' + chrome.i18n.getMessage("edit_sd") + '</div></div>';
		var load_ico = '<div class="loader" id="edit_load"><div class="loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>';
		var load_ico2 = '<div class="loader" id="color_load"><div class="loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>';
		var edit_wait = '<div id="edit_wait">' + chrome.i18n.getMessage("edit_loading") + '</div>';
		var smallico = "";
		for (var i = 0; i <168; i++) {
			smallico += '<div class="smallico" id="smallico' + i + '" img="ico/' + i + '.png" style="background-image: url(ico/' + i + '.png); "></div>';
		};
		var edit_sd = '<div id="allicon">' + smallico + '</div>';
		edit_box += '<div class="edit_list" style="margin-top:10px;height:140px;position:relative;"><div id="edit_img1" style="display:block;background-image:url(' + src_url + ')"></div><div id="edit_img2">' + load_ico + edit_wait + '<img id="demo_load" src=""/></div><div id="edit_img3">' + edit_sd + '</div></div>';
		edit_box += '</div>';
		edit_box += '<div class="edit_main_in" id="edit3">';
			edit_box += '<div style="width:640px;height:40px;left:20px;top:0px;">';
				edit_box+='<p style="font-size:20px;margin-left:10px;" class="p_input">'+chrome.i18n.getMessage("edit_back_color")+'</p>';
				edit_box+='<div class="color_type_button" id="color_type1" style="border-bottom: solid 2px #99CC00;">'+chrome.i18n.getMessage("edit_pre_color")+'</div>';
				edit_box+='<div class="color_type_button" id="color_type2">'+chrome.i18n.getMessage("edit_match_color")+'</div>';
				edit_box+='<div class="color_type_button" id="color_type3">'+chrome.i18n.getMessage("edit_sd_color")+'</div>';
			edit_box+='</div>';
			edit_box+='<div style="position:absolute;">'+load_ico2+'</div>';
			edit_box+='<div id="editcolorbox"><div id="cpicker" style="zoom:0.8"></div></div>';
		edit_box += '</div>';
		edit_box += '</div>';

		edit_box += '<div id="edit_control"><div class="thebutton" id="edit_finish" style="float:right;cursor:pointer">' + chrome.i18n.getMessage("edit_finish") + '</div><div class="thebutton" id="edit_next" edit="1" style="float:right;cursor:pointer;">' + chrome.i18n.getMessage("edit_next") + '</div></div>';
		edit_box += '</div>';
		$("#new_lightbox").append(edit_box);
		$("#edit_name")[0].focus();
		$("#edit_next").click(function(event) {
			/* Act on the event */
			if (window.globevar.next_lock == true) {
				return false;
			}

			var cu_edit = $(this).attr("edit");
			cu_edit = parseInt(cu_edit);
			if(icotype=="2"){
				var next_edit = cu_edit + 2;
			}
			else{
				var next_edit = cu_edit + 1;	
			}
			if(next_edit==3){
				$("#edit_next").hide();
			}
			$("#edit_next").attr("edit", next_edit);
			$(".edit_main_in").hide();
			$("#edit" + next_edit).show();
			
		});
		$(".smallico").mousedown(function(e) {
			/* Act on the event */
			$(".smallico").css("border", "");
			$(e.target).css("border", "2px solid rgba(153, 204, 0, 1)");
			var ico = $(e.target).attr("img");
			$("#icodemo").attr("ico", ico);
			$("#demoimg").attr("src", ico);
		});
		$("#edit_name").live('keyup', function(event) {
			var val = $(this).val();
			$("#icodemo").attr("name", val);
			$("#demospan").text(val);
		});
		$("#edit_site").live('keyup', function(e) {
			var val = $(this).val();
			$("#icodemo").attr("url", val);
		});
		$(".color_type_button").mousedown(function(e) {
			/* Act on the event */
			$(".color_type_button").css('border-bottom', 'solid 2px transparent');
			$(e.target).css('border-bottom', 'solid 2px #99CC00');
		});
		$("#color_type1").mousedown(function(event) {
			/* Act on the event */
			window.globevar.next_lock = false;
			$("#editcolorbox").hide();
			$("#edit_finish,#edit_next").css("background-color", "");
			$("#color_load").hide();
			var pre_color=$("#icodemo").attr("pre_color");
			$("#icodemo").attr("color",pre_color);
			$("#icodemo").css('background-color', pre_color);
		});
		$("#color_type2").mousedown(function(event) {
			/* Act on the event */
			window.globevar.next_lock = true;
			$("#color_load").show();
			$("#editcolorbox").hide();
			$("#edit_finish,#edit_next").css("background-color", "#ccc");
			var theimg=document.getElementById("demoimg");
			try{
				var c=document.getElementById("cav");
				var ctx=c.getContext("2d");
					ctx.clearRect(0,0,100,100);
				var color=getaveragecolor(theimg);
					window.globevar.next_lock = false;
				$("#icodemo").attr("color",color);
				$("#icodemo").css('background-color',color);
				$("#color_load").hide();
				$("#edit_finish,#edit_next").css("background-color", "");
				}catch(e){
					var rcolor=randcolor();
					window.globevar.next_lock = false;
					$("#color_load").hide();
					$("#edit_finish,#edit_next").css("background-color", "");
					$("#icodemo").attr("color",rcolor);
					$("#icodemo").css('background-color',rcolor);
				}
 			
		});
		$("#color_type3").mousedown(function(event) {
			/* Act on the event */
			window.globevar.next_lock = false;
			$("#color_load").hide();
			$("#editcolorbox").show();
			$("#edit_finish,#edit_next").css("background-color", "");
			$('#cpicker').farbtastic(function(color){
					$("#icodemo").attr("color",color);
					$("#icodemo").css('background-color',color);
				});
		});
		$(".ico_edit_sele").mousedown(function(event) {
			/* Act on the event */
			$(".ico_edit_sele").css("border-bottom", "");
			$(event.target).css("border-bottom", "solid 2px #33B5E5");
			var to_id = $(event.target).attr("to");
			$("#edit_img1,#edit_img2,#edit_img3").hide();
			$(to_id).show();
			if (event.target.id == "pre_ico") {
				window.globevar.next_lock = false;
				$("#edit_finish,#edit_next").css("background-color", "");
				var ico = $("#icodemo").attr("pre_ico");
				$("#icodemo").attr("ico", ico);
				$("#demoimg").attr("src", src_url);
				var pre_type = $("#icodemo").attr("pre_type");
				$("#icodemo").attr("type", pre_type);
			}
			if (event.target.id == "select_edit_ico") {
				$(".smallico").css("border", "");
				$("#smallico0").css("border", "2px solid rgba(153, 204, 0, 1)");
				$("#icodemo").attr("ico", "ico/0.png");
				$("#demoimg").attr("src", "ico/0.png");
				window.globevar.next_lock = false;
				$("#edit_finish,#edit_next").css("background-color", "");
			}
			if (event.target.id == "edit_auto") {
				$("#demo_load").hide();
				$("#edit_load,#edit_wait").show();
				$("#demo_load").attr("src", "");
				window.globevar.next_lock = true;
				$("#edit_finish,#edit_next").css("background-color", "#ccc");
				imgok();
				function imgok() {
					var type = $("#icodemo").attr("type");
					if (type == "2") {

					} else {
						var srcico = $("#icodemo").attr("url");
						var Language = navigator.language;
						if (Language == "zh-CN") {
							var icon_url = 'http://s-85283.gotocdn.com/geticon.php?url=';
						} else {
							var icon_url = 'http://s-82923.gotocdn.com/geticon.php?url=';
						}
						$.ajax({
							url: icon_url+srcico,
							type: 'get',
							dataType: 'text',
							timeout:8000,
							success:function(data){
								$("#demo_load").show();
								$("#demoimg").attr("src", data);
								$("#icodemo").attr("ico",data);
								$("#demo_load").attr("src", data);
								$("#edit_load,#edit_wait").hide();
								window.globevar.next_lock = false;
								$("#edit_finish,#edit_next").css("background-color", "");
							},
							error:function(){
								$("#demo_load").show();
								$("#demoimg").attr("src", "ico/0.png");
								$("#icodemo").attr("ico","ico/0.png");
								$("#demo_load").attr("src", "ico/0.png");
								$("#edit_load,#edit_wait").hide();
								window.globevar.next_lock = false;
								$("#edit_finish,#edit_next").css("background-color", "");
							}
						})
					}
				}
			}
		});
		$("#edit_finish").live('click', function(e) {
			if(window.globevar.next_lock==true){
				return false;
			}
			/* Act on the event */
			var name = $("#icodemo").attr("name");
			var url  = $("#icodemo").attr("url");
			var ht=url.toLowerCase();
			if(ht.indexOf("://")>0||ht.indexOf("mailto:")>=0||ht==""){

			}else{
				s_url="http://"+s_url;
			}
			var type   = $("#icodemo").attr("type");
			var ico    = $("#icodemo").attr("ico");
			var icoimg = $("#icodemo").attr("ico");
			var color  =$("#icodemo").attr("color");
			if(type==2){
				var appid=$("#icodemo").attr("appid");
				var one={
					"color":color,
					"ico":ico,
					"name":name,
					"type":type,
					"url":url,
					"appid":appid,
					"img":ico
				}
			}else{
				var one={
					"color":color,
					"ico":url,
					"name":name,
					"type":type,
					"url":url,
					"img":ico
				}
			}
			var i = $("#icodemo").attr("i");
			i = parseInt(i);
			var j = $("#icodemo").attr("j");
			j = parseInt(j);
			var desk = localStorage.sites;
			var webs = JSON.parse(desk);
			webs[i].icons[j] = one;
			var s = JSON.stringify(webs);
			localStorage.sites = s;

			lightbox.cancel();
			$("#contain").children().remove();
			$(".category").remove();
			load();
			$(".edit").show();
			$(".ques").show();
			$(".x").show();
			$(".category").css({
				"border-bottom": "",
				"color": ""
			});
			$("#cate" + i).css({
				"border-bottom": "solid 2px #00A0E9",
				"color": "#00A0E9"
			});
			sync();
			return false;
		});
		$("#edit_back").click(function(e) {
			/* Act on the event */
			lightbox.cancel();
		});
		return false;
	});
});


function edit_normal(newtab,i,j){
	var lightbox = new Lightbox();
		lightbox.create();
	var menu=[chrome.i18n.getMessage("edit_edit")];
	var edit_pop=new Pop(645, 360, "auto", menu);
		edit_pop.insert($("#new_lightbox")[0]);
		edit_pop.close(function(){
			lightbox.cancel();
		})
	var pop_bottom = edit_pop.getBottom();
	var box = edit_pop.getContent(0);
	var button_edit_finish = new Button(chrome.i18n.getMessage("finish"), "green", "right", "auto", "button_edit_finish");
		button_edit_finish.insert(pop_bottom);
	var div='';
	var demo = '<div class="webs_demo" id="icodemo" draggable="false" i="' + i + '" j="' + j + '"  url="' + newtab[i].icons[j].url + '" bgimg="'+newtab[i].icons[j].bgimg+'" style="zoom:0.9;float:left;margin-top:0px;background-image:url('+newtab[i].icons[j].bgimg+')" name="' + newtab[i].icons[j].name + '"></div>';
	div+='<div id="edit_top_title1" style="width:630px;height:100px;"><div style="width:auto;height:auto;color:#555;margin-top:20px;float:left;font-size:20px;">'+chrome.i18n.getMessage("select_title")+'</div>'+demo+'</div>';
	div+='<div id="edit_name_line" style="width:630px;height:60px;margin-bottom:10px;"><div style="width:92px;height:auto;color:#555;margin-top:14px;float:left;font-size:20px;">'+chrome.i18n.getMessage("sitename")+'</div><input style="padding-top:14px;padding-bottom:14px;" value="'+chrome.i18n.getMessage("edit_app_not")+'" readonly="true" class="theinput" /></div>';
	div+='<div id="edit_url_line" style="width:630px;height:60px;"><div style="width:92px;height:auto;color:#555;margin-top:14px;float:left;font-size:20px;">'+chrome.i18n.getMessage("edit_site")+'</div><input id="edit_bgicon_input" style="padding-top:14px;padding-bottom:14px;" value="'+newtab[i].icons[j].url+'" autofocus="autofocus" class="theinput" /></div>';
	$(box).append(div);
	var button_edit_change = new Button(chrome.i18n.getMessage("change_icon"), "orange", "left", "margin-top:20px;margin-left:30px;", "button_edit_change");
		button_edit_change.insert($("#edit_top_title1")[0]);
	
}

function editlive(){
	$("#edit_bgicon_input").live('input', function(event) {
		/* Act on the event */
		var url=$(this).val();
		$("#icodemo").attr('url', url);
	});
	$("#button_edit_finish").live('click', function(event) {
		var url=$("#icodemo").attr('url');
		var i=$("#icodemo").attr('i');
		var j=$("#icodemo").attr('j');
		var bgimg=$("#icodemo").attr('bgimg');
		var name=$("#icodemo").attr("name");
		var desk = localStorage.sites;
			var webs = JSON.parse(desk);
			webs[i].icons[j].url=url;
			webs[i].icons[j].bgimg=bgimg;
			webs[i].icons[j].bgimg.name=name;
			var s = JSON.stringify(webs);
			localStorage.sites = s;
			$("#contain").children().remove();
			$(".category").remove();
			load();
			$(".edit").show();
			$(".ques").show();
			$(".x").show();
			$(".category").css({
				"border-bottom": "",
				"color": ""
			});
			$("#cate" + i).css({
				"border-bottom": "solid 2px #00A0E9",
				"color": "#00A0E9"
			});
			$("#new_lightbox").remove();
			return false;
	});
	$(".edit_popico_select").live('click', function(event) {
		/* Act on the event */
		$(".edit_popico_select").css('border', '');
		$(this).css('border', 'solid 3px #0099CC');
		var url=$(this).attr("url");
		var name=$(this).attr("name");
		var icoid=$(this).attr("icoid");
		var one='{"url":"'+url+'","name":"'+name+'","bgimg":"'+icoid+'"}';
		$("#button_select_icon").attr("one",one);
	});
	$("#button_select_icon").live('click', function(event) {
		/* Act on the event */
		var one=$(this).attr("one");
		var pop=$(this).attr("pop");
		var popid="#"+pop;
		if(one){
			var obj=JSON.parse(one);
			var iconid=obj.bgimg;
			var w=null;
				w=new Wait(chrome.i18n.getMessage("download_ico"));
				w.show();
			var Language = navigator.language;
			if (Language == "zh-CN") {
				var bgimg_url = 'http://s-85283.gotocdn.com/mifish/getbgimg.php?bgimg=';
			} else {
				var bgimg_url = 'http://s-82923.gotocdn.com/mifish/getbgimg.php?bgimg=';
			}
			$.ajax({
				url: bgimg_url+iconid,
				type: 'get',
				timeout:8000,
				dataType: 'text',
				success:function(data){
					$("#icodemo").attr({
						"url": obj.url,
						"bgimg": data,
						"name":obj.name
					});
					$("#icodemo").css('background-image','url('+data+')');
					$("#edit_bgicon_input").val(obj.url);
					$(popid).remove();
					w.remove();
				},
				error:function(){
					var warn=new Warn(chrome.i18n.getMessage("networkerror"));
						warn.show(function(){
							w.remove();
							return false;
					});
				}
			})
			
		}else{
			return false;
		}
	});
	$(".edit_left_menu").live('click', function(event) {
		/* Act on the event */
		$(".edit_left_menu").css({
			"background-color": '',
			"color": ''
		});
		$(this).css({
			'background-color': '#33B5E5',
			'color': '#fdfdfd'
		});
		var type=$(this).attr("type");
		$("#edit_icon_content").html("");
		var div_main='';
		var Language = navigator.language;
			if (Language == "zh-CN") {
				var ico_url = 'http://s-85283.gotocdn.com/mifish/icos.php';
			} else {
				var ico_url = 'http://s-82923.gotocdn.com/mifish/icos.php';
		}
		$.ajax({
			url:ico_url,
			cache:false,
			timeout:8000
		})
		.done(function(data) {
			var obj=JSON.parse(data);
			for (var i = 0; i < obj.ico.length; i++) {
				if(obj.ico[i].type==type||type=="0"){
					div_main+='<div class="edit_popico_select" name="'+obj.ico[i].name+'" url="'+obj.ico[i].url+'" icoid="'+obj.ico[i].ico+'"   style="width:120px;float:left;margin-left:15px;margin-top:18px;height:80px;"><img style="width:120px;height:60px;margin:0px;float:left;" src="'+obj.ico[i].src+'" /><span style="float:left;width:120px;color:#33B5E5;font-size:12px;text-align:center;overflow:hidden;line-height:20px;">'+obj.ico[i].name+'</span></div>';
				}
				
			};
			$("#edit_icon_content").append(div_main);
		})
		.fail(function() {
			$("#edit_icon_content").html('<div style="color:#555555;position:absolute;top:100px;left:150px;">'+chrome.i18n.getMessage("networkerror")+'</div>');
		})	
	});
	$("#button_edit_change").live('click', function(event) {
		/* Act on the event */
		var menu=[chrome.i18n.getMessage("select_icon")];
		var icon_pop=new Pop(645, 460, "auto", menu);
			icon_pop.insert($("#new_lightbox")[0]);
			icon_pop.close(function(){
				icon_pop.cancel();
			})
		var icon_box=icon_pop.getContent(0);
		var icon_bottom=icon_pop.getBottom();
		var load='<div id="_loading_icons" style="width:100px;height:100px;position:absolute;top:50%;left:50%;margin-top:-50px;margin-left:-50px;"><img style="width:100px;height:100px;" src="img/blue.gif"/></div>';
		$(icon_box).append(load);
		var button_select_icon = new Button(chrome.i18n.getMessage("finish"), "green", "right", "auto", "button_select_icon");
		button_select_icon.insert(icon_bottom);
		$("#button_select_icon").attr("pop",icon_pop.id)
		$("#button_select_icon").hide();
		var Language = navigator.language;
			if (Language == "zh-CN") {
				var ico_url = 'http://s-85283.gotocdn.com/mifish/icos.php';
			} else {
				var ico_url = 'http://s-82923.gotocdn.com/mifish/icos.php';
		}
		$.ajax({
			url: ico_url,
			cache:false,
			timeout:8000
		})
		.done(function(data) {
			$(icon_box).html("");
			var obj=JSON.parse(data);
			var div='';
			var div_menu='';
			var div_main='';
			for (var i = 0; i < obj.ico.length; i++) {
				div_main+='<div class="edit_popico_select" name="'+obj.ico[i].name+'" url="'+obj.ico[i].url+'" icoid="'+obj.ico[i].ico+'"   style="width:120px;float:left;margin-left:15px;margin-top:18px;height:80px;"><img style="width:120px;height:60px;margin:0px;float:left;" src="'+obj.ico[i].src+'" /><span style="float:left;width:120px;color:#33B5E5;font-size:12px;text-align:center;overflow:hidden;line-height:20px;">'+obj.ico[i].name+'</span></div>';
			};
			for (var i = 0; i < obj.menu.length; i++) {
				if(i==0){
					div_menu+='<div class="edit_left_menu" style="background-color:#33B5E5;color:#fdfdfd;" type="0">'+chrome.i18n.getMessage("all_sites")+'</div>';
				}
				div_menu+='<div class="edit_left_menu" type="'+obj.menu[i].type+'">'+obj.menu[i].name+'</div>';
			};
				div+='<div style="width:635px;height:350px;">';
					div+='<div style="width:150px;height:350px;overflow-x:hidden;overflow-y:scroll;position:absolute;">'+div_menu+'</div>';
					div+='<div id="edit_icon_content" style="width:485px;height:350px;overflow-x:hidden;overflow-y:scroll;position:absolute;left:155px;">'+div_main+'</div>';
				div+='</div>';
			$(icon_box).append(div);
			$(icon_box).css('overflow', 'visible');
			$("#button_select_icon").show();
		})
		.fail(function() {
			var warn=new Warn(chrome.i18n.getMessage("networkerror"));
						warn.show(function(){
							icon_pop.cancel();
							return false;
					});
		})
		
	});
}