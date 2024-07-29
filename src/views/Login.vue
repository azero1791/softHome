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
    // 用户ID
    const uId = ref('');
    // 用户名
    const uName = ref('');
    // 密码
    const uPw = ref('');
    // 角色
    const uIdentity = ref('');
    // 错误信息
    const error = ref('');
    // 路由实例
    const router = useRouter();

    // 登录函数
    const login = async () => {
      try {
        // 发送登录请求到后端
        const response = await axios.post('http://localhost:8080/api/login', {
          uId: uId.value,
          uName: uName.value,
          uPw: uPw.value,
          uIdentity: uIdentity.value
        });

        // 判断登录是否成功
        if (response.data.success) {
          // 根据角色跳转到相应的页面，并传递用户信息
          const userInfo = {
            uId: uId.value,
            uName: uName.value,
            uIdentity: uIdentity.value
          };

          if (uIdentity.value === 'A') router.push({name: 'Admin', props: userInfo});
          else if (uIdentity.value === 'B') router.push({name: 'Teacher', props: userInfo});
          else if (uIdentity.value === 'C') router.push({name: 'Student', props: userInfo});
        } else {
          // 显示错误信息
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
