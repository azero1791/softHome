<template>
  <div class="admin">
    <div class="admin-container">
      <h2>编辑用户</h2>
      <div class="li-container">
        <div v-if="editingUser" class="edit-form">
          <div class="info">
            <p>原用户名: {{ originalUser.uname }}</p>
            <p>原用户名: {{ originalUser.uid }}</p>
            <p>原密码: {{ originalUser.upwd }}</p>
            <p>原身份: {{ originalUser.uidentity }}</p>
          </div>
          <input v-model="editingUser.uname" placeholder="新用户名" />
          <input v-model="editingUser.uid" placeholder="新用户ID" />
          <div class="password-container">
            <input :type="passwordFieldType" v-model="editingUser.upwd" placeholder="新密码" />
            <button type="button" @click="togglePasswordVisibility" class="toggle-button">
              {{ passwordFieldType === 'password' ? '显示' : '隐藏' }}
            </button>
          </div>
          <select v-model="editingUser.uidentity">
            <option value="">选择新身份</option>
            <option value="A">管理员</option>
            <option value="B">教师</option>
            <option value="C">学生</option>
          </select>
          <div class="button-group">
            <button @click="updateUser" class="main-button">更新用户</button>
            <button @click="cancelEdit" class="secondary-button">取消</button>
          </div>
        </div>
        <div v-else>
          <ul class="user-list">
            <li v-for="(user, index) in users" :key="index" class="user-item">
              <div class="user-info">
                <p>ID: {{ user.id }}</p>
                <p>用户名: {{ user.uname }}</p>
                <p>身份: {{ user.uidentity }}</p>
              </div>
              <div class="button-group">
                <button @click="editUser(user)" class="edit-button">编辑</button>
                <button @click="deleteUser(user.id)" class="delete-button">删除</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/admin">
        <button class="back-button">返回</button>
      </router-link>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]);
    const editingUser = ref(null);
    const originalUser = ref(null);
    const passwordFieldType = ref('password');
    const message = ref('');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        users.value = response.data;
      } catch (error) {
        message.value = '获取用户信息失败';
      }
    };

    const editUser = (user) => {
      originalUser.value = { ...user }; // 保存原始用户信息
      editingUser.value = { ...user }; // 编辑用户信息
    };

    const updateUser = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/api/users/${originalUser.value.id}`, editingUser.value);
        message.value = response.data.message;
        if (response.data.success) {
          editingUser.value = null;
          originalUser.value = null;
          await fetchUsers(); // 重新获取用户信息
        }
      } catch (error) {
        message.value = '更新用户失败，请重试';
      }
    };

    const deleteUser = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/users/${id}`);
        message.value = response.data.message;
        if (response.data.success) {
          await fetchUsers(); // 重新获取用户信息
        }
      } catch (error) {
        message.value = '删除用户失败，请重试';
      }
    };

    const cancelEdit = () => {
      editingUser.value = null;
      originalUser.value = null;
      passwordFieldType.value = 'password';
    };

    const togglePasswordVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    };

    onMounted(fetchUsers);

    return {
      users,
      editingUser,
      originalUser,
      passwordFieldType,
      message,
      editUser,
      updateUser,
      deleteUser,
      cancelEdit,
      togglePasswordVisibility
    };
  }
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.admin-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.li-container {
  height: 400px;
  overflow-y: auto;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.info {
  text-align: left;
  margin-bottom: 1rem;
  color: #555;
}

input {
  width: calc(93% - 10px);
  padding: 0.8rem;
  margin: 0.5rem 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

select {
  width: calc(93% - 10px);
  padding: 0.8rem;
  margin: 0.5rem 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.password-container {
  display: flex;
  align-items: center;
}

.password-container input {
  flex-grow: 1;
  border-radius: 4px;
}

.toggle-button {
  height: calc(100% - 2px);
  background: #4facfe;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-button:hover {
  background: #00f2fe;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.main-button,
.secondary-button {
  width: calc(50% - 5px);
  padding: 0.8rem;
  background: #4facfe;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  height: 44px;
}

.main-button:hover {
  background: #00f2fe;
}

.secondary-button {
  background: #ccc;
}

.secondary-button:hover {
  background: #bbb;
}

.user-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
}

.user-info {
  font-size: 1rem;
  color: #333;
  flex-grow: 1;
}

.edit-button,
.delete-button {
  padding: 10px;
  font-size: 0.9rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 10px;
  flex-shrink: 0;
  text-align: center;
  height: 44px;
}

.edit-button {
  background-color: #4facfe;
}

.edit-button:hover {
  background-color: #00f2fe;
}

.delete-button {
  background-color: #ff4f4f;
}

.delete-button:hover {
  background-color: #ff0000;
}

.back-button {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background: #4facfe;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #00f2fe;
}

p {
  margin-top: 1rem;
  color: red;
}
</style>
