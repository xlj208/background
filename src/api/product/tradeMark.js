import request from '@/utils/request';

export const reqTRadeMarkList = (page,limit)=>request({
  url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'
})

// 添加
// /admin/product/baseTrademark/save


// 修改
// /admin/product/baseTrademark/update
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
  if(tradeMark.id){
    return request({
      url:`/admin/product/baseTrademark/update`,method:'put',data:tradeMark
    });
  }else{
    return request({
      url:`/admin/product/baseTrademark/save`,method:'post',data:tradeMark
    });
  }
}

// 删除
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark =(id)=>request({
  url:`/admin/product/baseTrademark/remove/${id}`,method:'delete',
});


