export default {
  name: 'el-table-plus',
  props: {
    'current-change-async': {
      type: Function
    },
    'columns': {
      type: Array,
      default: []
    },
    'page-size': {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      data: [],
      loading: false,
      currentPage: 1,
      total: 0
    };
  },
  methods: {
    reload() {
      this.handleCurrentChange(1);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    async getData() {
      this.loading = true;

      const {data, total} = await this.currentChangeAsync(this.currentPage, this.pageSize);

      this.data = data;
      this.total = total;
      this.loading = false;
    }
  },
  render(h) {
    return (
      <div class="el-table-plus">
        <el-table
          data={this.data} v-loading={this.loading} on-filter-change={(...args) => this.$emit('filter-change', ...args)}
          on-sort-change={(...args) => this.$emit('sort-change', ...args)}>
          {
            this.columns.map(column => {
              const nextColumn = {
                ...column,
                formatter: column.formatter && (row => column.formatter(row[column.prop]))
              };

              return nextColumn.renderBody
                ? (
                  <el-table-column
                    {...{props: nextColumn}}
                    scopedSlots={
                      {
                        default({row}) {
                          return nextColumn.renderBody(h, row);
                        }
                      }
                    }>
                  </el-table-column>
                ) : (
                  <el-table-column {...{props: nextColumn}}>
                  </el-table-column>
                );
            })
          }
        </el-table>
        <el-pagination
          current-page={this.currentPage} page-size={this.pageSize} total={this.total}
          on-current-change={this.handleCurrentChange} layout="total, prev, pager, next">
        </el-pagination>
      </div>
    );
  }
};
