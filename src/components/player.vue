<template>
  <div class="player">
    <span class="name">
      {{name}}
    </span>
  </div>
</template>

<script>
export default {
  created () {
    this.number = this.player.jerseyNumber
    this.name = this.player.name
    this.position = this.player.position
  },
  props: ['player']
}
</script>

<style lang="css">
</style>