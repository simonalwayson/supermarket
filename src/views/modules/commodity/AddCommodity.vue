<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div class="content">
        <div class="left">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属分类" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择商品分类">
                <el-option label="饮品" value="drink"></el-option>
                <el-option label="食品类" value="food"></el-option>
                <el-option label="香烟" value="cigarette"></el-option>
                <el-option label="干货类" value="drygoods"></el-option>
                <el-option label="果蔬/生鲜" value="fruit"></el-option>
                <el-option label="调味品" value="flavour"></el-option>
                <el-option label="酒类" value="wine"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品售价" prop="salePrice">
              <el-input v-model="ruleForm.salePrice"></el-input>
            </el-form-item>
            <el-form-item label="商品进价" prop="stockPrice">
              <el-input v-model="ruleForm.stockPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="commodityWeight">
              <el-input v-model="ruleForm.commodityWeight"></el-input>
            </el-form-item>
            <el-form-item label="会员优惠" prop="vipDiscount">
              <el-radio-group v-model="ruleForm.vipDiscount">
                <el-radio label="享受"></el-radio>
                <el-radio label="不享受"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品条形码" prop="barCode">
              <el-input v-model="ruleForm.barCode"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="市场价" prop="marketPrice">
              <el-input v-model="ruleForm.marketPrice"></el-input>
            </el-form-item>
            <el-form-item label="入库数量" prop="stockCount">
              <el-input v-model="ruleForm.stockCount"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" prop="commodityUnit">
              <el-input v-model="ruleForm.commodityUnit"></el-input>
            </el-form-item>
            <el-form-item label="是否促销" prop="promotion">
              <el-radio-group v-model="ruleForm.promotion">
                <el-radio label="启用"></el-radio>
                <el-radio label="不启用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="barCode">生成条形码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品简介" prop="goodsDesc">
          <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addCommodity } from "../../../apis/api";
export default {
  data() {
    return {
      ruleForm: {
        category: "",
        barCode:"",
        name: "",
        salePrice: "",
        marketPrice: "",
        stockPrice: "",
        stockCount: "",
        commodityWeight: "",
        commodityUnit: "",
        vipDiscount: "",
        promotion: "",
        goodsDesc: ""
      },
      rules: {
        category: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        salePrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    barCode(){
        this.ruleForm.barCode = Math.ceil(Math.random()*8999999999999+1000000000000)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
          addCommodity(
              this.ruleForm.category,
              this.ruleForm.barCode,
              this.ruleForm.name,
              this.ruleForm.salePrice,
              this.ruleForm.marketPrice,
              this.ruleForm.stockPrice,
              this.ruleForm.stockCount,
              this.ruleForm.commodityWeight,
              this.ruleForm.commodityUnit,
              this.ruleForm.vipDiscount,
              this.ruleForm.promotion,
              this.ruleForm.goodsDesc
          ).then(res => {
            if (res.data == "ok") {
              this.$message({
                message: "恭喜你，添加商品成功",
                type: "success"
              });
            } else {
              this.$message.error("很遗憾，添加商品失败");
            }
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 48%;
  }
  .right {
    width: 48%;
  }
}
</style>