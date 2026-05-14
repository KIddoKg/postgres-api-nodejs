<template>
  <div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
      <div>
        <h2 style="color:#333; margin-bottom:4px;">Quản lý Migration</h2>
        <span style="color:#888; font-size:13px;">Đồng bộ dữ liệu từ SQL Server → PostgreSQL</span>
      </div>
      <el-button :icon="Refresh" @click="fetchStatus" :loading="statusLoading" circle />
    </div>

    <!-- DB Mode Banner -->
    <el-alert
      :title="modeBanner.title"
      :type="modeBanner.type"
      :description="modeBanner.desc"
      show-icon
      :closable="false"
      style="margin-bottom:20px;"
    />

    <!-- Status Cards -->
    <el-row :gutter="16" style="margin-bottom:20px;">
      <!-- PostgreSQL -->
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="db-card">
            <div class="db-card__header">
              <span class="db-icon pg">PG</span>
              <div>
                <div class="db-name">PostgreSQL</div>
                <el-tag size="small" type="success">Connected</el-tag>
              </div>
            </div>
            <el-divider style="margin:12px 0;" />
            <div class="db-stats">
              <div class="stat-item">
                <span class="stat-label">Tỉnh/Thành</span>
                <span class="stat-value">{{ status?.postgres?.provinces ?? '-' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Quận/Huyện</span>
                <span class="stat-value">{{ status?.postgres?.districts ?? '-' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Phường/Xã</span>
                <span class="stat-value">{{ status?.postgres?.wards ?? '-' }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- SQL Server -->
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="db-card">
            <div class="db-card__header">
              <span class="db-icon ms">MS</span>
              <div>
                <div class="db-name">SQL Server</div>
                <el-tag size="small" :type="status?.sqlserver?.connected ? 'primary' : 'danger'">
                  {{ status?.sqlserver?.connected ? 'Connected' : 'Disconnected' }}
                </el-tag>
              </div>
            </div>
            <el-divider style="margin:12px 0;" />
            <div class="db-stats" v-if="status?.sqlserver?.connected">
              <div class="stat-item">
                <span class="stat-label">Tỉnh/Thành</span>
                <span class="stat-value">{{ status.sqlserver.provinces }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Quận/Huyện</span>
                <span class="stat-value">{{ status.sqlserver.districts }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Phường/Xã</span>
                <span class="stat-value">{{ status.sqlserver.wards }}</span>
              </div>
            </div>
            <el-empty v-else description="Không thể kết nối SQL Server" :image-size="60" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Progress -->
    <el-card shadow="hover" style="margin-bottom:20px;" v-if="status?.migration_progress">
      <template #header>
        <span style="font-weight:600;">Tiến độ Migration</span>
      </template>
      <div class="progress-grid">
        <div class="progress-item" v-for="(val, key) in status.migration_progress" :key="key">
          <div class="progress-label">
            <span>{{ tableLabel[key] }}</span>
            <strong :class="val === 100 ? 'text-success' : 'text-warn'">{{ val }}%</strong>
          </div>
          <el-progress
            :percentage="val"
            :status="val === 100 ? 'success' : ''"
            :stroke-width="10"
          />
        </div>
      </div>
    </el-card>

    <!-- Sync Controls -->
    <el-card shadow="hover" style="margin-bottom:20px;">
      <template #header>
        <span style="font-weight:600;">Đồng bộ dữ liệu</span>
      </template>

      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px;">
        <el-button
          type="primary" :icon="Upload"
          :loading="syncing && syncTarget === 'all'"
          :disabled="syncing"
          @click="startSync('all')"
        >Sync tất cả</el-button>

        <el-button
          :loading="syncing && syncTarget === 'provinces'"
          :disabled="syncing"
          @click="startSync('provinces')"
        >Sync Tỉnh/Thành</el-button>

        <el-button
          :loading="syncing && syncTarget === 'districts'"
          :disabled="syncing"
          @click="startSync('districts')"
        >Sync Quận/Huyện</el-button>

        <el-button
          :loading="syncing && syncTarget === 'wards'"
          :disabled="syncing"
          @click="startSync('wards')"
        >Sync Phường/Xã</el-button>

        <el-button
          v-if="syncing" type="danger" plain
          @click="cancelSync"
        >Hủy</el-button>
      </div>

      <!-- Log Terminal -->
      <div class="log-terminal" ref="logBox">
        <div v-if="logs.length === 0" class="log-empty">
          Nhấn nút Sync để bắt đầu đồng bộ dữ liệu...
        </div>
        <div
          v-for="(line, i) in logs" :key="i"
          :class="['log-line', logClass(line)]"
        >{{ line }}</div>
      </div>
    </el-card>

    <!-- Hướng dẫn chuyển DB Mode -->
    <el-card shadow="hover">
      <template #header>
        <span style="font-weight:600;">Hướng dẫn chuyển DB Mode</span>
      </template>
      <el-steps direction="vertical" :active="currentStep" finish-status="success">
        <el-step title="Cấu hình SQL Server" description="Điền MSSQL_* trong file .env" />
        <el-step title="Chọn DB_MODE=dual" description="API đọc Postgres trước, fallback SQL Server" />
        <el-step title="Chạy Sync" description="Đồng bộ toàn bộ dữ liệu từ SQL Server → PostgreSQL" />
        <el-step title="Kiểm tra tiến độ 100%" description="Đảm bảo tất cả bảng đều đạt 100%" />
        <el-step title="Đổi DB_MODE=postgres" description="Cập nhật .env rồi restart API — hoàn tất migrate" />
      </el-steps>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Refresh, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getMigrationStatus, syncData } from '../../api/migration'

const status = ref(null)
const statusLoading = ref(false)
const syncing = ref(false)
const syncTarget = ref('')
const logs = ref([])
const logBox = ref(null)
let abortController = null

const tableLabel = { provinces: 'Tỉnh/Thành phố', districts: 'Quận/Huyện', wards: 'Phường/Xã' }

// ── Computed ──────────────────────────────────────────────────────────────────
const modeBanner = computed(() => {
  const mode = status.value?.db_mode
  if (mode === 'postgres')   return { type: 'success', title: 'DB_MODE = postgres', desc: 'Hệ thống đang dùng PostgreSQL hoàn toàn. Migration đã hoàn tất.' }
  if (mode === 'sqlserver')  return { type: 'warning', title: 'DB_MODE = sqlserver', desc: 'Hệ thống đang đọc từ SQL Server. Hãy đổi sang dual để bắt đầu migrate.' }
  if (mode === 'dual')       return { type: 'info',    title: 'DB_MODE = dual', desc: 'Đang trong quá trình migration. API đọc Postgres trước, fallback SQL Server.' }
  return { type: 'info', title: 'Đang tải...', desc: '' }
})

const currentStep = computed(() => {
  const mode = status.value?.db_mode
  const p = status.value?.migration_progress
  if (mode === 'postgres') return 5
  if (p?.provinces === 100 && p?.districts === 100 && p?.wards === 100) return 4
  if (mode === 'dual' && (p?.provinces > 0 || p?.districts > 0)) return 3
  if (mode === 'dual') return 2
  return 1
})

// ── Methods ───────────────────────────────────────────────────────────────────
const fetchStatus = async () => {
  statusLoading.value = true
  try {
    const res = await getMigrationStatus()
    status.value = res.data
  } catch (e) {
    ElMessage.error('Không thể lấy trạng thái: ' + e.message)
  } finally {
    statusLoading.value = false
  }
}

const addLog = (line) => {
  logs.value.push(line)
  nextTick(() => {
    if (logBox.value) logBox.value.scrollTop = logBox.value.scrollHeight
  })
}

const logClass = (line) => {
  if (line.includes('✅') || line.includes('🎉')) return 'log-success'
  if (line.includes('❌') || line.includes('Error')) return 'log-error'
  if (line.includes('🔄') || line.includes('⏳')) return 'log-info'
  return ''
}

const startSync = async (target) => {
  syncing.value = true
  syncTarget.value = target
  logs.value = []
  abortController = new AbortController()

  const token = localStorage.getItem('token')
  addLog(`▶ Bắt đầu sync: ${target === 'all' ? 'Tất cả' : target}`)

  try {
    const response = await fetch('/api/migration/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ target }),
      signal: abortController.signal,
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        try {
          const event = JSON.parse(line.slice(5).trim())
          if (event.type === 'log')   addLog(event.message)
          if (event.type === 'error') { addLog(`❌ ${event.message}`); ElMessage.error(event.message) }
          if (event.type === 'done') {
            addLog('═══════════════════════════')
            if (event.stats.provinces !== undefined) addLog(`  Tỉnh/Thành: ${event.stats.provinces} bản ghi`)
            if (event.stats.districts !== undefined) addLog(`  Quận/Huyện: ${event.stats.districts} bản ghi`)
            if (event.stats.wards     !== undefined) addLog(`  Phường/Xã:  ${event.stats.wards} bản ghi`)
            addLog('═══════════════════════════')
            ElMessage.success('Sync hoàn tất!')
            await fetchStatus()
          }
        } catch {}
      }
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      addLog(`❌ Lỗi: ${e.message}`)
      ElMessage.error(e.message)
    } else {
      addLog('⚠ Đã hủy sync')
    }
  } finally {
    syncing.value = false
    syncTarget.value = ''
  }
}

const cancelSync = () => {
  abortController?.abort()
}

onMounted(fetchStatus)
</script>

<style scoped>
.db-card__header { display:flex; align-items:center; gap:12px; }
.db-icon {
  width:44px; height:44px; border-radius:10px;
  display:flex; align-items:center; justify-content:center;
  font-weight:700; font-size:13px; color:#fff; flex-shrink:0;
}
.db-icon.pg { background: #336791; }
.db-icon.ms { background: #cc2927; }
.db-name { font-weight:600; font-size:15px; margin-bottom:4px; }

.db-stats { display:flex; gap:0; }
.stat-item { flex:1; text-align:center; padding:8px 0; border-right:1px solid #f0f0f0; }
.stat-item:last-child { border-right:none; }
.stat-label { display:block; font-size:12px; color:#888; margin-bottom:4px; }
.stat-value { font-size:22px; font-weight:700; color:#333; }

.progress-grid { display:flex; flex-direction:column; gap:16px; }
.progress-item {}
.progress-label { display:flex; justify-content:space-between; margin-bottom:6px; font-size:14px; }
.text-success { color:#67c23a; }
.text-warn    { color:#e6a23c; }

.log-terminal {
  background:#1a1a2e; border-radius:8px; padding:16px;
  height:280px; overflow-y:auto; font-family:'Courier New', monospace; font-size:13px;
}
.log-empty   { color:#555; text-align:center; margin-top:80px; }
.log-line    { color:#ccc; line-height:1.8; white-space:pre-wrap; }
.log-success { color:#52c41a; }
.log-error   { color:#ff4d4f; }
.log-info    { color:#1677ff; }
</style>
