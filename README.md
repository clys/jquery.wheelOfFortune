
     初始化
      $(xxx).wheelOfFortune({
      'wheelImg':,//转轮图片
      'pointerImg':,//指针图片
      'buttonImg':,//开始按钮图片
      'wSide':,//转轮边长(默认使用图片宽度)
      'pSide':,//指针边长(默认使用图片宽度)
      'bSide':,//按钮边长(默认使用图片宽度)
      'items':,//奖品角度配置{键:[开始角度,结束角度],键:[开始角度,结束角度],......}
      'pAngle':,//指针图片中的指针角度(x轴正值为0度，顺时针旋转 默认0)
      'type':,//旋转指针还是转盘('p'指针 'w'转盘 默认'p')
      'fluctuate':,//停止位置距角度配置中点的偏移波动范围(0-1 默认0.8)
      'rotateNum':,//转多少圈(默认12)
      'duration':,//转一次的持续时间(默认5000)
      'click':,//点击按钮的回调
      'rotateCallback'//转完的回调
      });
     
     转到目标奖项
      $(xxx).wheelOfFortune('rotate',key,type);
      'rotate':调用转方法
      key:初始化中items的键
      type:旋转指针还是转盘('p'指针 'f'转盘) 优先于初始化的type
