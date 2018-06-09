<template>
  <div id="app">
    <h1>World Cup 2018</h1>
    <ul class="menu">
      <router-link to="/fixtures"><li :class="{active: ($route.path == '/fixtures')}">Fixtures</li></router-link>
      <router-link to="/tables"><li :class="{active: ($route.path == '/tables')}">Tables</li></router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
}

h2 {
  padding: 5px 10px;
  background-color: #320A28;
  color: white;
  font-weight: bold;
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