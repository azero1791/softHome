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
          <label for="gSId">学生ID</label>
          <input id="gSId" v-model="gSId" />
          <label for="gLId">课程ID</label>
          <input id="gLId" v-model="gLId" />
        </div>
        <button @click="queryStudentGrade">查询</button>
        <button @click="resetView">返回</button>
      </div>

      <!-- 课程成绩查询输入框 -->
      <div v-if="showCourseInput">
        <h2>查看课程成绩</h2>
        <div>
          <label for="gLId">课程ID</label>
          <input id="gLId" v-model="gLId" />
        </div>
<!--        <div>-->
<!--          <label for="gTId">老师ID</label>-->
<!--          <input id="gTId" v-model="gTId" />-->
<!--        </div>-->
        <button @click="queryCourseGrade">查询</button>
        <button @click="resetView">返回</button>
      </div>

      <!-- 成绩列表展示 -->
      <div v-if="grades.length > 0" class="grades-container">
        <h2>成绩列表</h2>
        <table>
          <thead>
          <tr>
            <th v-if="showStudentInput">课程名</th>
            <th v-if="showStudentInput">学生名</th>
            <th v-if="showStudentInput">成绩</th>
            <th v-if="showCourseInput">学生名</th>
            <th v-if="showCourseInput">学生ID</th>
            <th v-if="showCourseInput">成绩</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(record, index) in grades" :key="index">
            <td v-if="showStudentInput">{{ record.glname }}</td>
            <td v-if="showStudentInput">{{ record.gsname }}</td>
            <td v-if="showStudentInput">{{ record.gpoint }}</td>
            <td v-if="showCourseInput">{{ record.gsname }}</td>
            <td v-if="showCourseInput">{{ record.gsid }}</td>
            <td v-if="showCourseInput">{{ record.gpoint }}</td>
          </tr>
          </tbody>
        </table>
        <button @click="resetView">返回</button>
      </div>
      <router-link to="/teacher">
        <button>返回教师界面</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const showStudentInput = ref(false);
    const showCourseInput = ref(false);
    const gSId = ref('');
    const gLId = ref('');
    const gTId = ref('');
    const grades = ref([]);

    // 重置视图
    const resetView = () => {
      showStudentInput.value = false;
      showCourseInput.value = false;
      grades.value = [];
      gSId.value = '';
      gLId.value = '';
      gTId.value = '';
    };

    // 查询学生成绩
    const queryStudentGrade = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/studentGetSingleGrade`,{
          gSId:gSId.value,
          gLId:gLId.value
        });
        grades.value = response.data.data;
      } catch (error) {
        console.error('查询学生成绩失败:', error);
      }
    };

    // 查询课程成绩
    const queryCourseGrade = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/teacherGetCheckedGrade`,{
          gLId: gLId.value
        });
        grades.value = response.data.data;
      } catch (error) {
        console.error('查询课程成绩失败:', error);
      }
    };

    return {
      showStudentInput,
      showCourseInput,
      gSId,
      gLId,
      gTId,
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
  max-width: 800px;
}

h2 {
  margin-bottom: 1.5rem;
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
