<template>
  <div class="fixture">
    <div class="match">
      <div class="home">{{home_team}}</div>
      <div v-if="status>0" class="scores">
        <span :class="{live: (status==1)}">{{home_goals}}</span>
        <span :class="{live: (status==1)}">{{away_goals}}</span>
      </div>
      <div v-else class="time">
        <span>{{ time }}</span>
      </div>
      <div class="away">{{away_team}}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    time () {
      var date = new Date(this.match.date);
      return date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2)
    },
    home_team () {return this.match.homeTeamName ? this.match.homeTeamName : "TBD"},
    home_goals () { return this.match.result.goalsHomeTeam},
    away_team () { return this.match.awayTeamName ? this.match.awayTeamName : "TBD"},
    away_goals () { return this.match.result.goalsAwayTeam},
    status () {
      if (this.match.status == "FINISHED") {
        return 2;
      } else if (this.match.status == "IN_PLAY") {
        this.update_score();
        return 1;
      } else {
        return 0;
      }
    }
  },
  methods: {
    update_score () {
      this.$http.get(this.match._links.self.href, {
          headers: {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
          responseType : "json"
      }).then((response) => {
        this.home_goals = response.body.fixture.result.goalsHomeTeam;
        this.away_goals = response.fixture.result.goalsAwayTeam;
        if (response.fixture.status == "FINISHED") {
          this.status = 2;
        } else if (response.fixture.status == "IN_PLAY") {
          setTimeout(function(){ this.update_score() }, 60*1000);
          this.status = 1;
        } else {
          this.status = 0;
        }
      });
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