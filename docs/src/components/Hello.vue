<template>
  <div>
    <el-table-plus ref="table" @sort-change="sortChange" @filter-change="filterChange"
                   :current-change-async="currentChangeAsync"
                   :columns="tableColumns" :page-size="10" :search-options="searchOptions">
      <div slot="title" class="title">
        <span>user table</span>
        <el-button type="primary">create</el-button>
      </div>
    </el-table-plus>
  </div>
</template>

<script type="text/jsx">
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 24px;
}
</style>
