<template>
  <div class="main-content">
    <p>新增假体</p>
    <a-form
      ref="formRef"
      :model="formState"
      v-bind="layout"
    >
      <a-form-item ref="name" label="假体名称" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="假体类型" name="type" :rules="[{ required: true, message: 'Please input your type!' }]">
        <a-select v-model:value="formState.type" placeholder="please select your type">
          <a-select-option :value=-1>-请选择-</a-select-option>
          <a-select-option :value="1">股骨柄</a-select-option>
          <a-select-option :value="2">球头</a-select-option>
          <a-select-option :value="3">内衬</a-select-option>
          <a-select-option :value="4">臼杯</a-select-option>
          <a-select-option :value="5">股骨</a-select-option>
          <a-select-option :value="6">胫骨</a-select-option>
          <a-select-option :value="7">垫片</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="假体厂商" name="factory" :rules="[{ required: true, message: 'Please input your factory!' }]">
        <a-select v-model:value="formState.factory" placeholder="please select your factory">
          <a-select-option :value=-1>-请选择-</a-select-option>
          <a-select-option :value="1">飞渡</a-select-option>
          <a-select-option :value="2">捷迈</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="假体装配点" name="assembly" :rules="[{ required: true, message: 'Please input your assembly!' }]">
        <a-input v-model:value="formState.assembly" placeholder="请输入装配点坐标,x,y,z逗号隔开"></a-input>
        <!-- <div style="display:inline-block;width:33%">
          <label>x：</label>
          <a-input style="width:85%"></a-input>
        </div>
        <div style="display:inline-block;width:33%">
          <label>y：</label>
          <a-input style="width:85%"></a-input>
        </div>
        <div style="display:inline-block;width:33%">
          <label>z：</label>
          <a-input style="width:85%"></a-input>
        </div> -->

      </a-form-item>
      <a-form-item label="标签" name="tag">
        <template v-for="(tag, index) in formState.tags" :key="tag">
          <a-tooltip v-if="tag.length > 20" :title="tag">
            <a-tag :closable="index !== 0" @close="handleClose(tag)">
              {{ `${tag.slice(0, 20)}...` }}
            </a-tag>
          </a-tooltip>
          <a-tag v-else :closable="index !== 0" @close="handleClose(tag)">
            {{ tag }}
          </a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          ref="inputRef"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          v-model:value="inputValue"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else @click="showInput" style="background: #fff; border-style: dashed">
          <plus-outlined />
          New Tag
        </a-tag>
      </a-form-item>
      <a-form-item label="假体描述" name="desc">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
        <div class="clearfix">
          <a-upload
            list-type="picture-card"
            v-model:file-list="files"
            @preview="handlePreview"
            :customRequest="uploadImg"
            @change="handleChange"
          >
            <div v-if="files.length < 8">
              <plus-outlined />
              <div class="ant-upload-text">上传图片</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
        <a-button type="primary" @click="onSubmit">新建</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, nextTick } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { createProthesis } from '../../service/prothesis';
import { message } from 'ant-design-vue';
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
interface FormState {
  name: string;
  type: number | undefined;
  factory: number | undefined;
  tags: string[];
  desc: string;
  assembly: string;
  path: string;
}

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const inputRef = ref(null);
const formRef = ref(null);
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  type: -1,
  factory: -1,
  tags: [],
  desc: '',
  assembly: ''
});

const previewVisible = ref<boolean>(false);
const previewImage = ref<string | undefined>('');

const files = ref<FileItem[]>([]);

const state = reactive({
  inputVisible: false,
  inputValue: '',
});

const { inputVisible, inputValue } =  toRefs(state);

const handleClose = (removedTag: string) => {
  const tags = formState.tags.filter(tag => tag !== removedTag);
  console.log(tags);
  formState.tags = tags;
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let tags = formState.tags;
  if (inputValue && tags.indexOf(inputValue) === -1) {
    formState.tags = [...tags, inputValue];
  }
  Object.assign(state, {
    inputVisible: false,
    inputValue: '',
  });
};

const onSubmit = () => {
  formRef.value.validate().then(async () => {
    const param = {
      name: formState.name,
      type: formState.type,
      factory: formState.factory,
      tag: formState.tags.join(','),
      assembly: formState.assembly,
      desc: formState.desc,
      file: files.value[0],
      fileName: files.value[0].name
    }

    const res = await createProthesis(param);

    try {
      if (res.code === 200) {
        message.success(`假体${formState.name}新建成功`);
      } else {
        message.error('假体新建失败');
      }
    } catch(err) {
       message.error('接口请求错误');
    }
  })
};

const resetForm = () => {
  formRef.value.resetFields();
}

const uploadImg = (file) => {
  console.log('111');
}

const handleCancel = () => {
  previewVisible.value = false;
};
const handlePreview = async (file: FileItem) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
};
const handleChange = ({ file, fileList }: FileInfo) => {
  const status = file.status
  if (status !== 'uploading') {
  }
  if (status === 'done') {
    // this.videoUrlList.push({ uid: fileList[fileList.length - 1].uid, url: info.file.response.data.url })
  }
  fileList.forEach(file => { file.status = 'done'});
  console.log(fileList);
  files.value = [...fileList] //重点
};
</script>

<style lang="less" scoped>
.main-content {
  height: 90%; width: 60%;
  margin-left: 20%;
  padding-top:20px;
  border: 1px solid #ccc;
  p {
    padding: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
