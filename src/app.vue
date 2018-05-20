<template>
  <div id="app">
    <h1>World Cup 2018</h1>
    <ul class="menu">
      <li v-on:click="updateRoute('fixtures')" :class="{active: (currentRoute=='fixtures')}">Fixtures</li>
      <li v-on:click="updateRoute('tables')" :class="{active: (currentRoute=='tables')}">Tables</li>
    </ul>
    <component :is="currentRoute"></component>
  </div>
</template>

<script>
import fixtures from "./fixtures.vue";
import tables from "./tables.vue";

export default {
  name: 'app',
  data () {
    return {
      currentRoute: window.location.hash.substr(1) ? window.location.hash.substr(1) : "fixtures"
    }
  },
  methods: {
    updateRoute (newRoute) {
      window.location.hash = "#" + newRoute
      this.currentRoute = newRoute
    }
  },
  components: {
    fixtures,
    tables
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

a img {
  border: 0;
}

:focus {
  outline: 0;
}

h1 {
  text-align: center;
  background-color: #033;
  color: white;
  font-size: 3em;
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
  cursor: pointer;
  padding: 5px 0px;
}

.menu li:hover {
  background-color: #ddd;
}

.menu li:active, .menu li.active {
  background-color: #ccc;
}
</style>