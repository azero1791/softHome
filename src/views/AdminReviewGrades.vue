<template>
  <div class="admin">
    <div class="admin-container">
      <h2>审核成绩</h2>
      <div class="li-container">
        <ul>
          <li v-for="(course, index) in courses" :key="index">
            <div class="course-details">
              <div class="left-section">
                <p>课程名: {{ course.lname }}</p>
                <p>课程ID: {{ course.lid }}</p>
                <p>教师名: {{ course.ltname }}</p>
                <p>教师ID: {{ course.ltid }}</p>
                <!--                <p>平均分: {{ course.averageGrade }}</p>-->
<!--                <p>及格率: {{ course.passRate }}</p>-->
<!--                <p>优秀率: {{ course.excellentRate }}</p>-->
              </div>
              <div class="buttons">
                <button @click="approveCourse(course.lid)" class="approve-button">批准</button>
                <button @click="rejectCourse(course.lid)" class="reject-button">拒绝</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <router-link to="/admin">
        <button class="back-button">返回</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const courses = ref([]);

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/courses');
        courses.value = response.data;
      } catch (error) {
        console.error('获取课程信息失败', error);
      }
    };

    const approveCourse = async (lid) => {
      try {
        await axios.post(`http://localhost:8080/api/courses/approve/${lid}`);
        fetchCourses();
      } catch (error) {
        console.error('批准课程失败', error);
      }
    };

    const rejectCourse = async (lid) => {
      try {
        await axios.post(`http://localhost:8080/api/courses/reject/${lid}`);
        fetchCourses();
      } catch (error) {
        console.error('拒绝课程失败', error);
      }
    };

    onMounted(fetchCourses);

    return {
      courses,
      approveCourse,
      rejectCourse,
    };
  },
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.admin-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 800px;
}

.li-container {
  height: 400px;
  overflow-y: auto;
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

.back-button {
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

.back-button:hover {
  background: #00f2fe;
}

.buttons {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.approve-button {
  background: #4caf50;
}

.approve-button:hover {
  background: #45a049;
}

.reject-button {
  background: #f76c6c;
}

.reject-button:hover {
  background: #d9534f;
}
</style>
