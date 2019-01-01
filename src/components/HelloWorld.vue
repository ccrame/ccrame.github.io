<template>
  <div class="hello">
    <h1>{{ count }}</h1>
    <div @click="increment">increment</div>
    <div @click="decrement">decrement</div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  computed: {
    count () {
      return store.state.count;
    }
  },
  methods: {
    increment () {
      store.commit('increment');
    },
    decrement () {
      store.commit('decrement');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
