$(function () {
    DomeWebController.init();
});


DomeWebController = {
    pool: {
        element: {}
    },
    getEle: function (k) {
        return DomeWebController.pool.element[k];
    },
    setEle: function (k, v) {
        DomeWebController.pool.element[k] = v;
    },
    init: function () {
        var that = DomeWebController;
        that.inits.element();
        that.inits.event();
        that.build();
    },
    inits: {
        element: function () {
            var that = DomeWebController;
            that.setEle("$wheelContainer", $('#wheel_container'));
            that.setEle("$wheelContainer2", $('#wheel_container2'));

        },
        event: function () {
            var that = DomeWebController;

        }
    },
    build: function () {
        var that = DomeWebController;
        that.getEle("$wheelContainer").wheelOfFortune({
            'wheelImg': "static/img/wheel_1/wheel.png",//转轮图片
            'pointerImg': "static/img/wheel_1/pointer.png",//指针图片
            'buttonImg': "static/img/wheel_1/button.png",//开始按钮图片
            //'wSide': 400,//转轮边长(默认使用图片宽度)
            //'pSide': 191,//指针边长(默认使用图片宽度)
            //'bSide': 87,//按钮边长(默认使用图片宽度)
            'items': {2: [41, 128], 3: [129, 219], 4: [220, 310], 1: [311, 400]},//奖品角度配置{键:[开始角度,结束角度],键:[开始角度,结束角度],......}
            'pAngle': 270,//指针图片中的指针角度(x轴正值为0度，顺时针旋转 默认0)
            //'type': 'w',//旋转指针还是转盘('p'指针 'w'转盘 默认'p')
            //'fluctuate': 0.5,//停止位置距角度配置中点的偏移波动范围(0-1 默认0.8)
            //'rotateNum': 12,//转多少圈(默认12)
            //'duration': 6666,//转一次的持续时间(默认5000)
            'click': function () {
                if(1==1){}
                var key = parseInt(Math.random() * 4) + 1;
                that.getEle("$wheelContainer").wheelOfFortune('rotate', key,'w');
            },//点击按钮的回调
            'rotateCallback': function (key) {
                alert("左:" + key);
            }//转完的回调
        });

        that.getEle("$wheelContainer2").wheelOfFortune({
            'wheelImg': "static/img/wheel_1/wheel.png",//转轮图片
            'pointerImg': "static/img/wheel_1/pointer.png",//指针图片
            'buttonImg': "static/img/wheel_1/button.png",//开始按钮图片
            //'wSide': 400,//转轮边长(默认使用图片宽度)
            //'pSide': 191,//指针边长(默认使用图片宽度)
            //'bSide': 87,//按钮边长(默认使用图片宽度)
            'items': {2: [41, 128], 3: [129, 219], 4: [220, 310], 1: [311, 400]},//奖品角度配置{键:[开始角度,结束角度],键:[开始角度,结束角度],......}
            'pAngle': 270,//指针图片中的指针角度(x轴正值为0度，顺时针旋转 默认0)
            //'type': 'w',//旋转指针还是转盘('p'指针 'w'转盘 默认'p')
            //'fluctuate': 0.5,//停止位置距角度配置中点的偏移波动范围(0-1 默认0.8)
            //'rotateNum': 12,//转多少圈(默认12)
            //'duration': 6666,//转一次的持续时间(默认5000)
            'click': function () {
                var key = parseInt(Math.random() * 4) + 1;
                that.getEle("$wheelContainer2").wheelOfFortune('rotate', key);
            },//点击按钮的回调
            'rotateCallback': function (key) {
                alert("右:" + key);
            }//转完的回调
        });
    }
};