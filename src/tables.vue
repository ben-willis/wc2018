<template>
	<div>
    <div v-for="table in tables">
      <h2 class="group">Group {{ table.group }}</h2>
      <standings :standings="table.standings"></standings>
    </div>
  </div>
</template>

<script>
import standings from "./components/standings.vue";

export default {
  data () {
    return {
      tables: []
    }
  },
  computed: {
    days () {
      var dates = []
      for (var i = 0; i < 31; i++) {
        dates.push(new Date(2018, 5, 14+i));
      }

      var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return dates.map(date => {
        return {
          day: weekdays[date.getDay()],
          month: months[date.getMonth()],
          date: date.getDate(),
          fixtures: this.fixtures.filter(x => ((new Date(x.date)).setHours(0,0,0,0) == date.getTime()))
        }
      });
    }
  },
  created () {
    this.$http.get("http://api.football-data.org/v1/competitions/467/leagueTable", {
      "headers": {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
      "responseType": "json"
    }).then(response => {
      this.tables = Object.keys(response.body.standings).map((key) => {
        return {
          group: key,
          standings: response.body.standings[key]
        }
      });
    });
  },
  components: {
    standings
  }
}
</script>

<style lang="css">
.group {
  padding: 5px 10px;
  background-color: #320A28;
  color: white;
  font-weight: bold;
}
</style>