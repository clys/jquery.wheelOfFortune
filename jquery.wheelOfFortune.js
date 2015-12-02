(function (jQuery) {
    var version = "1.0",
        pluginName = "jQuery.wheelOfFortune",
        elePool = {}, elePoolSB = 0, pluginTagName = "wof-tag",
        configPool = {},
        defaultParam = {
            rotateNum: 5,
            duration: 5000,
            type: 'p',
            pAngle: 0,
            rotateCallback: function () {
            },
            click: function () {
            },
            inRotation: false
        };

    /* private methods ------------------------------------------------------ */

    /**
     * 生成转盘html
     * @param pointer
     */
    function build(pointer) {
        var param = configPool[pointer],
            fortuneImg = param['fortuneImg'],
            pointerImg = param['pointerImg'],
            buttonImg = param['buttonImg'],
            fSide = param['fSide'],
            pSide = param['pSide'],
            bSide = param['bSide'],
            pOffset = fSide / 2 - pSide / 2,
            bOffset = fSide / 2 - bSide / 2,
            html =
                '<img src="' + fortuneImg + '" style="position:absolute;width:' + fSide + 'px;height:' + fSide + 'px;" f/>' +
                '<img src="' + pointerImg + '" style="position:absolute;width:' + pSide + 'px;height:' + pSide + 'px;top:' + pOffset + 'px;left:' + pOffset + 'px;" p/>' +
                '<img src="' + buttonImg + '" style="position:absolute;width:' + bSide + 'px;height:' + bSide + 'px;top:' + bOffset + 'px;left:' + bOffset + 'px;cursor:pointer;" b/>';
        this.css({'width': fSide, 'height': fSide});
        this.html(html);
        this.find("[b]").on('click', click);
    }

    /**
     * 获取转盘索引
     * @param ele
     * @returns {*|jQuery}
     */
    function getPointer(ele) {
        return $(ele).parent('[' + pluginTagName + ']').attr(pluginTagName);
    }

    /**
     * 点击按钮
     * @param e
     */
    function click(e) {
        e.preventDefault();
        var pointer = getPointer(this),
            callback = configPool[pointer]['click'];
        if (configPool[pointer]['inRotation']) {
            return;
        }
        callback();
    }

    /**
     * 旋转转盘
     * @param key
     * @param t
     */
    function rotate(key, t) {
        var pointer = this.attr(pluginTagName),
            config = configPool[pointer],
            item = config['items'][key],
            start = item[0], end = item[1],
            target = start + ran(end - start),
            type = t || config['type'],
            callback = function () {
                configPool[pointer]['inRotation'] = false;
                config['rotateCallback'](key);
            };
        if (configPool[pointer]['inRotation']) {
            return;
        }
        configPool[pointer]['inRotation'] = true;

        switch (type) {
            case 'f':
                this.find("[f]").rotate({
                    duration: config['duration'],
                    angle: 0 + config['pAngle'],
                    animateTo: 360 - target + config['rotateNum'] * 360 + config['pAngle'],
                    callback: callback
                });
                break;
            case 'p':
                this.find("[p]").rotate({
                    duration: config['duration'],
                    angle: 0 - config['pAngle'],
                    animateTo: target + config['rotateNum'] * 360 - config['pAngle'],
                    callback: callback
                });
                break;
        }
    }


    function ran(n) {
        return parseInt(Math.random() * n);
    }

    /* public methods ------------------------------------------------------- */
    var methods = {
        init: function (parameter) {
            var param = defaultParam;
            $.extend(param, parameter);
            var pointer = elePoolSB++;
            elePool[pointer] = this;
            configPool[pointer] = param;
            this.attr(pluginTagName, pointer);
            build.apply(this, [pointer]);
        },
        rotate: function () {
            rotate.apply(this, arguments);
        },
        version: function () {
            return version;
        },
        ver: function () {
            return version;
        }

    };


    /**
     * <b>初始化</b>
     * $(xxx).wheelOfFortune({
     * 'fortuneImg':,//转轮图片
     * 'pointerImg':,//指针图片
     * 'buttonImg':,//开始按钮图片
     * 'fSide':,//转轮边长
     * 'pSide':,//指针边长
     * 'bSide':,//按钮边长
     * 'items':,//奖品角度配置{键:[开始角度,结束角度],键:[开始角度,结束角度],......}
     * 'type':,//旋转指针还是转盘('p'指针 'f'转盘 默认'p')
     * 'rotateNum':,//转多少圈(默认5)
     * 'duration':,//转一次的持续时间(默认5000)
     * 'pAngle':,//指针图片中的指针角度(x轴正值为0度，顺时针旋转 默认0)
     * 'click':,//点击按钮的回调
     * 'rotateCallback'//转完的回调
     * });
     *
     * <b>转到目标奖项</b>
     * $(xxx).wheelOfFortune('rotate',key,type);
     * 'rotate':调用转方法
     * key:初始化中items的键
     * type:旋转指针还是转盘('p'指针 'f'转盘) 优先于初始化的type
     */
    jQuery.fn.wheelOfFortune = function (method) {
        if (this.size() !== 1) {
            var err_msg = "这个插件(" + pluginName + ")一次只能对一个元素使用;size:" + this.size();
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("方法 " + method + "不存在于" + pluginName);
        }

    };
})(jQuery);