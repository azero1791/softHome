<template>
  <div class="teacher">
    <div class="teacher-container">
      <h2>录入成绩</h2>
      <input v-model="gSId" placeholder="学生ID" />
      <input v-model="gLId" placeholder="课程ID" />
      <input v-model="gPoint" placeholder="成绩" />
      <!-- 提交成绩按钮 -->
      <button @click="submitgPoint">提交成绩</button>
      <router-link to="/teacher">
        <button>返回</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    // 学生用户名
    const gSId = ref('');
    // 课程名称
    const gLId = ref('');
    // 成绩
    const gPoint = ref('');

    // 提交成绩函数
    const submitgPoint = async () => {
      // 如果学生用户名、课程名称和成绩都有值
      if (gSId.value && gLId.value && gPoint.value) {
        try {
          // 发送POST请求到后端接口
          const response = await axios.post('http://localhost:8080/addGrade', {
            gSId: gSId.value,
            gLId: gLId.value,
            gPoint: gPoint.value
          });

          // 判断请求是否成功
          if (response.data.code === 1) {
            // 提交成功，清空输入框的值
            gSId.value = '';
            gLId.value = '';
            gPoint.value = '';
            alert('成绩提交成功');
          } else {
            // 提交失败，显示错误信息
            alert(response.data.message || '成绩提交失败');
          }
        } catch (error) {
          console.error('成绩提交请求失败:', error);
          alert('成绩提交请求失败，请重试。');
        }
      } else {
        alert('请填写所有字段');
      }
    };

    return {
      gSId,
      gLId,
      gPoint,
      submitgPoint
    };
  }
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
  max-width: 600px;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

input {
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
