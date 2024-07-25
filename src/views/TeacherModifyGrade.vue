<template>
  <div class="teacher">
    <div class="teacher-container">
      <!-- 修改成绩的标题 -->
      <h2>修改成绩</h2>
      <!-- 学生用户名输入框 -->
      <input v-model="selectedStudent" placeholder="学生用户名" @input="fetchGrade" />
      <!-- 课程名称输入框 -->
      <input v-model="course" placeholder="课程" @input="fetchGrade" />
      <!-- 显示已有成绩 -->
<!--      <div v-if="currentGrade !== null">-->
        <p>当前成绩: {{ currentGrade }}</p>
<!--      </div>-->
      <!-- 新成绩输入框 -->
      <input v-model="newGrade" placeholder="新成绩" />
      <!-- 修改成绩的按钮 -->
      <button @click="modifyGrade">修改成绩</button>
      <router-link to="/teacher">
        <button>返回</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const selectedStudent = ref(''); // 学生用户名
    const course = ref(''); // 课程名称
    const newGrade = ref(''); // 新成绩
    const grades = ref(JSON.parse(localStorage.getItem('grades')) || []);
    const currentGrade = ref(null); // 当前成绩

    // 计算属性：获取当前成绩
    const fetchGrade = () => {
      const gradeRecord = grades.value.find(
          record => record.student === selectedStudent.value && record.course === course.value
      );
      if (gradeRecord) {
        currentGrade.value = gradeRecord.grade;
      } else {
        currentGrade.value = null;
      }
    };

    // 修改成绩
    const modifyGrade = () => {
      const index = grades.value.findIndex(
          record => record.student === selectedStudent.value && record.course === course.value
      );
      if (index !== -1 && newGrade.value) {
        grades.value[index].grade = newGrade.value;
        localStorage.setItem('grades', JSON.stringify(grades.value));
        selectedStudent.value = '';
        course.value = '';
        newGrade.value = '';
        currentGrade.value = null;
      }
    };

    return {
      selectedStudent,
      course,
      newGrade,
      currentGrade,
      fetchGrade,
      modifyGrade
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
