class Index {
    constructor() {
            this.lunbo()
        }
        // 封装获取节点的方法

    lunbo = () => {
        let lastindex = 0;
        let index = 0;
        let div = this.$('#div1');
        let ulli = this.$('#div ul li');
        let olli = this.$('#div1 ol li');
        let last = this.$('#goPrev');
        let next = this.$('#goNext');
        olli.forEach((v, k) => {
            // console.log(v);
            v.onclick = function() {
                lastindex = index;
                index = k;
                console.log(lastindex, index, k);
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
    $(ele) {
        let res = document.querySelectorAll(ele);
        // console.log(ele);
        // console.log(res);
        // 如果获取到的是单个节点集合,就返回单个节点,如果是多个节点集合,就返回多个节点集合
        return res.length == 1 ? res[0] : res;
    }
}

new Index;