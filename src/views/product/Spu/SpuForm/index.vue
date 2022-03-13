<template>
  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="SPU名称">
      <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" value="" v-model="spu.tmId">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="(tm, index) in tradeMarkList"
          :key="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="描述"
        v-model="spu.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handerSuccess"
        :file-list="spuImageList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        :placeholder="`还有${unSelectSaleAttr.length}未选择`"
        v-model="attrIdAndAttrName"
      >
        <el-option
          :label="unselect.name"
          :value="`${unselect.id}:${unselect.name}`"
          v-for="(unselect, index) in unSelectSaleAttr"
          :key="unselect.id"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="!attrIdAndAttrName"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <!-- 展示的是当前spu属于自己的销售属性 -->
      <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="属性名"
          width="width"
        ></el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag
              :key="tag.id"
              v-for="(tag,index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close ="row.spuSaleAttrValueList.splice(index,1)"
              >{{ tag.saleAttrName }}</el-tag
            >
            <!-- @keyup.enter.native="handleInputConfirm"  -->
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @blur="handleInputConfirm(row)"
            ></el-input>
            <!-- @click="showInput" -->
            <el-button v-else class="button-new-tag" size="small"
              @click="addSaleAttrValue(row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="spu.spuSaleAttrList.splice($index,1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script> 
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        // 三级分类的id
        category3Id: 0,
        // 品牌id
        tmId: null,
        // 描述
        description: "",
        // spu名称
        spuName: "",
        // 收集的spu图片信息
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      attrIdAndAttrName: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // file删除得
      // fileList删除后剩余的
      // console.log(file, fileList);
      // 收集照片墙的数据
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initSpuData(spu) {
      // console.log('111',spu);
      // 获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      // console.log(spuResult);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult)
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
        // console.log(this.tradeMarkList)
      }

      // reqSpuImageList
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(spuImageResult)
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // console.log(this.spuImageList)
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }

      // reqBaseSaleAtteList
      let saleResult = await this.$API.spu.reqBaseSaleAtteList();
      // console.log(saleResult)
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
        // console.log(this.saleAttrList)
      }
    },
    handerSuccess(response, file, fileList) {
      // console.log(response, file, fileList)
      this.spuImageList = fileList;
    },
    // 添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrList:[]};
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = '';
    },
    addSaleAttrValue(row){
        // console.log(row)
        this.$set(row,'inputVisible',true);
        // inputValue
        this.$set(row,'inputValue','');

    },
    handleInputConfirm(row){
      const {baseSaleAttrId,inputValue} = row;
      if(inputValue.trim()==''){
        this.$message('属性值不能为空');
        return;
      }
      let result = row.spuSaleAttrValueList.every(item=>item.saleAttrName!=inputValue);
      console.log(result);
      if(!result) return;
      let newSaleAttrValue = {baseSaleAttrId,saleAttrName:inputValue};
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible=false
    },
    async addOrUpdateSpu() {
      //整理参数：需要整理照片墙的数据
      //携带参数：对于图片，需要携带imageName与imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      // console.log(result)
      if(result.code==200){
        this.$message({type:'success',message:'保存成功'})
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'});
      }
      Object.assign(this._data,this.$options.data());
    },
    async addSpuData(category3Id){
      this.spu.category3Id = category3Id;

      // console.log('添加');
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult)
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
        // console.log(this.tradeMarkList)
      }
      let saleResult = await this.$API.spu.reqBaseSaleAtteList();
      // console.log(saleResult)
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
        // console.log(this.saleAttrList)
      }
    },
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})
      // 清理数据
      Object.assign(this._data,this.$options.data());
    }
  },
  computed: {
    // 计算还未选择的销售属性  saleAttrList
    // 当前spu拥有的属于自己的销售属性 spu.spuSaleAttrList
    unSelectSaleAttr() {
      // 数组过滤的方法
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>