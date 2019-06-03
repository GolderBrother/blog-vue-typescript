
<template>
  <div class="footer"> 全栈修炼 ©{{ year }} Created by JamesZhang </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  year: number = new Date().getFullYear()
}
</script>
<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>

