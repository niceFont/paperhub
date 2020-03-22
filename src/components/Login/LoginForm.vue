<template>
  <v-row
    class="mt-12"
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
          v-model="valid"
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
                class="ma-10"
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
export default {
  name: 'LoginForm',
  data: () => ({
    username: '',
    usernameRules: [
      (v) => !!v || 'Username is required!',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
    password: '',
    rememberMe: false,
  }),
};
</script>

  <style>

  </style>
