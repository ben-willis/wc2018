<template>
	<div>
	  <div v-for="day in days" class="day">
	    <h2 class="date"><span class="day">{{ day.day }}</span> {{day.month}} {{day.date}}</h2>
	    <match v-for="match in day.fixtures" :match="match"></match>
	  </div>
  </div>
</template>

<script>
import match from "./components/match.vue";

export default {
  data () {
    return {
      fixtures: []
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
    this.$http.get("http://api.football-data.org/v1/soccerseasons/467/fixtures", {
      "headers": {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
      "responseType": "json"
    }).then(response => {
      this.fixtures = response.body.fixtures;
    });
  },
  components: {
    match
  }
}
</script>

<style lang="css">
.date {
  padding: 5px 10px;
  background-color: #011;
  color: white;
  font-weight: normal;
}

.date .day {
  font-weight: bold;
}
</style>