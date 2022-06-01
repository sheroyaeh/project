class search {
    constructor() {

        this.getTag();
        this.bindEve();
    }
    bindEve() {

        // 给ul绑定事件
        // this.addCart是ul的事件回调方法,内部this默认指向当前节点
        this.$('.product_intro').addEventListener('click', this.addCart.bind(this))


    }
    getTag() {
        this.box = document.querySelector('#box')
        this.small = document.querySelector('#small')
        this.mask = document.querySelector('#mask')
        this.big = document.querySelector('#big')
        this.img = document.querySelector('#img')
        console.log(this.box);


    }
    bindEve() {

        this.small.onmouseenter = this.enterFn.bind(this);
        this.small.onmouseleave = this.leaveFn.bind(this);
        this.small.onmousemove = this.moveFn.bind(this)
    }
    enterFn() {
        this.big.style.display = 'block';
        this.mask.style.display = 'block';
    }
    leaveFn() {
        this.big.style.display = 'none';
        this.mask.style.display = 'none';
    }
    moveFn(eve) {

        let mousex = eve.pageX;
        let mousey = eve.pageY;
        // console.log(mousex, mousey);

        // 2.3 获取box的位置
        let boxl = this.box.offsetLeft;
        let boxt = this.box.offsetTop;
        // console.log(boxl, boxt);

        // 2.4  获取遮罩的大小
        let maskw = this.mask.offsetWidth;
        let maskh = this.mask.offsetHeight;

        // 让鼠标位于遮罩的中心
        let tmpx = mousex - boxl - maskw / 2;
        let tmpy = mousey - boxt - maskh / 2;

        // console.log(tmpx, tmpy);

        // 设置目标最大移动距离
        let targetx = this.small.offsetWidth - maskw;
        let targety = this.small.offsetHeight - maskh;
        // 判断是否到达最大距离
        if (tmpx < 0) tmpx = 0;
        if (tmpy < 0) tmpy = 0;
        if (tmpx > targetx) tmpx = targetx
        if (tmpy > targety) tmpy = targety

        this.mask.style.left = tmpx + 'px';
        this.mask.style.top = tmpy + 'px';


        // 计算大图能够移动的最大的位置
        let imgmaxl = this.img.offsetWidth - this.big.offsetWidth;
        let imgmaxt = this.img.offsetHeight - this.big.offsetHeight;
        // console.log(imgmaxl, imgmaxt);

        // 小黄块的实时位置/小黄块移动的最大位置 == ===  大图实时位置/大图能够移动的最大位置
        let imgwzl = tmpx / targetx * imgmaxl;
        let imgwzt = tmpy / targety * imgmaxt;

        // 4-5 将计算的大图实时位置进行设置
        this.img.style.left = -imgwzl + 'px';
        this.img.style.top = -imgwzt + 'px';
    }
}
new search;