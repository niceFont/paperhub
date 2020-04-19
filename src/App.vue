<template>
  <v-app class="qa-app">
    <top-bar v-model="drawer" />
    <nav-drawer v-model="drawer" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TopBar from '@/components/Home/TopBar.vue';
import NavDrawer from '@/components/Home/NavDrawer.vue';

export default {
  name: 'App',

  components: {
    TopBar,
    NavDrawer,
  },
  data: () => ({
    //
    drawer: false,
  }),
};
</script>
