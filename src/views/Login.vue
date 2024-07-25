<template>
  <div class="login">
    <div class="login-container">
      <!-- 登录标题 -->
      <h1>登录</h1>
      <!-- 用户名输入框 -->
      <input v-model="username" placeholder="用户名" />
      <!-- 密码输入框 -->
      <input v-model="password" type="password" placeholder="密码" />
      <!-- 角色选择框 -->
      <select v-model="role">
        <option value="">选择身份</option>
        <option value="admin">管理员</option>
        <option value="teacher">教师</option>
        <option value="student">学生</option>
      </select>
      <!-- 登录按钮 -->
      <button @click="login">登录</button>
      <!-- 错误信息显示 -->
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    // 用户名
    const username = ref('');
    // 密码
    const password = ref('');
    // 角色
    const role = ref('');
    // 错误信息
    const error = ref('');
    // 路由实例
    const router = useRouter();

    // 登录函数
    const login = () => {
      // 预设的用户信息
      const users = {
        admin: { username: 'admin', password: 'admin123' },
        teacher: { username: 'teacher', password: 'teacher123' },
        student: { username: 'student', password: 'student123' }
      };

      // 判断用户名和密码是否匹配
      if (
          username.value === users[role.value]?.username &&
          password.value === users[role.value]?.password
      ) {
        // // 将用户名作为查询参数添加到路由中
        // var uname=username.value;
        // router.push({name:username,query:{uname}});
        // 跳转到对应角色的页面
        router.push(`/${role.value}`);
      } else {
        // 用户名或密码错误，显示错误信息并清空输入框
        error.value = '用户名或密码错误';
        username.value = '';
        password.value = '';
      }

    };

    return {
      // 返回模板中使用的数据和方法
      username,
      password,
      role,
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
