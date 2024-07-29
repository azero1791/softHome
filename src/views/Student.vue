<template>
  <div class="gSId">
    <div class="gSId-container">
      <h2>学生界面</h2>
      <div>
        <!-- 学生成绩列表 -->
        <ul>
          <!-- 使用v-for指令遍历gSIdGrades数组，并显示每条成绩记录 -->
          <li v-for="(record, index) in gSIdGrades" :key="index">
            课程ID: {{ record.glid }}, 教师: {{ record.gtname }}, 成绩: {{ record.gpoint }}
          </li>
        </ul>
        <!-- 如果没有成绩记录，则显示提示信息 -->
        <div v-if="gSIdGrades.length === 0">
          <p>没有找到成绩记录。</p>
        </div>
      </div>
      <!-- 返回登陆界面按钮 -->
      <router-link to="/">
        <button>返回登录界面</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted,defineProps  } from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute()

    const userInfo = route.params.uId
    // 定义用于存储学生成绩的响应式变量
    const gSIdGrades = ref([]);

    // 计算属性，用于获取当前登录学生的用户名（这里假设是uName）

    // 获取学生成绩的函数
    const fetchgSIdGrades = async () => {
      try {
        // 发送请求到后端API，获取学生成绩数据
        const response = await axios.post('http://localhost:8080/studentGetGrade', {
          gSId:userInfo
        });
        gSIdGrades.value = response.data.data;
      } catch (error) {
        console.error('获取学生成绩失败:', error);
      }
    };

    // 组件挂载时调用获取学生成绩的函数
    onMounted(() => {
      fetchgSIdGrades();
    });

    // 返回给模板的响应式数据和函数
    return {
      gSIdGrades
    };
  }
};
</script>


<style scoped>
.gSId {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.gSId-container {
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

ul {
  list-style: none;
  padding: 0;
  text-align: left; /* 将文本对齐方式设置为左对齐 */
}

li {
  margin-bottom: 1rem;
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
