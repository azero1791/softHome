<template>
  <div class="admin">
    <div class="admin-container">
      <h2>删除用户</h2>
      <div class="li-container">
        <ul>
          <li v-for="(user, index) in users" :key="index">
            {{ user.username }} ({{ user.role }})
            <button @click="deleteUser(index)">删除</button>
          </li>
        </ul>
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
  setup() {
    const users = ref(JSON.parse(localStorage.getItem('users')) || []);

    const deleteUser = (index) => {
      users.value.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users.value));
    };

    return {
      users,
      deleteUser
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
  max-width: 600px;
}

.li-container{
  height: 400px; /* 设定允许滚动区域的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

button {
  padding: 0.5rem 1rem;
  background: #f76c6c;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
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


button:hover {
  background: #d9534f;
}
</style>
