<template>
  <v-navigation-drawer
    class="qa-navdrawer"
    temporary
    v-model="drawer"
    dark
    right
    absolute
  >
    <v-toolbar color="black">
      <v-icon>mdi-format-list-checkbox</v-icon>
      <v-spacer />
      Menu
    </v-toolbar>
    <v-list>
      <v-list-item>
        <v-btn
          text
          block
          to="profile"
          outlined
        >
          <v-icon>mdi-account</v-icon>
          Profile
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-btn
          block
          outlined
          @click="logout"
          color="error"
        >
          <v-icon>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

<style>

</style>
