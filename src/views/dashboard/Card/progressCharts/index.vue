<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echates from "echarts";
export default {
  mounted() {
    let lineCharts = echates.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        // 隐藏
        show:false,
        min:0,
        max:100,
      },
      yAxis: {
         show:false,
         // 均分
        type:'category'
      },
      series: [{
        type:'bar',
        data:[78],
        color:'yellow',
        barWidth:10,
        color:'yellowgreen',
        // 背景颜色
        showBackground:true,
        // 设置背景颜色
        backgroundStyle:{
          color:'#eee'
        },
        // 文本
        label:{
          show:true,
          // 改变文本内容
          formatter:'|',
          // 文本标签位置调试
          position:'right'
        }
      }],
      grid:{
        left:0,
        right:0,
        top:0,
        bottom:0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>