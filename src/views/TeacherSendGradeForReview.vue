<template>
  <div class="teacher">
    <div class="teacher-container">
      <h2 v-if="!selectedCourseDetails">发送成绩审核</h2>
      <div v-if="!selectedCourseDetails" class="li-container">
        <ul>
          <li v-for="(course, index) in courses" :key="index">
            <div class="course-details">
              <div class="left-section">
                <p>课程ID: {{ course.lid }}</p>
                <p>教师ID: {{ course.ltname }}</p>
<!--                <p>平均分: {{ course.averageGrade }}</p>-->
<!--                <p>及格率: {{ course.passRate }}</p>-->
<!--                <p>优秀率: {{ course.excellentRate }}</p>-->
              </div>
              <div class="right-section">
                <button @click="sendForReview(course.lid)">发送审核</button>
                <button @click="viewDetails(course.lid,course.ltid)">查看具体成绩</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 成绩表展示 -->
      <div v-if="selectedCourseDetails" class="grades-container">
        <h3>课程 {{ selectedCourseDetails.lid }} 的成绩</h3>
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

        <button @click="closeDetails">返回发送审核界面</button>
      </div>
      <router-link to="/teacher">
        <button>返回教师界面</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {

  props: ['uId', 'uName', 'uIdentity'],
  computed: {
    userInfo() {
      return {
        uId: this.uId,
        uName: this.uName,
        uIdentity: this.uIdentity
      };
    }
  },

  setup() {
    const lTId = this.userInfo.uId; // 教师ID
    const courses = ref([]);
    const coursedates = ref([]);
    const selectedCourseDetails = ref(null); // 用于存储选中的课程成绩详情

    // 获取课程数据
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/audits/courses?lTId=${lTId}');
        courses.value = response.data;
        coursedates.value = responsedata.data;
      } catch (error) {
        console.error('获取课程数据失败:', error);
      }
    };

    // 发送成绩审核请求
    const sendForReview = async (lid) => {
      try {
        await axios.post(`http://localhost:8080/api/audits/send/${lid}`);
        fetchCourses(); // 重新获取课程数据
      } catch (error) {
        console.error('发送审核失败:', error);
      }
    };

    // 查看具体成绩
    const viewDetails = async (glId,gTId) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/audits/grades/${lid}`);
        selectedCourseDetails.value = {
          lid,
          grades: response.data.grades
        };
      } catch (error) {
        console.error('获取课程成绩失败:', error);
      }
    };

    // 关闭成绩详情
    const closeDetails = () => {
      selectedCourseDetails.value = null;
    };

    // 组件挂载时获取课程数据
    onMounted(fetchCourses);

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
