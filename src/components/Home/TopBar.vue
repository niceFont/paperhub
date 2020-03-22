<template>
  <v-app-bar
      app
      color="teal"
      dark
  >
    <h1>PaperHub</h1>
    <v-spacer></v-spacer>
    <upload-dialog />
    <v-btn text>Login</v-btn>
    <v-btn text>Register</v-btn>
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
