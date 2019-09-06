<template>
  <div>
    hello
  </div>
</template>

<script>
// Use Vuex
// import store from './store'

export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  onReady(){
    console.log(this.$mp.query)
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
