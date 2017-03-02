      // 平移函数方法
      var num = 0;
      var aLi = $(".slider li");

      function translate(obj) {
          $(aLi[num]).addClass("animate");
          if ($(obj).index()) {
              num = (num + 1) % aLi.length;
          } else {
              num = (num - 1 + aLi.length) % aLi.length;
          }
          $(".slider").css("transform", "translateX(" + (-num * 1200) + "px)");
          $(aLi[num]).removeClass("animate");
          if (num == aLi.length - 1 || num == 0) {
              setTimeout(function() {
                  $(".slider").css("transition-duration", "0s")
              }, 300)
          } else {
              $(".slider").css("transition-duration", ".3s");
          }
      }

      //使用循环为company-intro和slider中的img加transition-delay
      var aLi2 = $(".company-intro li, .slider li");
      for (var a = 0; a < aLi2.length; a++) {
          var aImg = $(aLi2[a]).find("img");
          for (var t = 0; t < aImg.length; t++) {
              $(aImg[t]).css("transition-delay", 0.3 * (t + 1) + "s");
          }
      }
      $(function() {
          var timer1 = setInterval(translate, 5000);
          $(".slider-pre-next div").click(function() {
              translate($(this));
              clearInterval(timer1);
              timer1 = setInterval(translate, 5000);
          })
          $(".slider li:first").removeClass("animate") //在刷新时给第一个li出现时加动画
          $(".company-intro ul").addClass("show");

          //轮播合作伙伴函数
          function move() {
              var ul = $(".our-partner ul");
              var aLi = $(".our-partner li");
              var left = $(ul).position().left;
              $(ul).css("left", left - 1 + "px");
              if (left < -240 * aLi.length / 2) {
                  $(ul).css("left", "0px");
              }
          }
          //为合作伙伴加轮播事件
          $(".our-partner ul").css("width", 240 * 2 * $(".our-partner li").length + "px").append($(".our-partner li").clone());
          var timer2 = setInterval(function() {
              move();
          }, 18);
          $(".our-partner .wrap").on({
              "mouseover": function() {
                  clearInterval(timer2);
              },
              "mouseout": function() {
                  timer2 = setInterval(function() {
                      move();
                  }, 18);
              }
          })
      })
