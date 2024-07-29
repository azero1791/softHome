<template>
  <div class="edit-course">
    <div class="edit-course-container">
      <h2>编辑课程</h2>
      <div class="li-container">
        <div v-if="!editFlag">

        </div>
        <table>
          <thead>
          <tr>
            <th>课程ID</th>
            <th>课程名</th>
            <th>课程类型</th>
            <th>教师ID</th>
            <th>课程学院</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(course, index) in courses" :key="index">
            <td>{{ course.lid }}</td>
            <td v-if="!editing[index]">{{ course.lname }}</td>
            <td v-if="!editing[index]">{{ course.ltype }}</td>
            <td v-if="!editing[index]">{{ course.ltname }}</td>
            <td v-if="!editing[index]">{{ course.lcollege }}</td>
            <td v-if="!editing[index]">
              <button @click="startEditing(index)">编辑</button>
              <button @click="deleteCourse(course.lid)">删除</button>
            </td>
            <td v-else>
              <input v-model="course.lName" placeholder="课程名">
              <input v-model="course.ltype" placeholder="课程类型">
              <input v-model="course.ltid" placeholder="教师ID">
              <input v-model="course.lcollege" placeholder="课程学院">
              <button @click="saveCourse(index, course.lId)">保存</button>
              <button @click="cancelEditing(index)">取消</button>
            </td>
          </tr>
          </tbody>
        </table>
        <p v-if="message">{{ message }}</p>
      </div>

      <router-link to="/admin">
        <button>返回</button>
      </router-link>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // 导入 Axios

export default {
  name: 'EditCourse',
  setup() {
    // 定义变量存储课程数据和编辑状态
    const courses = ref([]);
    const editing = ref([]);
    const message = ref('');
    const editFlag = ref(false);

    // 使用 Axios 获取课程数据的函数
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllLesson'); // 使用 axios.get
        courses.value = response.data.data; // 直接访问 data 属性
        console.log(response.data.data)
        editing.value = new Array(courses.value.length).fill(false);
      } catch (error) {
        console.error('获取课程数据失败:', error);
      }
    };

    // 开始编辑课程
    const startEditing = (index) => {
      editing.value[index] = true;
    };

    // 取消编辑课程
    const cancelEditing = (index) => {
      editing.value[index] = false;
    };

    // 保存编辑后的课程
    const saveCourse = async (index, lId) => {
      try {
        const response = await axios.put(`http://localhost:8080/modifyLessons`,{
          lName: courses.value[index].lName,
          lType:courses.value[index].ltype,
          lId:courses.value[index].lid,
          lCollege:courses.value[index].lcollege,
          lTId:courses.value[index].ltid

        }); // 使用 axios.put 并直接传递对象
        message.value = response.data.message;
        editing.value[index] = false;
      } catch (error) {
        console.error('保存课程信息失败:', error);
        message.value = '保存课程信息失败，请重试。';
      }
    };

    // 删除课程
    const deleteCourse = async (lId) => {
      try {
        console.log(lId);
        const response = await axios.delete(`http://localhost:8080/deleteLessons/${lId}`); // 使用 axios.delete
        message.value = response.data.message;
        if (response.data.code === 1) {
          fetchCourses(); // 重新获取课程数据
        }
      } catch (error) {
        console.error('删除课程失败:', error);
        message.value = '删除课程失败，请重试。';
      }
    };

    // 组件挂载时调用获取课程数据的函数
    onMounted(() => {
      fetchCourses();
    });

    return {
      courses,
      editing,
      message,
      editFlag,
      startEditing,
      cancelEditing,
      saveCourse,
      deleteCourse
    };
  }
};
</script>

<style scoped>
.li-container {
  height: 400px;
  overflow-y: auto;
}

.edit-course {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.edit-course-container {
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: #4facfe;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #00f2fe;
}
</style>
