import { createRouter, createWebHistory } from 'vue-router'

const checkHasUpload = (to, from, next, isDone = false) => {
  let hasUpload = false;
  // isDone 為 sign/done的檢查
  if (!isDone) {
    if (hasUpload) {
      // 已完成上傳步驟
      next();
    } else {
      // 如果沒有經過上傳步驟，前往上傳
      console.log('go to upload.')
      next('/sign')
    }
  } else {
    // 回傳是否經過上傳步驟
    return hasUpload
  }
}

const checkHasEdit = (to, from, next) => {
  let hasEdit = false;
  if (hasEdit) {
    // 已完成編輯步驟
    next();
  }
  // 檢查是否有上傳步驟
  if (!checkHasUpload(to, from, next, true)) {
    // 如果沒有經過上傳步驟，前往上傳
    console.log('go to upload.')
    next('/sign')
  } else {
    if (hasEdit) {
      // 已完成上傳步驟和編輯步驟
      next();
    } else {
      // 如果有完成上傳步驟，沒有經過編輯步驟，前往編輯步驟
      console.log('go to edit.')
      next('/sign/edit')
    }
  }
}

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
  {
    path: '/sign',
    name: 'Sign',
    redirect: '/sign/upload',
    component: () => import('../views/Sign.vue'),
    children: [
      {
        path: 'upload',
        name: 'SignUpload',
        component: () => import('../views/Sign/SignUpload.vue'),
      },
      {
        path: 'edit',
        name: 'SignEdit',
        component: () => import('../views/Sign/SignEdit.vue'),
        // beforeEnter: checkHasUpload,
      },
      {
        path: 'done',
        name: 'SignDone',
        component: () => import('../views/Sign/SignDone.vue'),
        // beforeEnter: checkHasEdit,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router