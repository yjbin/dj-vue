<template>
  <div id="app" v-cloak>
     <transition enter-active-class="animated zoomIn" leave-active-class="animated bounceOut">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
