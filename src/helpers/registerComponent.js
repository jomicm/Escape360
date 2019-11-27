module.exports = (componentsMgmt, component, _this) => {
  // console.log('component', component);
  // console.log('componentsMgmt', componentsMgmt);
  componentsMgmt[component].state = _this.state;
  componentsMgmt[component].setState = async(key, val) => {
    try {
      await _this.setState({[key]: val});
      componentsMgmt[component].state = _this.state;
    } catch (err) {
      console.log('err>', err);
    }
  };
};