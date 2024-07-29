<template>
  <div class="admin">
    <div class="admin-container">
      <h2>增加用户</h2>
      <div>
        <input v-model="newUser.uName" placeholder="用户名" />
        <input v-model="newUser.uPwd" type="password" placeholder="密码" />
        <input v-model="newUser.uId" placeholder="用户ID" />
        <select v-model="newUser.uIdentity">
          <option value="">选择身份</option>
          <option value="A">管理员</option>
          <option value="B">教师</option>
          <option value="C">学生</option>
        </select>
        <button @click="addUser">增加用户</button>
        <router-link to="/admin">
          <button>返回</button>
        </router-link>
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const newUser = ref({ uId: '', uName: '', uPwd: '', uIdentity: '' });
    const message = ref('');

    const addUser = async () => {
      try {
        if (newUser.value.uId &&newUser.value.uName && newUser.value.uPwd && newUser.value.uIdentity) {
          const response = await axios.post('http://localhost:8080/addLogin', newUser.value);
          message.value = response.data.message;
          if (response.data.success) {
            newUser.value = { uName: '', uPwd: '', uIdentity: '' };
          }
        } else {
          message.value = '请填写完整信息';
        }
      } catch (error) {
        message.value = '添加用户失败，请重试';
      }
    };

    return {
      newUser,
      addUser,
      message
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

p {
  margin-top: 1rem;
  color: red;
}
</style>
