
var _this;


function hide(){
	layer.closeAll('tips');
}

//关闭全部选项卡
function closeAllTabs(){

    $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
        $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
        $(this).remove();
    });
    $('.page-tabs-content').children("[data-id]:first").each(function () {
        $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
        $(this).addClass("active");
    });
    $('.page-tabs-content').css("margin-left", "0");

}

//关闭左侧选项卡
function closeLeftTabs(){
	var othis = $(_this);
	othis.prevAll('.J_menuTab').not(":last").each(function () {
        if($(this).hasClass('active')){
        	setActiveTab(_this);
        }
        $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
        $(this).remove();
    });

}

//关闭右侧选项卡
function closeRightTabs(){
	var othis = $(_this);
	othis.nextAll('.J_menuTab').each(function () {
        if($(this).hasClass('active')){
        	setActiveTab(_this);
        }
        $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
        $(this).remove();
    });

}


//计算元素集合的总宽度
function calSumWidth(elements) {
    var width = 0;
    $(elements).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
}
//滚动到指定选项卡
function scrollToTab(element) {
    var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if ($(".page-tabs-content").outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
}
//查看左侧隐藏的选项卡
function scrollTabLeft() {
    var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if ($(".page-tabs-content").width() < visibleWidth) {
        return false;
    } else {
        var tabElement = $(".J_menuTab:first");
        var offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        offsetVal = 0;
        if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).prev();
            }
            scrollVal = calSumWidth($(tabElement).prevAll());
        }
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
}
//查看右侧隐藏的选项卡
function scrollTabRight() {
    var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if ($(".page-tabs-content").width() < visibleWidth) {
        return false;
    } else {
        var tabElement = $(".J_menuTab:first");
        var offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        offsetVal = 0;
        while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
        }
        scrollVal = calSumWidth($(tabElement).prevAll());
        if (scrollVal > 0) {
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        }
    }
}



function menuItem() {
    // 获取标识数据
    var dataUrl = $(this).attr('href'),
        dataIndex = $(this).data('index'),
        menuName = $.trim($(this).text()),
        target = $(this).attr('target'),
        flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;

    // 选项卡菜单已存在
    $('.J_menuTab').each(function () {
        if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
                scrollToTab(this);
                // 显示tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == dataUrl) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });

    // 选项卡菜单不存在
    if (flag) {

        if(target == '_blank'){
            Window.location.href=dataUrl;
            return false;
        }

        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.J_menuTab').removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
        $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

        //显示loading提示
        var index = layer.load(1, {
        	  shade: [0.1,'#fff'] //0.1透明度的白色背景
        	});

        $('.J_mainContent iframe:visible').load(function () {
            //iframe加载完成后隐藏loading提示
            layer.close(index);
        });
        // 添加选项卡
        $('.J_menuTabs .page-tabs-content').append(str);
        scrollToTab($('.J_menuTab.active'));
    }
    return false;
}



//关闭当前选项卡菜单
function closeCurrentTab(){
 var othis = $(_this);
 var closeTabId = othis.data('id');
 var currentWidth = othis.width();
 if($('.page-tabs-content').children("[data-id]:first").data('id') ==  closeTabId){

	 return;
 }
 // 当前元素处于活动状态
 if (othis.hasClass('active')) {

     // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
     if (othis.next('.J_menuTab').size()) {

         var activeId = othis.next('.J_menuTab:eq(0)').data('id');
         othis.next('.J_menuTab:eq(0)').addClass('active');

         $('.J_mainContent .J_iframe').each(function () {
             if ($(this).data('id') == activeId) {
            	 $(this).show().siblings('.J_iframe').hide();
                 return false;
             }
         });

         var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
         if (marginLeftVal < 0) {
             $('.page-tabs-content').animate({
                 marginLeft: (marginLeftVal + currentWidth) + 'px'
             }, "fast");
         }

         //  移除当前选项卡
         othis.remove();

         // 移除tab对应的内容区
         $('.J_mainContent .J_iframe').each(function () {
             if ($(this).data('id') == closeTabId) {
            	 $(this).remove();
                 return false;
             }
         });
     }

     // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
     if (othis.prev('.J_menuTab').size()) {
         var activeId = othis.prev('.J_menuTab:last').data('id');
         othis.prev('.J_menuTab:last').addClass('active');
         $('.J_mainContent .J_iframe').each(function () {
             if ($(this).data('id') == activeId) {
            	 $(this).show().siblings('.J_iframe').hide();
                 return false;
             }
         });

         //  移除当前选项卡
         othis.remove();

         // 移除tab对应的内容区
         $('.J_mainContent .J_iframe').each(function () {
             if ($(this).data('id') == closeTabId) {
            	 $(this).remove();
                 return false;
             }
         });
     }
 }
 // 当前元素不处于活动状态
 else {
     //  移除当前选项卡
     othis.remove();

     // 移除相应tab对应的内容区
     $('.J_mainContent .J_iframe').each(function () {
         if ($(this).data('id') == closeTabId) {
        	 $(this).remove();
             return false;
         }
     });
     scrollToTab($('.J_menuTab.active'));
 }
 return false;
}



// 关闭选项卡菜单
function closeTab() {
    var closeTabId = $(this).parents('.J_menuTab').data('id');
    var currentWidth = $(this).parents('.J_menuTab').width();

    // 当前元素处于活动状态
    if ($(this).parents('.J_menuTab').hasClass('active')) {

        // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
        if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

            var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
            $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == activeId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });

            var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
            if (marginLeftVal < 0) {
                $('.page-tabs-content').animate({
                    marginLeft: (marginLeftVal + currentWidth) + 'px'
                }, "fast");
            }

            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
        }

        // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
        if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
            var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
            $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == activeId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });

            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
        }
    }
    // 当前元素不处于活动状态
    else {
        //  移除当前选项卡
        $(this).parents('.J_menuTab').remove();

        // 移除相应tab对应的内容区
        $('.J_mainContent .J_iframe').each(function () {
            if ($(this).data('id') == closeTabId) {
                $(this).remove();
                return false;
            }
        });
        scrollToTab($('.J_menuTab.active'));
    }
    return false;
}


//关闭其他选项卡
function closeOtherTabs(){
	var othis = $(_this);
	setActiveTab(_this);

    $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
        $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
        $(this).remove();
    });
    $('.page-tabs-content').css("margin-left", "0");
}


//滚动到已激活的选项卡
function showActiveTab(){
    scrollToTab($('.J_menuTab.active'));
}

function setActiveTab(element){
	 if (!$(element).hasClass('active')) {
	        var currentId = $(element).data('id');
	        // 显示tab对应的内容区
	        $('.J_mainContent .J_iframe').each(function () {
	            if ($(this).data('id') == currentId) {
	                $(this).show().siblings('.J_iframe').hide();
	            }
	        });
	        $(element).addClass('active').siblings('.J_menuTab').removeClass('active');
	        scrollToTab(element);
	    }
}

// 点击选项卡菜单
function activeTab() {
    if (!$(this).hasClass('active')) {
        var currentId = $(this).data('id');
        // 显示tab对应的内容区
        $('.J_mainContent .J_iframe').each(function () {
            if ($(this).data('id') == currentId) {
                $(this).show().siblings('.J_iframe').hide();
                return false;
            }
        });
        $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
        scrollToTab(this);
    }
}

//刷新iframe
function refreshTab() {
    var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
    var url = target.attr('src');
    //显示loading提示
    var index = layer.load(1, {
  	  shade: [0.1,'#fff'] //0.1透明度的白色背景
  	});
    target.attr('src', url).load(function () {
        //关闭loading提示
        layer.close(index);
    });
}

function refreshCurrentTab() {
	 var othis = $(_this);
	setActiveTab(othis);
    var target = $('.J_iframe[data-id="' + othis.data('id') + '"]');
    var url = target.attr('src');
    //显示loading提示
    var index = layer.load(1, {
  	  shade: [0.1,'#fff'] //0.1透明度的白色背景
  	});
    target.attr('src', url).load(function () {
        //关闭loading提示
        layer.close(index);
    });
}


function getActiveTab(){
	return $(".J_iframe:visible");
}


//打开选项卡菜单
function openTab(url,title, isNew){//isNew 为true时，打开一个新的选项卡；为false时，如果选项卡不存在，打开一个新的选项卡，如果已经存在，使已经存在的选项卡变为活跃状态。

	 // 获取标识数据
    var dataUrl = url,
        dataIndex ,
        menuName = title,
        flag = true;
    if (dataUrl == undefined || top.$.trim(dataUrl).length == 0)return false;
//    //设置dataIndex
//    $(".J_menuItem").each(function (index) {
//        if (!$(this).attr('data-index')) {
//            $(this).attr('data-index', index);
//        }
//    });

    if(!isNew){
		    top.$('.J_menuTab').each(function () {
		        if (top.$(this).data('id') == dataUrl) {// 选项卡已存在，激活。
		            if (!top.$(this).hasClass('active')) {
		            	top.$(this).addClass('active').siblings('.J_menuTab').removeClass('active');
		                scrollToTab(top.$(this));
		                // 显示tab对应的内容区
		                top.$('.J_mainContent .J_iframe').each(function () {
		                    if (top.$(this).data('id') == dataUrl) {
		                    	top.$(this).show().siblings('.J_iframe').hide();
		                        return false;
		                    }
		                });
		            }
		            flag = false;
		            return false;
		        }
		    });
    }

    if(isNew || flag){//isNew为true，打开一个新的选项卡； flag为true，选项卡不存在，打开一个新的选项卡。
	        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
	        top.$('.J_menuTab').removeClass('active');

	        // 添加选项卡对应的iframe
	        var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
	        top.$('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

	        //显示loading提示
	        var index = layer.load(1, {
	        	  shade: [0.1,'#fff'] //0.1透明度的白色背景
	        	});

	        top.$('.J_mainContent iframe:visible').load(function () {
	            //iframe加载完成后隐藏loading提示
	            layer.close(index);
	        });
	        // 添加选项卡
	        top.$('.J_menuTabs .page-tabs-content').append(str);
	        scrollToTab(top.$('.J_menuTab.active'));

    }
    return false;

}


$(function () {
	//通过遍历给菜单项加上data-index属性
	$(".J_menuItem").each(function (index) {
	    if (!$(this).attr('data-index')) {
	        $(this).attr('data-index', index);
	    }
	});

	$('.J_menuItem').on('click', menuItem);

	$('.J_menuTabs').on('click', '.J_menuTab i', closeTab);

	$('.J_tabCloseOther').on('click', closeOtherTabs);

	$('.J_tabShowActive').on('click', showActiveTab);

	$('.J_menuTabs').on('click', '.J_menuTab', activeTab);

	$('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);
	$.contextMenu({
	            selector: '.J_menuTab',
	            callback: function(key, options) {
	            	_this = this;
	                if(key === "closeTab"){
	                	closeCurrentTab();
	                }else if(key ==="closeOtherTabs" ){
	                	closeOtherTabs();
	                }else if(key === "refresh"){
	                	refreshCurrentTab();
	                }else if(key ==="closeLeftTabs" ){
	                	closeLeftTabs();
	                }else if(key === "closeRightTabs"){
	                	closeRightTabs();
	                }else if(key === "closeAllTabs"){
	                	closeAllTabs()
	                }
	            },
	            items: {
	                "closeTab": {name: "关闭标签", icon: "fa-times "},
	                "closeOtherTabs": {name: "关闭其他标签"},
	                "refresh": {name: "刷新", icon: "fa-refresh"},
	                "sep1": "---------",
	                "closeLeftTabs": {name: "关闭左侧标签"},
	                "closeRightTabs": {name: "关闭右侧标签"},
	                "closeAllTabs": {name: "关闭全部标签", icon: "fa-times-circle "}
	            }
	        });
	// 左移按扭
	$('.J_tabLeft').on('click', scrollTabLeft);

	// 右移按扭
	$('.J_tabRight').on('click', scrollTabRight);

	// 关闭全部
	$('.J_tabCloseAll').on('click', closeAllTabs());

});


