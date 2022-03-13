<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0 20px 0"
      @click="showDialog"
      >添加</el-button
    >
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
          <!-- {{row}} -->
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updaeTradeMark"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradMack(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="page"
      :page-size="limit"
      :total="total"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      @size-change="handleSizeChange"
      @current-change="getPageList"
      layout=" prev, pager, next, jumper,->, sizes,total"
    >
    </el-pagination>

    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" :rules="rules" style="width: 80%" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          { required: true, message: "请选择品牌的图片", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    // 获取列表数据的方法
    this.getPageList();
    // console.log(this.$API)
  },
  methods: {
    // 获取列表数据
    async getPageList(pager = 1) {
      this.page = pager;

      const { page, limit } = this;

      // this.$API.trademark.reqTRadeMarkList(page,limit)

      let result = await this.$API.trademark.reqTRadeMarkList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
        console.log(this.total);
        console.log(this.list);
      }
    },
    // handleCurrentChange(pager){
    //   // console.log(pager)
    //   this.page = pager
    //   this.getPageList();
    // },
    handleSizeChange(limit) {
      // console.log(limit)
      this.limit = limit;
      this.getPageList();
    },
    showDialog() {
      this.dialogFormVisible = true;
      // console.log(this.dialogFormVisible);
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    updaeTradeMark() {
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible);
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addOrUpdateTradMark() {
      this.$refs.ruleForm.validate(async (succes) => {
        if (succes) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改成功" : "添加成功",
            });
            // this.$message(this.tmForm.id?'修改成功':'添加成功');
            // this.getPageList();
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error");
          return false;
        }
      });
    },
    deleteTradMack(row) {
      this.$confirm(`确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = this.$API.trademark.reqDeleteTradeMark(row.id);
          console.log(result)
          if (result.code == 200) {
          console.log("1111")

            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px solid #979696;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
