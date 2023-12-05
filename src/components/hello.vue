<template>
    <MdEditor :value="value" :handle-change="onChange"/>
    <codeEditor />
</template>
<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "../components/MdEditor.vue"
import codeEditor from "./codeEditor.vue";

const value = ref(' ')
const onChange=(v:string)=>{
    value.value=v
}
</script>