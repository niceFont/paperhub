<template>
  <v-container class="qa-profile">
    <v-row>
      <v-col>
        <h3>
          My Images
        </h3>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col
        cols="4"
        v-for="(image, index) in images"
        :key="index"
      >
        <v-hover>
          <template v-slot:default="{hover}">
            <v-card>
              <v-img :src="image.url" />
              <v-fade-transition>
                <v-overlay
                  absolute
                  color="gray"
                  v-if="hover"
                >
                  <v-btn
                    :href="image.url"
                    color="primary"
                    :disabled="loading"
                    tile
                  >
                    <v-icon>
                      mdi-download
                    </v-icon>
                  </v-btn>
                  <v-btn
                    tile
                    :disabled="loading"
                    @click="deleteImage(image.id)"
                    color="error"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  data: () => ({
    images: null,
    error: null,
    loading: false,
  }),
  mounted() {
    this.loadImages();
  },
  methods: {
    async deleteImage(id) {
      // change this to vuetify dialog
      // eslint-disable-next-line no-restricted-globals
      const isOkay = confirm('Are you sure you want to delete this Image?\nThis step is irreversible!');
      if (!isOkay) return;
      try {
        this.loading = true;
        await fetch(`${VUE_APP_API_ENDPOINT}/me/images`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: id }),
        });
        window.location.reload();
      } catch (error) {
        this.error = error;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async loadImages() {
      try {
        const response = await fetch(`${VUE_APP_API_ENDPOINT}/me/images/0`, {
          method: 'GET',
          credentials: 'include',
        });
        const { images } = await response.json();

        this.images = images;
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState({
      session/* istanbul ignore next */: (state) => state.session,
    }),
  },
};
</script>

<style>

</style>
