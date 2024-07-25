<template>
  <div class="student">
    <div class="student-container">
      <h2>学生界面</h2>
      <div>
        <!-- 学生成绩列表 -->
        <ul>
          <!-- 使用v-for指令遍历studentGrades数组，并显示每条成绩记录 -->
          <li v-for="(record, index) in studentGrades" :key="index">
            课程ID: {{ record.courseId }}, 教师: {{ record.teacher }}, 成绩: {{ record.grade }}
          </li>
        </ul>
        <!-- 如果没有成绩记录，则显示提示信息 -->
        <div v-if="studentGrades.length === 0">
          <p>没有找到成绩记录。</p>
        </div>
      </div>
      <!-- 返回登陆界面按钮 -->
      <router-link to="/">
        <button>返回登录界面</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    // 假设studentUsername为已登录学生的用户名，这里用'student1'作为示例
    const studentUsername = 'student1'; // 替换为实际登录的学生

    // 定义用于存储学生成绩的响应式变量
    const studentGrades = ref([]);

    // 获取学生成绩的函数
    const fetchStudentGrades = async () => {
      try {
        // 发送请求到后端API，获取学生成绩数据
        const response = await fetch(`/api/student-grades?student=${studentUsername}`);
        const data = await response.json();
        studentGrades.value = data.grades;
      } catch (error) {
        console.error('获取学生成绩失败:', error);
      }
    };

    // 组件挂载时调用获取学生成绩的函数
    onMounted(() => {
      fetchStudentGrades();
    });

    return {
      studentGrades // 返回学生成绩记录
    };
  }
};
</script>

<style scoped>
.student {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.student-container {
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

ul {
  list-style: none;
  padding: 0;
  text-align: left; /* 将文本对齐方式设置为左对齐 */
}

li {
  margin-bottom: 1rem;
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
