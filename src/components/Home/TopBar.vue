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
    <template
      v-if="loggedIn"
    >
      <v-divider
        class="ml-12"
        vertical
      />
      <v-btn
        fab
        class="ml-4"
        depressed
        small
        @click="$emit('input', true)"
      >
        <v-avatar
          color="teal"
          size="38"
        >
          <span class="white--text headline">{{ session.username[0] }}</span>
        </v-avatar>
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
import { mapState } from 'vuex';

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
  }),
  components: {
    UploadDialog,
  },
  computed: {
    ...mapState({
      loggedIn: (state) => state.isLoggedIn,
      session/* istanbul ignore next */: (state) => state.session,
    }),
  },
};
</script>

<style>

</style>
