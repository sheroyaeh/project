class Index {
    constructor() {
            this.lunbo();
            this.lunbo2();
            this.dianji();
            this.erji();
        }
        // 封装获取节点的方法

    lunbo = () => {
        let lastindex = 0;
        let index = 0;
        let div = this.$('#div1');
        let ulli = this.$('#div1 ul li');
        let olli = this.$('#div1 ol li');
        let last = this.$('#goPrev');
        let next = this.$('#goNext');
        olli.forEach((v, k) => {
            // console.log(v);
            v.onclick = function() {
                lastindex = index;
                index = k;
                // console.log(lastindex, index, k);
                chage();
            }
        });
        // 3 实现右边按钮
        next.onclick = function() {
                lastindex = index;
                index++;
                // console.log(lastindex, index);
                if (index > ulli.length - 1) {
                    index = 0
                }
                chage();
            }
            // 实现左边按钮
        last.onclick = function() {
                lastindex = index;
                index--;
                // console.log(lastindex, index);
                if (index < 0) {
                    index = ulli.length - 1
                }
                chage();
            }
            // 自动播放的实现
        let times = '';

        function auto() {
            times = setInterval(function() {
                next.onclick();
            }, 2000)
        }
        auto();
        // 鼠标移入自动播放停止
        div.onmouseover = function() {
            clearInterval(times)
        }
        div.onmouseout = function() {
            auto();
        }

        function chage() {

            // 设置上一张图片隐藏
            ulli[lastindex].className = '';
            olli[lastindex].className = '';


            // 设置当前操作图片显示
            ulli[index].className = 'ac';
            olli[index].className = 'ac';
        }
    }

    lunbo2 = () => {
        let lastindex = 0;
        let index = 0;
        let div = this.$('#div2');
        let ulli = this.$('#div2 ul li');
        let olli = this.$('#div2 ol li');
        let last = this.$('.prev');
        let next = this.$('.next');
        // console.log(div, ulli, olli, last, next);
        olli.forEach((v, k) => {
            // console.log(v);
            v.onclick = function() {
                    lastindex = index;
                    index = k;
                    console.log(lastindex, index, k);
                    chage();
                }
                // v.onclick = function() {
                //     console.log(1);
                // }
        });
        // 3 实现右边按钮
        next.onclick = function() {
                lastindex = index;
                index++;
                // console.log(lastindex, index);
                if (index > ulli.length - 1) {
                    index = 0
                }
                chage();
            }
            // 实现左边按钮
        last.onclick = function() {
                console.log(1);
                lastindex = index;
                index--;
                // console.log(lastindex, index);
                if (index < 0) {
                    index = ulli.length - 1
                }
                chage();
            }
            // 自动播放的实现
        let times = '';

        function auto() {
            times = setInterval(function() {
                next.onclick();
            }, 3000)
        }
        auto();
        // 鼠标移入自动播放停止
        div.onmouseover = function() {
            clearInterval(times)
        }
        div.onmouseout = function() {
            auto();
        }

        function chage() {

            // 设置上一张图片隐藏
            ulli[lastindex].className = '';
            olli[lastindex].className = '';


            // 设置当前操作图片显示
            ulli[index].className = 'active';
            olli[index].className = 'active';
        }
    }
    dianji = () => {
        let ulli = this.$('#list-items ul li');
        let div = this.$('.list div');
        console.log(div);

        for (var i = 1; i < ulli.length; i++) {
            ulli[i].setAttribute("index", i);
            ulli[i].onclick = function() {
                var index = this.getAttribute("index");
                console.log(index);
                // console.log("栏目" + index + "被点击了");
                // 上面的栏目切换
                for (var j = 1; j < ulli.length; j++) {
                    ulli[j].className = "";
                }
                ulli[index].className = "active";

                // console.log(this.className);
                // 下面文字的效果
                for (let b = 0; b < 3; b++) {
                    div[b].className = "";
                    console.log(b);
                }
                div[index - 1].className = "active";

            }
        }

    }
    erji = () => {
        var container = document.getElementsByClassName("container")[0];
        var Li = container.getElementsByTagName("li");
        for (var i = 0; i < Li.length; i++) {
            Li[i].onmouseover = function() {
                this.getElementsByTagName("div")[0].style.display = "block";
                this.className = "active";
                if (this.getElementsByTagName("div")[0].innerHTML == "") {
                    this.getElementsByTagName("div")[0].style.display = "none";
                }
            }
            Li[i].onmouseout = function() {
                this.getElementsByTagName("div")[0].style.display = "none";
                this.className = "";
            }
        }
    }
    $(ele) {
        let res = document.querySelectorAll(ele);
        // console.log(ele);
        // console.log(res);
        // 如果获取到的是单个节点集合,就返回单个节点,如果是多个节点集合,就返回多个节点集合
        return res.length == 1 ? res[0] : res;
    }
}

new Index;