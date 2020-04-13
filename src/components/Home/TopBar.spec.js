
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import TopBar from './TopBar.vue';

window.fetch = jest.fn();

Vue.use(Vuetify);
Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('Topbar.vue', () => {
  const mountPage = ({ logout }) => mount(TopBar, {
    localVue,
    store: new Vuex.Store({
      state: {
        isLoggedIn: false,
      },
      actions: {
        logout: logout || jest.fn(),
      },
    }),
    stubs: ['router-link'],
    vuetify: new Vuetify(),
  });


  it('renders', () => {
    const wrapper = mountPage({});
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-topbar');
  });
});
