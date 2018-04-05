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
import 'el-table-plus/lib/index.css';

Vue.use(ElTablePlus);
```

## Online Example

[codesandbox](https://codesandbox.io/s/71wpwx701q)

## Example

**html**

``` html
<div>
  <el-form :model="form" ref="form" inline>
    <el-form-item>
      <el-input v-model="form.search" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table-plus ref="table" @sort-change="sortChange" @filter-change="filterChange"
    @selection-change="selectionChange" :current-change-async="currentChangeAsync"
    :columns="tableColumns" :page-size="10">
    <template slot="caption">成员列表</template>
    <template slot="actionBar">
      <el-button @click="create" type="primary">创建成员</el-button> 
    </template>
  </el-table-plus>
</div>
```

**js**

``` js
  const mockAjax = ({ pageNum, pageSize, search }) => Promise.resolve({
    data: Array.apply(null, { length: pageSize }).map((item, index) =>
      ({
        id: (pageNum - 1) * pageSize + index,
        name: search || '张三',
        type: index % 2 ? '有效' : '无效',
        gender: index % 2
      })
    ),
    total: 100
  });

  export default {
    data() {
      return {
        form: {
          search: ''
        },
        tableColumns: [
          {
            type: 'selection'
          },
          {
            type: 'expand',
            renderBody(h) { // eslint-disable-line
              return (
                <span>厉害了，我滴哥！</span>
              );
            }
          },
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
            label: '过滤列',
            prop: 'type',
            filters: [{ text: '有效', value: 1 }, { text: '无效', value: 0 }],
            columnKey: 'type'
          },
          {
            label: '格式化列',
            prop: 'gender',
            formatter(gender) {
              return {
                1: '男',
                0: '女'
              }[gender];
            }
          },
          {
            renderHeader(h) { // eslint-disable-line
              return (
                <span>自定义列</span>
              );
            },
            renderBody: (h, { id }) => [
              <el-button type="text" onClick={() => this.getDetail(id)}>详情</el-button>
            ]
          }
        ]
      };
    },
    methods: {
      filterChange(filters) {
        console.log(filters);
      },
      sortChange({column, prop, order}) {
        console.log(column, prop, order);
      },
      selectionChange(selections) {
        console.log(selections);
      },
      getDetail(id) {
        console.log(id);
      },
      create() {
        console.log('create');
      },
      submit() {
        this.$refs.form.validate(async valid => {
          if (!valid) {
            return;
          }
          this.$refs.table.reload();
        });
      },
      async currentChangeAsync(currentPage, pageSize) {
        const { data, total } = await mockAjax({
          ...this.form,
          pageNum: currentPage,
          pageSize: pageSize
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
  };
```

## API

### Attributes

As same as Element UI [Table Attributes](http://element.eleme.io/#/en-US/component/table). Besides, add these attributes:

Param | Type | Default | Description
--- | --- | --- | ---
columns | object[] | [] | See Table Attributes - column below.
page-size | number | 20 |
current-change-async | async function(currentPage, pageSize) | | Triger when page changes，require returning value `{ data: object[], total: number }`.
pagination-align | String | 'center' | One of `'left'`, `'right'` and `'center'`.

#### Attributes - column

As same as Element UI [Table-column Attributes](http://element.eleme.io/#/en-US/component/table). Besides, add these attributes:

Param | Type | Default | Description
--- | --- | --- | ---
renderBody | function(h, row) | | Render custom body or expand body.

### Events

As same as Element UI [Table Events](http://element.eleme.io/#/en-US/component/table).

### Methods

Method | Param | Description
--- | --- | ---
reload | | Call `current-change-async` event, and reload in first page.
reloadCurrent | | Call `current-change-async` event, and reload in current page.

### Slots

As same as Element UI [Table-column Slots](http://element.eleme.io/#/en-US/component/table). Besides, add these slots:

Name | Description
--- | ---
caption | The caption of table.
actionBar | The action bar of table.
