<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <svg t="1647063049005" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2188" width="16" height="16"><path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m3.008-92.992a416 416 0 1 0 0-832 416 416 0 0 0 0 832zM448 448h128v384H448V448z m0-256h128v128H448V192z" fill="#bfbfbf" p-id="2189"></path></svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name:'Detail',
  props:['title','count'],
  data(){
    return{
      
    }
  }
}
</script>

<style scoped>
.card-header{
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
  /* font-size: 12px; */
}
.card-content{
  font-size: 30px;
  padding: 10px 0px;
}
.card-charts{
  height:50px ;
  
}
.card-footer{
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>