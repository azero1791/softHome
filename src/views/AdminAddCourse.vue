<template>
  <div class="add-course">
    <div class="add-course-container">
      <h2>添加课程</h2>
      <form @submit.prevent="submitCourse">
        <div class="form-group">
<!--          <label for="lName">课程名</label>-->
          <input type="text" id="lName" v-model="lName" placeholder="课程名" required>
        </div>
        <div class="form-group">
<!--          <label for="lType">课程类型</label>-->
          <input type="text" id="lType" v-model="lType" placeholder="课程类型" required>
        </div>
        <div class="form-group">
<!--          <label for="lTId">教师ID</label>-->
          <input type="text" id="lTId" v-model="lTId" placeholder="教师ID" required>
        </div>
        <div class="form-group">
<!--          <label for="lCollege">课程学院</label>-->
          <input type="text" id="lCollege" v-model="lCollege" placeholder="课程学院" required>
        </div>
        <button type="submit">提交</button>
      </form>
      <p v-if="message">{{ message }}</p>
      <router-link to="/admin">
        <button>返回</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'; // 导入 Axios

export default {
  name: 'AddCourse',
  setup() {
    // 定义表单输入绑定的变量
    const lName = ref('');
    const lType = ref('');
    const lTId = ref('');
    const lCollege = ref('');
    const message = ref('');

    // 提交课程信息到后端的函数
    const submitCourse = async () => {
      try {
        // 使用 Axios 发送 POST 请求到后端 API，保存课程信息
        const response = await axios.post('/api/add-course', {
          lName: lName.value,
          lType: lType.value,
          lTId: lTId.value,
          lCollege: lCollege.value
        });
        message.value = response.data.message; // 显示后端返回的信息
      } catch (error) {
        console.error('添加课程失败:', error);
        // 你可以从 error 对象中获取更详细的错误信息，但这里为了简单起见，我们使用通用消息
        message.value = '添加课程失败，请重试。';
      }
    };

    return {
      lName,
      lType,
      lTId,
      lCollege,
      message,
      submitCourse
    };
  }
};
</script>

<style scoped>
.add-course {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.add-course-container {
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

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 93%;
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
