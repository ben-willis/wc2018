<template>
  <div class="player">
    <span class="name">
      {{name}}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    number () {return this.player.jerseyNumber},
    name () {return this.player.name},
    position () {return this.player.position}
  },
  props: ['player']
}
</script>

<style lang="css">
</style>