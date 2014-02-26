//这个页面有很多自定义的类，使用这些类可以很容易的创建一些常用的UI组件
//获取时间，用于生成随机id
function randomChar(l) {
 var x="123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
 var tmp="";
 for(var i=0;i< l;i++) {
 tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
 }
 return tmp;
}
function getTime() {
	var d = new Date();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	var day = d.getDate();
	var h = d.getHours();
	var minu = d.getMinutes();
	var sec = d.getSeconds();
	var rand = randomChar(20);
	var thedate = "" + year + month + day + h + minu + sec + rand;
	return thedate;
}
//创建一个半透明层
function Warn(a) {
	if (a) {
		this.text = a;
	} else {
		this.text = "";
	}

	this.show = function(l) {
		$("#warn_lightbox").remove();
		$("body").append('<div id="warn_lightbox" style="width:100%;height:100%;position:fixed;z-index:2000;background-color:rgba(97, 97, 97, 0)"></div>');
		var warn = '<div id="warn" style="width:440px;height:140px;background-color:#fdfdfd;padding:30px;border-radius:2px;position:absolute;top:50%;left:50%;margin-top:-120px;margin-left:-250px;box-shadow: rgba(73, 73, 73, 1) 0px 0px 30px;"><div style="width:440px;height:80px;overflow-y:scroll;overflow-x:hidden;"><p style="color:#FF4444;">' + this.text + '</p></div><div style="padding:5px 30px;width:auto;height:auto;font-size:20px;float:right;color:#fdfdfd;background-color:#FFBB33;cursor:pointer;margin-top:20px;" id="warn_button">' + chrome.i18n.getMessage("edit_ok") + '</div></div>';
		$("#warn_lightbox").append(warn);
		$("#warn_lightbox").mousedown(function(event) {
			/* Act on the event */
			return false;
		});
		$("#warn_button").mouseover(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#FF8800");
		});
		$("#warn_button").mouseout(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#FFBB33");
		});
		$("#warn_button").mousedown(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#FFBB33");
		});
		$("#warn_button").mouseup(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#FF8800");
		});

		$("#warn_button")[0].onclick = function() {
			$("#warn_lightbox").remove();
			try {
				l();
			} catch (e) {

			}

		}
	}

}

function Choose(a, b, c) {
	if (a) {
		this.text = a;
	} else {
		this.text = "";
	}
	if (b) {
		this.b = b;
	} else {
		this.b = "";
	}
	if (c) {
		this.c = c;
	} else {
		this.c = "";
	}
	this.show = function(l) {
		$("#warn_lightbox").remove();
		$("body").append('<div id="warn_lightbox" style="width:100%;height:100%;position:fixed;z-index:200;background-color:rgba(97, 97, 97, 0)"></div>');
		var warn = '<div id="warn" style="width:440px;height:140px;background-color:#fdfdfd;padding:30px;border-radius:2px;position:absolute;top:50%;left:50%;margin-top:-120px;margin-left:-250px;box-shadow: rgba(73, 73, 73, 1) 0px 0px 30px;"><div style="width:440px;height:80px;overflow-y:scroll;overflow-x:hidden;"><p style="color:#33B5E5;">' + this.text + '</p></div><div style="padding:5px 30px;width:auto;height:auto;font-size:20px;float:left;color:#fdfdfd;background-color:#99CC00;cursor:pointer;margin-top:20px;" id="warn_button">' + this.b + '</div><div style="padding:5px 30px;width:auto;height:auto;font-size:20px;float:left;color:#fdfdfd;background-color:#99CC00;cursor:pointer;margin-top:20px;margin-left:30px;" id="warn_button2">' + this.c + '</div></div>';
		$("#warn_lightbox").append(warn);
		$("#warn_lightbox").mousedown(function(event) {
			/* Act on the event */
			return false;
		});
		$("#warn_button").mouseover(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#669900");
		});
		$("#warn_button").mouseout(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#99CC00");
		});
		$("#warn_button").mousedown(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#99CC00");
		});
		$("#warn_button").mouseup(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#669900");
		});

		$("#warn_button")[0].onclick = function() {
			$("#warn_lightbox").remove();
			try {
				l(1);
			} catch (e) {

			}

		}
		$("#warn_button2").mouseover(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#669900");
		});
		$("#warn_button2").mouseout(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#99CC00");
		});
		$("#warn_button2").mousedown(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#99CC00");
		});
		$("#warn_button2").mouseup(function(event) {
			/* Act on the event */
			$(event.target).css("background-color", "#669900");
		});

		$("#warn_button2")[0].onclick = function() {
			$("#warn_lightbox").remove();
			try {
				l(2);
			} catch (e) {

			}

		}
	}

}

function Layer() {
	//默认参数
	this.width = "100%";
	this.height = "100%";
	this.z_index = "100";
	this.background_color = "rgba(97, 97, 97, 0.3)";
	//create方法用于创建此层，必须的
	this.create = function() {
		var theid = "lightbox" + getTime();
		$("body").append('<div id="' + theid + '" style="width:' + this.width + ';height:' + this.height + ';position:fixed;z-index:' + this.z_index + ';background-color:' + this.background_color + '"></div>');
		var obj = $("#" + theid);
		this.a = obj;
		return obj[0];
	}
	//cancel方法用于移除此层
	this.cancel = function() {
		$(this.a).remove();
	}
}

function Wait(a) {
	//默认参数
	if (typeof(a) == "undefined" || a == "auto") {
			this.text ="";
	} else {
			this.text= a;
	}
	this.width = "100%";
	this.height = "100%";
	this.z_index = "1000";
	this.background_color = "rgba(97, 97, 97, 0.3)";
	//create方法用于创建此层，必须的
	this.show = function() {
		var theid = "lightbox" + getTime();
		var div = '<div id="' + theid + '" style="width:' + this.width + ';height:' + this.height + ';position:fixed;z-index:' + this.z_index + ';background-color:' + this.background_color + '">';
			div+='<div style="width:1000px;height:200px;position:absolute;top:50%;left:50%;margin-left:-300px;margin-top:-100px;line-height:200px;color:#33B5E5;font-size:38px;"><img style="width:100px;height:100px;float:left;margin-top:50px;margin-right:100px;" src="img/blue.gif" />'+this.text+'</div>';
		div += '</div>';
		$("body").append(div);
		var obj = $("#" + theid);
		this.a = obj;
		return obj[0];
	}
	//cancel方法用于移除此层
	this.remove = function() {
		$(this.a).remove();
	}
}

function Pop(a, b, c, d) {
	//a,b,c,d分别是宽（int），高（int），id（String），菜单（array）
	// 如果使用默认值则使用auto代替
	try {
		if (typeof(a) == "undefined" || a == "auto") {
			this.width = 600;
		} else {
			this.width = a;
		}
		if (typeof(b) == "undefined" || b == "auto") {
			this.height = 360;
		} else {
			this.height = b;
		}
		if (typeof(c) == "undefined" || c == "auto") {

			this.id = getTime();
		} else {
			this.id = c;
		}
		if (typeof(d) == "undefined" || d == "auto") {
			this.menu = [];
		} else {
			this.menu = d;
		}
		var ml = 0 - (this.width + 60) / 2;
		ml += "px";
		var mt = 0 - (this.height + 5) / 2;
		mt += "px";
		var div = '<div id="' + this.id + '" style="position:absolute;width:' + this.width + 'px;height:' + this.height + 'px;padding:0 30px 5px 30px;left:50%;top:50%;background-color:#fdfdfd;margin-left:' + ml + ';margin-top:' + mt + ';box-shadow: rgba(73, 73, 73, 1) 0px 0px 30px;">';
		div += '<div id="' + this.id + '_top" style="position:absolute;top:0px;left:0px;width:' + (this.width + 60) + 'px;height:30px;">';
		div += '<div id="' + this.id + '_close" style="width:50px;height:30px;float:right;background-image:url('+__Global_img_closex+');background-color:#FF4444;background-size:100% 100%;"></div>';
		for (var i = 0; i < this.menu.length; i++) {
			if (i == 0) {
				div += '<div focus="true" id="' + this.id + '_menu' + i + '" class="' + this.id + '_menu" with="#' + this.id + '_content' + i + '" style="font-size:16px;border-bottom:2px solid #0099CC;margin-left:30px;cursor:pointer;color:#0099CC;float:left;padding:3px 10px;">' + this.menu[i] + '</div>';
			} else {
				div += '<div focus="false" id="' + this.id + '_menu' + i + '" class="' + this.id + '_menu" with="#' + this.id + '_content' + i + '" style="font-size:16px;margin-left:5px;cursor:pointer;color:#33B5E5;float:left;padding:3px 10px;">' + this.menu[i] + '</div>';
			}

		};
		div += '</div>';
		div += '<div style="width:' + this.width + 'px;height:' + (this.height - 100) + 'px;position:relative;margin-top:40px;">';
		for (var i = 0; i < this.menu.length; i++) {
			if (i == 0) {
				div += '<div class="' + this.id + '_content" id="' + this.id + '_content' + i + '" style="width:' + this.width + 'px;height:' + (this.height - 100) + 'px;position:absolute;overflow-y:scroll;"></div>';
			} else {
				div += '<div class="' + this.id + '_content" id="' + this.id + '_content' + i + '" style="display:none;width:' + this.width + 'px;height:' + (this.height - 100) + 'px;position:absolute;overflow-y:scroll;"></div>';
			}

		};
		div += '</div>';
		div += '<div id="' + this.id + '_bottom" style="width:' + this.width + 'px;height:50px;margin-top:10px;"></div>';
		div += '</div>';

		//insert方法将此交互框插入到父对象中，同时返回此对象
		this.insert = function(e) {
			$(e).append(div);
			var close = document.getElementById(this.id + "_close");
			$(close).mouseover(function(event) {
				$(close).css('background-color', '#CC0000');
			});
			$(close).mouseout(function(event) {
				$(close).css('background-color', '#FF4444');
			});
			$(close).mousedown(function(event) {
				$(close).css('background-color', '#FF4444');
			});
			$(close).mouseup(function(event) {
				$(close).css('background-color', '#CC0000');
			});
			var menu_class = '.' + this.id + '_menu';
			var content = '.' + this.id + '_content';
			$(menu_class).mousemove(function(event) {
				$(this).css('color', '#0099CC');
			});
			$(menu_class).mouseout(function(event) {
				var focus = $(this).attr("focus");
				if (focus == "true") {
					return false;
				} else {
					$(this).css('color', '#33B5E5');
				}

			});
			$(menu_class).mousedown(function(event) {
				$(menu_class).css('color', '#33B5E5');
				$(menu_class).css('border-bottom', '');
				$(menu_class).attr('focus', 'false');
				$(this).css('color', '#0099CC');
				$(this).css('border-bottom', '#0099CC solid 2px');
				$(this).attr('focus', 'true');
				var obj = $(this).attr("with");
				$(content).hide(500, 'easeOutBack');
				$(obj).show(500, 'easeOutBack');

			});
			return document.getElementById(this.id);

		}
		//getContent方法返回内部可用于写入内容的对象，跟插入菜单数量相对应，如果有3个菜单，则对应的操作框有getContent(0),getContent(1),getContent(2)
		this.getContent = function(a) {
			//int a
			var theid = this.id + '_content' + a;
			return document.getElementById(theid);
		}
		this.getMenu = function(a) {
			//int a
			var theid = this.id + '_menu' + a;
			return document.getElementById(theid);
		}
		//获取底部框对象
		this.getBottom = function() {
			var _id = this.id + '_bottom';
			return document.getElementById(_id);
		}
		//cancel方法移除此Pop对象
		this.cancel = function() {
			$('#' + this.id).remove();
		}
		//close方法通过回调函数执行关闭
		this.close = function(a) {
			var close = document.getElementById(this.id + "_close");
			close.onclick = function() {
				a();
			}
		}
		this.lock = function(a) {
			var ele = document.getElementById(this.id);
			var div = '<div id="' + this.id + '_lock" style="position:absolute;width:' + (this.width + 60) + 'px;height:' + (this.height + 5) + 'px;top:0px;left:0px;background-color:rgba(97, 97, 97, 0.3);z-index:10;">';
			div += '<div style="position:absolute;width:400px;height:128px;top:50%;left:50%;margin-left:-200px;margin-top:-64px;">';
			div += '<div style="position:absolute;width:270px;height:30px;top:50%;margin-top:-15px;font-size:30px;color:#33B5E5;">' + a + '</div>';
			div += '<div style="position:absolute;width:128px;height:128px;left:272px;"><img src="img/blue.gif" style="width:100%;"/></div>';
			div += '</div>';
			div += '</div>'
			$(ele).append(div);
		}
		this.unlock = function() {
			var ele = document.getElementById(this.id + '_lock');
			$(ele).remove();
		}
	} catch (e) {
		return false;
	}

}

function Button(a, b, c, style, d) {
	try {
		if (typeof(a) == "undefined" || a == "auto") {
			this.button_text = "";
		} else {
			this.button_text = a;
		}
		if (typeof(b) == "undefined" || b == "auto") {
			this.theme = "green";
		} else {
			this.theme = b;
		}
		if (typeof(c) == "undefined" || c == "auto") {
			this.float = "left";
		} else {
			this.float = c;
		}
		if (typeof(style) == "undefined" || style == "auto") {
			this.style = "";
		} else {
			this.style = style;
		}
		this.lock = false;
		switch (this.theme) {
			case "green":
				this.background_color = "#99CC00";
				this.background_color_hover = "#669900";
				break;
			case "red":
				this.background_color = "#FF4444";
				this.background_color_hover = "#CC0000";
				break;
			case "orange":
				this.background_color = "#FFBB33";
				this.background_color_hover = "#FF8800";
				break;
			case "blue":
				this.background_color = "#33B5E5";
				this.background_color_hover = "#0099CC";
				break;
			case "purple":
				this.background_color = "#AA66CC";
				this.background_color_hover = "#9933CC";
				break;
			default:
				this.background_color = "#99CC00";
				this.background_color_hover = "#669900";
		}
		this.font_size = "18px";
		this.padding = "8px 25px";
		if (typeof(d) == "undefined" || d == "auto") {
			this.id = 'button' + getTime();
		} else {
			this.id = d;
		}

		//insert方法将button插入到父元素中
		var button = '<div id="' + this.id + '" style="width:auto;height:auto;float:' + this.float + ';padding:' + this.padding + ';font-size:' + this.font_size + ';color:#fdfdfd;cursor:pointer;background-color:' + this.background_color + ';' + this.style + '">' + this.button_text + '</div>';
		this.insert = function(e) {
			$(e).append(button);
			var ele = document.getElementById(this.id);
			var color = this.background_color;
			var color_hover = this.background_color_hover;
			$(ele).mouseover(function(event) {
				$(ele).css('background-color', color_hover);
			});
			$(ele).mouseout(function(event) {
				/* Act on the event */
				$(ele).css('background-color', color);
			});
			$(ele).mousedown(function(event) {
				/* Act on the event */
				$(ele).css('background-color', color);
			});
			$(ele).mouseup(function(event) {
				$(ele).css('background-color', color_hover);
			});
			return document.getElementById(this.id);
		}
		this.setlock = function() {
			this.lock = true;
		}
		this.unlock = function() {
			this.lock = false;
		}
		this.click = function(l) {
			try{
				if (!this.lock) {
					var ele = document.getElementById(this.id);
					ele.onclick = function() {
						l();
					}
				} else {
					return false;
				}
			}catch(e){
				console.log(e);
			}

		}
		this.setvalue = function(a) {
			var ele = document.getElementById(this.id);
			$(ele).text(a);
		}

	} catch (e) {

	}

}

function Input(a, id, type, pretext, style, q) {
	try {
		if (typeof(a) == "undefined" || a == "auto") {
			this.width = 400;
		} else {
			this.width = a;
		}
		if (typeof(id) == "undefined" || id == "auto") {
			this.id = 'div_input' + getTime();
		} else {
			this.id = id;
		}
		if (typeof(type) == "undefined" || type == "auto") {
			this.type = "text";
		} else {
			this.type = type;
		}
		if (typeof(pretext) == "undefined" || pretext == "auto") {
			this.pretext = "";
		} else {
			this.pretext = pretext;
		}
		if (typeof(style) == "undefined" || style == "auto") {
			this.style = "";
		} else {
			this.style = style;
		}
		if (typeof(q) == "undefined" || q == "auto") {
			this.q = "";
		} else {
			this.q = q;
		}

		var input = '<div  id="' + this.id + '" style="width:' + this.width + 'px;height:50px;position:relative;margin-left:auto;margin-right:auto;' + style + '">';
		input += '<input  id="' + this.id + '_input" type=' + this.type + ' style="color:#33B5E5;width:' + (this.width - 20) + 'px;' + this.q + 'display:block;outline:none;margin:0px;font-size:18px;padding:11px 8px;border:solid 1px #D5D5D5;" />';
		input += '<label for="' + this.id + '_input" id="' + this.id + '_label" style="color:#ddd;position:absolute;top:0px;left:0px;width:' + (this.width - 20) + 'px;height:auto;cursor:text;font-size:18px;padding:11px 8px;">' + this.pretext + '</label>';
		input += '</div>';
		this.insert = function(e) {
			$(e).append(input);

			var ele = document.getElementById(this.id + '_input');
			var id = '#' + this.id + '_label';
			var txt = this.pretext;
			ele.oninput = function() {
				$(id).text("");
				var val = $(ele).val();
				if (val == "") {
					$(id).text(txt);
				}
			}
			$(ele).blur(function(event) {
				$(ele).css('border', 'solid 1px #D5D5D5');
				var val = $(ele).val();
				if (val == "") {
					$(id).text(txt);
				}
			});
			$(ele).focus(function() {
				$(ele).css('border', 'solid 1px #99CC00');
			});
		}
		this.remove_pre = function() {
			var id = '#' + this.id + '_label';
			$(id).text("");
		}
		this.getvalue = function() {
			var ele = document.getElementById(this.id + '_input');
			var val = $(ele).val();
			return val;
		}
		this.setvalue = function(a) {
			var ele = document.getElementById(this.id + '_input');
			$(ele).val(a);
		}
		this.focus = function() {
			try {
				var ele = document.getElementById(this.id + '_input');
				ele.focus();
			} catch (e) {

			}
		}
		this.remove = function() {
			var ele = document.getElementById(this.id);
			$(ele).remove();
		}
	} catch (e) {

	}

}

//下面定义一个文件选择组件


function File_Button(a, b, c, style, d, e) {
	try {
		if (typeof(a) == "undefined" || a == "auto") {
			this.button_text = "";
		} else {
			this.button_text = a;
		}
		if (typeof(b) == "undefined" || b == "auto") {
			this.theme = "green";
		} else {
			this.theme = b;
		}
		if (typeof(c) == "undefined" || c == "auto") {
			this.width = "auto";
		} else {
			this.width = c + "px";
			this.width2 = (c + 50) + "px";
		}
		if (typeof(style) == "undefined" || style == "auto") {
			this.style = "";
		} else {
			this.style = style;
		}
		if (typeof(e) == "undefined" || e == "auto") {
			this.accept == "";
		} else {
			this.accept = e;
		}
		switch (this.theme) {
			case "green":
				this.background_color = "#99CC00";
				this.background_color_hover = "#669900";
				break;
			case "red":
				this.background_color = "#FF4444";
				this.background_color_hover = "#CC0000";
				break;
			case "orange":
				this.background_color = "#FFBB33";
				this.background_color_hover = "#FF8800";
				break;
			case "blue":
				this.background_color = "#33B5E5";
				this.background_color_hover = "#0099CC";
				break;
			case "purple":
				this.background_color = "#AA66CC";
				this.background_color_hover = "#9933CC";
				break;
			default:
				this.background_color = "#99CC00";
				this.background_color_hover = "#669900";
		}
		this.font_size = "18px";
		this.padding = "8px 25px";
		if (typeof(d) == "undefined" || d == "auto") {
			this.id = 'button' + getTime();
		} else {
			this.id = d;
		}

		//insert方法将button插入到父元素中
		var button = '<div id="file_div' + this.id + '" style="width:' + (this.width2) + ';position:relative;height:auto;float:' + this.float + ';font-size:' + this.font_size + ';cursor:pointer;' + this.style + '"><label for="file_input' + this.id + '" id="' + this.id + '" style="width:' + this.width + ';height:auto;padding:' + this.padding + ';position:absolute;z-index:1;font-size:' + this.font_size + ';color:#fdfdfd;cursor:pointer;text-align:center;background-color:' + this.background_color + ';">' + this.button_text + '</label><input id="file_input' + this.id + '" type="file" accept="' + this.accept + '" style="position:absolute;z-index:0;width:0px;"/></div>';
		this.insert = function(e) {
			$(e).append(button);
			var ele = document.getElementById(this.id);
			var color = this.background_color;
			var color_hover = this.background_color_hover;
			$(ele).mouseover(function(event) {
				$(ele).css('background-color', color_hover);
			});
			$(ele).mouseout(function(event) {
				/* Act on the event */
				$(ele).css('background-color', color);
			});
			$(ele).mousedown(function(event) {
				/* Act on the event */
				$(ele).css('background-color', color);
			});
			$(ele).mouseup(function(event) {
				$(ele).css('background-color', color_hover);
			});
			return document.getElementById(this.id);
		}
		this.click = function(l) {
			var ele = document.getElementById(this.id);
			ele.onclick = function() {
				l();
			}
		}
		this.change = function(a) {
			var ele = document.getElementById('file_input' + this.id);
			ele.onchange = function() {
				a(ele);
			}
		}
		this.clear=function(){
			var ele = document.getElementById('file_input' + this.id);
			$(ele).val("");
		}
	} catch (e) {

	}

}

function Check(a) {
	if (typeof(a.style) == "undefined") {
		this.style = "";
	} else {
		this.style = a.style;
	}
	if (typeof(a.id) == "undefined") {
		this.id = getTime();
	} else {
		this.id = a.id;
	}
	if (typeof(a.check) == "undefined") {
		this.check = "off";
	} else {
		this.check = a.check;
	}
	if (this.check == "off") {
		var position = "0px 0px";
	} else {
		var position = "-48px 0px";
	}
	var div = '<div id="' + this.id + '_checkbox" style="width:22px;height:22px;position:relative;background-image:url(img/check.png);background-position:' + position + ';' + this.style + '">';
	div += '<label id="' + this.id + '_label" check="' + this.check + '" style="width:22px;height:22px;position:absolute;top:0px;left:0px;cursor:pointer;">';
	div += '</label>';
	div += '</div>';
	this.insert = function(c) {
		$(c).append(div);
		var ch = "#" + this.id + "_label";
		var cb = "#" + this.id + "_checkbox";
		$(ch).mousemove(function(event) {
			var value = $(this).attr("check");
			if (value == "off") {
				$(cb).css('background-position', '-24px 0px');
			}

		});
		$(ch).mouseout(function(event) {
			var value = $(this).attr("check");
			if (value == "off") {
				$(cb).css('background-position', '0px 0px');
			}
		});
		$(ch).click(function(event) {
			var value = $(this).attr("check");
			if (value == "on") {
				$(this).attr("check", "off");
				$(cb).css('background-position', '0px 0px');
			}
			if (value == "off") {
				$(this).attr("check", "on");
				$(cb).css('background-position', '-48px 0px');
			}
		});
	}
	this.seton = function() {
		var ch = "#" + this.id + "_label";
		var cb = "#" + this.id + "_checkbox";
		$(ch).attr("check", "on");
		$(cb).css('background-position', '-48px 0px');
	}
	this.setoff = function() {
		var ch = "#" + this.id + "_label";
		var cb = "#" + this.id + "_checkbox";
		$(ch).attr("check", "off");
		$(cb).css('background-position', '0px 0px');
	}
	this.getvalue = function() {
		var ch = "#" + this.id + "_label";
		var a = $(ch).attr("check");
		return a;
	}
}



function Context(e,a,b,c){
	if(typeof(a)=="undefined"){
		return false;
	}else{
		this.obj=a;
	}
	if(typeof(b)=="undefined"){
		return false;
	}else{
		this.id=$(this.obj).attr(b);
		this.appid=this.id;
	}
	if(typeof(this.id)=="undefined"){
		return false;
	}
	var x=e.clientX;
	var y=e.clientY;
	var theid=getTime()+this.id;
	$('body').append('<div id="'+theid+'" style="position:absolute;width:150px;height:auto;background-color:#fdfdfd;top:'+y+'px;left:'+x+'px;z-index:1000;border-radius:3px;overflow:hidden;"></div>');
	for (var i = 0; i < c.length; i++) {
		$("#"+theid).append('<div class="'+theid+'class" id="'+theid+i+'" style="width:120px;height:40px;color:#555555;font-size:18px;text-align:left;line-height:40px;padding-left:30px;cursor:pointer;">'+c[i]+'</div>');
	};
	$("."+theid+"class").mousemove(function(event) {
		/* Act on the event */
		$(this).css('background-color', '#ECECEC');
	});
	$("."+theid+"class").mouseout(function(event) {
		/* Act on the event */
		$(this).css('background-color', '');
	});
	$(document).mousedown(function(e) {
		if(e.target.className!=(theid+"class")){
			$("#"+theid).remove();
		}
		
	});
	$("#"+theid).blur(function(event) {
		$("#"+theid).remove();
	});
	$(document).mousewheel(function(){
		$("#"+theid).remove();
	})
	this.click=function(q,l){
			var appid=this.appid;
		$("#"+theid+q)[0].onclick=function(){
			l(appid);
			$("#"+theid).remove();
		}
	}

}