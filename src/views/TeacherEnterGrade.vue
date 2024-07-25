<template>
  <div class="teacher">
    <div class="teacher-container">
      <h2>录入成绩</h2>
      <input v-model="selectedStudent" placeholder="学生用户名" />
      <input v-model="course" placeholder="课程" />
      <input v-model="grade" placeholder="成绩" />
      <!-- 提交成绩按钮 -->
      <button @click="submitGrade">提交成绩</button>
      <router-link to="/teacher">
        <button>返回</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 学生用户名
    const selectedStudent = ref('');
    // 课程名称
    const course = ref('');
    // 成绩
    const grade = ref('');
    // 初始化grades数组，如果localStorage中有'grades'则解析其值为数组，否则默认为空数组
    const grades = ref(JSON.parse(localStorage.getItem('grades')) || []);

    // 提交成绩函数
    // 提交成绩
    const submitGrade = () => {
      // 如果学生用户名、课程名称和成绩都有值
      if (selectedStudent.value && course.value && grade.value) {
        // 将成绩信息添加到grades数组中
        grades.value.push({
          student: selectedStudent.value,
          course: course.value,
          grade: grade.value
        });
        // 将更新后的grades数组存储到localStorage中
        localStorage.setItem('grades', JSON.stringify(grades.value));
        // 清空输入框的值
        selectedStudent.value = '';
        course.value = '';
        grade.value = '';
      }
    };

    return {
      selectedStudent,
      course,
      grade,
      submitGrade
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
