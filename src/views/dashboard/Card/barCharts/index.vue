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
        // 均分
        type:'category'
      },
      yAxis: {
         show:false,
      },
      series: [{
        type:'bar',
        data:[10,7,33,12,48,9,29,10,44,33,22,8],
        color:'cyan'
      }],
      grid:{
        left:0,
        right:0,
        top:0,
        bottom:0,
      },
      tooltip:{}
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