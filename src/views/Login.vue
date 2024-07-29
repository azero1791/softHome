<template>
  <div class="login">
    <div class="login-container">
      <!-- 登录标题 -->
      <h1>登录</h1>
      <!-- 用户ID输入框 -->
      <input v-model="uId" placeholder="用户ID" />
      <!-- 用户名输入框 -->
      <input v-model="uName" placeholder="用户名" />
      <!-- 密码输入框 -->
      <input v-model="uPw" type="password" placeholder="密码" />
      <!-- 角色选择框 -->
      <select v-model="uIdentity">
        <option value="">选择身份</option>
        <option value="A">管理员</option>
        <option value="B">教师</option>
        <option value="C">学生</option>
      </select>
      <!-- 登录按钮 -->
      <button @click="login">登录</button>
      <!-- 错误信息显示 -->
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const uId = ref('');
    const uName = ref('');
    const uPw = ref('');
    const uIdentity = ref('');
    const error = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          uId: uId.value,
          uName: uName.value,
          uPwd: uPw.value,
          uIdentity: uIdentity.value
        });

        if (response.data.code === 1) {
          const userInfo = {
            uId: uId.value,
            uName: uName.value,
            uIdentity: uIdentity.value
          };

          if (uIdentity.value === 'A') {
            router.push({ name: 'Admin', params: { uId:uId.value } });
          } else if (uIdentity.value === 'B') {
            router.push({ name: 'Teacher', params: { uId:uId.value } });
          } else if (uIdentity.value === 'C') {
            router.push({ name: 'Student', params: { uId:uId.value } });
          }
        } else {
          error.value = response.data.message || '用户名或密码错误';
          uName.value = '';
          uPw.value = '';
        }
      } catch (error) {
        console.error('登录请求失败:', error);
        error.value = '登录请求失败，请重试。';
      }
    };

    return {
      uId,
      uName,
      uPw,
      uIdentity,
      error,
      login
    };
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h1 {
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
