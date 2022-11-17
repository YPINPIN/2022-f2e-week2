import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/content'
  },
  {
    path: '/content',
    name: 'Content',
    redirect: '/content/file',
    component: () => import('../views/Content.vue'),
    children: [
      {
        path: 'file',
        name: 'ContentFile',
        component: () => import('../views/Content/ContentFile.vue'),
      },
      {
        path: 'archive',
        name: 'ContentArchive',
        component: () => import('../views/Content/ContentArchive.vue'),
      },
      {
        path: 'trash',
        name: 'ContentTrash',
        component: () => import('../views/Content/ContentTrash.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router