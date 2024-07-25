<template>
  <div class="admin">
    <div class="admin-container">
      <h2>审核成绩</h2>
      <div class="li-container">
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
              <div class="buttons">
                <button @click="approveCourse(index)">批准</button>
                <button @click="rejectCourse(index)">拒绝</button>
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
import { ref } from 'vue';

export default {
  setup() {
    const courses = ref([]);

    // Simulating backend data fetch
    // Replace with actual backend API call
    const fetchCourses = () => {
      // Example backend response
      const backendData = [
        { courseId: '123', teacherId: 't1', averageGrade: 'B', passRate: '85%', excellentRate: '30%' },
        { courseId: '456', teacherId: 't2', averageGrade: 'A', passRate: '95%', excellentRate: '50%' }
      ];
      courses.value = backendData;
    };

    const approveCourse = (index) => {
      courses.value.splice(index, 1); // Example: Remove course from the list
      // Call backend API to approve the course, handle response
    };

    const rejectCourse = (index) => {
      courses.value.splice(index, 1); // Example: Remove course from the list
      // Call backend API to reject the course, handle response
    };

    // Fetch courses on component mount
    fetchCourses();

    return {
      courses,
      approveCourse,
      rejectCourse
    };
  }
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Adjusted to min-height for better responsiveness */
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.admin-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 800px; /* Adjusted max-width for better layout */
}

.li-container{
  height: 400px; /* 设定允许滚动区域的高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

h2 {
  margin-bottom: 1.5rem; /* Increased margin for spacing */
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between; /* Adjusted for better alignment */
  align-items: center;
  padding: 1.5rem 1rem; /* Increased padding for better spacing */
  border-bottom: 1px solid #ddd;
}

.course-details {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  text-align: left; /* Adjusted alignment for left section */
}

.buttons {
  display: flex;
  gap: 1rem; /* Increased gap for better button spacing */
}

button {
  padding: 0.7rem 1.5rem; /* Increased padding for button size */
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem; /* Adjusted font size for readability */
  cursor: pointer;
  transition: background 0.3s ease;
}

button:nth-of-type(1) {
  background: #4caf50; /* Green for approve */
}

button:nth-of-type(1):hover {
  background: #45a049;
}

button:nth-of-type(2) {
  background: #f76c6c; /* Red for reject */
}

button:nth-of-type(2):hover {
  background: #d9534f;
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

</style>
