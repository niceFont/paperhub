
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App.vue';

window.fetch = jest.fn();
Vue.use(Vuetify);
Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('App.vue', () => {
  const mountPage = ({ loadSession }) => mount(App, {
    localVue,
    store: new Vuex.Store({
      state: {
        isLoggedIn: false,
      },
      actions: {
        loadSession: loadSession || jest.fn(),
      },
    }),
    stubs: ['router-link', 'router-view'],
    vuetify: new Vuetify(),
  });


  it('renders', () => {
    const wrapper = mountPage({});
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-app');
  });
});
