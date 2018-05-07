<template>
<div>
    <div>
      <h2>{{mag}}</h2>
  </div>
  <h3>{{count}}</h3>

  <div>
      <button @click="add(2)">+</button>
      <button @click="redute">-</button>
</div>

<div>
      <button @click="addActions">+</button>
      <button @click="sopActions">-</button>
</div>
</div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  data () {
    return {
      mag: 'Hello World'
    }
  },
  computed: mapState(['count']),
  methods: {
    ...mapMutations(['add', 'redute']),
    ...mapActions(['addActions', 'sopActions'])

  }
}
</script>
<style>
button{
    background: #ccc;
    padding: 20px 30px;
    font-size: 30px;/*px*/
}
</style>
