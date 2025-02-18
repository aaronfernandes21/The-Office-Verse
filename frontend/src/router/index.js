import { createRouter, createWebHistory } from 'vue-router';
import App from '@/components/App.vue';  // Importing App.vue
import TriviaPage from '@/components/TriviaPage.vue';

const routes = [
  { path: '/', component: App },  // Use App.vue as the main page
  { path: '/trivia', component: TriviaPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
