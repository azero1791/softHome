<template>
  <div class="teacher">
    <div class="teacher-container">
      <h2 v-if="!showStudentInput && !showCourseInput">成绩查询系统</h2>
      <div v-if="!showStudentInput && !showCourseInput">
        <button @click="showStudentInput = true">查看学生成绩</button>
        <button @click="showCourseInput = true">查看课程成绩</button>
      </div>

      <!-- 学生成绩查询输入框 -->
      <div v-if="showStudentInput">
        <h2>查看学生成绩</h2>
        <div>
          <label for="studentId">学生ID</label>
          <input id="studentId" v-model="studentId" />
        </div>
        <div>
          <label for="courseId">课程ID</label>
          <input id="courseId" v-model="studentCourseId" />
        </div>
        <button @click="queryStudentGrade">查询</button>
        <button @click="resetView">返回</button>
      </div>

      <!-- 课程成绩查询输入框 -->
      <div v-if="showCourseInput">
        <h2>查看课程成绩</h2>
        <div>
          <label for="courseId">课程ID</label>
          <input id="courseId" v-model="courseId" />
        </div>
        <div>
          <label for="teacherId">老师ID</label>
          <input id="teacherId" v-model="teacherId" />
        </div>
        <button @click="queryCourseGrade">查询</button>
        <button @click="resetView">返回</button>
      </div>

      <!-- 成绩列表展示 -->
      <div v-if="grades.length > 0">
        <h2>成绩列表</h2>
        <ul>
          <li v-for="(record, index) in grades" :key="index">
            <span v-if="showStudentInput">{{ record.course }} 课程的成绩：{{ record.grade }}</span>
            <span v-if="showCourseInput">{{ record.studentId }} - {{ record.studentName }} 的成绩：{{ record.grade }}</span>
          </li>
        </ul>
        <button @click="resetView">返回</button>
      </div>
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
    const showStudentInput = ref(false);
    const showCourseInput = ref(false);
    const studentId = ref('');
    const studentCourseId = ref('');
    const courseId = ref('');
    const teacherId = ref('');
    const grades = ref([]);

    // 重置视图
    const resetView = () => {
      showStudentInput.value = false;
      showCourseInput.value = false;
      grades.value = [];
      studentId.value = '';
      studentCourseId.value = '';
      courseId.value = '';
      teacherId.value = '';
    };

    // 查询学生成绩
    const queryStudentGrade = async () => {
      try {
        // 模拟后端 API 调用
        const response = await fetch(`/api/student-grades?studentId=${studentId.value}&courseId=${studentCourseId.value}`);
        const data = await response.json();
        grades.value = data.grades;
      } catch (error) {
        console.error('查询学生成绩失败:', error);
      }
    };

    // 查询课程成绩
    const queryCourseGrade = async () => {
      try {
        // 模拟后端 API 调用
        const response = await fetch(`/api/course-grades?courseId=${courseId.value}&teacherId=${teacherId.value}`);
        const data = await response.json();
        grades.value = data.grades;
      } catch (error) {
        console.error('查询课程成绩失败:', error);
      }
    };

    return {
      showStudentInput,
      showCourseInput,
      studentId,
      studentCourseId,
      courseId,
      teacherId,
      grades,
      resetView,
      queryStudentGrade,
      queryCourseGrade
    };
  }
};
</script>

<style scoped>
.teacher {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

button {
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
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

div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  text-align: left;
  color: #333;
}
</style>
