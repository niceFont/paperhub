import Vue from 'vue';

export default {
  'user/session': (state, session) => {
    Vue.set(state, 'session', session);
  },
  'user/login': (state) => {
    Vue.set(state, 'isLoggedIn', true);
  },
  'user/logout': (state) => {
    Vue.set(state, 'isLoggedIn', false);
  },
};
