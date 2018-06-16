<template>
	<div class="error">
		<span class="message"><slot></slot></span>
	</div>
</template>

<script>
export default {

}
</script>

<style type="css">
.error {
	height: 3em;
	line-height: 3em;
	text-align: center;
	
	background-color: #fbb;
}

.error .message {
	color: #700;
	font-size: 1.2em;
	font-weight: bold;
}

.v-enter-active {
  transition: height .5s;
}

.v-enter-active * {
  transition: opacity .3s .5s;
}

.v-leave-active {
  transition: height .5s .3s;
}

.v-leave-active * {
  transition: opacity .3s;
}

.v-enter, .v-leave-to {
  height: 0em;
}

.v-enter *, .v-leave-to * {
  opacity: 0;
}

</style>