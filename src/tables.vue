<template>
	<div>
    <div v-for="table in tables">
      <h2>Group {{ table.group }}</h2>
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
</style>