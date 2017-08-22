export default {
  data() {
    return {
      form: {}
    };
  },
  props: ['options'],
  created() {
    this.options.map(i => {
      this.$set(this.form, i.name, i.defaultValue);
    });
  },
  methods: {
    sync(name, value) {
      this.form[name] = value;
      this.$emit('change', { name, value });
    },
    getField(item) {
      switch (item.type) {
        case 'input':
          return <el-input value={this.form[item.name]} on-input={value => this.sync(item.name, value)} {...item.option} />;
        case 'select':
          return (<el-select value={this.form[item.name]} on-input={value => this.sync(item.name, value)} {...item.option}>
            {item.values && item.values.map(i => (<el-option key={i.value} label={i.label} value={i.value} disabled={i.disabled} />))}
          </el-select>);
        case 'radio':
          return (<el-radio-group value={this.form[item.name]} on-input={value => this.sync(item.name, value)} {...item.option}>
            {item.values && item.values.map(i => (<el-radio key={i.value} label={i.value} disabled={i.disabled}>{i.label}</el-radio>))}
          </el-radio-group>);
        case 'datepicker':
          return (<el-date-picker value={this.form[item.name]} on-input={value => this.sync(item.name, value)} {...item.option} />);
        default:
          return null;
      }
    },
    getFields() {
      return this.options.map(i => (
        <el-col span={8}>
          <label class="el-form-item__label">{i.label}</label>
          {this.getField(i)}
        </el-col>
      ));
    },
    handleSearch() {
      this.$emit('search', this.form);
    }
  },
  render(h) {
    return (
      <div class="el-table-plus-search">
        <el-row>
          {this.getFields()}
        </el-row>
        <el-row><el-button on-click={this.handleSearch} type="primary">查询</el-button></el-row>
      </div>
    );
  }
};
