<template>
  <div class="fixture">
    <div class="match">
      <div class="home"><router-link :to="'/team/'+home_team_id">{{home_team}}</router-link></div>
      <div v-if="status>0" class="scores">
        <span :class="{live: (status==1)}">{{home_goals}}</span>
        <span :class="{live: (status==1)}">{{away_goals}}</span>
      </div>
      <div v-else class="time">
        <span>{{ kickoff | time }}</span>
      </div>
      <div class="away"><router-link :to="'/team/'+away_team_id">{{away_team}}</router-link></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    kickoff () {
      return new Date(this.match.date);
    },
    home_team () {
      if (this.match.homeTeamName) {
        return this.match.homeTeamName
      } else if (this.match.matchday === 8) {
        return "England"
      } else {
        return "TBD"
      }
    },
    home_goals () {
      return this.match.result.goalsHomeTeam;
    },
    away_team () {
        return this.match.awayTeamName ? this.match.awayTeamName : "TBD";
    },
    away_goals () {
      return this.match.result.goalsAwayTeam;
    },
    home_team_id () {
      return this.match._links.homeTeam.href.split("/").pop();
    },
    away_team_id () {
      return this.match._links.awayTeam.href.split("/").pop();
    },
    status () {
      if (this.match.status === "FINISHED") {
        return 2;
      } else if (this.match.status === "IN_PLAY") {
        return 1;
      } else {
        return 0;
      }
    },
    update_interval () {
      return setInterval(function() {
        this.update_score()
      }.bind(this), 1 * 1000);
    }
  },
  methods: {
    update_score () {
      this.$http.get(this.match._links.self.href, {
          headers: {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
          responseType : "json"
      }).then((response) => {
        this.home_goals = response.body.fixture.result.goalsHomeTeam;
        this.away_goals = response.body.fixture.result.goalsAwayTeam;
        if (this.match.status === "FINISHED") {
          clearInterval(this.updateInterval);
          this.status = 2;
        } else if (this.match.status === "IN_PLAY") {
          this.status = 1;
        }
      });
    }
  },
  filters: {
    time (value) {
      if (!value) return "";
      return value.getHours() + ":" + ('0' + value.getMinutes()).slice(-2);
    }
  },
  props: ['match']
}
</script>

<style lang="css">
.match {
  padding: 5px 10px;
}

.match:after {
  content: "";
  display: table;
  clear: both;
}

.match .home, .match .away {
  box-sizing: border-box;
  float: left;
  width: 40%;
}

.match .home {
  text-align: right;
}

.match .scores {
  box-sizing: border-box;
  float: left;
  width: 20%;
  text-align: center;
}

.match .time {
  box-sizing: border-box;
  float: left;
  width: 20%;
  text-align: center;
}

.match .time span {
  font-weight: bold;
  text-align: center;
  color: #aaa;
  width: 3em;
  display: inline-block;
}

.match .scores span {
  background-color: #ddd;
  font-weight: bold;
  text-align: center;
  width: 1.5em;
  display: inline-block;
}

.match .scores span.live {
  background-color: #b20000;
  color: #fff;
}

.match .scores span:first-child {
  border-right: 1px solid white;
}

.match .scores span:last-child {
  border-left: 1px solid white;
}
</style>