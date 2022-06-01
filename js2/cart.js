class List {
    constructor() {
            this.erji();
            this.getCartGoods();
            this.$('#shoppingcar #d3').addEventListener('click', this.dispatch)
            this.$('.d1p1 input').addEventListener('click', this.checkAll)


        }
        // 全选的实现
    checkAll = (eve) => {
            // console.log(eve.target);
            // console.log(111);
            // console.log(this);

            // 单击全选, 应该让单个商品的选中框状态, 跟随全选
            let allStatus = eve.target.checked;
            // console.log(allStatus);
            this.oneCheckGoods(allStatus);
            this.countSumPrice();


        }
        // 让单个商品跟随全选的状态
    oneCheckGoods(status) {
        this.$('.good-checkbox').forEach(input => {
                input.checked = status
            })
            // console.log(this.$('.good-checkbox'));
    }





    // 单选的实现
    oneGoodsCheckBox() {
            // 给每个单选按钮绑定事件
            // console.log();
            this.$('.good-checkbox').forEach(input => {
                // 保存this指向
                let self = this;
                input.onclick = function() {
                    // 获取当前点击状态
                    // console.log(this.checked);
                    // 判断当前商品的input点击的是取消,则取消全选
                    if (!this.checked) {
                        self.$('.d1p1 input').checked = false;
                    }
                    // 点击选中是,判断页面中是否有其他的未选中,如果都选中,则全选
                    if (this.checked) {
                        let status = self.getOneGoodsStatus();
                        // console.log(status);
                        self.$('.d1p1 input').checked = status;
                    }
                    self.countSumPrice();

                }
            })
        }
        // 单个商品的选中状态
    getOneGoodsStatus() {
        let res = Array.from(this.$('.good-checkbox')).find(input => {
                // console.log(input.checked);
                return !input.checked
            })
            // console.log();
        return !res
    }
    countSumPrice() {
        let sum = 0;
        let num = 0;
        // 只统计选中商品
        this.$('.good-checkbox').forEach(input => {
            // console.log(input);
            if (input.checked) {
                let ul = input.parentNode.parentNode;
                // console.log(ul);

                // 获取数量和小计计算
                let tmpNum = ul.querySelector('.itxt').value - 0;
                let tmpSum = ul.querySelector('.sum').innerHTML - 0;
                // console.log(tmpNum, tmpSum);
                sum += tmpSum;
                num += tmpNum;

            }




        });

        sum = parseInt(sum * 100) / 100
        console.log(sum, num);


        this.$('.p3 .zjsp i').innerHTML = num;
        this.$('.zjjg span').innerHTML = sum;
        console.log(this.$('.summoney span'));
    }








    // 事件委托
    dispatch = (eve) => {
        // console.log(this);
        // 事件源的获取
        let target = eve.target;
        // console.log(target);
        // 判断当前点击的是删除A标签
        if (target.nodeName == 'A' && target.classList.contains('del1')) this.delGoodsData(target)
        if (target.nodeName == 'A' && target.classList.contains('plus')) this.plusGoodsNUM(target);
        if (target.nodeName == 'A' && target.classList.contains('mins')) this.minsGoodsNUM(target);
    }


    plusGoodsNUM = (tar) => {
        // console.log(tar);
        let ul = tar.parentNode.parentNode.parentNode
            // console.log(ul);
            // 获取数量的input,单价,小计
        let num = ul.querySelector('.itxt');
        let sum = ul.querySelector('.sum');
        let price = ul.querySelector('.price').innerHTML - 0;
        // num++;
        let numVal = num.value - 0;
        // 对数量进行加1 操作
        numVal++;
        // console.log(num);
        // 更新input中数量,给服务器发送数据,增加数量
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let uId = localStorage.getItem('user_id');
        let gId = ul.dataset.id;
        let param = `id=${uId}&goodsId=${gId}&number=${numVal}`
        axios.post('http://localhost:8888/cart/number', param).then(res => {
            // console.log(res);
            let { status, data } = res;
            if (status == 200 && data.code == 1) {
                // 将更新之后的数量设置回去
                num.value = numVal;
                sum.innerHTML = parseInt(numVal * price * 100) / 100;
                // 调用统计数量和价格的方法
                this.countSumPrice();
            }

        });


    }
    minsGoodsNUM = (tar) => {
        // console.log(tar);
        let ul = tar.parentNode.parentNode.parentNode
            // console.log(ul);
            // 获取数量的input,单价,小计
        let num = ul.querySelector('.itxt');
        let sum = ul.querySelector('.sum');
        let price = ul.querySelector('.price').innerHTML - 0;
        // num++;
        let numVal = num.value - 0;
        // 对数量进行加1 操作
        numVal--;
        // console.log(num);
        // 更新input中数量,给服务器发送数据,增加数量
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let uId = localStorage.getItem('user_id');
        let gId = ul.dataset.id;
        let param = `id=${uId}&goodsId=${gId}&number=${numVal}`
        axios.post('http://localhost:8888/cart/number', param).then(res => {
            // console.log(res);
            let { status, data } = res;
            if (status == 200 && data.code == 1) {
                // 将更新之后的数量设置回去
                num.value = numVal;
                sum.innerHTML = parseInt(numVal * price * 100) / 100;
                // 调用统计数量和价格的方法
                this.countSumPrice();
            }

        });

    }





    delGoodsData(tar) {
        // 找到ul上的商品的id
        // console.log(id);
        layer.confirm('是否删除商品', {
            title: '删除提示框'
        }, function() { //确认的回调函数
            // console.log(1);
            //1 给后台发送数据,删除记录
            // 找到ul上的商品id
            let ul = tar.parentNode.parentNode.parentNode
            let gId = ul.dataset.id;
            // 用户id
            let uId = localStorage.getItem('user_id');
            // console.log(gId, uId);
            const AUTH_TOKEN = localStorage.getItem('token')
            axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
            axios.get(' http://localhost:8888/cart/remove', {
                params: { id: uId, goodsId: gId }

            }).then(res => {
                // console.log(res);
                // 直接刷新删除页面
                // location.reload();

                // 无刷新删除
                // 关闭弹出框且删除对应的ul
                layer.closeAll();
                ul.remove();

            })

        })


    }




    // 数据添加
    async getCartGoods() {
        // 必须携带token
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        let { data, status } = await axios.get(' http://localhost:8888/cart/list', {
                params: { id: localStorage.getItem('user_id') }

            })
            // console.log(res);
            // 判断ajax的请求状态
        if (data.code == 1 && status == 200) {
            let html = '';
            data.cart.forEach(goods => {
                html += `<ul class="goods-list yui3-g" data-id="${goods.goods_id}">
            <li class="yui3-u-3-8 pr">
                <input type="checkbox" class="good-checkbox">
                <div class="good-item">
                    <div class="item-img">
                        <img src="${goods.img_small_logo}">
                    </div>
                    <div class="item-msg">${goods.title}</div>
                </div>
            </li>
            <li class="yui3-u-1-8">
              
            </li>
            <li class="yui3-u-1-8">
                <span class="price">${goods.current_price}</span>
            </li>
            <li class="yui3-u-1-8">
                <div class="clearfix">
                    <a href="javascript:;" class="increment mins">-</a>
                    <input autocomplete="off" type="text" value="${goods.cart_number}" minnum="1" class="itxt">
                    <a href="javascript:;" class="increment plus">+</a>
                </div>
                <div class="youhuo">有货</div>
            </li>
            <li class="yui3-u-1-8">
                <span class="sum">${goods.current_price * goods.cart_number}</span >
            </li >
              <li class="yui3-u-1-8">
                <div class="del1">
                  <a href="javascript:;" class="del1">删除</a>
                </div>
                <div>移到我的关注</div>
              </li>
        </ul >`;
            });
            this.$('#shoppingcar #d3').innerHTML += html;
            this.oneGoodsCheckBox();
        }
        // 登录过期的处理
        if (status == 200 && data.code == 401) {
            // 如果登录过期,则重新登录,首先清除local中的数据
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            // 跳转
            location.assign('./login.html?ReturnUrl=./shoppingcar.html')
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