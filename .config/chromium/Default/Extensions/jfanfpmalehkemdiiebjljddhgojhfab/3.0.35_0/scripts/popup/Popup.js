// 'use strict';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39088953-3']);
_gaq.push(['_trackPageview']);
var mainUrl = 'http://www.wiz.cn/web';
window.onload = function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    
	function showByCookies(cookies) {
		console.log(cookies);
		if (cookies) {
			var port = chrome.extension.connect({
				name : 'initRequest'
			});
			port.onMessage.addListener(function (msg) {
				//2012-10-10
				// if (msg.login == false) {
				// 	loginControl.autoLogin(cookies);
				// } else {
				$('#wiz_login').hide();
				// }
				clipPageControl.setNativeStatus(msg.hasNative);
			});

		} else {
			PopupView.showLogin();
			loginControl.initCreateAccountLink();
		}
	}


	function wizPopupInitialize() {
		Cookie.getCookies(cookieUrl, cookieName, showByCookies, true);
		// tabLoadedListener();
	}

	function initPopupPage() {
		$('#waiting-label').html(chrome.i18n.getMessage('popup_wating'));

		//login page
		$('#user_id').attr("placeholder", chrome.i18n.getMessage('user_id_tip'));
		$('#password').attr("placeholder", chrome.i18n.getMessage('password_tip'));
		$('#keep_password_tip').html(chrome.i18n.getMessage('keep_password_tip'));
		$('#login_button').html(chrome.i18n.getMessage('login_msg'));

		//note info page
		$('#note_title_tip').html(chrome.i18n.getMessage('note_title_tip'));
		$('#category_tip').html(chrome.i18n.getMessage('category_tip'));
		// $('#tag_tip').html(chrome.i18n.getMessage('tag_tip'));
		// $('#tag_input').html(chrome.i18n.getMessage('tag_input'));
		//submit type
		$('#article').html(chrome.i18n.getMessage('article_save'));
		$('#fullPage').html(chrome.i18n.getMessage('fullpage_save'));
		$('#selection').html(chrome.i18n.getMessage('select_save'));
		$('#url').html(chrome.i18n.getMessage('url_save'));
		$('#native').html(chrome.i18n.getMessage('save_more'));
		//comment area
		$('#comment_tip').html(chrome.i18n.getMessage('comment_tip'));
		$('#comment-info').attr('placeholder', chrome.i18n.getMessage('add_comment'));

		$('#save_to_native').html(chrome.i18n.getMessage('save_to_native'));
		$('#save_to_server').html(chrome.i18n.getMessage('save_to_server'));

		//默认文件夹
		$('#category_info').html('/' + chrome.i18n.getMessage('MyNotes') + '/').attr('location', '/My Notes/');
		$('.header_logo').bind('click', function(evt) {
			window.open('https://note.wiz.cn/web');
		});
	}

	initPopupPage();
	var clipPageControl = new ClipPageControl();
	var loginControl = new LoginControl();
	
	//保证popup页面和preview页面同时关闭
	chrome.extension.connect({
		name : 'popupClosed'
	});

	wizPopupInitialize();
}