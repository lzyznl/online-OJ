<template>
  <div id="userInfo">
    <div id="userProfile">
      <div id="userProfile-left">
        <a-avatar :size="150" id="userAvator" shape="square" style="border: 2px solid gray;">
        <img src="../../assets/ojLogo.jpg">
      </a-avatar>
      <div id="description">
        <a-descriptions style="margin-top: 20px" :data="data" :size="size" title="User Info" :column="1"
          :bordered="true" />
      </div>
      </div>
      <div class="rounded-rectangle">
        <div class="favor">
          <!-- 左边部分 -->
          <div class="left-part">
            <div class="favor_text">关注了</div>
            <div class="favor_text">100</div> <!-- 你的关注了的人数 -->
          </div>

          <!-- 右边部分，使用竖线隔开 -->
          <div class="vertical-line">
          </div>

          <div class="right-part">
            <div class="favor_text">关注者</div>
            <div class="favor_text">150</div> <!-- 你的关注者人数 -->
          </div>
        </div>
        <div id="favorButton">
          <a-button type="primary" status="success">点个关注</a-button>
        </div>
      </div>
    </div>
    <div class="underPart">
      <div id="SolveProblem">
        <a-list>
          <a-list-item v-for="idx in 4" :key="idx">
            <a-list-item-meta title="遍历二叉树" description="用户大帅哥刘成功完成了遍历二叉树这道题目">
              <template #avatar>
                <a-avatar shape="square">
                  <img alt="avatar" src="../../assets/ojLogo.jpg" />
                </a-avatar>
              </template>
            </a-list-item-meta>
            <template #actions>
              <icon-edit />
              <icon-delete />
            </template>
          </a-list-item>
        </a-list>
      </div>
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
    <div class="bottomPart">
      <div id="time" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userStore } from '@/store/user';
import { ref, onMounted } from 'vue';
import * as echarts from "echarts"

onMounted(() => {
  var myChart = echarts.init(document.getElementById('main'));
  const myCharts = echarts.init(document.getElementById('time'));
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myCharts.setOption(options)
})

function getVirtualData(year: string) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      //这个函数是处理数据的函数
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}

const options = {
  title: {
    top: 30,
    left: 'center',
    text: '用户刷题数'
  },
  tooltip: {},
  visualMap: {
    min: 0,
    max: 1000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65,
    inRange: {
      color: ['WhiteSmoke', 'Green']
    }
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: ['auto', 13],
    range: '2016',
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: getVirtualData('2016')
  }
};

const option = {
  title: {
    text: '用户做题分布',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1024, name: 'Java' },
        { value: 735, name: 'c++' },
        { value: 580, name: 'Python' },
        { value: 484, name: 'Javascript' },
        { value: 300, name: 'go' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


const size = ref('medium');
const userStoreInfo = userStore();

const loginUser = userStoreInfo.loginUser;
const data = [{
  label: 'Name',
  value: loginUser.userName,
}, {
  label: 'Mobile',
  value: '123-1234-1234',
}, {
  label: 'Residence',
  value: 'Beijing'
}, {
  label: 'Hometown',
  value: 'Beijing',
}, {
  label: 'UserProfile',
  value: loginUser.userProfile
}];
</script>
<style scoped>

#userProfile-left{
  display: flex;
}

#time {
  margin-left: 50vw;
}

.underPart {
  display: flex;
  height: fit-content;
}


#userInfo {
  background: url("../../assets/background.jpg");
  background-size: cover;
  min-height: 100vh;
}

.favor_text {
  font-family: fantasy;
  font-size: 20px;
}

.favor {
  display: flex;
  height: 40%;
}



div#favorButton {
  margin-top: 15%;
  margin-left: 35%;
}

.rounded-rectangle {
  margin-left: 20%;
  margin-top: 5%;
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

.left-part,
.right-part {
  margin-top: 8%;
  text-align: center;
  flex: 1;
  /* 平分左右两部分的宽度 */
  padding: 10px;
  box-sizing: border-box;
}

.vertical-line {
  margin-top: 5%;
  width: 2px;
  background-color: black;
  height: 100%;
  /* 高度与父容器一致 */
}

#userProfile {
  margin-top: 2vh;
  margin-left: 15vw;
  margin-right: 15vw;
  margin-bottom: 3vh;
  display: flex;
}

#userAvator {
  margin-top: 75px;
}

#description {
  margin-top: 3%;
  margin-left: 30px;
  border: 1px, solid, gray;
}

#SolveProblem {
  width: 30%;
  margin-left: 15%;
  margin-right: 5%;
}
</style>