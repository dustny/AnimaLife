<template>
<div>
  <CustomNavbar/>
  <RouterView/>
</div>
</template>

<script>
import CustomNavbar from "../src/components/CustomNavbar.vue"
export default {
  components: {CustomNavbar},
  name: "App"
}
</script>

<style>
body {
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
} 
</style>