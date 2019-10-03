<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <router-link to="/main"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
html,body,#app{
  height:100%;
  width:100%;
  margin:0;
  padding:0;
}
</style>
