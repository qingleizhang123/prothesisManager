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
  Form
} from 'ant-design-vue';
import './styles/index.less';
import 'element-plus/lib/theme-chalk/el-color-picker.css';
import 'element-plus/lib/theme-chalk/el-slider.css';
import ProthesisList from './components/ProthesisList.vue';
import ProthesisModel from './components/ProthesisModel.vue';
import AccountManage from './components/AccountManage.vue';

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
app.component('prothesis-list', ProthesisList);
app.component('prothesis-model', ProthesisModel);
app.component('account-manage', AccountManage);
app.mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
  next();
});
