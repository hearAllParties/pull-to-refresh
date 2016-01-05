/**
 * Created by Eugene on 16/1/5.
 */

$(document).ready(function() {
    var myScroll = new IScroll('.wrapper', {
        probeType: 3,
        mouseWheel: true
    });
    myScroll.scrollBy(0, -100);

    var head = $('.head img'),
        topImgHasClass = head.hasClass('up');
    var foot = $('.foot img'),
        bottomImgHasClass = head.hasClass('down');
    myScroll.on('scroll', function () {
        var y = this.y,
            maxY = this.maxScrollY - y;
        if (y >= 0) {
            !topImgHasClass && head.addClass('up');
            return '';
        }
        if (maxY >= 0) {
            !bottomImgHasClass && foot.addClass('down');
            return '';
        }
    });

    myScroll.on('scrollEnd', function () {
        if (this.y >= -100 && this.y < 0) {
            myScroll.scrollTo(0, -100);
            head.removeClass('up');
        } else if (this.y >= 0) {
            head.attr('src', 'img/ajax-loader.gif');
            //TODO ajax下拉刷新数据

            setTimeout(function () {
                myScroll.scrollTo(0, -100);
                head.removeClass('up');
                head.attr('src', 'img/arrow.png');
            }, 1000);
        }

        var maxY = this.maxScrollY - this.y;
        if (maxY > -100 && maxY < 0) {
            var self = this;
            myScroll.scrollTo(0, self.maxScrollY + 100);
            foot.removeClass('down')
        } else if (maxY >= 0) {
            foot.attr('src', 'img/ajax-loader.gif');
            //TODO ajax上拉加载数据


            var self = this;
            setTimeout(function () {
                $('.foot').before(
                    '<div class="item">add 1</div>'+
                    '<div class="item">add 2</div>'+
                    '<div class="item">add 3</div>'+
                    '<div class="item">add 4</div>'+
                    '<div class="item">add 5</div>'
                );
                myScroll.refresh();

                myScroll.scrollTo(0, self.y + 100);
                foot.removeClass('down');
                foot.attr('src', 'img/arrow.png');
            }, 1000);
        }
    })
});

