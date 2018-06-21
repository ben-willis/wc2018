<template>
  <table>
    <tr>
      <th class="country">Country</th>
      <th class="played">Pld</th>
      <th class="gd">GD</th>
      <th class="points">Pts</th>
    </tr>
    <tr class="row" v-for="team in sortedStandings">
      <td class="country"><router-link :to="'/team/'+team.teamId">{{team.team}}</router-link></td>
      <td class="played">{{team.playedGames}}</td>
      <td class="gd">{{team.goalDifference}}</td>
      <td class="points">{{team.points}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['standings'],
  computed: {
    sortedStandings() {
      return this.standings.sort((teamA, teamB) => {
        // A negative difference means teamA > team B so teamA sorted above teamB
        let pointDifference = teamB.points - teamA.points
        let gdDifference = teamB.goalDifference - teamA.goalDifference
        let gfDifference = teamB.goals - teamA.goals
        let gaDifference = teamA.goalsAgainst - teamB.goalsAgains
        
        if (pointDifference != 0) {
          return pointDifference
        } else if (gdDifference != 0) {
          return gdDifference
        } else if (gfDifference != 0) {
          return gfDifference
        } else {
          return gaDifference
        }
      })
    }
  }
}
</script>

<style lang="css">
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #efefef;
  padding: 5px 10px 0px;
}

td {
  padding: 5px 10px;
}

.row {
  border-top: 1px solid #ddd;
}

.country {
  text-align: left;
  width: 50%;
}

.played, .gd, .points {
  text-align: center;
  padding: 2px 5px;
}

</style>