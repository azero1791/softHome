<template>
  <div class="teacher">
    <div class="teacher-container">
      <!-- 修改成绩的标题 -->
      <h2>修改成绩</h2>
      <!-- 学生用户名输入框 -->
      <input v-model="selectedStudent" placeholder="学生用户名" @input="fetchGrade" />
      <!-- 课程名称输入框 -->
      <input v-model="course" placeholder="课程" @input="fetchGrade" />
<!--      &lt;!&ndash; 显示已有成绩 &ndash;&gt;-->
<!--      <div v-if="currentGrade !== null">-->
<!--        <p>当前成绩: {{ currentGrade }}</p>-->
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
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const selectedStudent = ref(''); // 学生用户名
    const course = ref(''); // 课程名称
    const newGrade = ref(''); // 新成绩
    const currentGrade = ref(null); // 当前成绩

    // 修改成绩
    const modifyGrade = async () => {
      if (selectedStudent.value && course.value && newGrade.value) {
        try {
          const response = await axios.put('http://localhost:8080/modifyGrade', {
            gSId: selectedStudent.value,
            gLId: course.value,
            gPoint: newGrade.value
          });

          if (response.data.code === 1) {
            alert('成绩修改成功');
            selectedStudent.value = '';
            course.value = '';
            newGrade.value = '';
            currentGrade.value = null;
          } else {
            alert(response.data.message || '成绩修改失败');
          }
        } catch (error) {
          console.error('成绩修改请求失败:', error);
          alert('成绩修改请求失败，请重试。');
        }
      } else {
        alert('请填写所有字段');
      }
    };

    return {
      selectedStudent,
      course,
      newGrade,
      currentGrade,
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
