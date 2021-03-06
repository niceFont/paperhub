<template>
  <v-dialog
    class="qa-uploaddialog"
    overlay-opacity="0"
    max-width="1000"
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{on}">
      <v-btn
        class="qa-uploaddialog-open"
        text
        depressed
        v-on="on"
      >
        <v-icon>
          mdi-upload
        </v-icon>
      </v-btn>
    </template>
    <v-card
      class="qa-uploaddialog-card"
      tile
      min-height="1000"
    >
      <v-toolbar
        class="mb-12"
        flat
        color="black"
      >
        <span class="white--text">Upload Image</span>
        <v-spacer />
        <v-btn
          text
          class="qa-uploaddialog-close"
          dark
          @click="dialog = false"
        >
          close
        </v-btn>
      </v-toolbar>
      <v-row justify="center">
        <v-col cols="8">
          <v-alert
            type="info"
            dark
          >
            Files should only contain valid extensions such as jpeg, png, webp and gif.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-img
            max-height="500px"
            v-if="filePreview"
            :src="filePreview"
          />
          <v-skeleton-loader
            v-else
            height="500"
            min-height="500"
            type="image"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
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
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-select
            :rules="categoryRules"
            v-model="category"
            :items="categories"
            label="Select a Category"
            item-value="id"
            item-text="name"
            outlined
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row justify="center">
          <v-col cols="4">
            <v-btn
              depressed
              @click="cancelUpload"
              color="error"
              large
              block
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="qa-uploaddialog-upload"
              depressed
              color="primary"
              large
              :disabled="!uploadValid"
              block
              :loading="loading"
              @click="upload"
            >
              Upload
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  name: 'UploadDialog',
  data: () => ({
    dialog: false,
    loading: false,
    category: null,
    categories: null,
    width: null,
    height: null,
    rules: [
      (value) => value?.size > 4000000 && 'Image too large (max 4 MB)',
      (value) => !value?.type?.includes('image') && 'Filetype is not supported',
    ],
    categoryRules: [
      (value) => !value && 'Category can not be empty',
    ],
    selectedFile: null,
    filePreview: null,
  }),
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await fetch(`${VUE_APP_API_ENDPOINT}/categories`);
        this.categories = await response.json();
      } catch (error) {
        this.error = error;
      }
    },
    async upload() {
      this.loading = true;
      try {
        const body = new FormData();
        body.append('file', this.selectedFile);
        body.append('type', this.selectedFile.type.split('/')[1]);
        body.append('width', this.width);
        body.append('height', this.height);
        body.append('category', this.category);
        await fetch(`${VUE_APP_API_ENDPOINT}/images`, {
          method: 'POST',
          credentials: 'include',
          body,
        });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        this.clear();
      }
    },
    fileHandler(file) {
      this.selectedFile = file;
    },
    clear() {
      this.$refs.fileupload.clearableCallback();
      this.filePreview = null;
      this.selectedFile = null;
    },
    cancelUpload() {
      this.clear();
      this.dialog = false;
    },
  },
  computed: {
    uploadValid() {
      return (this.rules
        .map((rule) => !!rule(this.selectedFile))
        .every((result) => result === false)
        && this.categoryRules
          .map((rule) => !!rule(this.category))
          .every((result) => result === false));
    },
  },
  watch: {
    selectedFile(file) {
      if (file && file.type.includes('image')) {
        const fr = new FileReader();
        const image = new Image();
        /* istanbul ignore next */
        image.onload = () => {
          /* istanbul ignore next */
          this.width = image.clientWidth || image.width;
          /* istanbul ignore next */
          this.height = image.clientHeight || image.height;
        };
        fr.onload = (data) => {
          image.src = data.target.result;
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
