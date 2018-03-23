var node_echarts = require("node-echarts");
var Path = require("path");
const { createCanvas } = require("canvas");
const text =
  "我的电脑只有4G运行内存，采用默认的idea配置，内存在30分钟内会飚到　>80% ,同时会发生OOM!Chrome就不敢打开！通过上面的配置可以将内存使用降低一半以上，只有idea和chrome 的话，内存才刚刚　40%　。下面的可以看也可以不看了，下面的分析是别人就行了分析，通过阅读可见他的电脑内存的确不小（16G的macbook pro），对于我们学生党，默默的使用着4G内存的电脑，就不多说上面了！不过，参与讨论的一位开发者给笔者发了一份他的设置，虽然是针对同个项目，该设置却极其复杂。笔者对自己的设置并无不满，但非常好奇，这些完全不同的设置对比 JetBrains 提供的默认设置。";

const buildText = () => {
  const graphicY = 15;
  const lineY = 20;
  let gridBottom = 90;
  let legendBottom = 35;
  const maxWidth = 900;
  const canvas = createCanvas(maxWidth, 100);
  const ctx = canvas.getContext("2d");
  ctx.font = "normal 14px SongTi";
  const arrText = text.split("");
  let line = "";
  const newArrs = [];
  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n];
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;

    if ((testWidth > maxWidth) & (n > 0)) {
      line = arrText[n];
      newArrs.push(testLine.substr(0, testLine.length - 1));
    } else {
      line = testLine;
    }
  }
  newArrs.push(line);
  //console.log(newArrs);
  const row = newArrs.length;
  if (row > 1) {
    gridBottom = row * graphicY + gridBottom;
    legendBottom = row * graphicY + legendBottom;
  }
  let graphics = [];
  for (let k = 0; k < row; k++) {
    const temp = {
      type: "text",
      left: "5%",
      bottom: (row - 1 - k) * lineY,
      style: {
        fill: "#333",
        text: [`${newArrs[k]}`].join("\n"),
        font: "14px SongTi"
      }
    };
    graphics.push(temp);
  }
  // console.log(graphics);
  return {
    graphic: graphics,
    gridBottom: gridBottom,
    legendBottom: legendBottom
  };
  //return newArrs;
};
const texts = buildText();
//console.log(texts);
const config = {
  legend: {
    bottom: texts.legendBottom,
    show: true,
    data: ["身份证数量", "环比增长率"]
  },
  grid: { bottom: texts.gridBottom },
  xAxis: [
    {
      type: "category",
      data: [
        "201701",
        "201702",
        "201703",
        "201704",
        "201705",
        "201706",
        "201707",
        "201708",
        "201709",
        "201710",
        "201711",
        "201712",
        "201801"
      ],
      axisLabel: { interval: 0 },
      axisPointer: { type: "shadow" },
      splitLine: { show: false }
    }
  ],
  yAxis: [
    { type: "value", axisLabel: { formatter: null } },
    { type: "value", axisLabel: { formatter: "{value}%" } }
  ],
  series: [
    {
      type: "bar",
      name: "身份证数量",
      data: [
        23620000,
        21060000,
        26420000,
        30180000,
        31430000,
        34100000,
        33740000,
        40170000,
        39910000,
        38420000,
        49300000,
        50710000,
        46550000
      ],
      yAxisIndex: 0
    },
    {
      type: "line",
      name: "环比增长率",
      data: [
        -23,
        -12.13,
        20.26,
        12.46,
        4,
        7.82,
        -1.09,
        16.02,
        -0.65,
        -3.88,
        22.05,
        2.79,
        -8.95
      ],
      yAxisIndex: 1
    }
  ],
  color: ["#4498f6", "#d9e96c"]
};
config.graphic = texts.graphic;

node_echarts({
  width: 1000,
  height: 426,
  option: config,
  path: Path.join(__dirname, "./charts.png")
});

process.exit();
