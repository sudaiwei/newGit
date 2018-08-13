//index.js
//获取应用实例


// function getRandomColor () {
//     let rgb = []
//     for (let i = 0; i < 3; ++i) {
//         let color = Math.floor(Math.random() * 256).toString(16)
//         color = color.length == 1 ? '0' + color : color
//         rgb.push(color)
//     }
//     return '#' + rgb.join('')
// }
// // get radios
// Page({
//     onReady: function (res) {
//         this.videoContext = wx.createVideoContext('myVideo')
//     },
//     inputValue: '',
//     data: {
//         src: '',
//         danmuList: [
//             {
//                 text: '第 1s 出现的弹幕',
//                 color: '#ff0000',
//                 time: 1
//             },
//             {
//                 text: '第 3s 出现的弹幕',
//                 color: '#ff00ff',
//                 time: 3
//             }]
//     },
//     bindInputBlur: function (e) {
//         this.inputValue = e.detail.value
//     },
//     bindButtonTap: function () {
//         var that = this
//         wx.chooseVideo({
//             sourceType: ['album', 'camera'],
//             maxDuration: 60,
//             camera: ['front', 'back'],
//             success: function (res) {
//                 that.setData({
//                     src: res.tempFilePath
//                 })
//             }
//         })
//     },
//     bindSendDanmu: function () {
//         this.videoContext.sendDanmu({
//             text: this.inputValue,
//             color: getRandomColor()
//         })
//     },



// ========take photos

// takePhoto() {
//     const ctx = wx.createCameraContext()
//     ctx.takePhoto({
//         quality: 'high',
//         success: (res) => {
//             this.setData({
//                 src: res.tempImagePath
//             })
//         }
//     })
// },
// error(e) {
//     console.log(e.detail)
// }



// input.js


Page({
    data: {
        focus: false,
        inputValue: '',
        chsre: 'hello world',
        hidden: true,
        second: 3,
        textCount: 100,
        methods: ['＋', '-', 'x', '÷'],
        methodChar:'',
        mathCheckNum:[1,1,1,1],
        mathCheckNumOne:1,
        mathCheckNumTwo: 1,
        mathCheckNumThree: 1,
        mathNumTwo:0,
        mathNumThree:1,
        result:1,
        randomNum:0,
        rightCount:0

    },

    tap: function () {
        this.setData({
            hidden: false
        })
    },
    tapOne: function () {
        this.setData({
            hidden: true
        })
    },
    exitbtu: function(){

        wx.reLaunch({
            url: '../index/index',
        })
    },
    onLoad() {
        console.log('当页面加载完加触发')

        judgeTime(this)

         Nums(this)

         
        
    },

    //点击剩余题目数
    onclick: function (e) {
      var num = e.currentTarget.dataset.num;
      var result = this.data.result;
      var rightCount = this.data.rightCount;
      var second = this.data.second ;
       if(num == result){
           rightCount = rightCount + 1; 
           countTextNum(this);
           Nums(this);
           this.setData({ 
               rightCount: rightCount,
               second :3,
              
           });
      }else{
           countTextNum(this);
           Nums(this);
           this.setData({
               second: 3,
               
           });
           
      }

       
        console.log(num,result)
    },
    
})

//设置倒计时
function countdown(that) {
    var second = that.data.second
    var time = setTimeout(function () {
        that.setData({
            second: second - 1

        });
        if (second > 0) {
            countdown(that);
        } else {
            that.setData({
                second: 3,

            });
            countdown(that);
            Nums(that);
            countTextNum(that);
            
            
        }

    }
        , 1000)
}


//判读倒计时
function judgeTime(that) {
    countdown(that);
    
}

//随机数取出
function Nums(that) {
    var mathCheckNumOne = that.data.mathCheckNumOne
    var mathCheckNumTwo = that.data.mathCheckNumTwo
    var mathCheckNumThree = that.data.mathCheckNumThree
    var mathNumTwo = that.data.mathNumTwo
    var mathNumThree = that.data.mathNumThree
    var result = that.data.result
    var methodChar = that.data.methodChar
    var mathCheckNum = that.data.mathCheckNum
    var randomNum = that.data.randomNum
    //取值
    methodChar = findMethod(that),
    mathCheckNumOne = random(),
    mathCheckNumTwo = random(),
    mathCheckNumThree = random(),
    
    mathNumTwo = random(),
    mathNumThree = random(),
    result = calculate(methodChar, mathNumTwo, mathNumThree),
   
    randomNum = randomNums(),
        mathCheckNum[2] = mathCheckNumOne,
        mathCheckNum[0] = mathCheckNumTwo,
        mathCheckNum[3] = mathCheckNumThree,
        mathCheckNum[randomNum] = result,
    that.setData({
        mathCheckNumOne: mathCheckNumOne,
        mathCheckNumTwo: mathCheckNumTwo,
        mathCheckNumThree: mathCheckNumThree,
        mathNumTwo: mathNumTwo,
        mathNumThree: mathNumThree,
        methodChar: methodChar,
        result:result ,
        mathCheckNum: mathCheckNum,
        randomNum: randomNum,
   
    });


    //找到运算符号
   function findMethod(that) {

    var method = that.data.methods
    var i = Math.floor(Math.random() * 4 + 0)
    return  method[i];
   }
    //设置随机数
    function random() {
        return Math.floor(Math.random() * (-10 + 30 + 1) - 30);
        }
   function randomNums(){
        return Math.floor(Math.random() * 4 + 0);
    }
        //计算
    function calculate(method, random1, random2){
        if (method == '＋'){
           return random1 + random2;
        }
        else if (method == '-') {
            return random1 - random2;
        } 
        else if (method == 'x') {
            return random1 * random2;
        }
        else if (method == '÷') {
            return (random1 / random2).toFixed(2);
        }


    }
}

    //     if (methodChar == 'dd') {
    //         return random1 + random2;
    //     }


    // } //
    // function sub(random1, random2) {
    //     return random1 - random2;


    // }
    // function mut(random1, random2) {
    //     return random1 * random2;


    // }
    // function div(random1, random2) {
    //     return random1 / random2;


    // }
// }

//设置点击题目减少
function countTextNum(that) {
    var second = that.data.second
    var textNum = that.data.textCount
    textNum = textNum - 1
    if (!(textNum == -1)) {
        that.setData({
            textCount: textNum,
             second: 3

        });

    }
    if (textNum == 0){
        
        
        //重新加载
            wx.reLaunch({
                url: '../index/index',
            })

        
    }

}
//
// function findMethod(that){
    
//     var method = that.data.methods;
//     var i = Math.floor(Math.random() * 3 + 0);
//      that.setData({
//          methodChar: method[i]
//         });
//      var result = that.data.result;
//      var mathCheckNum = that.data.mathCheckNum
//      var mathNumTwo = that.data.mathNumTwo
//      var mathNumThree = that.data.mathNumThree

//      if (methodChar == '＋') {
//          result = mathNumTwo + mathNumThree
//          that.setData({
//              result: result
//          });
//      }


//      if (methodChar == '-') {
//          result = mathNumTwo - mathNumThree
//          that.setData({
//              result: result
//          });
//      }

//      if (methodChar == 'x') {
//          result = mathNumTwo * mathNumThree
//          that.setData({
//              result: result
//          });
//      }


//      if (methodChar == '/') {
//          result = mathNumTwo / mathNumThree
//          that.setData({
//              result: result
//          });
     

//     }

//     }
    //计算
// function caculateNums(that){

//     var method = that.data.methods;
//     var mathCheckNum = that.data.mathCheckNum
//     var mathNumTwo = that.data.mathNumTwo
//     var mathNumThree = that.data.mathNumThree
//     var result = that.data.result

//     //乘除法, '-', 'x', '/'
//     if (methodChar == '＋') {
//         result = mathNumTwo + mathNumThree
//         that.setData({
//             result: result
//         });
//     }


//     if (methodChar == '-') {
//         result = mathNumTwo - mathNumThree
//         that.setData({
//             result: result
//         });
//     }

//     if (methodChar == 'x') {
//         result = mathNumTwo * mathNumThree
//         that.setData({
//             result: result
//         });
//     }


//     if (methodChar == '/') {
//         result = mathNumTwo / mathNumThree
//         that.setData({
//             result: result
//         });


//     }

// }
    


// function getRandomMethod(that){
//     var methods = that.data.methods 
//     for(){

//     }

// }



    // bindButtonTap: function () {
    //     this.setData({
    //         focus: true
    //     })
    // },
    // bindKeyInput: function (e) {
    //     this.setData({
    //         inputValue: e.detail.value
    //     })
    // },
    // bindReplaceInput: function (e) {
    //     var value = e.detail.value
    //     var pos = e.detail.cursor
    //     if (pos != -1) {
    //         //光标在中间
    //         var left = e.detail.value.slice(0, pos)
    //         //计算光标的位置
    //         pos = left.replace(/11/g, '2').length
    //     }

    //     //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    //     return {
    //         value: value.replace(/11/g, '2'),
    //         cursor: pos
    //     }

    //     //或者直接返回字符串,光标在最后边
    //     //return value.replace(/11/g,'2'),
    // }




// web-view下的页面内


// Page({
//     onShareAppMessage(options) {
//         console.log(options.webViewUrl)
//     }
// })
// function ready() {
//     console.log(window.__wxjs_environment === 'miniprogram') // true
// }
// if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
//     document.addEventListener('WeixinJSBridgeReady', ready, false)
// } else {
//     ready()
// }

// // 或者
// wx.miniProgram.getEnv(function (res) {
//     console.log(res.miniprogram) // true
// })

