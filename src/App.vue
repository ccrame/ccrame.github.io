<template>
  <div id="app">
    <Header />
    <section class="container">
      <NavBar />
      <section class="content">
        <router-view/>
      </section>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
    NavBar
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Poppins');
  @import '@/styles/variables.scss';

  * {
    margin: 0;
    font-family: Poppins;
    box-sizing: border-box;
  }
  #app {
    min-height: 100vh;
  }
  .container {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    min-height: calc(100vh - #{$headerHeight});
    // background: linear-gradient(#0F2027, #203A43, #2C5364);
    // background: linear-gradient(#f12711, #f5af19);
    // background: linear-gradient(#659999, #f4791f);
  }
  .content {
    padding: 0 20px;
  }
</style>
