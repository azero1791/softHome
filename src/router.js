import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Admin from './views/Admin.vue';
import AdminAddUser from './views/AdminAddUser.vue';
import AdminEditUser from './views/AdminEditUser.vue';
import AdminDeleteUser from './views/AdminDeleteUser.vue';
import AdminReviewGrades from './views/AdminReviewGrades.vue';
import Teacher from './views/Teacher.vue';
import Student from './views/Student.vue';
import TeacherSendGradeForReview from "@/views/TeacherSendGradeForReview.vue";
import TeacherEnterGrade from "@/views/TeacherEnterGrade.vue";
import TeacherModifyGrade from "@/views/TeacherModifyGrade.vue";
import TeacherViewGrades from "@/views/TeacherViewGrades.vue";
import AdminAddCourse from "@/views/AdminAddCourse.vue";
import AdminEditCourse from "@/views/AdminEditCourse.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/admin', component: Admin, props: true },
    { path: '/admin/add-user', component: AdminAddUser },
    { path: '/admin/edit-user', component: AdminEditUser },
    { path: '/admin/delete-user', component: AdminDeleteUser },
    { path: '/admin/review-grades', component: AdminReviewGrades },
    { path: '/admin/add-course', component: AdminAddCourse },
    { path: '/admin/edit-course', component: AdminEditCourse },
    { path: '/teacher', component: Teacher ,props: true},
    { path: '/teacher/enter-grades', component: TeacherEnterGrade },
    { path: '/teacher/modify-grades', component: TeacherModifyGrade },
    { path: '/teacher/send-grade', component: TeacherSendGradeForReview },
    { path: '/teacher/view-grades', component: TeacherViewGrades },
    { path: '/student', component: Student,props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
