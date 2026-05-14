<template>
  <div>
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" style="margin-bottom: 16px;">
      <el-breadcrumb-item :to="{ path: '/provinces' }">Tỉnh / Thành phố</el-breadcrumb-item>
      <el-breadcrumb-item>{{ province?.full_name || code }}</el-breadcrumb-item>
      <el-breadcrumb-item>Quận / Huyện</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <el-button :icon="ArrowLeft" @click="$router.back()">Quay lại</el-button>
      <h2 style="color: #333;">Quận / Huyện — {{ province?.full_name }}</h2>
    </div>

    <el-card>
      <el-table :data="districts" v-loading="loading" stripe border>
        <el-table-column prop="code" label="Mã" width="80" align="center" />
        <el-table-column prop="name" label="Tên" min-width="130" />
        <el-table-column prop="full_name" label="Tên đầy đủ" min-width="180" />
        <el-table-column prop="name_en" label="Tên tiếng Anh" min-width="130" />
        <el-table-column prop="administrative_unit" label="Loại đơn vị" min-width="120" />
        <el-table-column label="Thao tác" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary" size="small" link
              @click="$router.push(`/provinces/${code}/districts/${row.code}/wards`)"
            >
              Phường/Xã
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
        <el-pagination
          v-model:current-page="page"
          :total="total"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          @current-change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { getProvince, getDistricts } from '../../api/provinces'

const route = useRoute()
const code = route.params.code

const province = ref(null)
const districts = ref([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getDistricts(code, { page: page.value, size: pageSize.value })
    districts.value = res.data
    total.value = res.meta.total
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const res = await getProvince(code)
  province.value = res.data
  fetchData()
})
</script>
