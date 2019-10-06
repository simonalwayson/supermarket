<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>统计管理</span>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="进货统计" name="first">
          <div id="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
        <el-tab-pane label="销售统计" name="second">销售统计</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { getEchartsData } from "../../../apis/api";

export default {
  data() {
    return {
      activeName: "first"
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.showLoading();
    getEchartsData().then(res => {
      console.log(res.data[0]);
      var titleArr = [];
      var valueArr = [];
      for (let item in res.data[0]) {
        titleArr.push(item);
        valueArr.push(res.data[0][item]);
      }
      var option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: titleArr,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: valueArr
          }
        ]
      };
      myChart.setOption(option);
      myChart.hideLoading()
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
</style>