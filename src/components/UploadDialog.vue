<template>
  <v-dialog
  class="qa-uploaddialog"
  overlay-opacity="0"
  max-width="1000"
  v-model="dialog"
  persistent>
    <template v-slot:activator="{on}">
      <v-btn class="qa-uploaddialog-open" depressed v-on="on">Upload</v-btn>
    </template>
    <v-card class="qa-uploaddialog-card" tile min-height="1000">
      <v-toolbar class="mb-12" flat color="teal">
        <span class="white--text">Upload Image</span>
        <v-spacer></v-spacer>
        <v-btn text class="qa-uploaddialog-close" dark @click="dialog = false">close</v-btn>
      </v-toolbar>
      <v-row justify="center">
        <v-col cols="8">
          <v-alert type="info" dark>
            Files should only contain valid extensions such as jpeg, png, webp and gif.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-img max-height="500px" v-if="filePreview" :src="filePreview">
          </v-img>
          <v-skeleton-loader v-else height="500" min-height="500" type="image"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row justify="center" >
        <v-col cols="6">
           <v-file-input
              class="qa-uploaddialog-fileuploader"
              ref="fileupload"
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Select an Image"
              prepend-icon="mdi-camera"
              label="Upload"
              @change="fileHandler($event)"
              @click:clear="clear"
            ></v-file-input>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row justify="center">
          <v-col cols="4">
            <v-btn @click="cancelUpload" color="error" large block>Cancel</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn :disabled="!selectedFile" color="primary" large block>Upload</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UploadDialog',
  data: () => ({
    dialog: false,
    rules: [
      (value) => !value || value.size < 4000000 || 'Image size should be less than 4 MB!',
    ],
    selectedFile: null,
    filePreview: null,
  }),
  methods: {
    fileHandler(file) {
      console.log(file);
      this.selectedFile = file;
    },
    clear() {
      this.filePreview = null;
      this.selectedFile = null;
      this.$refs.fileupload.clearableCallback();
    },
    cancelUpload() {
      this.clear();
      this.filePreview = null;
      this.selectedFile = null;
      this.dialog = false;
    },
  },
  watch: {
    selectedFile(file) {
      if (file) {
        const fr = new FileReader();
        fr.onload = (data) => {
          this.filePreview = data.target.result;
        };
        fr.readAsDataURL(file);
      }
    },
  },
};
</script>

<style>
.v-skeleton-loader__image {
    height: 500px !important
  }
.v-dialog {
  overflow-y: unset !important;
}
</style>
