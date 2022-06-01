class List {
    constructor() {
        this.getData();
        // this.$('.sk_bd')
        this.bindEve();
        this.erji();
        this.getCartData();
        this.currentPage = 1;
        // 使用锁
        this.lock = false;
    }


    // 绑定事件的方法
    bindEve() {
        // 给ul绑定事件
        // this.addCart是ul的事件回调方法,内部this默认指向当前节点
        this.$('.sk_bd ul').addEventListener('click', this.addCart.bind(this))
        this.$('.sk_bd ul').addEventListener('click', this.enterInfo.bind(this))
        window.addEventListener('scroll', this.lazyLoader)
    }
    enterInfo(eve) {
        // console.log(this);
        // console.log(11);

        if (eve.target.nodeName == 'A' || eve.target.className == 'sk_goods_buy')
            return;
        let goodsId = eve.target.parentNode.parentNode.dataset.id;
        // console.log(goodsId);
        this.enterGoods(goodsId)

    }

    enterGoods(gId) {
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        let { data, status } = axios.get(' http://localhost:8888/goods/item', {
            params: { id: gId }

        }).then(({ data, status }) => {
            console.log(data, status);
            if (status == 200 && data.code == 1) {
                location.assign('./shop-info.html?ReturnUrl=./list-shop.html')
            }
        })
    }











    // 获取购物车数据
    async getCartData() {
        // console.log(1111);
        //1 发送ajax请求获取数据
        // await 等待后边的promise解包完成,拿到最后的结果
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let uId = localStorage.getItem('user_id');
        // let goodsData = await axios.get('http://localhost:8888/goods/list');
        let { status, data } = await axios.get('http://localhost:8888/cart/list', {
            params: { id: uId }
        });

        // console.log(status, data);

        // 2 判断请求状态是否成功
        // status是ajax 服务器请求成功
        // data.code=1 服务器接口返回数据正常
        if (data.code == 1 && status == 200) {
            let html = '';
            let keys = '';
            data.cart.forEach((goods, key) => {
                // console.log(goods);
                keys += key + ','
                html += ` <li>
                <img src="${goods.img_small_logo}" alt="">
                <a href="">${goods.title}</a>
                <span>${goods.current_price}</span>
            </li>`
            });

            const arr = keys.split(',');
            this.$('.act1>a span').innerHTML = arr.length - 1
            this.$('.act1 div ul').innerHTML += html;
            // this.oneGoodsCheckBox();
        }
    }


    // 获取数据(){}
    async getData() {
        // console.log(1111);
        //1 发送ajax请求获取数据
        // await 等待后边的promise解包完成,拿到最后的结果
        // let goodsData = await axios.get('http://localhost:8888/goods/list');
        let { status, data } = await axios.get('http://localhost:8888/goods/list');

        // console.log(status, data);

        // 2 判断请求状态是否成功
        // status是ajax 服务器请求成功
        // data.code=1 服务器接口返回数据正常
        if (status != 200 && data.code != 1) {
            throw new Error('获取数据失败')
        }
        // 3 循环渲染数据,追加到页面中


        let html = ''
        data.list.forEach((goods) => {
            // console.log(goods);
            html += `<li class="sk_goods" data-id='${goods.goods_id}'>
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
        // this.enterInfo()

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
        let goodsId = eve.target.parentNode.dataset.id;
        let userId = localStorage.getItem('user_id');
        // console.log(goodsId);
        this.addCartGoods(goodsId, userId);
    }
    addCartGoods(gId, uId) {
        // console.log(gId, uId);
        // 给添加购物车接口,发送请求
        // 发送请求,调用购物车接口,必须登录状态,后台验证是否登录,要传递token
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let param = `id=${uId}&goodsId=${gId}`
        axios.post('http://localhost:8888/cart/add', param).then(({ status, data }) => {
            console.log(status, data);

            //  判断添加购物车是否成功
            if (status == 200 && data.code == 1) {
                layer.open({
                    title: '商品添加成功',
                    content: '是否前往购物车',
                    btn: ['NO', 'YES'],
                    btn2: function(index, layero) {
                        location.assign('./shoppingcar.html')
                    }
                });
            } else if (status == 200 && data.code == 401) {
                // 如果登录过期,则重新登录,首先清除local中的数据
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                // 跳转
                location.assign('./login.html?ReturnUrl=./list-shop.html')
            } else {
                layer.open({
                    title: '商品添加失败',
                    content: '商品添加失败',
                    time: 3000


                });
            }


        })

    }

    lazyLoader = () => {
        // 需要滚动条高度,可视区高度,实际内容高度
        let top = document.documentElement.scrollTop;
        // console.log(top, 't');
        let cliH = document.documentElement.clientHeight;
        // console.log(cliH, 'c');
        let conH = this.$('.sk_bd').offsetHeight;
        // console.log(conH);
        // 但滚动条高度+可视区的高度> 实际内容高度时,就加载新数据
        if (top + cliH > (conH + 450)) {
            // 一瞬间就满足条件,会不停的触发数据加载,使用节流和防抖

            // 如果是锁着的,就结束代码执行
            if (this.lock) return;
            this.lock = true;
            // 指定时间开锁,才能进行下次数据清除
            setTimeout(() => {
                    this.lock = false;
                }, 1000)
                // console.log(1111);
            this.getData(++this.currentPage)
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
        let gwc = document.querySelector('.act1');

        gwc.onmouseover = function() {
            // console.log(1);
            let gwclist = gwc.querySelector('div');
            // console.log(gwclist);
            gwclist.style.display = 'block'
        }
        gwc.onmouseout = function() {
            // console.log(1);
            let gwclist = gwc.querySelector('div');
            // console.log(gwclist);
            gwclist.style.display = 'none'
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