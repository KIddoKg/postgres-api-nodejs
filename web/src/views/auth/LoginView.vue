<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-icon">🗺️</div>
        <h2>VN Provinces Admin</h2>
        <p>Hệ thống Quản lý Tỉnh Thành Việt Nam</p>
      </div>

      <el-form :model="form" :rules="rules" ref="formRef" size="large" @submit.prevent="handleLogin">
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="Email"
            :prefix-icon="Message"
            autocomplete="email"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Mật khẩu"
            :prefix-icon="Lock"
            show-password
            autocomplete="current-password"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" style="margin-bottom: 16px;" />

        <el-button
          type="primary"
          style="width: 100%;"
          :loading="auth.loading"
          @click="handleLogin"
        >
          Đăng nhập
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const router = useRouter()
const formRef = ref()
const error = ref('')

const form = ref({ email: '', password: '' })

const rules = {
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  error.value = ''
  try {
    await auth.login(form.value.email, form.value.password)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Đăng nhập thất bại'
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1677ff 0%, #0050b3 100%);
}

.login-card {
  width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.login-header h2 {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
}

.login-header p {
  font-size: 13px;
  color: #888;
}
</style>
