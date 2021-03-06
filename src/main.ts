import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  Table,
  List,
  Button,
  Radio,
  Checkbox,
  Dropdown,
  Divider,
  Menu,
  Input,
  Select,
  Slider,
  Modal,
  DatePicker,
  Collapse,
  Row,
  Col,
  Tooltip,
  InputNumber,
  Progress,
  Switch,
  Alert,
  Spin,
  message,
  Upload,
  Form,
  Tag,
  Breadcrumb,
  Card,
  BackTop,
  Avatar,
  TreeSelect
} from 'ant-design-vue';
import './styles/index.less';
import 'element-plus/lib/theme-chalk/el-color-picker.css';
import 'element-plus/lib/theme-chalk/el-slider.css';
import ProthesisList from './components/Prothesis/ProthesisList.vue';
import ProthesisModel from './components/Prothesis/ProthesisModel.vue';
import AccountManage from './components/AccountManage/AccountManage.vue';
import ProthesisManage from './components/Prothesis/ProthesisManage.vue';
import RoleManage from './components/RoleManage/RoleManage.vue';
import DeviceDistribute from './components/Device/DeviceDistribute.vue';
import ProthesisStore from './components/Prothesis/ProthesisStore.vue';
import DeviceList from './components/Device/DeviceList.vue';
import DeviceManage from './components/Device/DeviceManage.vue';
import PermissionManage from './components/PermissionManage/PermissionManage.vue';
import Directives from '@/directive/index';

message.config({
  top: '120px',
  maxCount: 1
});

const app = createApp(App);
app.use(store);
app.use(router);
Progress.install(app);
Table.install(app);
List.install(app);
Button.install(app);
Dropdown.install(app);
Menu.install(app);
Select.install(app);
Slider.install(app);
DatePicker.install(app);
Divider.install(app);
Collapse.install(app);
Modal.install(app);
Radio.install(app);
Checkbox.install(app);
Row.install(app);
Col.install(app);
Tooltip.install(app);
Input.install(app);
InputNumber.install(app);
Switch.install(app);
Alert.install(app);
Spin.install(app);
Upload.install(app);
Form.install(app);
Tag.install(app);
Breadcrumb.install(app);
Card.install(app);
BackTop.install(app);
Avatar.install(app);
TreeSelect.install(app);
app.use(Directives);
app.component('prothesis-list', ProthesisList);
app.component('prothesis-model', ProthesisModel);
app.component('account-manage', AccountManage);
app.component('prothesis-manager', ProthesisManage);
app.component('role-manage', RoleManage);
app.component('device-distribute', DeviceDistribute);
app.component('prothesis-store', ProthesisStore);
app.component('device-list', DeviceList);
app.component('device-manage', DeviceManage);
app.component('permission-manage', PermissionManage);
app.mount('#app');
