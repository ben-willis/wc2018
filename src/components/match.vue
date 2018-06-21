<template>
  <div class="fixture">
    <div class="match">
      <div class="date" v-if="showDate">{{kickoff | date}}</div>
      <div class="home"><router-link :to="'/team/'+home_team_id">{{home_team}}</router-link></div>
      <div v-if="status=='IN_PLAY' || status=='FINISHED'" class="scores">
        <transition name="goal-slide" mode="out-in">
          <span :class="{live: (status=='IN_PLAY')}" :key="home_goals">{{home_goals}}</span>
        </transition>
        <transition name="goal-slide" mode="out-in">
          <span :class="{live: (status=='IN_PLAY')}" :key="away_goals">{{away_goals}}</span>
        </transition>
      </div>
      <div v-else class="time">
        <span>{{ kickoff | time }}</span>
      </div>
      <div class="away"><router-link :to="'/team/'+away_team_id">{{away_team}}</router-link></div>
      <div class="match-time" v-if="status=='IN_PLAY'">{{match_time}} {{"min" | pluralize(match_time)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kickoff: new Date(this.match.date),
      home_team: (this.match.homeTeamName) ? this.match.homeTeamName : "TBD",
      away_team: (this.match.awayTeamName) ? this.match.awayTeamName : "TBD",
      home_goals: (this.match.result.goalsHomeTeam) ? this.match.result.goalsHomeTeam : 0,
      away_goals: (this.match.result.goalsAwayTeam) ? this.match.result.goalsAwayTeam : 0,
      home_team_id: this.match._links.homeTeam.href.split("/").pop(),
      away_team_id: this.match._links.awayTeam.href.split("/").pop(),
      status: this.match.status,
      now: new Date()
    }
  },
  computed: {
    match_time() {
      let ms_diff = this.now - this.kickoff;
      let min_diff = Math.floor(ms_diff / (1000 * 60))

      if (min_diff < 0) {
        return 0;
      } else if (min_diff < 45) {
        return min_diff;
      } else if (min_diff < 52) {
        return 45;
      } else if (min_diff < 107) {
        return min_diff - 17;
      } else {
        return 90;
      }
    }
  },
  created () {
    if (this.match.status == "IN_PLAY") {
      this.update_interval = setInterval(function() {
        this.update_score()
      }.bind(this), 30*1000);
    }

    setInterval(function() {
      this.now = new Date();
    }.bind(this), 1000);
  },
  methods: {
    update_score () {
      this.$http.get(this.match._links.self.href, {
          headers: {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
          responseType : "json"
      }).then((response) => {
        let fixture = response.body.fixture;
        this.home_goals = (fixture.result.goalsHomeTeam) ? fixture.result.goalsHomeTeam : 0;
        this.away_goals = (fixture.result.goalsAwayTeam) ? fixture.result.goalsAwayTeam : 0;
        if (fixture.status === "FINISHED") {
          this.status = fixture.status;
          clearInterval(this.updateInterval);
        }
      });
    }
  },
  filters: {
    time (value) {
      if (!value) return "";
      return value.getHours() + ":" + ('0' + value.getMinutes()).slice(-2);
    },
    date (value) {
      if (!value) return "";
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return value.getDate() + " " + months[value.getMonth()]
    },
    pluralize (value, number) {
      if (number == 1) {
        return value;
      } else {
        return value + "s";
      }
    }
  },
  props: {
    match: Object,
    showDate: Boolean
  }
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

.match .date {
  position: absolute;
  left: 5px;
  color: #aaa;
  font-weight: bold;
}

.match .match-time {
  position: absolute;
  right: 5px;
  color: #b20000;
  font-weight: bold;
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
  height: 1.5em;
  box-sizing: border-box;
  overflow: hidden;
  display: inline-block;
  transition: all .2s;
  vertical-align: bottom;
}

.match .scores span.live {
  background-color: #b20000;
  color: #fff;
}

.goal-slide-enter-active {
  transition: all .3s ease;
}
.goal-slide-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.goal-slide-enter, .goal-slide-leave-to {
  padding-top: 1.5em;
}
</style>