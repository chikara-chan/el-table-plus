import ElTablePlus from './components/el-table-plus.vue';

const VueElTablePlus = {
  install(Vue) {
    Vue.component('el-table-plus', ElTablePlus);
  }
};

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(VueElTablePlus);
}

export default VueElTablePlus;
