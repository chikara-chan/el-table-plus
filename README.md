<h1 align="center">El Table Plus</h1>

<p align="center">
  <a href="https://travis-ci.org/chikara-chan/el-table-plus"><img alt="Travis Status" src="https://img.shields.io/travis/chikara-chan/el-table-plus/master.svg"></a>
  <a href="https://www.npmjs.com/package/el-table-plus"><img alt="NPM" src="https://img.shields.io/npm/v/el-table-plus.svg"></a>
  <a href="https://github.com/chikara-chan/el-table-plus/blob/master/LICENSE"><img alt="LICENSE" src="https://img.shields.io/npm/l/el-table-plus.svg"></a>
</p>

## Introduction

A high-level table component, integrating el-table and el-pagination of Element UI.

## Feature

- Configure columns in script.
- Render custom head and body.
- Manage data source innerly.
- Control pagination easily.

## Quick Start

``` bash
$ npm install --save el-table-plus
```

``` js
import ElTablePlus from 'el-table-plus';

Vue.use(ElTablePlus);
```

## Example

**html**

``` html
<el-form :model="form" inline>
  <el-form-item>
    <el-input v-model="form.search" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="submit">查询</el-button>
  </el-form-item>
</el-form>
<el-table-plus ref="table" @sort-change="sortChange" @filter-change="filterChange"
  :current-change-async="currentChangeAsync" :columns="tableColumns" :page-size="20">
</el-table-plus>
```

**js**

``` js
export default {
  data() {
    return {
      form: {
        search: ''
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
          formatter(status) {
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
              <el-button onClick={() => this.edit(id)}>编辑</el-button>
            );
          }
        }
      ]
    };
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
    async currentChangeAsync(currentPage, pageSize) {
      const {data, total} = await getYourAjaxData({
        ...this.form,
        page_now: currentPage,
        page_size: pageSize
      });

      return {
        data,
        total
      };
    }
  },
  mounted() {
    this.submit();
  }
}
```

## API

### Table Attributes

As same as Element UI [Table Attribute](http://element.eleme.io/#/en-US/component/table#table-attributes). Besides, add these attributes:

Param | Type | Default | Description
--- | --- | --- | ---
columns | object[] | [] | See Table Attributes - column below.
page-size | number | 20 |
current-change-async | async function(currentPage, pageSize) | | Triger when page changes，require returning value `{ data: object[], total: number }`.

#### Table Attributes - column

As same as Element UI [Table-column Attribute](http://element.eleme.io/#/en-US/component/table#table-column-attributes). Besides, add these attributes:

Param | Type | Default | Description
--- | --- | --- | ---
renderBody | function(h, row) | | Render custom body or expand body.

### Table Events

As same as Element UI [Table Events](http://element.eleme.io/#/en-US/component/table#table-events).

### Table Methods

Method | Param | Description
--- | --- | ---
reload | | Call `current-change-async` event, and reset page to 1.

### Table Slots

Name | Description
--- | ---
caption | The caption of table.
actionBar | The action bar of table.
