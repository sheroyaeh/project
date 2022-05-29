class List {
    constructor() {
        this.getData();
        // this.$('.sk_bd')
        this.bindEve();
        this.erji();
    }


    // 绑定事件的方法
    bindEve() {
        // 给ul绑定事件
        // this.addCart是ul的事件回调方法,内部this默认指向当前节点
        this.$('.sk_bd ul').addEventListener('click', this.addCart.bind(this))
    }






    // 获取数据(){}
    async getData() {
            // console.log(1111);
            //1 发送ajax请求获取数据
            // await 等待后边的promise解包完成,拿到最后的结果
            // let goodsData = await axios.get('http://localhost:8888/goods/list');
            let { status, data } = await axios.get('http://localhost:8888/goods/list');
            // console.log(goodsData);
            // console.log(status, data);

            // 2 判断请求状态是否成功
            // status是ajax 服务器请求成功
            // data.code=1 服务器接口返回数据正常
            if (status != 200 && data.code != 1) {
                throw new Error('获取数据失败')
            }
            // 3 循环渲染数据,追加到页面中


            let html = ''
            data.list.forEach(goods => {
                // console.log(goods);
                html += `<li class="sk_goods">
            <a href="#none">
            <img src="${goods.img_big_logo}" alt="">
            </a>
            <h5 class="sk_goods_title">${goods.title}</h5>
            <p class="sk_goods_price">
            <em>${goods.current_price}</em> 
            <del>￥${goods.price}</del>
            </p>
            <div class="sk_goods_progress">
                已售<i>${goods.sale_type}</i>
                <div class="bar">
                    <div class="bar_in"></div>
                </div>
                剩余<em>29</em>件
            </div>
            <a href="#none" class="sk_goods_buy" >立即抢购</a>
        </li>`
            });
            // console.log(html);
            // 将拼接好的字符串追加到ul中
            // console.log(this.$('.sk_bd ul'));
            this.$('.sk_bd ul').innerHTML += html;

        }
        /***加入购物车***/

    addCart(eve) {
        // console.log(111);
        // console.log(this);

        // 获取事件源,判断点击的是否为a标签
        // console.log(eve.target.classList);
        if (eve.target.nodeName != 'A' || eve.target.className != 'sk_goods_buy')
            return;
        // console.log(eve.target);


        // 判断用户是否登录,如果local中有token,表示登录,没有则表示未登录
        let token = localStorage.getItem('token');
        // console.log(token);
        // 没有token表示未登录,跳转到登录页面
        if (!token) location.assign('./login.html?ReturnUrl=./list-shop.html')
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





    // 封装获取节点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        // console.log(ele);
        // console.log(res);
        // 如果获取到的是单个节点集合,就返回单个节点,如果是多个节点集合,就返回多个节点集合
        return res.length == 1 ? res[0] : res;
    }
}

new List;