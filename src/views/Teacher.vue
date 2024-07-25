<template>
  <div class="teacher">
    <div class="teacher-container">
      <h1>教师界面</h1>
      <nav>
        <ul>
          <li><router-link to="/teacher/enter-grades">录入成绩</router-link></li>
          <li><router-link to="/teacher/modify-grades">修改成绩</router-link></li>
          <li><router-link to="/teacher/send-grade">发送审核</router-link></li>
          <li><router-link to="/teacher/view-grades">查询成绩</router-link></li>
          <li><router-link to="/">返回登陆界面</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
};
</script>

<style scoped>
.teacher {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.teacher-container {
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

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin-bottom: 1rem;
}

nav a {
  display: block;
  padding: 0.8rem;
  background: #4facfe;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s ease;
}

nav a:hover {
  background: #00f2fe;
}
</style>