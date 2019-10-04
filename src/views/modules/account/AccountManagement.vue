<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.acc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户组" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userGroup == 1 ? '超级管理员':'普通管理员' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        :page-sizes="[10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUsers, deleteUser } from "../../../apis/api";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize:10,
      total:0
    };
  },
  created() {
    this.getUserData(this.currentPage);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserData(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserData(this.currentPage);
    },
    handleEdit(index, row) {
      //   console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(row.id).then(res => {
            if (res.data === "ok") {
              this.$message({
                message: "删除账号成功",
                type: "success"
              });
            } else {
              this.$message.error("删除账号失败");
            }
          });
          this.getUserData(this.currentPage);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getUserData(currentPage) {
      getUsers(currentPage,this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>