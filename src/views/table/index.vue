<template>
  <div class="table-page">
    <h1>表格管理</h1>
    
    <el-card shadow="never">
      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="正常" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="success" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" min-width="200" />
        <el-table-column prop="phone" label="手机号" width="150" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = reactive({
  name: '',
  status: ''
})

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    department: '技术部',
    status: '正常',
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138002',
    department: '市场部',
    status: '正常',
    createTime: '2024-01-16 14:20:00'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138003',
    department: '人事部',
    status: '禁用',
    createTime: '2024-01-17 09:15:00'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    phone: '13800138004',
    department: '财务部',
    status: '正常',
    createTime: '2024-01-18 16:45:00'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    phone: '13800138005',
    department: '技术部',
    status: '正常',
    createTime: '2024-01-19 11:00:00'
  }
])

// 分页配置
const pagination = reactive({
  page: 1,
  size: 10,
  total: 5
})

// 搜索
const handleSearch = () => {
  ElMessage.success('搜索功能开发中...')
  console.log('搜索参数:', searchForm)
}

// 重置
const handleReset = () => {
  searchForm.name = ''
  searchForm.status = ''
  ElMessage.info('已重置搜索条件')
}

// 新增
const handleAdd = () => {
  ElMessage.info('新增功能开发中...')
}

// 编辑
const handleEdit = (row: any) => {
  ElMessage.info(`编辑用户: ${row.name}`)
  console.log('编辑行数据:', row)
}

// 删除
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定要删除用户 ${row.name} 吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 每页条数变化
const handleSizeChange = (size: number) => {
  pagination.size = size
  console.log('每页条数:', size)
}

// 页码变化
const handlePageChange = (page: number) => {
  pagination.page = page
  console.log('当前页:', page)
}
</script>

<style scoped>
.table-page {
  padding: 20px;
}

.table-page h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #303133;
}
</style>
