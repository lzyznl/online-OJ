<template>
  <div id="problemForm">
    <a-form :model="form">
      <a-form-item field="title" label="题目标题">
        <a-input style="width:400px" v-model="form.title" placeholder="请输入题目名称" />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <md-editor style="width: 1000px;" :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="题目答案">
        <md-editor style="width: 1000px;" :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item field="tags" label="题目标签">
        <a-input-tag :default-value="form.tags" :style="{ width: '320px' }" placeholder="" allow-clear />
      </a-form-item>
      <a-form-item label="题目配置">
        <a-space direction="vertical">
          <a-form-item field="memoryLimit" label="内存限制">
            <a-input-number :style="{ width: '320px' }" placeholder="Please Enter"
             v-mode="form.judgeConfig.memoryLimit"
              :default-value="form.judgeConfig.memoryLimit" mode="button" class="input-demo" />
          </a-form-item>
          <a-form-item field="timeLimit" label="时间限制">
            <a-input-number :style="{ width: '320px' }" placeholder="Please Enter"
            v-model="form.judgeConfig.timeLimit"
              :default-value="form.judgeConfig.timeLimit" mode="button" class="input-demo" />
          </a-form-item>
          <a-form-item field="stackLimit" label="堆栈限制">
            <a-input-number :style="{ width: '320px' }" placeholder="Please Enter"
            v-model="form.judgeConfig.stackLimit"
              :default-value="form.judgeConfig.stackLimit" mode="button" class="input-demo" />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false">
        <a-form-item v-for="(judgeCaseItem, index) of form.judgeCase" :key="index" no-style>
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item :field="`form.judgeCase[${index}].input`" :label="`输入用例-${index}`" :key="index">
              <a-input v-model="judgeCaseItem.input" placeholder="请输入测试输入用例" />
            </a-form-item>
            <a-form-item :field="`form.judgeCase[${index}].output`" :label="`输出用例-${index}`" :key="index">
              <a-input v-model="judgeCaseItem.output" placeholder="请输入测试输出用例" />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)">
              删除
            </a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline" status="success">新增测试用例
          </a-button>
        </div>
      </a-form-item>
      <div style="margin-top: 16px"/>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MdEditor from '@/components/MdEditor.vue';
import {ProblemControllerService} from "../../../generated/services/ProblemControllerService";
import {addProblemRequest} from "../../../generated/models/addProblemRequest";
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
const form = ref({
  "answer": "",
  "content": "",
  "title": "",
  "judgeCase": [
    {
      "input": "",
      "output": "",
    }
  ],
  "judgeConfig": {
    "memoryLimit": 1000,
    "timeLimit": 1000,
    "stackLimit": 1000
  },
  "tags": [
    "队列",
    "简单"
  ]
})

const router = useRouter()
const forms =form

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value:string) =>{
  form.value.answer = value;
}


const handleDelete= (index:number)=>{
  form.value.judgeCase.splice(index, 1)
}

const handleAdd = () =>{
  form.value.judgeCase.push({
        input:"",
        output:""
      })
}
const doSubmit = async()=>{
  const res = await ProblemControllerService.addProblemUsingPost({
    problemAnswer:form.value.answer,
    problemContent:form.value.content,
    problemJudgeCase:JSON.stringify(form.value.judgeCase),
    problemJudgeConfig:JSON.stringify(form.value.judgeConfig),
    problemTags:JSON.stringify(form.value.tags),
    problemTitle:form.value.title
  })
  if(res.code === 0){
    Message.success("创建成功");
    form.value = forms.value
    router.replace("/")
  }else{
    Message.success("创建失败");
  }
}
</script>
<style scoped>
#problemForm {
  min-height: 100vh;
  padding-bottom: 40px;
}
</style>