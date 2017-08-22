<h1 align="center">El Table Plus</h1>

<p align="center">
  <a href="https://travis-ci.org/chikara-chan/el-table-plus"><img alt="Travis Status" src="https://img.shields.io/travis/chikara-chan/el-table-plus/master.svg"></a>
  <a href="https://www.npmjs.com/package/el-table-plus"><img alt="NPM" src="https://img.shields.io/npm/v/el-table-plus.svg"></a>
  <a href="https://github.com/chikara-chan/el-table-plus/blob/master/LICENSE"><img alt="LICENSE" src="https://img.shields.io/npm/l/el-table-plus.svg"></a>
</p>

## Introduction

A high-level table component, integrating el-table and el-pagination of Element UI.

## Feature

- 整合 el-table 与 el-pagination 的高阶组件
- 通用列表分页查询业务需求快速成型
- 用更简单的方式自定义表头(render-header)与自定义表体(render-body)
- 组件内部维护数据源与分页
- 仅支持远程排序
- 整合表单条件查询

## Quick Start

``` bash
$ npm install --save el-table-plus
```

``` js
import ElTablePlus from 'el-table-plus';

Vue.use(ElTablePlus);
```

## API

### Table Attributes

参数 | 说明 | 类型 | 默认值 | 返回类型
--- | --- | --- | --- | ---
columns | 列属性，详见子章节 Table Attributes - column | Array[Object] | | |
page-size | 每页大小 | Number | 20 | |
current-change-async | 异步页码变化触发事件，需返回一个Object包含data和total两个key | Async Function(currentPage, pageSize) | | Object({data, total})
search-options | 查询表单参数 | Array | [] | -

### search-options

参数	| 说明	| 类型	| 可选值	| 默认值
--- | --- | --- | --- | ---
type | 组件类型 | String | input, select, radio, datepicker | -
name | 字段名称 | String
defaultValue | 字段默认值
values | type 为 select 和 radio 时需要传入的参数，作为选项的配置。 | Array
options | 组件的其他参数 | Object

### slot

title： 表单的标题栏

#### Table Attributes - column

同 Element 官方文档 Table-column Attributes，并新增以下属性

参数 | 说明 | 类型
--- | --- | ---
render-body | 自定义渲染表格体单元 | Function(h, row)

### Table Events

事件名 | 说明 | 参数
--- | --- | ---
filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组 | filters
sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order }
search-change | 查询条件变化事触发的事件 | { name, value }
search | 点击查询按钮触发的事件 | params

### Table Methods

方法名 | 说明 | 参数
--- | --- | ---
reload | 调用 current-change-async 事件并重置表格从第 1 页开始 |

## Example
![demo.png](https://i.loli.net/2017/08/22/599bf9820222a.png)

**html**

``` html
<el-table-plus ref="table" @sort-change="sortChange" @filter-change="filterChange"
               :current-change-async="currentChangeAsync"
               :columns="tableColumns" :page-size="10" :search-options="searchOptions">
  <div slot="title" class="title">
    <span>user table</span>
    <el-button type="primary">create</el-button>
  </div>
</el-table-plus>
```

**js**

``` js
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        search: ''
      },
      genderList: [{
        label: 'all',
        value: 'all'
      }, {
        label: 'female',
        value: 'female'
      }, {
        label: 'male',
        value: 'male'
      }],
      tableColumns: [
        {
          label: 'name',
          prop: 'name'
        },
        {
          label: 'gender',
          prop: 'gender',
          filters: [{text: 'male', value: 'male'}, {text: 'female', value: 'female'}],
          columnKey: 'columnKey'
        },
        {
          label: 'phone',
          prop: 'phone',
          sortable: 'custom'
        },
        {
          label: 'email',
          prop: 'email'
        },
        {
          renderHeader: (h) => {
            return (
              <span>operation</span>
            );
          },
          renderBody: (h, {id}) => {
            return (
              <el-button size="small" onClick={() => this.edit(id)}>edit</el-button>
            );
          }
        }
      ]
    };
  },
  computed: {
    searchOptions() {
      return [
        {
          label: '选择性别',
          name: 'gender',
          values: this.genderList,
          type: 'select',
          option: {

          },
          defaultValue: 'all'
        }
      ]
    }
  },
  methods: {
    filterChange(filters) {
      // TODO
    },
    sortChange({column, prop, order}) {
      // TODO
    },
    edit(id) {
      // TODO
    },
    submit() {
      this.$refs.table.reload();
    },
    getYourAjaxData(page, params) {
      return axios.get('https://randomuser.me/api/', {
        params: {
          gender: params.gender,
          page,
          results: 10
        },
      });
    },
    async currentChangeAsync(page, pageSize, params) {
      const { data: { results } } = await this.getYourAjaxData(page, params);
      const data = results.map(item => ({
        ...item,
        name: `${item.name.first}.${item.name.last}`
      }));
      return {
        data,
        total: 1000
      };
    }
  },
  mounted() {
    this.submit();
  }
}
```
