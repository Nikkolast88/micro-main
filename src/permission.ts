import router from './router';

const childrenPath = ['/vue3'];
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.name) {
    next();
  } else {
    if (childrenPath.some((item: string) => to.path.includes(item))) {
      next();
    } else {
      next({ name: '404' });
    }
  }
});