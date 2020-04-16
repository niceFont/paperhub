<template>
  <v-container class="qa-home">
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">
          Gallery
        </h1>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="url in images"
        :key="url"
        lg="4"
        xl="3"
        sm="12"
        md="6"
      >
        <v-card>
          <v-img :src="url" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  name: 'Home',
  data() {
    return {
      error: null,
      images: null,
    };
  },
  methods: {
    async loadImages() {
      try {
        const response = await fetch(`${VUE_APP_API_ENDPOINT}/images/0`, {
          credentials: 'include',
        });

        const { images } = await response.json();
        this.images = images;
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
  mounted() {
    this.loadImages();
  },
  components: {
  },
};
</script>
