<template>
  <div class="admin">
    <div class="admin-container">
      <h2>增加用户</h2>
      <div>
        <input v-model="newUser.username" placeholder="用户名" />
        <input v-model="newUser.password" type="password" placeholder="密码" />
        <select v-model="newUser.role">
          <option value="">选择身份</option>
          <option value="admin">管理员</option>
          <option value="teacher">教师</option>
          <option value="student">学生</option>
        </select>
        <button @click="addUser">增加用户</button>
        <router-link to="/admin">
          <button>返回</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const newUser = ref({ username: '', password: '', role: '' });
    const users = ref(JSON.parse(localStorage.getItem('users')) || []);

    const addUser = () => {
      if (newUser.value.username && newUser.value.password && newUser.value.role) {
        users.value.push({ ...newUser.value });
        localStorage.setItem('users', JSON.stringify(users.value));
        newUser.value = { username: '', password: '', role: '' };
      }
    };

    return {
      newUser,
      addUser
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
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

input {
  width: 93%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
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

button:hover {
  background: #00f2fe;
}
</style>
