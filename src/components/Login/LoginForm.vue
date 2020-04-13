<template>
  <v-row
    class="mt-12 qa-loginform"
    justify="center"
  >
    <v-col
      cols="8"
    >
      <v-card
        class="ml-auto mr-auto"
        max-width="1200"
        min-height="600"
      >
        <v-toolbar
          class="mb-12"
          color="black"
          dark
          flat
        >
          <h3>Login to your Account</h3>
        </v-toolbar>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-row
            justify="center"
          >
            <v-col cols="10">
              <v-text-field
                outlined
                color="pink accent-3"
                v-model="username"
                :rules="usernameRules"
                label="Username"
                required
              />

              <v-text-field
                outlined
                color="pink accent-3"
                type="password"
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="9">
              <v-checkbox
                v-model="rememberMe"
                label="Keep me logged in"
              />
              <v-btn
                small
                text
                to="resetpassword"
                color="pink accent-3"
              >
                Forgot password?
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col
              class="d-flex justify-end"
              cols="3"
            >
              <v-btn
                depressed
                class="ma-10 qa-loginform-login"
                @click="login"
                dark
                color="pink accent-3"
                block
                large
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { mapMutations } from 'vuex';

const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  name: 'LoginForm',
  methods: {
    async login() {
      try {
        const body = JSON.stringify({
          username: this.username,
          password: this.password,
        });
        await fetch(`${VUE_APP_API_ENDPOINT}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body,
        });
        this.setLogin();
        this.$router.push({ name: '/' });
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
    ...mapMutations({
      setLogin: 'user/login',
    }),
  },
  data: () => ({
    username: '',
    usernameRules: [
      (v) => !!v || 'Username is required!',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
    password: '',
    error: null,
    rememberMe: false,
  }),
};
</script>

  <style>

  </style>
