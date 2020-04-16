<template>
  <v-app-bar
    app
    class="qa-topbar"
    color="black"
    dark
  >
    <h1>PaperHub</h1>
    <v-spacer />
    <upload-dialog v-if="loggedIn" />
    <v-btn
      to="/"
      text
      class="ml-12"
    >
      Home
    </v-btn>
    <template v-if="loggedIn">
      <v-btn
        text
        @click="logout"
        color="error"
      >
        Logout
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        text
        to="login"
      >
        Login
      </v-btn>
      <v-btn
        to="register"
        text
      >
        Register
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import UploadDialog from '@/components/UploadDialog.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    UploadDialog,
  },
  methods: {
    ...mapActions(['logout']),
  },
  computed: {
    ...mapState({
      loggedIn: (state) => state.isLoggedIn,
    }),
  },
};
</script>

<style>

</style>
