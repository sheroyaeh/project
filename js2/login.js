class Login {
    constructor() {
            // console.log(this.$('.btn'));
            // 给登录按钮绑定事件
            // this.islogin();
            // 箭头函数作为元素事件的回调函数时,this也指向宿主,不会指向节点对象
            this.$('.btn').addEventListener('click', this.islogin)
                // console.log(location.search.split('='));
                // 判断当时是否有回跳页面
            let search = location.search;
            if (search) {
                this.url = search.split('=')[1]
            }
        }
        // 实现登录
    islogin = () => {
        console.log(this);
        let form = document.forms[0].elements;
        console.log(form);
        let username = form[0].value.trim();
        // console.log(username);
        let password = form[1].value.trim();


        // 非空验证
        if (!username || !password) throw new Error('用户名或者密码不能为空')

        // console.log(username, password);
        // 发送ajax请求,实现登录
        // 当变量名和属性名一致时,直接写变量名
        // axios 默认以json的形式请求和编码参数
        // axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
        // key=val&key=val
        let param = `username=${username}&password=${password}`
        axios.post(' http://localhost:8888/users/login', param, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            // console.log(res);
            // 判断登录状态,将用户信息进行保存
            if (res.status == 200 && res.data.code == 1) {
                // 将token和user保存到local
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user.id);

                // 如果有回跳地址则跳转
                if (this.url) {
                    location.href = this.url
                }
            }
        })
    }


    $(ele) {
        let res = document.querySelectorAll(ele);
        // console.log(ele);
        // console.log(res);
        // 如果获取到的是单个节点集合,就返回单个节点,如果是多个节点集合,就返回多个节点集合
        return res.length == 1 ? res[0] : res;
    }
}
new Login;