import request from '@/utils/request'

// /admin/product/getCategory1
// 获取一级分类列表的接口
export const reqCategory1List = ()=>request({
  url:`/admin/product/getCategory1`,method:'get'
})


// /admin/product/getCategory2/{category1Id}
// 获取二级分类列表的接口
export const reqCategory2List = (category1Id)=>request({
  url:`/admin/product/getCategory2/${category1Id}`,method:'get'
})


// /admin/product/getCategory3/{category2Id}
// 获取三级分类列表的接口
export const reqCategory3List = (category2Id)=>request({
  url:`/admin/product/getCategory3/${category2Id}`,method:'get'
})

// 获取平台属性
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => 
request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' });

// 添加属性/属性值
// /admin/product/saveAttrInfo
export const reqAddOrUpeateAttr = (data)=>request({
  url:`/admin/product/saveAttrInfo`,method:'post',data
})