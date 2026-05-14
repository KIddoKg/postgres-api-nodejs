<template>
  <el-container style="height: 100vh;">
    <!-- Sidebar -->
    <el-aside width="220px" style="background: #001529; overflow: hidden;">
      <div class="logo">
        <span>🗺️ VN Provinces</span>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        background-color="#001529"
        text-color="#ffffffa6"
        active-text-color="#ffffff"
        style="border: none;"
      >
        <el-menu-item index="/dashboard">
          <el-icon><DataLine /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/provinces">
          <el-icon><MapLocation /></el-icon>
          <span>Tỉnh / Thành phố</span>
        </el-menu-item>
        <el-menu-item v-if="auth.isAdmin" index="/users">
          <el-icon><User /></el-icon>
          <span>Quản lý người dùng</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- Header -->
      <el-header style="background: #fff; border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; justify-content: space-between; padding: 0 24px;">
        <span style="font-size: 16px; font-weight: 600; color: #333;">
          Hệ thống Quản lý Tỉnh Thành Việt Nam
        </span>
        <el-dropdown @command="handleCommand">
          <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <el-avatar :size="32" style="background: #1677ff;">
              {{ auth.user?.name?.charAt(0) }}
            </el-avatar>
            <span style="font-size: 14px;">{{ auth.user?.name }}</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>
                <small>{{ auth.user?.email }}</small>
              </el-dropdown-item>
              <el-dropdown-item disabled>
                <el-tag size="small" :type="auth.isAdmin ? 'danger' : 'info'">
                  {{ auth.isAdmin ? 'Admin' : 'Viewer' }}
                </el-tag>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon> Đăng xuất
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- Main content -->
      <el-main style="padding: 24px; overflow-y: auto;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleCommand = async (cmd) => {
  if (cmd === 'logout') {
    await auth.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border-bottom: 1px solid #ffffff20;
}
</style>
