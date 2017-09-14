export default {
  name: 'ElTablePlus',
  props: {
    currentChangeAsync: {
      type: Function
    },
    columns: {
      type: Array,
      default: []
    },
    pageSize: {
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
  computed: {
    hasPagination() {
      return !!this.currentChangeAsync;
    }
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
        {
          (this.$slots.caption || this.$slots.actionBar) &&
          <div class="el-table-plus__header">
            <h1 class="el-table-plus__header__caption">{this.$slots.caption}</h1>
            <div class="el-table-plus__header__action-bar">{this.$slots.actionBar}</div>
          </div>
        }
        <el-table ref="table" data={this.data} v-loading={this.loading} {...{props: this.$attrs}}
          {...{on: this._events}}>
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
        {
          this.hasPagination &&
          <el-pagination current-page={this.currentPage} page-size={this.pageSize}
            total={this.total} on-current-change={this.handleCurrentChange}
            layout="total, prev, pager, next">
          </el-pagination>
        }
      </div>
    );
  }
};
