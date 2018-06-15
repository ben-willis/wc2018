<template>
	<div>
    <div class="team">
      <img class="flag" :src="team.crestUrl">
      <span class="name"> {{team.name}}</span>
    </div>
    <h2>Fixtures</h2>
    <match showDate v-for="match in fixtures" :match="match"></match>
    <h2>Group {{table.group}}</h2>
    <standings :standings="table.standings"></standings>
    <h2>Squad</h2>
    <player v-for="player in squad" :player="player"></player>
  </div>
</template>

<script>
import standings from "./components/standings.vue";
import match from "./components/match.vue";
import player from "./components/player.vue";

export default {
  data() {
    return {
      team: {
        name: "",
        crestUrl: ""
      },
      fixtures: [],
      table: {
        group: "",
        standings: []
      },
      squad: []
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler (nv, ov) {
        this.get_team();
        this.get_fixtures();
        this.get_group();
        this.get_squad();
      }
    }
  },
  methods: {
    get_team () {
      this.$http.get("http://api.football-data.org/v1/teams/" + this.$route.params.teamId, {
        "headers": {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
        "responseType": "json"
      }).then(response => {
        this.team = response.body;
      });
    },
    get_fixtures () {
      this.$http.get("http://api.football-data.org/v1/soccerseasons/467/fixtures", {
        "headers": {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
        "responseType": "json"
      }).then(response => {
        this.fixtures = response.body.fixtures.filter((fixture) => {
          let home_team_id = fixture._links.homeTeam.href.split("/").pop();
          let away_team_id = fixture._links.awayTeam.href.split("/").pop();
          return (this.$route.params.teamId == home_team_id || this.$route.params.teamId == away_team_id);
        });
      });
    },
    get_group () {
      this.$http.get("http://api.football-data.org/v1/competitions/467/leagueTable", {
        "headers": {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
        "responseType": "json"
      }).then(response => {
        this.table = Object.keys(response.body.standings).map((key) => {
          return {
            group: key,
            standings: response.body.standings[key]
          }
        }).find((table) => table.standings.map(x => x.teamId).includes(parseInt(this.$route.params.teamId)));
      });
    },
    get_squad () {
      this.$http.get("http://api.football-data.org/v1/teams/" + this.$route.params.teamId + "/players", {
        "headers": {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
        "responseType": "json"
      }).then(response => {
        this.squad = response.body.players.sort((a,b) => {
          return a.jerseyNumber == b.jerseyNumber ? 0 : +(a.jerseyNumber > b.jerseyNumber) || -1;
        });
      });
    }
  },
  components: {
    match,
    standings,
    player
  }
}
</script>

<style lang="css">
.team {
  text-align: center;
}

.team .flag {
  height: 2em;
  vertical-align: middle;
}

.team .name {
  font-size: 2em;
  margin-left: 10px;
  vertical-align: middle;
}
</style>