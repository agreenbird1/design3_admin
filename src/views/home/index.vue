<template>
  <Header title="随心选总览"></Header>
  <div class="home">
    <div class="left">
      <div class="bar" ref="barRef"></div>
      <div class="line" ref="lineRef"></div>
    </div>
    <div class="right">
      <div class="pie" ref="pieRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import * as echarts from "echarts";
import { getCategory, getAllOrder } from "@/api";
import { days } from "@/utils/getDays";
import type { ICategory } from "../category/types";
import type { IOrderRes } from "../order/types";

type go = { name: string; value: number };

const goodsOptions = ref<go[]>([]);
const barChart = ref<echarts.ECharts>();
const lineChart = ref<echarts.ECharts>();
const pieChart = ref<echarts.ECharts>();
const barRef = ref<HTMLElement>();
const lineRef = ref<HTMLElement>();
const pieRef = ref<HTMLElement>();

onMounted(() => {
  getCategory().then((res) => {
    res.data.forEach((c: ICategory) => {
      const name = c.name.split(" ")[0];
      const findC = goodsOptions.value.find((c) => c.name === name);
      if (findC) {
        findC.value = findC.value + c.total;
      } else {
        goodsOptions.value.push({
          name,
          value: c.total,
        });
      }
    });
    pieChart.value = echarts.init(pieRef.value as HTMLElement);
    pieChart.value.setOption({
      title: {
        text: "分类商品占比",
        x: "center",
      },
      series: [
        {
          type: "pie",
          data: goodsOptions.value,
        },
      ],
    });
    barChart.value = echarts.init(barRef.value as HTMLElement);
    barChart.value.setOption({
      title: {
        text: "分类商品数量",
        x: "center",
      },
      xAxis: {
        data: goodsOptions.value.map((c) => c.name),
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: goodsOptions.value.map((c) => c.value),
        },
      ],
    });
  });
  getAllOrder().then((res) => {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const data: number[] = new Array(5).fill(0);
    res.data.forEach((order: IOrderRes) => {
      const day = order.createAt.split(" ")[0];
      const idx = days.findIndex((d) => d == day);
      if (data[idx] !== undefined) data[idx]++;
    });
    console.log(data);
    lineChart.value = echarts.init(lineRef.value as HTMLElement);
    lineChart.value.setOption({
      title: {
        text: "近五日订单量",
        x: "center",
      },
      xAxis: {
        type: "category",
        data: days,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data,
          type: "line",
        },
      ],
    });
  });
});
</script>

<style scoped lang="less">
.home {
  width: 100%;
  display: flex;
  .left {
    flex: 1;
    div {
      height: 300px;
      width: 100%;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
  .pie {
    width: 370px;
    height: 300px;
  }
}
</style>
