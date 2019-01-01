<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/projects">Projects</router-link>
  </nav>
</template>

<style lang="scss">
  .nav {
    background: rgba(0,0,0,.9);
    min-width: 126px;
    padding: 10px 0;

    a {
      display: block;
      text-align: center;
      text-decoration: none;
      color: #fff;
      font-size: 20px;
      height: 40px;
      line-height: 40px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .router-link-exact-active {
      // color: red;
      color: #000;
      background: #fff;
    }
  }
</style>
