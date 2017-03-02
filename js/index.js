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
    //为页面设置屏幕高度
    var height = 667;
    if (IsPC()) {
        height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
        $(".outer,.inner>div").css({ "height": height, "width": Math.max(1366, width) })
        window.onresize = function() {
                width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
                height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
                height = Math.max(667, height);
                $(".outer,.inner>div").css("height", height);
                $(".outer,.inner>div").css("width", Math.max(1200, width));
            }
            //鼠标滚轮滚动，页面切换函数
        var aDiv = $(".inner>div")
        var flag = true;
        var num = 0;

        function scroll(e) {
            var oEvent = e || window.event;
            if (flag) {
                if (oEvent.wheelDelta) {
                    if (oEvent.wheelDelta > 0) {
                        if (num > 0) {
                            $(aDiv[num]).removeClass("show-active");
                            num--;
                            $(".inner").css("transform", "translateY(" + -height * num + "px)");
                            $(aDiv[num]).addClass("show-active");
                            if (num == 0) {
                                $(".float-catalog").css("display", "none");
                            }
                        } else { num = 0 }
                    } else {
                        if (num < $(".inner>div").size() - 1) {
                            $(aDiv[num]).removeClass("show-active");
                            num++;
                            $(".inner").css("transform", "translateY(" + -height * num + "px)");
                            $(aDiv[num]).addClass("show-active");
                            if (num == 1) {
                                $(".float-catalog").css("display", "block");
                            }
                        } else { num = $(".inner>div").size() - 2 }
                    }
                } else if (oEvent.detail) {
                    if (oEvent.detail < 0) {
                        if (num > 0) {
                            $(aDiv[num]).removeClass("show-active");
                            num--;
                            $(".inner").css("transform", "translateY(" + -height * num + "px)");
                            $(aDiv[num]).addClass("show-active");
                            if (num == 0) {
                                $(".float-catalog").css("display", "none");
                            }
                        } else { num = 0 }
                    } else {
                        if (num < $(".inner>div").size() - 1) {
                            $(aDiv[num]).removeClass("show-active");
                            num++;
                            $(".inner").css("transform", "translateY(" + -height * num + "px)");
                            $(aDiv[num]).addClass("show-active");
                            if (num == 1) {
                                $(".float-catalog").css("display", "block");
                            }
                        } else { num = $(".inner>div").size() - 2 }
                    }
                }

                flag = false;
                setTimeout(function() { flag = true }, 300)
            }
            oEvent.preventDefault()
        }
        document.addEventListener('DOMMouseScroll', scroll, false)
        document.addEventListener("mousewheel", scroll, false);
        $(".footer .img").click(function() {
            document.removeEventListener('DOMMouseScroll', scroll) //兼容火狐 鼠标滚轮事件 
            document.removeEventListener('mousewheel', scroll);
        });
        $(".map .close").click(function() {
            document.addEventListener('DOMMouseScroll', scroll, false) //兼容火狐 鼠标滚轮事件 
            document.addEventListener('mousewheel', scroll); //兼容IE chrome 鼠标滚轮事件	
        })
    } else {
        $(".outer").css("overflow-y", "auto");
        $(".inner>div").css({ "height": 667, "width": 1200 });
        $(".inner>div").addClass("show-active");
    }
    //为轮播加图片
    var imges = ["url(img/swiper1.jpg)", "url(img/swiper2.jpg)", "url(img/swiper3.jpg)", "url(img/swiper4.jpg)"]
    for (var i = 0; i < $(".swiper-slide").size(); i++) {
        $(".swiper-slide").eq(i).css({ "background": imges[i] + " no-repeat", "background-size": "100% 100%", })
    }
    //轮播初始化 
    var aSwi = $(".swiper-slide");
    var Swidth = aSwi[0].offsetWidth;
    for (var i = 0; i < aSwi.length; i++) {
        aSwi[i].style.width = Swidth + "px";
        if (i == 0) {
            $(".swiper-pagination").append($("<span></span>").addClass("swiper-pagination-bullet swiper-pagination-bullet-active"));
        } else {
            $(".swiper-pagination").append($("<span></span>").addClass("swiper-pagination-bullet"));
        }
    }
    $(".swiper-wrapper").append($(aSwi[0]).clone());
    $(".swiper-wrapper").css("width", (aSwi.length + 1) * aSwi[0].offsetWidth);
    var aSpan = $(".swiper-pagination span");
    var Stimer = null;

    function slide(d) {
        var order = d;
        var Snum = d;
        Stimer = setInterval(function() {
            if (order == 0) {
                $(aSpan[aSpan.length - 1]).toggleClass("swiper-pagination-bullet-active");
            } else {
                $(aSpan[order - 1]).toggleClass("swiper-pagination-bullet-active");
            }
            $(aSpan[order]).toggleClass("swiper-pagination-bullet-active");
            $(".swiper-wrapper").animate({ left: -(Snum++) * Swidth + "px" }, 500);
            if (Snum == aSwi.length + 1) {
                $(".swiper-wrapper").animate({ left: 0 + "px" }, 0);
                Snum++;
            }
            order++;
            order %= aSwi.length;
            Snum = Snum % (aSwi.length + 1);
        }, 4000);
    }
    slide(1);
    $(".swiper-pagination span").on("click", function() {
            $(".swiper-pagination .swiper-pagination-bullet-active").removeClass("swiper-pagination-bullet-active");
            clearInterval(Stimer);
            $(".swiper-wrapper").animate({ left: -($(this).addClass("swiper-pagination-bullet-active").index()) * Swidth + "px" }, 1000);
            slide(($(this).index() + 1) % aSwi.length);
        })
        //右侧浮动导航点击翻页
    $(".float-catalog li").each(function(i, elem) {
        $(elem).click(function() {
            $(aDiv[num]).removeClass("show-active");
            num = $(this).index();
            $(".inner").css("transform", "translateY(" + -height * num + "px)");
            $(aDiv[num]).addClass("show-active");
        })
    })


})
