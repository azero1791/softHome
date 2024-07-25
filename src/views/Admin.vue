<template>
  <div class="admin">
    <div class="admin-container">
      <h1>管理员界面</h1>
      <nav>
        <ul>
          <li><router-link to="/admin/add-user">增加用户</router-link></li>
          <li><router-link to="/admin/edit-user">编辑用户</router-link></li>
          <li><router-link to="/admin/delete-user">删除用户</router-link></li>
          <li><router-link to="/admin/review-grades">审核成绩</router-link></li>
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
