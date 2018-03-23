var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')
const maxWidth = 1000;
let height = 20;
const text = '我的电脑只有4G运行内存，采用默认的idea配置，内存在30分钟内会飚到　>80% ,同时会发生OOM!Chrome就不敢打开！通过上面的配置可以将内存使用降低一半以上，只有idea和chrome 的话，内存才刚刚　40%　。下面的可以看也可以不看了，下面的分析是别人就行了分析，通过阅读可见他的电脑内存的确不小（16G的macbook pro），对于我们学生党，默默的使用着4G内存的电脑，就不多说上面了！不过，参与讨论的一位开发者给笔者发了一份他的设置，虽然是针对同个项目，该设置却极其复杂。笔者对自己的设置并无不满，但非常好奇，这些完全不同的设置对比 JetBrains 提供的默认设置。';
const rlen = 63; // 一行最多的字符长度
const len = text.length; // 所有字符长度
const temp = Math.ceil(len / rlen); // 总行数

var canvas = Canvas.createCanvas(maxWidth, temp * height)
var ctx = canvas.getContext('2d')

ctx.globalAlpha = 1
ctx.font = '14px Microsoft Yahei'
ctx.lineWidth = 1
ctx.fillStyle = '#000'

const arrText = text.split('');
let line = '';
let y = 20;
const lineHeight = 25;

  for (var n = 0; n < arrText.length; n++) {
      var testLine = line + arrText[n];
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 0, y);
        line = arrText[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    //  console.log(line)
  }
ctx.fillText(line, 0, y);

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'text.png')))