<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 style="color: #333;">Tỉnh / Thành phố</h2>
    </div>

    <!-- Filters -->
    <el-card style="margin-bottom: 16px;">
      <el-row :gutter="12">
        <el-col :span="10">
          <el-input
            v-model="search"
            placeholder="Tìm kiếm tên tỉnh thành..."
            :prefix-icon="Search"
            clearable
            @input="debouncedFetch"
          />
        </el-col>
        <el-col :span="8">
          <el-select v-model="unitFilter" placeholder="Loại đơn vị" clearable @change="fetchData">
            <el-option label="Tỉnh" value="Tỉnh" />
            <el-option label="Thành phố trực thuộc TW" value="Thành phố trực thuộc trung ương" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button @click="resetFilter">Reset</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- Table -->
    <el-card>
      <el-table :data="provinces" v-loading="loading" stripe border style="width: 100%;">
        <el-table-column prop="code" label="Mã" width="70" align="center" />
        <el-table-column prop="name" label="Tên" min-width="130" />
        <el-table-column prop="full_name" label="Tên đầy đủ" min-width="200" />
        <el-table-column prop="name_en" label="Tên tiếng Anh" min-width="130" />
        <el-table-column prop="administrative_unit" label="Loại đơn vị" min-width="160">
          <template #default="{ row }">
            <el-tag :type="row.administrative_unit === 'Tỉnh' ? 'info' : 'success'" size="small">
              {{ row.administrative_unit }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="130" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary" size="small" link
              @click="$router.push(`/provinces/${row.code}/districts`)"
            >
              Quận/Huyện
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[20, 50, 100, 200]"
          layout="total, sizes, prev, pager, next"
          @change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getProvinces } from '../../api/provinces'

const provinces = ref([])
const loading = ref(false)
const search = ref('')
const unitFilter = ref('')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)

let debounceTimer = null
const debouncedFetch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { page.value = 1; fetchData() }, 400)
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getProvinces({
      page: page.value,
      size: pageSize.value,
      q: search.value || undefined,
      administrative_unit: unitFilter.value || undefined,
    })
    provinces.value = res.data
    total.value = res.meta.total
  } finally {
    loading.value = false
  }
}

const resetFilter = () => {
  search.value = ''
  unitFilter.value = ''
  page.value = 1
  fetchData()
}

onMounted(fetchData)
</script>
