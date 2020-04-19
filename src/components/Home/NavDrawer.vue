<template>
  <v-navigation-drawer
    class="qa-navdrawer"
    temporary
    v-model="drawer"
    dark
    right
    absolute
  >
    <v-toolbar>
      Settings
    </v-toolbar>
    <v-list>
      <v-list-item>
        <v-btn
          text
          block
          to="profile"
        >
          Profile
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-btn
          block

          @click="logout"
          color="error"
        >
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
