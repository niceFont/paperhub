<template>
  <v-app>
    <top-bar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TopBar from '@/components/Home/TopBar.vue';

export default {
  name: 'App',

  components: {
    TopBar,
  },

  data: () => ({
    //
  }),
};
</script>
