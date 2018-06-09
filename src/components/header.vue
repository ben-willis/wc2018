<template>
  <div class="header">
    <h1>World Cup 2018</h1>
    <ul class="menu">
      <li>Fixtures</li>
      <li>Tables</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="css">
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