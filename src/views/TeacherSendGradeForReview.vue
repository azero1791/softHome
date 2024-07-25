<template>
  <div class="teacher">
    <div class="teacher-container">
      <h2 v-if="!selectedCourseDetails">发送成绩审核</h2>
      <div v-if="!selectedCourseDetails" class="li-container">
        <ul>
          <li v-for="(course, index) in courses" :key="index">
            <div class="course-details">
              <div class="left-section">
                <p>课程ID: {{ course.courseId }}</p>
                <p>教师ID: {{ course.teacherId }}</p>
                <p>平均分: {{ course.averageGrade }}</p>
                <p>及格率: {{ course.passRate }}</p>
                <p>优秀率: {{ course.excellentRate }}</p>
              </div>
              <div class="right-section">
                <button @click="sendForReview(index)">发送审核</button>
                <button @click="viewDetails(course.courseId)">查看具体成绩</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 成绩表展示 -->
      <div v-if="selectedCourseDetails" class="grades-container">
        <h3>课程 {{ selectedCourseDetails.courseId }} 的成绩</h3>
        <div class="li-container">
          <table>
            <thead>
            <tr>
              <th>学生ID</th>
              <th>成绩</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(grade, index) in selectedCourseDetails.grades" :key="index">
              <td>{{ grade.studentId }}</td>
              <td>{{ grade.grade }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <button @click="closeDetails">返回</button>
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
    const courses = ref([]);

    // 模拟从后端获取课程数据
    const fetchCourses = () => {
      // 这里替换成实际的后端 API 调用
      const backendData = [
        { courseId: '123', teacherId: 't1', averageGrade: 'B', passRate: '85%', excellentRate: '30%' },
        { courseId: '456', teacherId: 't2', averageGrade: 'A', passRate: '95%', excellentRate: '50%' }
      ];
      courses.value = backendData;
    };

    const reviewRequests = ref(JSON.parse(localStorage.getItem('reviewRequests')) || []);
    const selectedCourseDetails = ref(null); // 用于存储选中的课程成绩详情

    // 发送成绩审核请求
    const sendForReview = (index) => {
      reviewRequests.value.push({
        courseId: courses.value[index].courseId,
        teacherId: courses.value[index].teacherId
      });
      localStorage.setItem('reviewRequests', JSON.stringify(reviewRequests.value));
    };

    // 查看具体成绩
    const viewDetails = (courseId) => {
      // 模拟从后端获取成绩表数据
      // 这里替换成实际的后端 API 调用
      const gradesData = [
        { studentId: 's1', grade: 'A' },
        { studentId: 's2', grade: 'B' }
      ];
      selectedCourseDetails.value = {
        courseId,
        grades: gradesData
      };
    };

    // 关闭成绩详情
    const closeDetails = () => {
      selectedCourseDetails.value = null;
    };

    // 组件挂载时获取课程数据
    fetchCourses();

    return {
      courses,
      sendForReview,
      viewDetails,
      closeDetails,
      selectedCourseDetails
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
  max-width: 800px;
}

.li-container {
  height: 500px; /* 设定允许滚动区域的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #ddd;
}

.course-details {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  text-align: left;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.grades-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 0.8rem;
  text-align: left;
}

th {
  background: #f2f2f2;
}
</style>
