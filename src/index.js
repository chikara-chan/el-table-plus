import ElTablePlus from './components/el-table-plus';
import ElTableSearch from './components/el-table-search';

export default {
  install(Vue) {
    Vue.component('el-table-plus', ElTablePlus);
    Vue.component('el-table-search', ElTableSearch);
  }
};
