export default {
  name: 'ElTablePlus',
  componentName: 'ElTablePlus',
  props: {
    currentChangeAsync: Function,
    columns: {
      type: Array,
      default: []
    },
    pageSize: {
      type: Number,
      default: 20
    },
    paginationAlign: {
      type: String,
      default: 'center',
      validator: val => ['left', 'right', 'center'].includes(val)
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
    reloadCurrent() {
      this.getData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    async getData() {
      this.data = [];
      this.loading = true;
      try {
        const { data, total } = await this.currentChangeAsync(this.currentPage, this.pageSize);

        this.data = data;
        this.total = total;
      } catch (e) {
        console.error(e);
      }
      this.$nextTick(() => {
        this.loading = false;
      });
    }
  },
  render(h) {
    const namespace = 'el-table-plus';
    const { caption, actionBar, ...otherSlots } = this.$slots;

    return (
      <div class={namespace}>
        {
          (caption || actionBar) &&
          <div class={`${namespace}__header`}>
            <h1 class={`${namespace}__header__caption`}>{caption}</h1>
            <div class={`${namespace}__header__action-bar`}>{actionBar}</div>
          </div>
        }
        <el-table data={this.data} v-loading={this.loading}
          {...{ props: this.$attrs, on: this.$listeners }}>
          {
            Object.entries(otherSlots).map(([key, val]) =>
              <template slot={key}>{val}</template>
            )
          }
          {
            this.columns.map(column => {
              const { formatter, renderBody } = column;
              const data = {
                props: {
                  ...column,
                  formatter: formatter && (row => formatter(row[column.prop]))
                }
              };

              if (renderBody) {
                data.scopedSlots = {
                  default({ row }) {
                    return renderBody(h, row);
                  }
                };
              }
              return (
                <el-table-column {...data}></el-table-column>
              );
            })
          }
        </el-table>
        {
          this.hasPagination &&
          <el-pagination class={`el-pagination--${this.paginationAlign}`}
            current-page={this.currentPage} page-size={this.pageSize}
            total={this.total} on-current-change={this.handleCurrentChange}
            layout="total, prev, pager, next">
          </el-pagination>
        }
      </div>
    );
  }
};
