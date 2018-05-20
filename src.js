Vue.component('fixtures', {
	template: '<div v-for="day in days" class="day"><h2 class="date"><span class="day">{{ day.day }}</span> {{day.month}} {{day.date}}</h2><match v-for="match in day.fixtures" :match="match"></match></div>',
	data: function () {
		return {fixtures: []}
	},
	computed: {
	  	days: function () {
	  		var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
	  		var fixtures = this.fixtures;
	  		var res = [];
	  		for( i=0; i<31 && fixtures.length > 0; i++) {
	  			var todaysFixtures = [];
	  			var currentDate = new Date(2016, 5, 14 + i)
	  			while(new Date(fixtures[0].date).getDate() == currentDate.getDate()) {
	  				todaysFixtures.push(fixtures.shift());
	  				if (fixtures.length == 0) {
	  					break;
	  				}
	  			}
	  			res.push({
	  				day: days[currentDate.getDay()],
	  				date: currentDate.getDate(),
	  				month: (currentDate.getMonth() == 5) ? 'June': 'July',
	  				fixtures: todaysFixtures
	  			});
	  		}
	  		return res;
	  	}
  	},
	created: function () {
		var self = this;
		$.ajax({
		url: "http://api.football-data.org/v1/soccerseasons/467/fixtures",
		headers: {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
		dataType : "json"
	}).done(function (response) {
		self.fixtures = response.fixtures;
	})
	},
	components: {
		'match': {
			template: '<div class="fixture"><div class="match"><div class="home">{{home_team}}</div><div v-if="status>0" class="scores"><span :class="{live: (status==1)}">{{home_goals}}</span><span :class="{live: (status==1)}">{{away_goals}}</span></div><div v-else class="time"><span>{{ time }}</span></div><div class="away">{{away_team}}</div></div></div>',
			computed: {
				time: function () {
					date = new Date(this.match.date);
					return date.getHours() + ":00"
				},
				home_team : function () {return this.match.homeTeamName},
				home_goals: function () { return this.match.result.goalsHomeTeam},
				away_team : function () { return this.match.awayTeamName},
				away_goals: function () { return this.match.result.goalsAwayTeam},
				status: function () {
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
				update_score: function () {
					var self = this;
					$.ajax({
				    	url: self.match._links.self.href,
				    	headers: {"X-Auth-Token": "76f66f119a0d43608c73451f0c6f48d9"},
				    	dataType : "json"
					}).done(function (response) {
						self.home_goals = response.fixture.result.goalsHomeTeam;
						self.away_goals = response.fixture.result.goalsAwayTeam;
						if (response.fixture.status == "FINISHED") {
							self.status = 2;
						} else if (response.fixture.status == "IN_PLAY") {
							setTimeout(function(){ self.update_score() }, 60*1000);
							self.status = 1;
						} else {
							self.status = 0;
						}
					});
				}
			},
			props: ['match']
		}
	}
});

var euro = new Vue({
// We want to target the div with an id of 'events'
	el: '#app',
	data: {
    	currentView: 'fixtures'
  	}
});
