<template>
  <div>
    <h1>My App</h1>
    <test></test>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    'test': Vue.defineAsyncComponent( () => loadModule('./components/Test.vue', Utils.loadModuleOptions()) )
  },
  data() {
    return {

    }
  }
}
</script>
<style>
  h1 {
    text-align:center;
  }
</style>
