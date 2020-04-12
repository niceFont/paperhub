<template>
  <v-app>
    <top-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TopBar from '@/components/Home/TopBar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {
    TopBar,
  },
  mounted() {
    this.loadSession();
  },
  methods: {
    ...mapActions(['loadSession']),
  },
  data: () => ({
    //
  }),
};
</script>
