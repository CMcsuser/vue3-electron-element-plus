<template>
  <div class="charts-page">
    <h1>图表展示</h1>
    
    <el-row :gutter="20">
      <!-- 折线图 -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
            </div>
          </template>
          <div ref="lineChartRef" class="chart-container"></div>
        </el-card>
      </el-col>

      <!-- 柱状图 -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>月度销售额</span>
            </div>
          </template>
          <div ref="barChartRef" class="chart-container"></div>
        </el-card>
      </el-col>

      <!-- 饼图 -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>产品分类占比</span>
            </div>
          </template>
          <div ref="pieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>

      <!-- 雷达图 -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>性能指标</span>
            </div>
          </template>
          <div ref="radarChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'

const lineChartRef = ref<HTMLDivElement>()
const barChartRef = ref<HTMLDivElement>()
const pieChartRef = ref<HTMLDivElement>()
const radarChartRef = ref<HTMLDivElement>()

let lineChart: ECharts | null = null
let barChart: ECharts | null = null
let pieChart: ECharts | null = null
let radarChart: ECharts | null = null

// 初始化折线图
const initLineChart = () => {
  if (!lineChartRef.value) return
  lineChart = echarts.init(lineChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销售额', '利润']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        smooth: true,
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '利润',
        type: 'line',
        data: [620, 732, 701, 734, 1090, 1130, 1120],
        smooth: true,
        itemStyle: {
          color: '#67C23A'
        }
      }
    ]
  }
  
  lineChart.setOption(option)
}

// 初始化柱状图
const initBarChart = () => {
  if (!barChartRef.value) return
  barChart = echarts.init(barChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [2600, 2800, 3200, 3500, 4100, 4500],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        }
      }
    ]
  }
  
  barChart.setOption(option)
}

// 初始化饼图
const initPieChart = () => {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        name: '产品分类',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '电子产品' },
          { value: 735, name: '服装鞋帽' },
          { value: 580, name: '图书音像' },
          { value: 484, name: '食品饮料' },
          { value: 300, name: '其他' }
        ]
      }
    ]
  }
  
  pieChart.setOption(option)
}

// 初始化雷达图
const initRadarChart = () => {
  if (!radarChartRef.value) return
  radarChart = echarts.init(radarChartRef.value)
  
  const option = {
    tooltip: {},
    radar: {
      indicator: [
        { name: '性能', max: 100 },
        { name: '稳定性', max: 100 },
        { name: '易用性', max: 100 },
        { name: '扩展性', max: 100 },
        { name: '安全性', max: 100 }
      ]
    },
    series: [
      {
        name: '指标评分',
        type: 'radar',
        data: [
          {
            value: [85, 90, 80, 88, 92],
            name: '产品A',
            itemStyle: {
              color: '#409EFF'
            }
          },
          {
            value: [75, 85, 90, 82, 88],
            name: '产品B',
            itemStyle: {
              color: '#67C23A'
            }
          }
        ]
      }
    ]
  }
  
  radarChart.setOption(option)
}

// 响应式调整
const handleResize = () => {
  lineChart?.resize()
  barChart?.resize()
  pieChart?.resize()
  radarChart?.resize()
}

onMounted(() => {
  initLineChart()
  initBarChart()
  initPieChart()
  initRadarChart()
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  lineChart?.dispose()
  barChart?.dispose()
  pieChart?.dispose()
  radarChart?.dispose()
})
</script>

<style scoped>
.charts-page {
  padding: 20px;
}

.charts-page h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #303133;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  font-weight: 600;
  font-size: 16px;
}

.chart-container {
  width: 100%;
  height: 350px;
}
</style>
