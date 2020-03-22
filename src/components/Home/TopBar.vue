<template>
  <v-app-bar
    app
    color="black"
    dark
  >
    <h1>PaperHub</h1>
    <v-spacer />
    <upload-dialog />
    <v-btn
      to="/"
      text
      class="ml-12"
    >
      Home
    </v-btn>
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
  </v-app-bar>
</template>

<script>
import UploadDialog from '@/components/UploadDialog.vue';

export default {
  components: {
    UploadDialog,
  },
};
</script>

<style>

</style>
