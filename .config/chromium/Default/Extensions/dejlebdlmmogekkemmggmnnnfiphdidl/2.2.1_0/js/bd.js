 $(document).ready(function(){
	//禁止选中
	_lock2=false;
	rota=false;
	Favicon_Api=chrome.i18n.getMessage("favicon_api");
	$(document).bind("selectstart",function(e){
		if(e.target.className!="theinput"&&e.target.id!="search_input"&&e.target.id!="site_name2"&&e.target.id!="site_url2"){
				return false;
			}
	});
	$("#main").bind("scroll",function(){
		$("#main").scrollLeft(0);
	})
	$("body").bind("scroll",function(){
		$("#body").scrollLeft(0);
	})

	document.oncontextmenu=function(e){
			if(e.target.className!="theinput"&&e.target.id!="search_input"&&e.target.id!="site_name2"&&e.target.id!="site_url2"){
				return false;
			}
		
	}
	/*
	window.onmousewheel = function (e) {
		if(_lock==false&&_lock2==false&&_lock3==false){
    		e.preventDefault();
    	}
	}
	*/
	default_setting();
	//加载图标、网站
	load();
	load_search();
	//交互操作
	mutual();
	//网址提示
	sitesuggest();
	//添加网站
	add();
	//删除网站
	dele();
	//载入应用
	App.launch();
	//几个配置参数
	_n=0;
	_m=-1;
	_e=0;
	//滑动
	Slide.onstart();
	Slide.slidetoright();
	Slide.slidetoleft();
	Slide.mousewheel();
	//底部标记
	mark();
	dele_desk();
	creat_desk();
	rename();
	var _a=localStorage.bookmark;
	if(_a=="1"){
		bookmarks();
	}
	load_bookmarks();
	open_history();
	opensite();
	movedesk();
	drag();
	select_icon();
	appset();
	openapp2();
	
});
//提示网站名称和地址不能为空
var thealert={
	zh:{
		name:chrome.i18n.getMessage("name_alert"),
		url:chrome.i18n.getMessage("url_alert"),
		both:chrome.i18n.getMessage("both_alert")
	}
}
//加载图标、网站
function load(){
	//不是第一次加载
	if(localStorage.sites){
		var json=localStorage.sites;
		var newtab=JSON.parse(json);
		for (var i = 0; i < newtab.length; i++) {
				var h='';
				for(var j=0;j<newtab[i].icons.length;j++){
					//不能删除的图标
					if(newtab[i].icons[j].type=="0"){
							h+='<div class="webs_out"><div class="webs uncancel" draggable="true" style="background-image:url('+newtab[i].icons[j].bgimg+')" url="'+newtab[i].icons[j].url+'" type="'+newtab[i].icons[j].type+'" ><span class="ques"></span></div></div>';

					}else{
						//应用
						
						if(newtab[i].icons[j].type=="2"){
							h+='<div class="webs_out"><div class="webs" draggable="true" style="background-color:'+newtab[i].icons[j].color+'" enable="'+newtab[i].icons[j].enable+'" appid="'+newtab[i].icons[j].appid+'" url="'+newtab[i].icons[j].url+'" type="'+newtab[i].icons[j].type+'"><img src="'+newtab[i].icons[j].ico+'" class="favicon" style="margin-top:15px;margin-left:10px;width:50px;height:50px;" ico="'+newtab[i].icons[j].ico+'"/><span class="name" style="width:90px;height:20px;font-size:13px;margin-top:38px;">'+newtab[i].icons[j].name+'</span><span class="x" title="'+chrome.i18n.getMessage("delete_desk")+'"></span><span class="edit" title="'+chrome.i18n.getMessage("edit")+'"></span></div></div>';		
						}
						//采用手动选取的本地图标和自动获取的图标
						if(newtab[i].icons[j].type=="3"){
							h+='<div class="webs_out"><div class="webs" draggable="true" style="background-color:'+newtab[i].icons[j].color+'" enable="'+newtab[i].icons[j].enable+'" appid="'+newtab[i].icons[j].appid+'" url="'+newtab[i].icons[j].url+'" type="'+newtab[i].icons[j].type+'"><img src="'+newtab[i].icons[j].img+'" class="favicon" ico="'+newtab[i].icons[j].ico+'"/><span class="name">'+newtab[i].icons[j].name+'</span><span class="x" title="'+chrome.i18n.getMessage("delete_desk")+'"></span><span class="edit" title="'+chrome.i18n.getMessage("edit")+'"></span></div></div>';		
						}
						//云网址
						if(newtab[i].icons[j].type=="4"){
							h+='<div class="webs_out"><div class="webs" draggable="true" style="background-image:url('+newtab[i].icons[j].bgimg+')" url="'+newtab[i].icons[j].url+'" type="'+newtab[i].icons[j].type+'" ><span class="x" title="'+chrome.i18n.getMessage("delete_desk")+'"></span><span class="edit" title="'+chrome.i18n.getMessage("edit")+'"></span></div></div>';		
						}
					}
				}
				if(j==15){
					h+='<div id="add'+i+'" addposi="'+i+'" style="display:none;" class="add"></div>';
				}else{
					h+='<div id="add'+i+'" addposi="'+i+'" class="add"></div>';
				}

				$("#contain").append('<div class="icos">'+h+'</div>');

				if(i==0){
					var b='<div class="category" id="cate'+i+'" position="'+i+'" style="color:#00A0E9;border-bottom:solid 2px #00A0E9">'+newtab[i].deskname+'</div>'
				}else{
					var b='<div class="category" id="cate'+i+'" position="'+i+'">'+newtab[i].deskname+'</div>'
				}

				$('#category_add').before(b);
		};
		var w=(i)*962;
		$("#contain").css("width",w);
		$("#contain").attr("w",w);
		center();
		
	}
	//第一次加载
	else{
		var sites='[{"deskname":"'+chrome.i18n.getMessage("popular")+'","icons":['+_Default_site+']},{"deskname":"'+chrome.i18n.getMessage("shopping")+'","icons":['+_shopping_site+']}]';
		localStorage.sites=sites;
		var newtab=JSON.parse(sites);
		for (var i = 0; i < newtab.length; i++) {
				var h='';
				for(var j=0;j<newtab[i].icons.length;j++){
					if(newtab[i].icons[j].type=="0"){
						//不能删除的图标

							h+='<div class="webs_out"><div class="webs uncancel" draggable="true" style="background-image:url('+newtab[i].icons[j].bgimg+')" url="'+newtab[i].icons[j].url+'" type="'+newtab[i].icons[j].type+'" ><span class="ques"></span></div></div>';
						
					}else{
						//默认图标，自带
						h+='<div class="webs_out"><div class="webs" draggable="true" style="background-image:url('+newtab[i].icons[j].bgimg+')" url="'+newtab[i].icons[j].url+'" type="'+newtab[i].icons[j].type+'" ><span class="x" title="'+chrome.i18n.getMessage("delete_desk")+'"></span><span class="edit" title="'+chrome.i18n.getMessage("edit")+'"></span></div></div>';						
					}
				}
				h+='<div id="add" addposi="'+i+'" class="add"></div>';
				$("#contain").append('<div class="icos">'+h+'</div>');
				if(i==0){
					var b='<div class="category" id="cate'+i+'" position="'+i+'" style="color:#00A0E9;border-bottom:solid 2px #00A0E9">'+newtab[i].deskname+'</div>'
				}else{
					var b='<div class="category" id="cate'+i+'" position="'+i+'">'+newtab[i].deskname+'</div>'
				}
				$('#category_add').before(b);
		};
		var w=(i)*962;
		$("#contain").css("width",w);
		$("#contain").attr("w",w);
		center();
	}
	if(localStorage.iconopacity){
		var iconop=localStorage.iconopacity;
		$(".webs_out,.add").css('opacity',iconop);
	}else{
		localStorage.iconopacity="1";
		$(".webs_out,.add").css('opacity','1');
	}

	return false;
}
//交互操作
function mutual(){
	$(".webs_out").live('mouseover', function(event) {
		$(this).css('opacity', '1');
	});
	$(".webs_out").live('mouseout', function(event) {
		var iconop=localStorage.iconopacity;
		$(this).css('opacity',iconop);
	});
	$("#site_name2").live("focus",function(event) {
		
		$("#site_name1").css('border', '#99CC00 solid 1px');
		$("#site_name1").css('border-right', 'none');
	});
	$("#site_url2").live("focus",function(event) {
		
		$("#site_url1").css('border', '#99CC00 solid 1px');
		$("#site_url1").css('border-right', 'none');
	});
	$("#site_name2").live("blur",function(event) {
		
		$("#site_name1").css('border', '#D5D5D5 solid 1px');
		$("#site_name1").css('border-right', 'none');
	});
	$("#site_url2").live("blur",function(event) {
		
		$("#site_url1").css('border', '#D5D5D5 solid 1px');
		$("#site_url1").css('border-right', 'none');
	});
	$("#cancel").mousedown(function(){
		$("#lightbox").fadeOut(200);
		_n=0;	
		_m=-1;
		return false;
	});
	function load_webico(){
		$("#pop_site_content").html("");
		var load='<div id="_loading_icons" style="width:100px;height:100px;position:absolute;top:50%;left:50%;margin-top:-50px;margin-left:-50px;"><img style="width:100px;height:100px;" src="img/blue.gif"/></div>';
		$("#pop_site_content").append(load);
		var menu='<div id="pop_menu" style="width:130px;margin-left:20px;height:240px;overflow-y:scroll;overflow-x:hidden;position:absolute;"></div>';
		$("#pop_site_content").append(menu);
		var ico_content='<div id="ico_content" style="width:450px;position:absolute;left:150px;height:240px;overflow-y:scroll;"></div>';
		$("#pop_site_content").append(ico_content);
		var Language = navigator.language;
			if (Language == "zh-CN") {
				var ico_url = 'http://s-85283.gotocdn.com/mifish/icos.php';
			} else {
				var ico_url = 'http://s-82923.gotocdn.com/mifish/icos.php';
			}
		$.ajax({
			url:ico_url,
			type: 'get',
			timeout:8000,
			dataType: 'text',
			cache:false,
			success:function(data){

				var j=JSON.parse(data);

				$("#_loading_icons").hide();
				var left_menu='<div class="left_menu" title="'+chrome.i18n.getMessage("all_sites")+'" style="background-color:#33B5E5;color:#fdfdfd;" type="0">'+chrome.i18n.getMessage("all_sites")+'</div>';
				for (var i = 0; i < j.menu.length; i++) {
					left_menu+='<div class="left_menu" title="'+j.menu[i].name+'" type="'+j.menu[i].type+'">'+j.menu[i].name+'</div>';
				};
				$("#pop_menu").append(left_menu);
				$(".left_menu").live('click', function(event) {
					/* Act on the event */
					$("#finish").attr({"url":"","name":"","appid":"","ico":"","enable":"","bgimg":""});
					$(".left_menu").css({
						'background-color': '',
						'color': ''
					});
					$(this).css({
						'background-color': '#33B5E5',
						'color': '#fdfdfd'
					});
					$("#ico_content").scrollTop("0px");
					var type=$(this).attr('type');
					if(type=="0"){
						$("#ico_content").html("");
						var div='';
						for (var i = 0; i < j.ico.length; i++) {
							div+='<div class="popico_select" name="'+j.ico[i].name+'" url="'+j.ico[i].url+'" icoid="'+j.ico[i].ico+'"   style="width:120px;float:left;margin-left:20px;margin-top:18px;height:80px;"><img style="width:120px;height:60px;margin:0px;float:left;" src="'+j.ico[i].src+'" /><span style="float:left;width:120px;color:#33B5E5;font-size:12px;text-align:center;overflow:hidden;line-height:20px;">'+j.ico[i].name+'</span></div>';
						};

						$("#ico_content").append(div);
					}else{
						$("#ico_content").html("");
						var div='';
						for (var i = 0; i < j.ico.length; i++) {
							if(j.ico[i].type==type){
								div+='<div class="popico_select" name="'+j.ico[i].name+'" url="'+j.ico[i].url+'" icoid="'+j.ico[i].ico+'" style="width:120px;float:left;margin-left:20px;margin-top:18px;height:80px;"><img style="width:120px;height:60px;margin:0px;float:left;" src="'+j.ico[i].src+'" /><span style="float:left;width:120px;color:#33B5E5;font-size:12px;text-align:center;overflow:hidden;line-height:20px;">'+j.ico[i].name+'</span></div>';
							}
							
						};

						$("#ico_content").append(div);
					}
				});
				var div='';
				for (var i = 0; i < j.ico.length; i++) {
					div+='<div class="popico_select" name="'+j.ico[i].name+'" url="'+j.ico[i].url+'" icoid="'+j.ico[i].ico+'" style="width:120px;float:left;margin-left:20px;margin-top:18px;height:80px;"><img style="width:120px;height:60px;margin:0px;float:left;" src="'+j.ico[i].src+'" /><span style="float:left;width:120px;color:#33B5E5;font-size:12px;text-align:center;overflow:hidden;line-height:20px;">'+j.ico[i].name+'</span></div>';
				};

				$("#ico_content").append(div);
				$(".popico_select").live('click', function(e) {
					$(".popico_select").css('border', '');
					$(this).css('border', 'solid 3px #0099CC');
					var url=$(this).attr("url");
					var name=$(this).attr("name");
					var bgimg=$(this).attr("icoid");
					$("#finish").attr({"url":url,"name":name,"appid":"","ico":"","enable":"","bgimg":bgimg});
				});

			},
			error:function(){
				$("#_loading_icons").hide();
				$("#ico_content").append('<div style="font-size:14px;color:#555555;position:absolute;top:100px;left:120px;">'+chrome.i18n.getMessage("networkerror")+'</div>');
			}
		})
		
	}
	$(document).click(function(e){
		if(e.target.className=="add"){
			__add_lock=false;
			var addposi=$(e.target).attr("addposi");
			$("#lightbox").attr("addposi",addposi);
			$("#lightbox").fadeIn(200);
			$("#site_name2").val("");
			$("#site_url2").val("");
			$("#alert").text("");
			$("#finish").attr({"url":"","name":"","appid":"","ico":"","enable":"","bgimg":""});
			$(".add_title").css({"color":"","border-bottom":""});
			$("#pop_site_content").show();
			$("#addapp").hide();
			$("#popular_site").css({"color":"#0099CC","border-bottom":"#0099CC 2px solid"});
			$("#pop_site_content").css('height', '240px');
			$("#allicons").children().remove();
			$("#finish").attr("icontype","0");
			$("#theimg").remove();
			$("#select_icons").val("select1");
			_addtype=2;
			$("#addbox").css('height', '340px');
			$("#addapp").css('height', '250px');
			load_webico();
			return false;
		}

	})
	$("#empty1").mousedown(function(){
		$("#site_name2").val("");
		$("#site_name2")[0].focus();
		$("#site_su").html("");
		return false;
	});
	$("#empty2").mousedown(function(){
		$("#site_url2").val("");
		$("#site_url2")[0].focus();
		$("#site_su").html("");
		return false;
	});
	$(".add_title").mousedown(function(e){
		$(".add_title").css({"color":"","border-bottom":""});
		$(e.target).css({"color":"#0099CC","border-bottom":"#0099CC 2px solid"});
		if(e.target.id=="popular_site"){
			$("#finish").attr({"url":"","name":"","appid":"","ico":"","enable":"","bgimg":""});
			$("#addapp").fadeOut();
			$("#alert").text("");
			$("#site_name2")[0].blur();
			$("#pop_site_content").fadeIn();
			$("#site_url2").val("");
			$("#site_su").html("");
			_addtype=2;
			return false;
		}
		if(e.target.id=="add_site"){
			$("#finish").attr({"url":"","name":"","appid":"","ico":"","enable":"","bgimg":""});
			$("#addapp").fadeOut();
			$("#pop_site_content").fadeOut();
			$("#site_name2").val("");
			$("#site_url2").val("");
			$("#site_name2")[0].focus();
			_addtype=1;
			return false;
		}
		if(e.target.id=="add_app"){
			$("#pop_site_content").fadeOut();
			$("#site_url2").val("");
			$("#site_su").html("");
			$("#addapp").fadeIn();
			$("#finish").attr({"url":"","name":"","appid":"","ico":"","enable":"","bgimg":""});
			_addtype=0;
			chrome.management.getAll(function(app){
				$("#addapp").children().remove();

				
				for (var i = 0; i < app.length; i++) {
					try{
						if(app[i].isApp){
							
				
							if(typeof(app[i].icons)=="undefined"){
								var bgurl="app.png";
								if(!app[i].enabled){
									var bgurl="img/app0.png";
									var enable="false";
								}
								if(app[i].enabled){
									var bgurl="img/app.png";
									var enable="true";
								}
							}
							else{
								var x=bigger(app[i].icons)
								if(!app[i].enabled){
									var bgurl=app[i].icons[x].url+"?grayscale=true";
									var enable="false";
								}
								if(app[i].enabled){
									var bgurl=app[i].icons[x].url;
									var enable="true";
								}
							}	
							
						$("#addapp").append('<div class="addappout" enable="'+enable+'" url="'+app[i].appLaunchUrl+'" appid="'+app[i].id+'" ico="'+bgurl+'" name="'+app[i].name+'"><div class="addappico" style="background-image:url('+bgurl+');"></div><div class="addappname">'+app[i].name+'</div></div>');
									
						}
					}
					catch(err){
						
					}
				}
				if($("#addapp").children().length==0){
					$("#addapp").append('<div style="margin-top:100px;">'+chrome.i18n.getMessage("no_app1")+'<a id="a_download" target="_blank" href="https://chrome.google.com/webstore/category/apps?utm_source=chrome-ntp-icon">'+chrome.i18n.getMessage("no_app2")+'</a>'+chrome.i18n.getMessage("no_app3")+'</div>');
					return false;
				}
			})
		}
	})
}
//网址提示
function sitesuggest(){
	$("#site_name2,#site_url2").keydown().keyup(function(e){
		$("#alert").text("");
		if(e.which!=40&&e.which!=38&&e.which!=39&&e.which!=37&&e.which!=16&&e.which!=17&&e.which!=18&&e.which!=13){
		_n=0;	
		_m=-1;
		var q=$(this).val();
		var Lang=navigator.language;
		if(Lang=="zh-CN"){
			var url = 'http://s-85283.gotocdn.com/suggest.php?word=' + q + '&time=' + new Date().getTime();

			$.ajax({url:url,dataType:'text',error:function(){$("#site_su").html("");},success:
				function(data){

					var reg=/s:.*\}\)/gi;
					var s=data.match(reg)[0];

					var l=s.length;
					if(l<8){
						$("#site_su").html("");
						return false;

					}

						s=s.substring(2,l-2);
					

					var sg=JSON.parse(s);

					$("#site_su").html("");
					for(var i=0;i<sg.length;i++){
						
						var reg2=/0\{\#\S\+\_\}.*/gi;
						var sg_list=sg[i].match(reg2)[0];

							sg_list=sg_list.substring(7);	
		
						var sg_l=JSON.parse(sg_list);

						var sg_name=sg_l[4];
						var sg_url=sg_l[1];

							if(i!=0){
								var sg_before=JSON.parse(sg[i-1].match(reg2)[0].substring(7))[1];
								if(sg_before==sg_url){
									continue;
								}
							}
						
						$("#site_su").append('<li class="su_li" id="suggest'+_n+'" sitename="'+sg_name+'" siteurl="'+sg_url+'"><span class="name_sg">'+sg_name+':</span><span class="url_sg">'+sg_url+'</span></li>');
						_n++;

					}
				}
			});
		}else{
			var url = 'http://s-82923.gotocdn.com/query_url.php?name=' + q + '&time=' + new Date().getTime();
			$.ajax({url:url,dataType:'text',error:function(){$("#site_su").html("");},success:
				function(data){

						var l=data.length;
						if(l<8){
							$("#site_su").html("");
							return false;

						}
						var json=JSON.parse(data);
						$("#site_su").html("");
						for (var i = 0; i < json.length; i++) {
							$("#site_su").append('<li class="su_li" id="suggest'+_n+'" sitename="'+upfirst(json[i].name)+'" siteurl="http://'+json[i].url+'"><span class="name_sg">'+upfirst(json[i].name)+':</span><span class="url_sg">http://'+json[i].url+'</span></li>');
							_n++;
						};


					}
				
			});
		}//
	}
	})
//按上下键时选择提示词
	$(document).mousedown(function(e){
		if(e.target.className=="su_li"||e.target.className=="name_sg"||e.target.className=="url_sg"){
			if(e.target.className=="su_li"){
				var obj=$(e.target);
			}
			if(e.target.className=="name_sg"||e.target.className=="url_sg"){
				var obj=$(e.target.parentNode);
			}
			var sitename=obj.attr("sitename");
			var siteurl=obj.attr("siteurl");
			$("#site_name2").val(sitename);
			$("#site_url2").val(siteurl);
			$("#site_su").html("");
			_n=0;	
			_m=-1;
		}
		
	})
	$("#site_name2,#site_url2").blur(function(){
			_n=0;	
			_m=-1;
			$("#site_su").html("");
	})
	$("#site_name2,#site_url2").keydown(function(e){
		//按下键
		if(e.which==40){
			if(_m==_n-1){
				_m=-1;
			}
			_m++;
			$("#suggest0,#suggest1,#suggest2,#suggest3,#suggest4,#suggest5,#suggest6,#suggest7,#suggest8,#suggest9").css("background-color","");
			$("#suggest"+_m).css("background-color","rgba(198, 248, 182, 0.31)");
			$("#site_name2").val($("#suggest"+_m).attr("sitename"));
			$("#site_url2").val($("#suggest"+_m).attr("siteurl"));
		}
		if(e.which==38){
			e.preventDefault();
			if(_m==-1){
				_m=_n;
			}
			if(_m==0){
				_m=_n;
			}
			_m--;
			$("#suggest0,#suggest1,#suggest2,#suggest3,#suggest4,#suggest5,#suggest6,#suggest7,#suggest8,#suggest9").css("background-color","");
			$("#suggest"+_m).css("background-color","rgba(198, 248, 182, 0.31)");
			$("#site_name2").val($("#suggest"+_m).attr("sitename"));
			$("#site_url2").val($("#suggest"+_m).attr("siteurl"));
		}
		if(e.which==13){
			if(_m>=0){
				$("#site_su").html("");
			}
		}
	})

}
//添加网站
function add(){
	
	$(document).mousedown(function(e){
		if(e.target.className=="addappout"||e.target.className=="addappico"||e.target.className=="addappname"){
			if(e.target.className=="addappout"){
				var obj=e.target;
			}
			if(e.target.className=="addappico"){
				var obj=e.target.parentNode;
			}
			if(e.target.className=="addappname"){
				var obj=e.target.parentNode;
			}
			$(".addappout").css("border","");
			$(obj).css("border","2px solid rgba(20, 223, 11,1)")
			var url=$(obj).attr("url");
			var name=$(obj).attr("name");
			var appid=$(obj).attr("appid");
			var ico=$(obj).attr("ico");
			var enable=$(obj).attr("enable");
			$("#finish").attr({"url":url,"name":name,"appid":appid,"ico":ico,"enable":enable});
		}
	})
	$("#finish").mousedown(function(){	
		_add_stop=false;
		//自定义添加网站
		if(_addtype==1){
			var s_name=$("#site_name2").val();
			var s_url=$("#site_url2").val();

			if(s_name==""&&s_url==""){
				$("#alert").text(thealert.zh.both);
				return false;
			}else if(s_name==""){
				$("#alert").text(thealert.zh.name);
				return false;
			}else if(s_url==""){
				$("#alert").text(thealert.zh.url);
				return false;
			}
			var ht=s_url.toLowerCase();
			if(ht.indexOf("://")>0||ht.indexOf("mailto:")>=0){

			}else{
				s_url="http://"+s_url;
			}

			var icontype=$("#finish").attr("icontype");
			//手动选择自带图标
			if(icontype=="1"){
				var icoimg=$("#finish").attr("icoimg");
				var one={
					"ico":s_url,
					"name":s_name,
					"type":"3",
					"url":s_url,
					"img":icoimg
				}
				var src=icoimg;
				set_ico_color(src,one);
				return false;
			}else{//自动获取图标
				var one={
				"ico":s_url,
				"name":s_name,
				"type":"3",
				"url":s_url,
				"img":"",
				}
				var src=s_url;
				var wait1=null;
					wait1=new Wait(chrome.i18n.getMessage("download_ico"));
					wait1.show();
				var Language = navigator.language;
				if (Language == "zh-CN") {
					var icon_url = 'http://s-85283.gotocdn.com/geticon.php?url=';
				} else {
					var icon_url = 'http://s-82923.gotocdn.com/geticon.php?url=';
				}
				$.ajax({
					url: icon_url+src,
					type: 'get',
					dataType: 'text',
					timeout:8000,
					success:function(data){
						set_ico_color(data,one,function(){
							wait1.remove();
						});
						
					},
					error:function(){
						var warn=new Warn(chrome.i18n.getMessage("networkerror2"));
						warn.show(function(){
							wait1.remove();
							return false;
						});
						
					}
				})
				return false;
			}
		}
		//应用
		if(_addtype==0){
			
			var name=$("#finish").attr("name");
			var url=$("#finish").attr("url");
			var appid=$("#finish").attr("appid");
			var ico=$("#finish").attr("ico");
			var enable=$("#finish").attr("enable");
			if(appid==""){
				return false;
			}
			var one={
				"ico":ico,
				"name":name,
				"type":"2",
				"url":url,
				"appid":appid,
				"enable":enable
			}
			set_ico_color(ico,one,function(){
					
			});
		}
		//云网址
		if(_addtype==2){
			var name=$("#finish").attr("name");
			var url=$("#finish").attr("url");
			var bgimg=$("#finish").attr("bgimg");
			if (bgimg=="") {
				return false;
			};
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
				url: bgimg_url+bgimg,
				type: 'get',
				timeout:8000,
				dataType: 'text',
				success:function(data){
					var one={
						"name":name,
						"type":"4",
						"url":url,
						"bgimg":data
					}
					function endadd(w,one){
						addafter(one);
						w.remove();
					}
					window.setTimeout(function(){endadd(w,one)},100);
					
				},
				error:function(){
					var warn=new Warn(chrome.i18n.getMessage("networkerror"));
						warn.show(function(){
							w.remove();
							return false;
					});
				}
			})
			return false;
		}
	});
	$("#site_name2,#site_url2").focus(function(){
			$("#alert").text("");
	})
	$(document).keydown(function(e){
		if(e.which==27){
			_add_stop=true;
			$("#lightbox3").remove();
 			$("#addbox").css("-webkit-filter","");
		}
	})

}
function set_ico_color(data,one,f){
	$("#theimg").remove();
	$("#add_input").append('<img id="theimg" style="width:50px;height:50px;position:absolute;z-index:-10;opacity:0;" />')
	$("#theimg").attr("src",data);
	var photo=document.getElementById("theimg");
	
	photo.onload=function(){
		_the_ico_color="";
		var c=document.getElementById("cav");
		var ctx=c.getContext("2d");
		ctx.clearRect(0,0,100,100);
			_the_ico_color=getaveragecolor(this);
			one.color=_the_ico_color;
			one.ico=data;
			one.img=data;
			addafter(one);
			return false;
		}
	photo.onerror=function(){
		one.color='rgb(139, 72, 57)';
		one.ico=data;
		one.img=data;
		addafter(one);
		return false;
	}
	f();
	
}
function addafter(one){
		if(__add_lock){
			return false;
		}
		__add_lock=true;
		var addposi=$("#lightbox").attr("addposi");
		var data=localStorage.sites;
		var webs=JSON.parse(data);
		if(webs[addposi].icons.length>=15){
			var len=webs[addposi].icons.length-1;
			webs[addposi].icons[len]=one;
		}else{
			webs[addposi].icons.push(one);
		}
		var s=JSON.stringify(webs);
			localStorage.sites=s;
		$("#lightbox3").remove();
		$("#addbox").css("-webkit-filter","");
		$("#lightbox").fadeOut(200);
		$("#contain").children().remove();
		$(".category").remove();
		load();
		$(".category").css({"border-bottom":"","color":""});
		$("#cate"+addposi).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
		sync();
		return false;
}

//删除图标、网站
function dele(){
	$(document).mousedown(function(e){
		if(e.which==3){
			if(e.target.className=="webs"||e.target.className=="name"||e.target.className=="favicon"||e.target.className=="webs uncancel"){
				
				$(".ques").show();
				$(".x").show();
				$(".edit").show();
				$(".webs").css("opacity","0.8");
				$(".uncancel").css("opacity","1");
				$(".webs").css("-webkit-transform","");
				rota=true;
				rotate(".webs");
			}
		}
	})
	$(document).mousedown(function(e){
		if (e.target.className!=="webs"&&e.target.className!=="name"&&e.target.className!=="favicon"&&e.target.className!=="x"&&e.target.className!=="webs uncancel"&&e.target.className!=="ques"&&e.target.className!=="gbutton"&&e.target.className!=="shuoming"&&e.target.id!=="lightbox0"&&e.target.id!=="shuoming"&&e.target.className!=="edit"&&e.target.className!=="theinput") {
				cancel();
		};
	})
	$(document).mousedown(function(e){
		if(e.target.className=="x"){
			var a=e.target.parentNode.parentNode;
			var type=$(a).attr("type");
			var n=$(a).index();
			var m=$(a.parentNode).index();
			var data=localStorage.sites;
			var webs=JSON.parse(data);
				webs[m].icons.splice(n,1);
			var s=JSON.stringify(webs);
				localStorage.sites=s;
			$(a).fadeOut(200,function(){
				var icon_n=$(a.parentNode).children().length;
				if(m=="0"){
					
					if(icon_n<=4){

						cancel();
					}
				}
				if(icon_n<=16){
					$("#add"+m).show();
				}
				$(a).remove();
			});
		sync();
		}
	})
	$(document).mousedown(function(e){
		if(e.target.className=="ques"){
			var div='<div id="lightbox0">';
					div+='<div id="shuoming">';
						div+='<p class="shuoming">'+chrome.i18n.getMessage("shuoming1")+'</p>';
						div+='<p class="shuoming">'+chrome.i18n.getMessage("shuoming2")+'</p>';
						div+='<div class="gbutton" id="smbutton">'+chrome.i18n.getMessage("finish")+'</div>'
					div+='</div>';
				div+='</div>';
			$("body").append(div);
		}
	})
	$("#smbutton").live("mousedown",function(){
		$("#lightbox0").remove();
	})
}
//图标处于删除状态时的抖动动画
function rotate(ico){
		
			 function state1(){
			 	if(rota==true){
					 $(ico).css("-webkit-transform","rotate(0.5deg)");
					 setTimeout(state2,90);
				}
			 }
			function state2(){
				if(rota==true){	   
				     $(ico).css("-webkit-transform","rotate(-0.5deg)");
					 setTimeout(state1,90);
				}
			}
			state1();
		
}
//取消删除
function cancel(){
		$(".ques").hide();
		$(".x").hide();
		$(".edit").hide();
		rota=false;
		$(".webs").css("-webkit-transform","rotate(0deg)");
		$(".webs").css("opacity","1");
		$(".uncancel").css("opacity","1");
}
App={
	button:"#category0",
	button1:"#category1",
	name:"#lightbox2",
	_bottom:true,
	_bottom2:true,
	launch:function(){

		$(this.button).mousedown(function(){
			
			_lock2=true;
			
			if(App._bottom2==false){
				$("#menu2").hide();
				$("#category1").css({"border-bottom":"","color":""});
				App._bottom2=true;
			}
			//$("#menu").slideToggle(200);
			if(App._bottom){

				$("#category0").css({"border-bottom":"solid 2px #99cc00","color":"#99cc00"});
				showallapp();
				App._bottom=false;
			}else{
				$("#category0").css({"border-bottom":"","color":""});
				App._bottom=true;
			}
			if(App._bottom==true&&App._bottom2==true){
				_lock2=false;
			}
			//showapp();
		
		})
		$(this.button1).mousedown(function(){

			_lock2=true;
			
			if(App._bottom==false){
				$("#menu").hide();
				$("#category0").css({"border-bottom":"","color":""});
				App._bottom=true;
			}
			$("#menu2").slideToggle(200);
			if(App._bottom2){
				$("#category1").css({"border-bottom":"solid 2px #99cc00","color":"#99cc00"});
				App._bottom2=false;
			}else{
				$("#category1").css({"border-bottom":"","color":""});
				App._bottom2=true;
			}
			if(App._bottom==true&&App._bottom2==true){
				_lock2=false;
			}
			show_history();
			
		})
		$(document).mousedown(function(e){
			if(e.target.className!="cate"&&e.target.className!="mappout"&&e.target.className!="mappico"&&e.target.className!="mappname"&&e.target.className!="mappout"&&e.target.className!="his_out"&&e.target.className!="his_ico"&&e.target.className!="his_name"&&e.target.id!="menu"&&e.target.id!="menu_in"&&e.target.id!="menu2"&&e.target.id!="menu_in2"){
						App._bottom=true;
						App._bottom2=true;
						_lock2=false;
						$(".cate").css({"border-bottom":"","color":""});
						$("#menu").slideUp(200);
						$("#menu2").slideUp(200);
				}
		})
	}
}
function hidemenu(){
	App._bottom=true;
	App._bottom2=true;
	_lock2=false;
	$(".cate").css({"border-bottom":"","color":""});
	$("#menu").hide();
	$("#menu2").hide();
}
function show_history(){
	chrome.history.search({"text":"","maxResults":100},function(arr){
		$("#menu_in2").children().remove();
		$("#menu_in2").append('<div class="his_out" type="3" his_url="chrome://history/"><img src="img/history.png" class="his_ico" /><span class="his_name" style="color:#99CC00;">'+chrome.i18n.getMessage("manage_his")+'</span></div>');

		for (var i = 0; i < arr.length; i++) {
			
			$("#menu_in2").append('<div class="his_out" type="2" his_url="'+arr[i].url+'"><img src="https://www.google.com/s2/favicons?domain='+arr[i].url+'" class="his_ico" ico="'+arr[i].url+'"/><span class="his_name">'+arr[i].title+'</span></div>');
			
		};
	})
}
//获取更大的应用图标
function bigger(a){
	if(a[5]){
		return 5
	}
	else if(a[4]){
		return 4;
	}
	else if (a[3]) {
		return 3;
	}
	else if (a[2]) {
		return 2;
	}
	else if(a[1]){
		return 1;
	}
	else if(a[0]){
		return 0;
	}
	else{
		return 6;
	}

}
function allblur(){
	$("#all,.book,#left_top,#right_top,.other").css('-webkit-filter', 'blur(10px)');
}
function cancelblur(){
	$("#all,.book,#left_top,#right_top,.other").css('-webkit-filter', '');
}
function showallapp(){
	var lay=new Layer();
	var obj=lay.create();
	
	var div='<div style="position:absolute;width:100px;height:200px;z-index:11;top:0px;right:0px;"><div id="allappquit"></div></div>';
		div+='<div id="appmain"></div>';
		div+='<div class="appbutton" id="appbuttonleft"></div><div id="appbuttonright" class="appbutton"></div>';
		div+='<div class="appb" id="appleft"></div><div id="appright" class="appb"></div>';
	$(obj).append(div);
		$(obj).hide();
		$(obj).fadeIn();
		$(obj).css('background-color', 'rgba(29, 29, 29, 0.4)');
		$("#main").css('opacity', '0');
		auto_zoom('#appmain');
		showapp();
		appslide(obj,"#appcontent");
	$("#allappquit").live('click', function(event) {
		/* Act on the event */
		$("#main").css('opacity', '1');
		$("#main").hide();
		$("#main").fadeIn(100);
		$(obj).fadeOut(function(){
			lay.cancel();

		});
		
	});
	

}
//加载app
function showapp(){
		chrome.management.getAll(function(app){
			var sapp=[];
			for (var i = 0; i < app.length; i++) {
				if(app[i].isApp){
					sapp.push(app[i]);
				}
			};
			var app=[];
			app=sapp;
			var appnum=parseInt((app.length+1)/18);
			$("#appmain").append('<div id="appcontent" w="'+(appnum+1)*962+'" style="width:'+(appnum+1)*962+'px;height:480px;margin-left:0px;"></div><div style="position:absolute;height:30px;bottom:0px;left:0px;width:962px;" ><div id="apppointer" style="width:auto;height:30px;"></div></div>');
			$("#apppointer").css('margin-left',(962-(appnum+1)*60)/2+'px');
			for (var i = 0; i <appnum+1; i++) {
				if(i==0){
					var bgcolor="#33B5E5";
				}else{
					var bgcolor="rgba(97, 97, 97, 0.7)";
				}
				$("#appcontent").append('<div style="width:962px;height:480px;float:left;" id="appicon'+i+'"></div>');
				$("#apppointer").append('<div p="'+i+'" id="appcircle'+i+'" class="appcircle" style="width:20px;height:20px;border-radius:15px;float:left;background-color:'+bgcolor+';cursor:pointer;margin-left:20px;margin-right:20px;"></div>');
			};
			var j=0;
			for (var i = 0; i < app.length; i++) {
				if(parseInt((i+2)/18)>j){
					j++;
				}
				try{
					if(app[i].isApp){
							if(typeof(app[i].icons)=="undefined"){
								var bgurl="app.png";
								if(!app[i].enabled){
									var bgurl="img/app0.png";
									var enable="false";
								}
								if(app[i].enabled){
									var bgurl="img/app.png";
									var enable="true";
								}
							}
							else{
								var x=bigger(app[i].icons)
								if(!app[i].enabled){
									var bgurl=app[i].icons[x].url+"?grayscale=true";
									var enable="false";
								}
								if(app[i].enabled){
									var bgurl=app[i].icons[x].url;
									var enable="true";
								}
							}	
							var appdiv='';
							if(i==0){
								appdiv+='<div class="appdivout" appid="null" url="chrome://apps/">';
									appdiv+='<div class="appdivico" style="background-image:url(img/app2.png);"></div>';
									appdiv+='<div class="appdivname">'+chrome.i18n.getMessage("app")+'</div>';
								appdiv+='</div>';
								appdiv+='<div class="appdivout" appid="null" url="https://chrome.google.com/webstore?utm_source=chrome-ntp-icon">';
									appdiv+='<div class="appdivico" style="background-image:url(img/1.png);"></div>';
									appdiv+='<div class="appdivname">Chrome App Store</div>';
								appdiv+='</div>';
							}
								appdiv+='<div class="appdivout" appid="'+app[i].id+'">';
									appdiv+='<div class="appdivico" style="background-image:url('+bgurl+');"></div>';
									appdiv+='<div class="appdivname">'+app[i].name+'</div>';
								appdiv+='</div>';
							$("#appicon"+j).append(appdiv);
							
							}
						}
						catch(err){
							
						}

			}
			
		});

}
function appset(){
	$(".appdivout").live('mousedown', function(e) {
		/* Act on the event */
		if(e.which=="3"){
			var appid=$(this).attr("appid");
			var j=this;
			if(appid=="null"){
				var menu1=new Context(e,j,"appid",[chrome.i18n.getMessage("dakai")]);
					menu1.click("0",function(){
						var url=$(j).attr("url");
						if(url.indexOf("chrome://")>=0){
							chrome.tabs.getCurrent(function(tab) {		
								var a=tab.index+1;
								chrome.tabs.create({"index":a,"url":url},function(){
									return false;
								})
							});
							return false;
						}else{
							window.open(url,_openapp);
						}
						
					})
			}else{
				chrome.management.get(appid, function(app){
						if(app.enabled==true){
							var enable=chrome.i18n.getMessage("jinyong");
						}else{
							var enable=chrome.i18n.getMessage("qiyong");
						}
						var menu=new Context(e,j,"appid",[chrome.i18n.getMessage("dakai"),enable,chrome.i18n.getMessage("xiezai")]);
							menu.click("0",function(a){
								if(app.enabled==true){
									chrome.management.launchApp(a,function(){
										return false;
									})
								}else{
									var r=confirm(chrome.i18n.getMessage("if_enable"));
									if(r==true){
										chrome.management.setEnabled(a,true, function(){
											$("#appmain").html("");
											showapp();
											chrome.management.launchApp(a,function(){
												return false;
											})
										})
									}else{
										return false;
									}
								}
								
							})
							menu.click("1",function(a) {
								chrome.management.get(a,function(){
									chrome.management.get(a, function(app){
										if(app.enabled==true){
										chrome.management.setEnabled(a,false,function(){
											$("#appmain").html("");
											showapp();
										});

										}else{
											chrome.management.setEnabled(a,true,function(){
												$("#appmain").html("");
												showapp();
											});
										}
										
									});

								})
							});
							menu.click("2",function(a) {
								chrome.management.uninstall(a,function(){
									$("#appmain").html("");
									showapp();
								})
							});
				});
			}

			
		}
	});
}
function openapp2(){
	$(".appdivout").live('mousedown', function(e) {
		if(e.which!=3){
			var appid=$(this).attr("appid");
			if(appid=="null"){
				var url=$(this).attr("url");
				if(url.indexOf("chrome://")>=0){
					chrome.tabs.getCurrent(function(tab) {		
							var a=tab.index+1;
							chrome.tabs.create({"index":a,"url":url},function(){
								return false;
							})
						});
						return false;
					}else{
						if(e.which==1){
								window.open(url,_openapp);
							}
						if(e.which==2){
							window.open(url,"_blank");
						}
					}
			}else{
				var c=e.which;
				launchapp2(appid,c);
			}
		}
	});
}
function launchapp2(a,c){
	chrome.management.get(a,function(app){
		var url=app.appLaunchUrl;
		var appid=app.id;
		var enable=app.enabled;
		if(enable==true){
			onlanuchapp(url,appid,c);
		}else{
			var r=confirm(chrome.i18n.getMessage("if_enable"));
			if(r==true){
				chrome.management.setEnabled(appid,true, function(){
					$("#appmain").html("");
					showapp();
					onlanuchapp(url,appid,c);
				})
			}else{
				return false;
			}
		}
	});
}
function onlanuchapp(url,appid,c){
	if(url){
		if(url.indexOf("chrome-extension://")>=0){
			chrome.tabs.getCurrent(function(tab) {		
				var a=tab.index+1;
				chrome.tabs.create({"index":a,"url":url},function(){
					return false;
				})
			});
			return false;
		}else{
			if(c==1){
				window.open(url,_openapp);
			}
			if(c==2){
				window.open(url,"_blank");
			}
			return false;
		}
	}else{
		chrome.management.launchApp(appid,function(){
			return false;
		})
	}
}
function appslide(a,b){
	$(a).mousewheel(function(e,r){
					e.preventDefault();	
					if($(b).is(":animated"))
						return false;
					if (r<0) {
						$(b).stop(false,true);
						apptoleft("#appcontent");
		
					}
					else {
						$(b).stop(false,true);
						apptoright("#appcontent");
					}
		})
	$("#appbuttonleft").mousedown(function(event) {
		apptoright("#appcontent");
	});
	$("#appbuttonright").mousedown(function(event) {
		apptoleft("#appcontent");
	});
	$(".appcircle").live("mousedown",function(e) {
		var p=$(this).attr("p");
			p=parseInt(p);
			var mf=p*(-962);
			Slide.slideTo(b,mf,450);
			$(".appcircle").css("background-color","rgba(97, 97, 97, 0.7)");
			$("#appcircle"+p).css("background-color","#33B5E5");
	});
}
function apptoleft(a){
	$(a).stop(true,true);	
	var w=$(a).attr("w");
		w=parseInt(w);
	var n=w/962;
		n=parseInt(n);
	var m=$(a).css("margin-left");
		m=parseInt(m);
	var posi=m/-962;
		posi=parseInt(posi);
	if(posi==n-1){
		var mf=posi*(-962);
		var mr=mf-150;
		$(a).animate({marginLeft:mr+"px"},200);

		$(a).animate({marginLeft:mf+"px"},250);
	}
	if(posi<n-1){
		posi+=1;
		var mf=posi*(-962);
		Slide.slideTo(a,mf,450);
		$(".appcircle").css("background-color","rgba(97, 97, 97, 0.7)");
		$("#appcircle"+posi).css("background-color","#33B5E5");
	}
	
	
	return false;
}
function apptoright(a){
	$(a).stop(true,true);	
	var m=$(a).css("margin-left");
		m=parseInt(m);
	var posi=m/-962;
		posi=parseInt(posi);
	if(posi==0){
		$(a).animate({marginLeft:"150px"},200);

		$(a).animate({marginLeft:"0px"},250);
	}
	if(posi>0){
		posi-=1;
		var mf=posi*(-962);
		Slide.slideTo(a,mf,450);
		$(".appcircle").css("background-color","rgba(97, 97, 97, 0.7)");
		$("#appcircle"+posi).css("background-color","#33B5E5");
	}

	
	return false;
}

//滑动动画
Slide={
	onstart:function(){
		$(document).mousedown(function(e){
			if(e.target.className=="category"){
				var o=e.target;
				var p=Slide.getPosition(o);
				var m=-p*962;
				Slide.slideTo("#contain",m,500);
				
			}
		})
	},
	//获取分类按钮对应位置
	getPosition:function(b){

			var a=$(b).attr("position");
			return a;

	},
	slideTo:function(d,f,v){
			$(d).animate({marginLeft:f+"px"},{queue:false, duration:v, easing: 'easeOutBack'});
	},
	//桌面切换动画
	SwitchingDesktops:function(){
			
		
	},
	slidetoright:function(){
		$("#left").mousedown(function(){
				toright("#contain");
				
		});
	},
	slidetoleft:function(){
		$("#right").mousedown(function(){
				toleft("#contain");
		});
	},
	mousewheel:function(){
		$("#all").mousewheel(function(e,r){
				if(_lock2==false){
					e.preventDefault();	
					if($("#contain").is(":animated"))
						return false;
					if (r<0) {
						$("#contain").stop(false,true);
						toleft("#contain");
		
					}
					else {
						$("#contain").stop(false,true);
						
						toright("#contain");
					}
				}
		})
	}
}
function toleft(a){
	$(a).stop(true,true);	
	var w=$(a).attr("w");
		w=parseInt(w);
	var n=w/962;
		n=parseInt(n);
	var m=$(a).css("margin-left");
		m=parseInt(m);
	var posi=m/-962;
		posi=parseInt(posi);
	if(posi==n-1){
		var mf=posi*(-962);
		var mr=mf-150;
		$(a).animate({marginLeft:mr+"px"},200);

		$(a).animate({marginLeft:mf+"px"},250);
	}
	if(posi<n-1){
		posi+=1;
		var mf=posi*(-962);
		Slide.slideTo(a,mf,450);
		$(".category").css({"border-bottom":"","color":""});
		$("#cate"+posi).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
	}
	
	
	return false;
				
}
function toright(a){
	$(a).stop(true,true);	
	var m=$(a).css("margin-left");
		m=parseInt(m);
	var posi=m/-962;
		posi=parseInt(posi);
	if(posi==0){
		$(a).animate({marginLeft:"150px"},200);

		$(a).animate({marginLeft:"0px"},250);
	}
	if(posi>0){
		posi-=1;
		var mf=posi*(-962);
		Slide.slideTo(a,mf,450);
		$(".category").css({"border-bottom":"","color":""});
		$("#cate"+posi).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
	}

	
	return false;
}

//底部按钮标记
function mark(){
	$(document).mousedown(function(e){
		if(e.target.className=="category"){
			$(".category").css({"border-bottom":"","color":""});
			$(e.target).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
		}
	})
}
//底部始终居中
function center(){
	var l=$("#foot").children().length-_thenum;//
	if(l<9){
		var w=l*120;
		var m=(960-w)/2;
		$("#category0").css("margin-left",m);
		$("#menu,#menu2").css("left",m);
	}else{
		$("#category0").css("margin-left","0px");
		$("#menu,#menu2").css("left","0px");
	}
	
}
//删除一条历史记录
function dele_history(obj){
	var his_url=$(obj).attr("his_url");
	chrome.history.deleteUrl({"url":his_url},function(){
		$(obj).remove();

	});	
}
//创建新的页面
function creat_desk(){
	$("#category_add").mousedown(function(){
		var n=$("#foot").children().length-5;
		if(n>=14){
			alert(chrome.i18n.getMessage("limit_alert"));
			return false;
		}
		var m=-n*962;
		var c={
				"deskname":chrome.i18n.getMessage("favorite"),
				"icons":[
						
				]
			}		
		var json=localStorage.sites;
		var newtab=JSON.parse(json);
		if(newtab.length>=14){
			var leng=newtab.length-1;
			newtab[leng]=c;
		}else{
			newtab.push(c);
		}
		var s=JSON.stringify(newtab);
			localStorage.sites=s;
		$("#contain").children().remove();
		$(".category").remove();
		load();
		$(".category").css({"border-bottom":"","color":""});
		$("#cate"+n).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
		Slide.slideTo("#contain",m,500);
		sync();
	})
}
function dele_desk(){
	$(document).mousedown(function(e){
		if(e.target.className=="category"){
			if(e.which==3){
				var x=e.clientX;
				var y=e.clientY;
				var n=$("#foot").children().length-5;
				var p=$(e.target).attr("position");
				$("#contentmenu").remove();
				if(p=="0"){
					var div_in='<div class="option" style="color:#ccc;" id="delete_desk">'+chrome.i18n.getMessage("delete_desk")+'</div><div class="option" id="desk_rename">'+chrome.i18n.getMessage("rename_desk")+'</div><div class="option"  style="color:#ccc;">'+chrome.i18n.getMessage("forward_desk")+'</div><div class="option" style="color:#ccc;">'+chrome.i18n.getMessage("backward_desk")+'</div>';					
				}else if(p==1&&p==n-1){
					var div_in='<div class="option" id="delete_desk">'+chrome.i18n.getMessage("delete_desk")+'</div><div class="option" id="desk_rename">'+chrome.i18n.getMessage("rename_desk")+'</div><div class="option" style="color:#ccc;">'+chrome.i18n.getMessage("forward_desk")+'</div><div class="option" style="color:#ccc;">'+chrome.i18n.getMessage("backward_desk")+'</div>';
				}
				else if(p==1){
					var div_in='<div class="option" id="delete_desk">'+chrome.i18n.getMessage("delete_desk")+'</div><div class="option" id="desk_rename">'+chrome.i18n.getMessage("rename_desk")+'</div><div class="option" style="color:#ccc;">'+chrome.i18n.getMessage("forward_desk")+'</div><div id="movebackward" class="option">'+chrome.i18n.getMessage("backward_desk")+'</div>';
				}else if(p==n-1){
					var div_in='<div class="option" id="delete_desk">'+chrome.i18n.getMessage("delete_desk")+'</div><div class="option" id="desk_rename">'+chrome.i18n.getMessage("rename_desk")+'</div><div id="moveforward" class="option">'+chrome.i18n.getMessage("forward_desk")+'</div><div class="option" style="color:#ccc;">'+chrome.i18n.getMessage("backward_desk")+'</div>';					

				}else{
					var div_in='<div class="option" id="delete_desk">'+chrome.i18n.getMessage("delete_desk")+'</div><div class="option" id="desk_rename">'+chrome.i18n.getMessage("rename_desk")+'</div><div class="option" id="moveforward">'+chrome.i18n.getMessage("forward_desk")+'</div><div id="movebackward" class="option">'+chrome.i18n.getMessage("backward_desk")+'</div>';					
				}
				var div='<div id="contentmenu" posi="'+p+'">'+div_in+'</div>';
				$("body").append(div);
				$("#contentmenu").css({"top":y-180,"left":x});
			}
		}
	})
	$(document).mousedown(function(e){
		if(e.which==3){
			if(e.target.id!="contentmenu"&&e.target.className!="category"&&e.target.className!="option"){
				$("#contentmenu").remove();
			}
		}else{
			if(e.target.id!="contentmenu"&&e.target.className!="option"){
				$("#contentmenu").remove();
			}
		}
	})
	$(document).mousedown(function(e){
		if(e.target.id=="delete_desk"){
			var obj=e.target.parentNode;
			var p=$(obj).attr("posi");
				p=parseInt(p);
			if(p==0){
				return false;
			}
			var json=localStorage.sites;
			var newtab=JSON.parse(json);
				newtab.splice(p,1);
			var s=JSON.stringify(newtab);
				localStorage.sites=s;
			$("#contain").children().remove();
			$(".category").remove();
			load();
			$(".category").css({"border-bottom":"","color":""});
			$("#cate"+(p-1)).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
			Slide.slideTo("#contain",-(p-1)*962,420);
			$("#contentmenu").remove();
			sync();
			return false;

		}
	})
}


function rename(){
	$(document).mousedown(function(e){
		if(e.target.id=="desk_rename"){
			var obj=e.target.parentNode;
			var p=$(obj).attr("posi");
				p=parseInt(p);
			var t=$("#cate"+p).text();
			$("#cate"+p).append('<input value="'+t+'" id="d_input" checked="checked" class="desk_input"/>');
			
			$("#contentmenu").remove();
			$("#d_input")[0].focus();
			$("#d_input").attr("focus","true");
			return false;
		}
	})
	$(document).mousedown(function(e){

		if(e.target.className!="desk_input"&&e.target.id!="desk_rename"){
			try{
				var f=$("#d_input").attr("focus");
				if(f=="true"){
					var t=$("#d_input").val();
					var s=$($("#d_input")[0].parentNode).attr("position");
						s=parseInt(s);

					var json=localStorage.sites;
					var newtab=JSON.parse(json);
						newtab[s].deskname=t;
					var q=JSON.stringify(newtab);
						localStorage.sites=q;
					$($("#d_input")[0].parentNode).text(t);
					$("#d_input").remove();
					sync();
				}
			}catch(e){

			}
		}
	})
	
}



function open_history(){
	$(document).mousedown(function(e){
		if(e.which==1||e.which==2){
			if(e.target.className=="his_out"||e.target.className=="his_ico"||e.target.className=="his_name"){
				if(e.target.className=="his_ico"||e.target.className=="his_name"){
					var obj=e.target.parentNode;

				}else{
					var obj=e.target;
				}
				var url=$(obj).attr("his_url");
				var type=$(obj).attr("type");
				if(type=="3"){
					chrome.tabs.getCurrent(function(tab) {		
						var a=tab.index+1;
						chrome.tabs.create({"index":a,"url":"chrome://history/"},function(){
							hidemenu();
							return false;
						})
					});
					
				}
				if(type=="2"){
					hidemenu();
					if(e.which==1){
						window.open(url,_opensite);
					}
					if(e.which==2){
						window.open(url,"_blank");
					}
				}
			}
		}
	})
}
function opensite(){
	$(document).click(function(e){
		if(rota==true){
			return false;
		}
		if(e.target.className=="webs"||e.target.className=="name"||e.target.className=="favicon"||e.target.className=="webs uncancel"){
			if(e.target.className=="name"||e.target.className=="favicon"){
				var obj=e.target.parentNode;
			}else{
				var obj=e.target;
			}
			var url=$(obj).attr("url");
			if(url==""){
				var appid=$(obj).attr("appid");
				chrome.management.get(appid, function(app){
					var enable=app.enabled;
						if(enable==true){

							chrome.management.launchApp(appid,function(){
									return false;
							})
						}else{
							var j=$(obj).index();
							var i=$(obj.parentNode).index();
							var data=localStorage.sites;
							var newtab=JSON.parse(data);
							var r=confirm(chrome.i18n.getMessage("if_enable"));
								if(r==true){
									
									var appid1=newtab[i].icons[j].appid;
									chrome.management.setEnabled(appid1,true, function(){
											newtab[i].icons[j].enable="true";
											chrome.management.get(appid1, function(app){
												var x=bigger(app.icons);
												var appico=app.icons[x].url;
												newtab[i].icons[j].ico=appico;
												var s=JSON.stringify(newtab);
												localStorage.sites=s;
												$("#contain").children().remove();
												$(".category").remove();
												load();
												$(".category").css({"border-bottom":"","color":""});
												$("#cate"+i).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
												chrome.management.launchApp(appid1,function(){
														return false;
												})
											})
											
									});

									
								}else{
									return false;
								}
						}
						
					return false;
				})
				return false;
			}
			if(url.indexOf("chrome-extension://")>=0){
				var appid=$(obj).attr("appid");
				chrome.management.get(appid, function(app){
					var enable=app.enabled;
					if(enable==true){
						chrome.tabs.getCurrent(function(tab) {		
								var a=tab.index+1;
								chrome.tabs.create({"index":a,"url":url},function(){
									return false;
								})
							});
						return false;
					}else{
						var j=$(obj).index();
						var i=$(obj.parentNode).index();
						var data=localStorage.sites;
						var newtab=JSON.parse(data);
						var r=confirm(chrome.i18n.getMessage("if_enable"));
							if(r==true){
								
								var appid2=newtab[i].icons[j].appid;
								chrome.management.setEnabled(appid2,true, function(){
										newtab[i].icons[j].enable="true";
										chrome.management.get(appid2, function(app){
											var x=bigger(app.icons);
											var appico=app.icons[x].url;
											newtab[i].icons[j].ico=appico;
											var s=JSON.stringify(newtab);
											localStorage.sites=s;
											$("#contain").children().remove();
											$(".category").remove();
											load();
											$(".category").css({"border-bottom":"","color":""});
											$("#cate"+i).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
											chrome.tabs.getCurrent(function(tab) {		
												var a=tab.index+1;
												chrome.tabs.create({"index":a,"url":url},function(){
													return false;
												})
											});
											return false;
										})
										
								});

								
							}else{
								return false;
							}
						return false;
					}
				})
				return false;
			}
			if(url.indexOf("chrome://")>=0){
				chrome.tabs.getCurrent(function(tab) {		
						var a=tab.index+1;
						chrome.tabs.create({"index":a,"url":url},function(){
							return false;
						})
					});
				return false;
			}
			if(e.which==1){
				window.open(url,_opensite);
			}
			if(e.which==2){
				window.open(url,"_blank");
			}
		}
	})
}







function movedesk(){
	$(document).mousedown(function(e){
		if(e.target.id=="moveforward"||e.target.id=="movebackward"){
			var p=$(e.target.parentNode).attr("posi");
				p=parseInt(p);
			var json=localStorage.sites;
			var newtab=JSON.parse(json);
			var one=newtab[p];

				
			if(e.target.id=="moveforward"){
				newtab.splice(p,1);
				newtab.splice(p-1,0,one);
				var t=p-1;
			}

			if(e.target.id=="movebackward"){
				newtab.splice(p+2,0,one);
				newtab.splice(p,1);
				var t=p+1;
			}
			var s=JSON.stringify(newtab);
				localStorage.sites=s;
			$("#contain").children().remove();
			$(".category").remove();
			load();
			$(".category").css({"border-bottom":"","color":""});
			$("#cate"+t).css({"border-bottom":"solid 2px #00A0E9","color":"#00A0E9"});
			Slide.slideTo("#contain",-t*962,0);
			$("#contentmenu").remove();
			return false;
		}
	})
}

function drag(){
	var a=document;
		a.ondragstart=function(e){
			if(e.target=="webs_out"){
				var obj=e.target;
			}
			if(e.target.className=="webs"||e.target.className=="webs uncancel"||e.target.className=="favicon"||e.target.className=="name"){
				if(e.target.className=="webs"||e.target.className=="webs uncancel"){
					var obj=e.target.parentNode;
				}
				if(e.target.className=="favicon"||e.target.className=="name"){
					var obj=e.target.parentNode.parentNode;
				}
				var sn=$(obj).index();
				var icos=obj.parentNode;
				var desk=$(icos).index();
				var c=icos.childNodes[sn];
				
		}
				obj.ondrag=function(e){
					$(obj).hide();
					if(!($("#drag0").length>0)){
						$(c).before('<div class="webs_out" id="drag0"><div class="webs"  style="border:dotted 1px #99CC00;background-color:transparent;"></div></div>');
					}
				}
				obj.ondragend=function(){
					$(obj).insertAfter("#drag0");
                    $(obj).show();
                    $("#drag0").remove();
                    var en=$(obj).index();
                    var data=localStorage.sites;
					var webs=JSON.parse(data);
					var one=webs[desk].icons[sn];
						webs[desk].icons.splice(sn,1);
						webs[desk].icons.splice(en,0,one);
					var s=JSON.stringify(webs);
						localStorage.sites=s;
					}
		}
		a.ondragover=function(e){
			e.preventDefault();
			if(e.target=="webs_out"){
				var obj=e.target;
			}
			if(e.target.className=="webs"||e.target.className=="webs uncancel"||e.target.className=="favicon"||e.target.className=="name"){
				if(e.target.className=="webs"||e.target.className=="webs uncancel"){
					var obj=e.target.parentNode;
				}
				if(e.target.className=="favicon"||e.target.className=="name"){
					var obj=e.target.parentNode.parentNode;
				}
				var m=$(obj).index();
                var n=$("#drag0").index();
                if(m>n){
                    $("#drag0").insertAfter(obj);
                }
                if(m<n){
                    $("#drag0").insertBefore(obj);
                }
				
		}
		}
}
function select_icon(){
	$("#select_icons").change(function(){
		var value=$(this).val();
		if(value=="select1"){
			$("#allicons").children().remove();
			$("#finish").attr("icontype","0");
			$("#addapp").css('height', '250px');
			$("#addbox").animate({height:"340px"},300);
			$("#pop_site_content").css('height', '240px');
		}
		if(value=="select2"){
			$("#finish").attr("icontype","1");
			$("#allicons").children().remove();
			for (var i = 0; i <168; i++) {
				$("#allicons").append('<div class="smallicon" id="smallicon'+i+'" img="ico/'+i+'.png" style="background-image:url(ico/'+i+'.png)"></div>');

			};
			$("#addbox").animate({height:"425px"},300);
			$("#allicons").hide();
			$("#allicons").slideDown(300);
			$("#addapp").css('height', '322px');
			$("#pop_site_content").css('height', '322px');
			$("#smallicon0").css("border","2px solid rgba(153, 204, 0, 1)");
			$("#finish").attr("icoimg","ico/0.png");
		}
	})
	$(".smallicon").live("mousedown",function(e){
		$(".smallicon").css("border","");
		$(e.target).css("border","2px solid rgba(153, 204, 0, 1)");
		var img=$(e.target).attr("img");
		$("#finish").attr("icoimg",img);
	})
}
function upfirst(str) {
	var str = str.toLowerCase();
	str = str.replace(/\b\w+\b/g, function(word){
	    return word.substring(0,1).toUpperCase()+word.substring(1);
	})
	return str;
}
function randcolor(){
	var r=Math.random()*255; 
		r=parseInt(r);
	var g=Math.random()*255;
		g=parseInt(g);
	var b=Math.random()*255;
		b=parseInt(b);
	var rgb='rgb('+r+','+g+','+b+')';
	return rgb;
}
