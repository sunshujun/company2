function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

$(function() {
    var height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
    var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    //判断是否是PC端，是PC端为首屏添加屏幕height，移动端添加height=667px
    if (IsPC()) {
        height = Math.max(667, height);
        if ($(".outer,.job,.info-detail").length == 0) { //.outer,.job,.job-detail这几个页面不需要添加height
            $("body>div:first").css("height", height + "px");
        }
    } else {
        if ($(".outer,.job,.info-detail").length == 0) { //.outer,.job,.job-detail这几个页面不需要添加height
            $("body>div:first").css("height", 667 + "px");
        }
    }
    //为地图显示添加宽高
    $(".map").css({ "height": height, "width": width });
    //导航条产品与解决方案二级菜单鼠标悬浮
    $(".product-solu li").each(function(i, elem) {
        $(elem).on({
            "mouseover": function() {
                $(this).find("span:first").css({ "border": "40px solid #fff", "opacity": 0 });
                $(this).find("span:last").css({ "transform": "scale(1)", "opacity": 1 });
                $(this).find(".more").css({ "top": "250px", "opacity": 1 });
                $(".index-header .twoLevel>a").css("border-bottom", "2px solid #00a6b1")
            },
            "mouseout": function() {
                $(this).find("span:first").css({ "border": "1px solid #fff", "opacity": 1 });
                $(this).find("span:last").css({ "transform": "scale(0)", "opacity": 0 });
                $(this).find(".more").css({ "top": "150px", "opacity": 0 });
                $(".index-header .twoLevel>a").css("border-bottom", "")
            }
        })
    })

    //底部电话在线联系回顶部mouseover事件
    var timer1 = null;
    var timer2 = null;
    $(".tel span").on({
        "mouseover": function() {
            clearTimeout(timer2);
            $(".slide-tel").css("display", "block").animate({ width: "126px" }, 200)
        },
        "mouseout": function() {
            timer1 = setTimeout(function() { $(".slide-tel").animate({ width: 0 }, 200, function() { $(".slide-tel").css("display", "none") }) }, 100);
        }
    })
    $(".online span").on({
        "mouseover": function() {
            clearTimeout(timer2);
            $(".slide-online").css("display", "block").animate({ width: "75px" }, 200)
        },
        "mouseout": function() {
            timer1 = setTimeout(function() { $(".slide-online").animate({ width: 0 }, 200, function() { $(".slide-online").css("display", "none") }) }, 100);
        }
    })
    $(".backtop span").on({
        "mouseover": function() {
            clearTimeout(timer2);
            $(".slide-top").css("display", "block").animate({ width: "75px" }, 200)
        },
        "mouseout": function() {
            timer1 = setTimeout(function() { $(".slide-top").animate({ width: 0 }, 200, function() { $(".slide-top").css("display", "none") }) }, 100);
        }
    })
    $(".float-contect div div").on({
        "mouseover": function() {
            clearTimeout(timer1);
        },
        "mouseout": function() {
            var _this = this;
            timer2 = setTimeout(function() { $(_this).animate({ width: 0 }, 200, function() { $(_this).css("display", "none") }) }, 100);
        }
    })

    //控制右下角回到顶部图标
    window.onscroll = function() {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollTop > 0) {
            $(".backtop").fadeIn(500)
        } else {
            $(".backtop").fadeOut(500);
        }
    }
    $(".backtop").click(function() {
        if (document.body.scrollTop) {
            $("body").animate({ scrollTop: 0 }, 300);
        } else {
            $(document.documentElement).animate({ scrollTop: 0 }, 300);
        }
    })

    var ver = navigator.userAgent; //获得浏览器版本 
    $(".float-catalog li").click(function() {
        var aDiv = $("body>div");
        if (document.body.scrollTop || ver.indexOf("Chrome") > 0) {
            if (aDiv[$(this).index()]) {
                $("body").animate({ "scrollTop": aDiv[$(this).index()].offsetTop }, 500);
            }
        } else {
            if (aDiv[$(this).index()]) {
                $(document.documentElement).animate({ "scrollTop": aDiv[$(this).index()].offsetTop }, 500);
            }
        }
    })

    //打开关闭地图面板 
    $(".footer .img").click(function() {
        var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
        $(".map").css({ "width": width });
        $(".map").css({ "transform": "scale(1)" });
        $("body").bind("mousewheel", function(e) { e.preventDefault(); });
        $("body").bind("DOMMouseScroll", function(e) { e.preventDefault(); }); //兼容火狐
    });
    $(".map .close").click(function() {
            $(".map").css({ "transform": "scale(0)" });
            $("body").unbind("mousewheel");
            $("body").unbind("DOMMouseScroll"); //兼容火狐
        })
        // 百度地图API功能 
    var map = new BMap.Map("showMap"); //传入的参数一定要是ID名
    var point = new BMap.Point(121.516769, 31.229941);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中 
    //marker.setAnimation(BMAP_ANIMATION_BOUNCE);//标注跳动的动画
    map.centerAndZoom(point, 15);
    map.setDefaultCursor("url('bird.cur')"); //设置地图默认的鼠标指针样式 
    map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
    var top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL }); //右上角，仅包含平移和缩放按钮
    map.addControl(top_left_control); //添加比例尺      
    map.addControl(top_left_navigation); //添加控件  
    map.addControl(top_right_navigation); //添加控件
    var opts = {
        width: 200, // 信息窗口宽度
        height: 70, // 信息窗口高度
        title: "上海平欣电子科技有限公司", // 信息窗口标题 
    }
    var infoWindow = new BMap.InfoWindow("地址：上海浦东新区张杨路88号滨江大厦911室", opts); // 创建信息窗口对象 
    marker.addEventListener("click", function() {
        map.openInfoWindow(infoWindow, point); //标注开启信息窗口
    });

})
