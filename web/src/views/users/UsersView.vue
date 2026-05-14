<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 style="color: #333;">Quản lý Người dùng</h2>
      <el-button type="primary" :icon="Plus" @click="openDialog()">Thêm người dùng</el-button>
    </div>

    <el-card>
      <el-table :data="users" v-loading="loading" stripe border>
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="name" label="Tên" min-width="130" />
        <el-table-column prop="email" label="Email" min-width="200" />
        <el-table-column prop="role" label="Vai trò" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'info'" size="small">
              {{ row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_active" label="Trạng thái" width="110" align="center">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'success' : 'danger'" size="small">
              {{ row.is_active ? 'Hoạt động' : 'Vô hiệu' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="Ngày tạo" min-width="150">
          <template #default="{ row }">
            {{ new Date(row.created_at).toLocaleString('vi-VN') }}
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openDialog(row)">Sửa</el-button>
            <el-popconfirm
              title="Xác nhận xóa người dùng này?"
              confirm-button-text="Xóa"
              cancel-button-text="Hủy"
              @confirm="handleDelete(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" link>Xóa</el-button>
              </template>
            </el-popconfirm>
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

    <!-- Create/Edit Dialog -->
    <el-dialog v-model="dialogVisible" :title="editingUser ? 'Sửa người dùng' : 'Thêm người dùng'" width="460px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="Họ tên" prop="name">
          <el-input v-model="form.name" placeholder="Nguyễn Văn A" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="user@example.com" :disabled="!!editingUser" />
        </el-form-item>
        <el-form-item label="Mật khẩu" :prop="editingUser ? '' : 'password'">
          <el-input v-model="form.password" type="password" show-password
            :placeholder="editingUser ? 'Để trống nếu không đổi' : 'Tối thiểu 6 ký tự'" />
        </el-form-item>
        <el-form-item label="Vai trò" prop="role">
          <el-select v-model="form.role" style="width: 100%;">
            <el-option label="Admin" value="admin" />
            <el-option label="Viewer" value="viewer" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="editingUser" label="Trạng thái">
          <el-switch v-model="form.is_active" active-text="Hoạt động" inactive-text="Vô hiệu" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">Lưu</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getUsers, createUser, updateUser, deleteUser } from '../../api/users'

const users = ref([])
const loading = ref(false)
const saving = ref(false)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)

const dialogVisible = ref(false)
const editingUser = ref(null)
const formRef = ref()
const form = ref({ name: '', email: '', password: '', role: 'viewer', is_active: true })

const rules = {
  name: [{ required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' }],
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 6, message: 'Tối thiểu 6 ký tự', trigger: 'blur' },
  ],
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getUsers({ page: page.value, size: pageSize.value })
    users.value = res.data
    total.value = res.meta.total
  } finally {
    loading.value = false
  }
}

const openDialog = (user = null) => {
  editingUser.value = user
  form.value = user
    ? { name: user.name, email: user.email, password: '', role: user.role, is_active: user.is_active }
    : { name: '', email: '', password: '', role: 'viewer', is_active: true }
  dialogVisible.value = true
}

const handleSave = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  saving.value = true
  try {
    if (editingUser.value) {
      const payload = { name: form.value.name, role: form.value.role, is_active: form.value.is_active }
      if (form.value.password) payload.password = form.value.password
      await updateUser(editingUser.value.id, payload)
      ElMessage.success('Cập nhật thành công')
    } else {
      await createUser(form.value)
      ElMessage.success('Thêm người dùng thành công')
    }
    dialogVisible.value = false
    fetchData()
  } catch (err) {
    ElMessage.error(err.message || 'Có lỗi xảy ra')
  } finally {
    saving.value = false
  }
}

const handleDelete = async (id) => {
  try {
    await deleteUser(id)
    ElMessage.success('Xóa thành công')
    fetchData()
  } catch (err) {
    ElMessage.error(err.message || 'Có lỗi xảy ra')
  }
}

onMounted(fetchData)
</script>
