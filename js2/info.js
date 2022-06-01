class List {
    constructor() {
            this.getData();
            // this.$('.sk_bd')
            this.bindEve();
            this.erji();
            this.getCartData();
        }
        // 放大镜








    // 获取数据(){}
    async getData() {
        let uId = localStorage.getItem('user_id');
        let { status, data } = await axios.get('http://localhost:8888/goods/item', {
            params: { id: uId }
        });

        if (status != 200 && data.code != 1) {
            throw new Error('获取数据失败')
        }


        // 3 循环渲染数据,追加到页面中
        // console.log(data.info);

        let html = ''

        html += `<div class="d1" data-id='${data.info.goods_id}'>
                <div class="preview_wrap fl">
                    <div class="preview_img">
                    <div class="small">
                    <img src="${data.info.img_big_logo}" width="100%" alt="">
                    <div class="mask"></div>
                </div>
                        <div class="big">
                            <img src="${data.info.img_big_logo}" width="800px" alt="" class="bigimg">
                        </div>
                    </div>

            </div>
            <div class="itemInfo_wrap fr">
                <div class="sku_name">
                    ${data.info.title}
                </div>
                <div class="news">
                    购买1-50件时享受单件价￥${data.info.current_price}，超出数量以结算价为准
                </div>
                <div class="summary">
                    <dl class="summary_price">
                        <dt>闪购价</dt>
                        <dd>
                            <i class="price">¥${data.info.current_price}</i>
                            <a href="#">降价通知</a>
                            <div class="remark">累计评价51万+</div>
                        </dd>
                    </dl>

                    <dl class="summary_support">
                        <dt>支持</dt>
                        <dd>超值抢 礼品购</dd>
                    </dl>
                    <dl class="summary_stock">
                        <dt>配送至</dt>
                        <dd>
                            北京海淀区中关有货 支持 99元免运费 |货到付款 |211限时达
                            <br>由自营发货，并提供售后服务。11:00前完成下单，预计今天（11月19日）送达
                        </dd>
                    </dl>

                    <dl class="choose_version">
                        <dt>选择版本</dt>
                        <dd>
                            <a href="javascript:;" class="current">公开版</a>
                            <a href="javascript:;">移动4G</a>
                        </dd>
                    </dl>

                    <div class="choose_btns">
                        <div class="choose_amount">
                            <input type="text" value="1">
                            <a href="javascript:;" class="add">+</a>
                            <a href="javascript:;" class="reduce">-</a>
                        </div>
                        <a class="addCar">加入购物车</a>
                    </div>
                </div>
            </div>
        </div>`

        // console.log(html);
        // // 将拼接好的字符串追加到ul中
        // // console.log(this.$('.sk_bd ul'));

        // console.log(this.$('.product_intro'));
        this.$('.product_intro').innerHTML += html;

        let goodsId = this.$('.product_intro .d1 ').dataset.id - 0



    }







    // 绑定事件的方法
    bindEve() {

        // 给ul绑定事件
        // this.addCart是ul的事件回调方法,内部this默认指向当前节点
        this.$('.product_intro').addEventListener('click', this.addCart.bind(this))
        this.$('.product_intro').addEventListener('mouseenter', this.addSearch.bind(this))

    }







    // 放大镜
    addSearch() {
        let box = this.$('.preview_img ')
        let small = this.$('.preview_img .small')
        let big = this.$('.preview_img .big')
        let mask = this.$('.preview_img .small .mask')
        let img = this.$('.preview_img .big img')

        small.onmouseenter = function() {
            big.style.display = 'block'
            mask.style.display = 'block'
                // console.log(1);
        }
        small.onmouseleave = function() {
            big.style.display = 'none'
            mask.style.display = 'none'
                // console.log(1);
        }
        small.onmousemove = function(eve) {
            let mousex = eve.pageX;
            let mousey = eve.pageY;
            // console.log(mousex, mousey);

            // 2.3 获取box的位置
            let boxl = box.offsetLeft;
            let boxt = box.offsetTop;
            // console.log(boxl, boxt);

            // 2.4  获取遮罩的大小
            let maskw = mask.offsetWidth;
            let maskh = mask.offsetHeight;

            // 让鼠标位于遮罩的中心
            let tmpx = mousex - boxl - maskw / 2;
            let tmpy = mousey - boxt - maskh / 2;

            // console.log(tmpx, tmpy);

            // 设置目标最大移动距离
            let targetx = small.offsetWidth - maskw;
            let targety = small.offsetHeight - maskh;
            // 判断是否到达最大距离
            if (tmpx < 0) tmpx = 0;
            if (tmpy < 0) tmpy = 0;
            if (tmpx > targetx) tmpx = targetx
            if (tmpy > targety) tmpy = targety

            mask.style.left = tmpx + 'px';
            mask.style.top = tmpy + 'px';


            // 计算大图能够移动的最大的位置
            let imgmaxl = img.offsetWidth - big.offsetWidth;
            let imgmaxt = img.offsetHeight - big.offsetHeight;
            // console.log(imgmaxl, imgmaxt);

            // 小黄块的实时位置/小黄块移动的最大位置 == ===  大图实时位置/大图能够移动的最大位置
            let imgwzl = tmpx / targetx * imgmaxl;
            let imgwzt = tmpy / targety * imgmaxt;

            // 4-5 将计算的大图实时位置进行设置
            img.style.left = -imgwzl + 'px';
            img.style.top = -imgwzt + 'px';
        }

    }

    // 添加到购物车
    addCart(eve) {
        // console.log(1);
        // console.log(111);
        // console.log(this);

        // 获取事件源,判断点击的是否为a标签
        // console.log(eve.target.classList);
        if (eve.target.nodeName != 'A' || eve.target.className != 'addCar')
            return;
        // console.log(eve.target);


        // 判断用户是否登录,如果local中有token,表示登录,没有则表示未登录
        let token = localStorage.getItem('token');
        // console.log(token);
        // 没有token表示未登录,跳转到登录页面
        if (!token) location.assign('./login.html?ReturnUrl=./shop-info.html')
        let goodsId = eve.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
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
                location.assign('./login.html?ReturnUrl=./shop-info.html')
            } else {
                layer.open({
                    title: '商品添加失败',
                    content: '商品添加失败',
                    time: 3000


                });
            }


        })

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