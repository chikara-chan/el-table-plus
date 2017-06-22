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

### Table Methods

方法名 | 说明 | 参数
--- | --- | ---
reload | 调用 current-change-async 事件并重置表格从第 1 页开始 |

## Example

**html**

``` html
<el-form :model="form" inline>
  <el-form-item>
    <el-input v-model="form.search" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="handleSubmit">查询</el-button>
  </el-form-item>
</el-form>
<el-table-plus ref="table" @sort-change="handleSortChange" @filter-change="handleFilterChange"
               :current-change-async="handleCurrentChangeAsync" :columns="tableColumns"
               :page-size="20"></el-table-plus>
</div>
```

**js**

``` js
// Notice: 在 vue 文件使用 jsx 语法需在 script 标签添加 type="text/jsx"
export default {
  data() {
    return {
      form: {
        search_text: ''
      },
      tableColumns: [
        {
          label: '普通列',
          prop: 'id'
        },
        {
          label: '排序列',
          prop: 'name',
          sortable: 'custom'
        },
        {
          label: '过滤项列',
          prop: 'name',
          filters: [{text: '有效', value: 1}, {text: '无效', value: 0}],
          columnKey: 'columnKey'
        },
        {
          label: '格式化列',
          prop: 'status',
          formatter({status}) {
            return {
              1: '有效',
              0: '无效',
            }[status];
          }
        },
        {
          renderHeader: (h) => {
            return (
              <span>自定义列</span>
            );
          },
          renderBody: (h, {id}) => {
            return (
              <el-button onClick={() => this.handleEdit(id)}>编辑</el-button>
            );
          }
        }
      ]
    };
  },
  methods: {
    handleFilterChange(filters) {
      // TODO
    },
    handleSortChange({column, prop, order}) {
      // TODO
    },
    handleEdit(id) {
      // TODO
    },
    handleSubmit() {
      this.$refs.table.reload();
    },
    async handleCurrentChangeAsync(currentPage, pageSize) {
      const res = await getYourAjaxData({
        ...this.form,
        page_now: currentPage,
        page_size: pageSize
      })

      return {
        data: res.data.tableData,
        total: res.data.total
      }
    }
  },
  mounted() {
    this.handleSubmit();
  }
}
```
