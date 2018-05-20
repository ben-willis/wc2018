<template>
  <table>
    <tr>
      <th class="country">Country</th>
      <th class="played">Pld</th>
      <th class="gd">GD</th>
      <th class="points">Pts</th>
    </tr>
    <tr class="row" v-for="team in standings">
      <td class="country">{{team.team}}</td>
      <td class="played">{{team.playedGames}}</td>
      <td class="gd">{{team.goalDifference}}</td>
      <td class="points">{{team.points}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['standings']
}
</script>

<style lang="css">
table {
  width: 100%;
  margin: 5px;
}

th {
  background-color: #eee;
  border-bottom: 1px solid black;
}

.country {
  text-align: left;
  width: 50%;
  padding: 2px 5px;
}

.played, .gd, .points {
  text-align: center;
  padding: 2px 5px;
}

</style>