<template>
  <div class="commodity-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品条形码">
          <template slot-scope="scope">
            <span>{{ scope.row.barCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售价">
          <template slot-scope="scope">
            <span>{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="市场价">
          <template slot-scope="scope">
            <span>{{ scope.row.marketPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
            <span>{{ scope.row.stockCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存总额">
          <template slot-scope="scope">
            <span>{{ scope.row.stockCount*scope.row.stockPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售总额">
          <template slot-scope="scope">
            <span>{{ scope.row.stockCount*scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getCommodity } from "../../../apis/api";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    };
  },
  created() {
      this.getCommodityData(this.currentPage);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCommodityData(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCommodityData(this.currentPage);
    },
    getCommodityData(currentPage) {
      getCommodity(currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.commodity-management {
  width: 100%;
}
</style>