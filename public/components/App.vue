<template>
  <div>
    <h1>{{ appName }}</h1>
    <test></test>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    'test': Vue.defineAsyncComponent( ()=>loadModule('./components/Test.vue', Utils.loadModuleOptions()))
  },
  data() {
    return {
      appName: Const.APP_NAME

    }
  }
}
</script>
<style>
  h1 {
    text-align:center;
  }
</style>
