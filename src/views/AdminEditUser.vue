<template>
  <div class="admin">
    <div class="admin-container">
      <h2>编辑用户</h2>
      <div class="li-container">
        <div v-if="editingUser" class="edit-form">
          <div class="info">
            <p>原用户名: {{ originalUser.username }}</p>
            <p>原密码: {{ originalUser.password }}</p>
            <p>原身份: {{ originalUser.role }}</p>
          </div>
          <input v-model="editingUser.username" placeholder="新用户名" />
          <div class="password-container">
            <input :type="passwordFieldType" v-model="editingUser.password" placeholder="新密码" />
            <button type="button" @click="togglePasswordVisibility" class="toggle-button">
              {{ passwordFieldType === 'password' ? '显示' : '隐藏' }}
            </button>
          </div>
          <select v-model="editingUser.role">
            <option value="">选择新身份</option>
            <option value="admin">管理员</option>
            <option value="teacher">教师</option>
            <option value="student">学生</option>
          </select>
          <div class="button-group">
            <button @click="updateUser" class="main-button">更新用户</button>
            <button @click="cancelEdit" class="secondary-button">取消</button>
          </div>
        </div>
        <div v-else>
          <ul class="user-list">
            <li v-for="(user, index) in users" :key="index" class="user-item">
              <span class="user-info">{{ user.username }} ({{ user.role }})</span>
              <button @click="editUser(user)" class="edit-button">编辑</button>
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/admin">
        <button class="back-button">返回</button>
      </router-link>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {

  mounted() {
    document.body.style.overflow = 'hidden'; // 禁止页面滚动
  },
  beforeDestroy() {
    document.body.style.overflow = ''; // 解除禁止滚动
  },


  setup() {
    const users = ref(JSON.parse(localStorage.getItem('users')) || []);
    const editingUser = ref(null);
    const originalUser = ref(null);
    const passwordFieldType = ref('password');

    const editUser = (user) => {
      originalUser.value = { ...user }; // 保存原始用户信息
      editingUser.value = { ...user }; // 编辑用户信息
    };

    const updateUser = () => {
      const index = users.value.findIndex(u => u.username === originalUser.value.username);
      if (index !== -1) {
        users.value[index] = { ...editingUser.value };
        localStorage.setItem('users', JSON.stringify(users.value));
        editingUser.value = null;
        originalUser.value = null;
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

    return {
      users,
      editingUser,
      originalUser,
      passwordFieldType,
      editUser,
      updateUser,
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

.li-container{
  height: 400px; /* 设定允许滚动区域的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
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

input{
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
  height: calc(100% - 2px); /* Adjust button height to match input height */
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
  height: 44px; /* Adjust button height to match input height */
}

.main-button {
  background: #4facfe;
}

.secondary-button {
  background: #ccc;
}

.main-button:hover {
  background: #00f2fe;
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

.edit-button {
  padding: 10px; /* Adjust button padding */
  font-size: 0.9rem;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 10px;
  flex-shrink: 0;
  text-align: center;
  height: 44px; /* Adjust button height to match input height */
}

.edit-button:hover {
  background-color: #00f2fe;
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

</style>
