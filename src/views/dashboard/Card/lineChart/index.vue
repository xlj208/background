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
        show:false,
        type:'category'
      },
      yAxis: {
         show:false,
      },
      series: [{
        type:'line',
        data:[10,7,33,12,48,9,29,10,44],
        // 拐点样式设置
        itemStyle:{
          opacity:0
        },
        // 折线颜色
        lineStyle:{
          color:"purple"
        },
        // 填充颜色
        areaStyle:{
          color:{
            type:"linear",
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[
              {
                offset:0,
                color:"purple",
              },
              {
                offset:1,
                color:"#fff",
              },
            ],
            global:false,
          }
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