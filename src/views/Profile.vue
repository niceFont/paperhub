/* eslint-disable no-restricted-globals */
<template>
  <v-container class="qa-profile">
    <v-row>
      <v-col>
        <h3>
          My Images
        </h3>
      </v-col>
    </v-row>
    <v-dialog
      max-width="300"
      persistent
      v-model="isConfirming"
    >
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-card-text>
          By Confirming, you acknowledge that this Image will be permenantly
          deleted and will not be accessible anymore.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="tobeDeleted = null
                    isConfirming = false"
            text
            color="error"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            @click="deleteImage"
            color="success"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                    @click.stop="
                      tobeDeleted = image.id
                      isConfirming = true
                    "
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
    isConfirming: false,
    tobeDeleted: null,
    loading: false,
  }),
  mounted() {
    this.loadImages();
  },
  methods: {
    async deleteImage() {
      try {
        this.loading = true;
        await fetch(`${VUE_APP_API_ENDPOINT}/me/images`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: this.tobeDeleted }),
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
