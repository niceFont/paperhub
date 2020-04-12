import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import router from '../router';

const { VUE_APP_API_ENDPOINT } = process.env;

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    session: null,
    isLoggedIn: false,
  },
  mutations: {
    'user/session': (state, session) => {
      Vue.set(state, 'session', session);
    },
    'user/login': (state) => {
      Vue.set(state, 'isLoggedIn', true);
    },
    'user/logout': (state) => {
      Vue.set(state, 'isLoggedIn', false);
    },
  },
  actions: {
    async logout({ commit }) {
      await fetch(`${VUE_APP_API_ENDPOINT}/me/session`, {
        method: 'DELETE',
        credentials: 'include',
      });
      commit('user/logout');
      router.push({ name: 'Login' });
    },
    async loadSession({ commit }) {
      const res = await fetch(`${VUE_APP_API_ENDPOINT}/me/session`, {
        credentials: 'include',
        mode: 'cors',
      });
      if (res.ok) {
        const session = await res.json();
        commit('user/login');
        commit('user/session', session);
      }
    },
  },
  modules: {
  },
});
