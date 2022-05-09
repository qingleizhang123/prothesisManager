
const permission = {
  mounted(el, binding) {
    // 获取页面按钮权限
    let btnPermissionsArr = [];
    const vm = binding.instance;
    if (binding.value) {
        // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
        btnPermissionsArr = Array.of(binding.value);
    } else {
        // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
        btnPermissionsArr = vm.$route.meta.btnPermissions as [];
    }
    if (!hasPermission(btnPermissionsArr)) {
        el.parentNode.removeChild(el);
    }
  },
};

const hasPermission = (value: any) => {
  let isExist = false;
  // 获取用户按钮权限
  const btnPermissionsStr = localStorage.getItem('roles');
  if (btnPermissionsStr === undefined || btnPermissionsStr === null) {
      return false;
  }
  if (value.indexOf(btnPermissionsStr) > -1) {
      isExist = true;
  }
  return isExist;
};

export default permission;
