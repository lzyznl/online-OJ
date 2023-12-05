<template>
    <a-table :columns="columns" :data="listData" :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
    }" @page-change="onPageChange">
        <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset }">
            <div class="custom-filter">
                <a-space direction="vertical">
                    <a-input :model-value="filterValue[0]" @input="(value) => setFilterValue([value])" />
                    <div class="custom-filter-footer">
                        <a-button @click="handleFilterConfirm">Search</a-button>
                        <a-button @click="handleFilterReset">Reset</a-button>
                    </div>
                </a-space>
            </div>
        </template>
        <template #optional="{ record }">
            <a-space>
                <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
                <a-button status="danger" @click="doDelete(record)">删除</a-button>
            </a-space>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { ref, onMounted, h ,watchEffect} from 'vue';
import { ProblemControllerService } from "../../../generated/services/ProblemControllerService"
import { GetProblemRequest } from "../../../generated/models/GetProblemRequest"
import { Message } from '@arco-design/web-vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';
const show = ref(true)
const total = ref(0)
const listData = ref([])
const searchParams = ref({
    pageSize: 10,
    current: 1
})


function convertDateFormat(originalDate: string): string {
    const dateObject = new Date(originalDate);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hour = dateObject.getHours().toString().padStart(2, '0');
    const minute = dateObject.getMinutes().toString().padStart(2, '0');
    const second = dateObject.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDate;
}



const loadData = async () => {
    const res = await ProblemControllerService.getProblemUsingPost(searchParams.value as GetProblemRequest)
    if (res.code === 0) {
        total.value = res.data.total;
        listData.value = res.data.records

        listData.value.forEach(data => {
            data.judgeConfig = JSON.parse(data.judgeConfig)
            data.judgeConfig.timeLimit = data.judgeConfig.timeLimit + "s"
            data.judgeConfig.stackLimt = data.judgeConfig.stackLimt + "B"
            data.judgeConfig.memoryLimit = data.judgeConfig.memoryLimit + "B"
            data.createTime = convertDateFormat(data.createTime);
        })
    } else {
        Message.error("获取数据出错")
    }
}

/**
 * 页面加载时获取数据
 */
onMounted(() => {
    loadData()
    console.log(listData.value)
})

watchEffect(()=>{
    loadData();
})


const columns = [{
    title: 'id',
    dataIndex: 'id',
}, {
    title: '标题',
    dataIndex: 'title',
    filterable: {
        filter: (value, record) => record.title.includes(value),
        slotName: 'name-filter',
        icon: () => h(IconSearch)
    }
}, {
    title: '内容',
    dataIndex: 'content',
}, {
    title: '标签',
    dataIndex: 'tags',
},
{
    title: '答案',
    dataIndex: 'answer',
}, {
    title: '提交数',
    dataIndex: 'uploadNum',
},
{
    title: '通过数',
    dataIndex: 'acceptedNum',
},
{
    title: '判题配置',
    children: [
        {
            "title": '时间限制',
            dataIndex: 'judgeConfig.timeLimit'
        },
        {
            'title': '内存限制',
            dataIndex: 'judgeConfig.memoryLimit'
        },
        {
            'title': '堆栈限制',
            dataIndex: 'judgeConfig.stackLimt'
        }
    ],
    dataIndex: "judgeConfig"
}, {
    title: '判题用例',
    dataIndex: 'judgeCase',
},
{
    title: '用户id',
    dataIndex: 'userId',
}, {
    title: '创建时间',
    dataIndex: 'createTime',
}, {
    title: '操作',
    slotName: 'optional'
}];

const data = [
    {
        "id": "1",
        "title": "题目标题",
        "content": "题目内容",
        "tags": "[队列，比较简单]",
        "answer": "题目答案",
        "uploadSolveNum": "100",
        "acceptedSolveNum": "15/100",
        "judgeConfig": {
            "timeLimit": "1000ms",
            "memoryLimit": "10MB",
            "stackLimit": "10B"
        },
        "judgeCase": "这是判题用例",
        "userId": "1001",
        "createTime": "2023-11-25 19:00:00"
    },
]

const onPageChange = (currentPage: number) => {
    searchParams.value = {
        ...searchParams.value,
        current: currentPage
    }
}

const handleChange = (data, extra, currentDataSource) => {
    console.log('change', data, extra, currentDataSource)
}
const doUpdate = (recod: string) => {

}
const doDelete = (recod: string) => {

}
</script>
<style scoped>
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>


  