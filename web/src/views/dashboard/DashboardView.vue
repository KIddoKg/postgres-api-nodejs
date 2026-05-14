<template>
  <div>
    <h2 style="margin-bottom: 24px; color: #333;">Dashboard</h2>

    <el-row :gutter="16" style="margin-bottom: 24px;">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-card">
            <el-icon size="40" color="#1677ff"><MapLocation /></el-icon>
            <div>
              <div class="stat-number">{{ stats.provinces }}</div>
              <div class="stat-label">Tỉnh / Thành phố</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-card">
            <el-icon size="40" color="#52c41a"><Grid /></el-icon>
            <div>
              <div class="stat-number">{{ stats.districts }}</div>
              <div class="stat-label">Quận / Huyện (mẫu)</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="stat-card">
            <el-icon size="40" color="#faad14"><Location /></el-icon>
            <div>
              <div class="stat-number">{{ stats.wards }}</div>
              <div class="stat-label">Phường / Xã (mẫu)</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card>
      <template #header>
        <span style="font-weight: 600;">Danh sách Tỉnh / Thành phố</span>
      </template>
      <el-table :data="provinces" v-loading="loading" stripe>
        <el-table-column prop="code" label="Mã" width="80" />
        <el-table-column prop="name" label="Tên" />
        <el-table-column prop="full_name" label="Tên đầy đủ" />
        <el-table-column prop="administrative_unit" label="Đơn vị hành chính" />
        <el-table-column label="Thao tác" width="120">
          <template #default="{ row }">
            <el-button size="small" @click="$router.push(`/provinces/${row.code}/districts`)">
              Xem quận/huyện
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProvinces } from '../../api/provinces'

const provinces = ref([])
const loading = ref(false)
const stats = ref({ provinces: 0, districts: 5, wards: 5 })

onMounted(async () => {
  loading.value = true
  try {
    const res = await getProvinces({ size: 200 })
    provinces.value = res.data
    stats.value.provinces = res.meta.total
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}
.stat-label {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}
</style>
