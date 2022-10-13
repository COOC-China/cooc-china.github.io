// 2018-08-09
function IEVersion() {
  var userAgent = navigator.userAgent;
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if(isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if(fIEVersion == 7) {
          return 7;
      } else if(fIEVersion == 8) {
          return 8;
      } else if(fIEVersion == 9) {
          return 9;
      } else if(fIEVersion == 10) {
          return 10;
      } else {
          return 6;//IE版本<=7
      }
  } else if(isEdge) {
      return 12;//edge
  } else if(isIE11) {
      return 11; //IE11
  }else{
      return -1;//不是ie浏览器
  }
}
//判断是否是IE 11及以下或者其他(其他里包括IE edge)
function msie() {
    if(!!window.ActiveXObject || "ActiveXObject" in window){
      return true;
    }else{
      return false;
　　 }
}

function setBanner(){
	o=$('.banner img');
  pc=o.attr('data-pc');
	mob=o.attr('data-mob');
  src='/res/img/banner.jpg';

	if(pc!='')src=pc;
  if(window.innerWidth<640){
    if(mob=='')mob='/files/banner/mob/default.jpg';
    src=mob;
  }
  o.removeAttr('height').attr('src',src);
	$('#banner-1').addClass('lzu');
}

function checkBanner(){
  if($('#banner-page source').attr('srcset')=='')$('#banner-page source').attr('srcset','/files/banner/mob/default.jpg');
  if($('#banner-page img').attr('src')=='')$('#banner-page img').attr('src','/res/img/banner.jpg');
  $('#banner-1').addClass('lzu');
}

function randomBgBanner(ii,z,n){
  if(n==0)
    $("#top-banner-"+ii).css('z-index',z).show();//第一次加载不要动画
  else
    $("#top-banner-"+ii).hide().css('z-index',z).slideDown('slow');
  $("#banner-home").attr('data-id',ii);
}
function randomBanner(M){
  // if(i==0){
  //   var d = new Date();
  //   // m=d.getMinutes();
  //   m=d.getSeconds();

  //   n=$('#banner-home img').length;
  //   M=m%n+1;//根据推荐图片随机选一个
  // }else
  //   M=i;
  $('#banner-home div').hide();
  id='#top-banner-'+M;

  o=$(id+' img');
  pc=o.attr('data-pc');
  mob=o.attr('data-mob');
  src='';

  if(window.innerWidth<640){
    if(mob==''){
      if(pc!='')mob=pc;
      else mob='/files/banner/mob/default.jpg';
    }
    src=mob;
  }else{
    if(pc=='')pic='/res/img/banner01.jpg';
    src=pc;
  }

  o.attr('src',src);
  $(id).removeAttr('width').show();

  if(msie()){
    if(IEVersion()<=8){
      w=$(id).width();
      h=w/1920*500;
      o.height(h);
    }
  }

  u=o.attr('data-url');
  if(u.length>10)o.wrap("<a href='"+u+"' target='_blank'></a>");
}



function setSuperBanner(l,b){//正文图，自定义banner大图优先选择
	bgimg=b;
	// if(b=='')bgimg=l;
	if(bgimg!=''){
		$('.banner-super div').css('background-image','url('+bgimg+')');
		if(l==bgimg)$('.banner-super div').addClass('blur');//使用正文图的时候虚化
	}
}
function activeNav(id){
	$('.site-menus li').each(function(index, el) {
		rel=$(this).attr('rel');
		if(rel==id)$(this).addClass('active');
	});
}

function showIntro(id){
	html=$('#intro-'+id+' dd').html();
	tit =$('#intro-'+id+' dt').html();
    dlg = new Dialog(html, {modal: false, height: 360, title: tit }).show();
}

function showImg(img,tit){
  html='<img src="'+img+'" style="max-height:280px" alt="" />';
  dlg = new Dialog(html, {modal: false, height: 320, title: tit }).show();
}

function showEmail(e,tit){
  html='<br />信箱地址：<br /><strong>'+e+'@lzu.edu.cn</strong><br /><br />如果您已经安装邮件客户端或者APP，<br />可 <a href="mailto:'+e+'@lzu.edu.cn"><strong>点击这里</strong></a> 直接发送邮件。';
  dlg = new Dialog(html, {modal: false, height: 200, title: tit }).show();
}
function img2bg(o){
  $(o+' img').each(function(index, el) {
    imgurl=$(this).attr('data-src').trim();
    $(this).parent().css('background-image', "url('"+imgurl+"')");
    $(this).hide();
  });
}
var isIE=!!window.ActiveXObject;
var isIE6=isIE&&!window.XMLHttpRequest;
var isIE8=isIE&&!!document.documentMode;
var isIE7=isIE&&!isIE6&&!isIE8;

function mainNavPos(direction,x){
    if(direction==''){
      if(x<100)direction='right';
      else direction='left';
    }
    if(direction=='right'){
      pos = 10;
      cls = 'shade-right';
      ic = 'ico ico-toright';
    }
    else{
      pos = -300;
      cls = 'shade-left';
      ic = 'ico ico-toleft';
    }
    $("#main-nav").animate({"left":pos+"px"},400);
    $('#nav-shade').attr('class', cls);
    $('#nav-shade i').attr('class', ic);
}

$(function () {
  var topnav = $('#nav-top'),Header=$('header'),toTop = $('#totop');
  if (window.innerWidth>900) {
    topnav.addClass('fixed');
    Header.addClass('fixedPadding');
    $(window).scroll(function () {
      var top = $(window).scrollTop();
      if (top > 10) {
        topnav.addClass('fixedShadow');
      } else {
        topnav.removeClass('fixedShadow');
      }
      if (top < 500) {
        toTop.fadeOut();
      } else {
        toTop.fadeIn();
      }
    });
    toTop.click(function () {
      $('html,body').animate({scrollTop: 0}, 500);
    });
    $("a[href^='http']").attr("target","_blank");
  }else{// 移动端
    // 菜单处理
    $('.site-menus .so').last().append($('#so-top'));
    $('#so-top').removeClass('mob-none').css({'margin':'10px auto','background-color':'#FFFFFF'});
    $('#mob-menu').click(function(event) {
      $('#mob-fuwu,#mob-renyuan').slideUp('fast');
      $('.site-menus').last().toggle();
    });

    $('main,section').click(function(event) {
      $('.site-menus').last().slideUp('fast');
      $('#mob-fuwu,#mob-renyuan').slideUp('fast');
    });

    $('#nav-fuwu li span,#nav-renyuan li span').remove();
    $('#mob-fuwu').append($('#nav-fuwu li'));
    $('#mob-renyuan').append($('#nav-renyuan li'));

    $('#mob-service').click(function(event) {
      $('.site-menus').last().slideUp('fast');
      $('#mob-renyuan').slideUp('fast');
      $('#mob-fuwu').toggle('fast');
    });
    $('#mob-user').click(function(event) {
      $('.site-menus').last().slideUp('fast');
      $('#mob-fuwu').slideUp('fast');
      $('#mob-renyuan').toggle('fast');
    });

    //添加滑动事件
    $("#nav-shade").click(function(event) {
      pos=$(this).css('left');
      pos=parseInt(pos);
      mainNavPos('',pos);
    });
    $("#main-nav,#main-nav a,#main-nav li").swipe({
      swipe:function(event, direction, distance, duration, fingerCount) {
        mainNavPos(direction,-1);
      },
      threshold:0
    });

  }


  brmsg='<div style="border-bottom:1px #FFCA7E solid;background:#FFF4D2;width:100%;position:absolute;z-index:9999999999999;left:0;"><div style="border:1px #FFF solid;padding:6px 12px;text-align:center">您的IE浏览器版本比较低，请升级！如果是360、sogou等双核浏览器可切换到极速模式！</div></div>';
  if(msie()){//低版本IE提示升级
    if(IEVersion()<9){
      $('body').prepend(brmsg);
    }
  }else{
      console.info('Welcome to Lanzhou University! ');
      console.info(document.lastModified);
  }
  var userAgent = navigator.userAgent.toLowerCase();
  var rSafari = /version\/([\w.]+).*(safari)/;
  var matchBS;
  matchBS = rSafari.exec(userAgent);
  if (matchBS != null){
    $('body').addClass('safari'); // safari 手机浏览器对 background fixed 兼容性不好
    //if(matchBS[1] <= 8)$('body').prepend(brmsg.replace('IE','Safari '+matchBS[1])); //低版本Safari不支持CSS3，进行升级提示。
  }

});

//监听手机屏幕旋转，横屏调用pc的banner
window.addEventListener('orientationchange', function(){
  setTimeout(function() {
    setBanner();
  }, 300);
}, false);



