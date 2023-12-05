<template>
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>
  
<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor, Viewer } from '@bytemd/vue-next'
import { ref } from 'vue';

/**
 * 定义组件属性类型
 */
interface Props{
    value:string,
    handleChange:(v:string)=>void
}

/**
 * 赋予默认值，用户可能会不输入
 */
const props = withDefaults(defineProps<Props>(),{
    value:()=>'',
    handleChange:()=>{
    }
})

const plugins = [
    gfm(),
    highlight(),
    // Add more plugins here
]
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
    display: none;
}
</style>