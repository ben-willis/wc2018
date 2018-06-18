<template>
  <div id="app">
    <div class="header">
      <h1>World Cup 2018</h1>
      <ul class="menu">
        <router-link to="/fixtures"><li :class="{active: ($route.path == '/fixtures')}">Fixtures</li></router-link>
        <router-link to="/tables"><li :class="{active: ($route.path == '/tables')}">Tables</li></router-link>
      </ul>
    </div>
    <transition :duration="800">
      <error v-if="error">Error loading data :(</error>
    </transition>
    <transition name="fade"><router-view></router-view></transition>
  </div>
</template>

<script>
import error from "./components/error.vue";

export default {
  name: 'app',
  data () {
    return {
      error: false
    }
  },
  mounted () {
    this.$root.$on("api-error", (err) => { this.error = true });
    this.$root.$on("api-success", (err) => { this.error = false });
  },
  components: {
    error
  }
}
</script>

<style lang="css">
html, body {
  border: 0;
  font-family: "Gill Sans","Gill Sans MT",Calibri,sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

div, span, object, iframe, img, table, caption, thead, tbody,
tfoot, tr, tr, td, article, aside, canvas, details, figure, hgroup, menu,
nav, footer, header, section, summary, mark, audio, video {
  border: 0;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, cit, code,
del, dfn, em, ins, q, samp, small, strong, sub, sup, b, i, hr, dl, dt, dd,
ol, ul, li, fieldset, legend, label {
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
}

article, aside, canvas, figure, figure img, figcaption, hgroup,
footer, header, nav, section, audio, video {
  display: block;
}

table {
  border-collapse: separate;
  border-spacing: 0;
  caption, th, td {
    text-align: left;
    vertical-align: middle;
  }
}

a:link    { color: black; }
a:visited { color: black; }

a img {
  border: 0;
}

:focus {
  outline: 0;
}

h1 {
  text-align: center;
  background-color: #511642;
  color: white;
  font-size: 3em;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Moscow_July_2011-49.jpg/860px-Moscow_July_2011-49.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 0% 60%;
  background-blend-mode: overlay;
}

h2 {
  padding: 5px 10px;
  background-color: #320A28;
  color: white;
  font-weight: bold;
}

.header {
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 999;
  box-shadow: 0px 0px 10px #111;
}

.menu {
  background-color: #eee;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.menu li {
  float: left;
  text-align: center;
  width: 50%;
  font-weight: bold;
  padding: 5px 0px;
  color: #666;
}

.menu li:hover {
  background-color: #ddd;
}

.menu li:active, .menu li.active {
  color: #320A28;
  box-shadow: inset 0 -3px 0 #320A28;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
