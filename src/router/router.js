import { createWebHistory, createRouter } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
    {
        path: '/',
        component: HomeView,
        meta: {
            title: 'Home',
            layout: MainLayout,
            public: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `Food App | ${to.meta.title}`;
    next();
})

export default router;