<template>
  <v-row
    class="mt-12 qa-registerform"
    justify="center"
  >
    <v-col
      cols="11"
      sm="8"
      md="6"
      lg="6"
      xl="4"
    >
      <v-card
        class="ml-auto mr-auto"
        max-width="1200"
      >
        <v-toolbar
          class="mb-12"
          color="black"
          dark
          flat
        >
          <h3>Register your Account</h3>
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
                :counter="15"
                color="pink accent-3"
                v-model="username"
                :rules="usernameRules"
                label="Username"
                required
              />
              <v-text-field
                outlined
                color="pink accent-3"
                v-model="email"
                :rules="emailRules"
                type="email"
                label="E-Mail"
                required
              />
              <v-text-field
                outlined
                color="pink accent-3"
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="Password"
                required
              />
              <v-text-field
                outlined
                color="pink accent-3"
                type="password"
                v-model="passwordRepeat"
                :rules="passwordRules"
                label="Repeat Password"
                required
              />
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col
              class="pr-6 d-flex justify-end"
              cols="4"
            >
              <v-btn
                depressed
                class="qa-registerform-register"
                dark
                color="pink accent-3"
                block
                large
                @click="handleSubmit"
              >
                Register
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const { VUE_APP_API_ENDPOINT } = process.env;

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      usernameRules: [
        (v) => !!v || 'Username is required!',
        (v) => (v && v.length <= 15) || 'Username must be less than 15 characters',
        (v) => (v && v.length >= 4) || 'Username must be atleast 4 characters long',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be atleast 8 characters long',
      ],
      emailRules: [
        (v) => !!v || 'E-Mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      email: '',
      passwordRepeat: '',
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const body = JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
        });

        await fetch(`${VUE_APP_API_ENDPOINT}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        this.$router.push({ name: 'home' });
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

  <style>

  </style>
