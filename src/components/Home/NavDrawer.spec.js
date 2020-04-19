import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import NavDrawer from './NavDrawer.vue';

window.fetch = jest.fn();

Vue.use(Vuetify);
Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(Vuetify);

const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

describe('NavDrawer.vue', () => {
  const mountPage = ({ logout }) => mount(NavDrawer, {
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
    expect(wrapper.classes()).toContain('qa-navdrawer');
  });
  it('emits input on change', async () => {
    const wrapper = mountPage({});
    wrapper.setData({ drawer: true });
    await sleep(100);

    expect(wrapper.emitted().input).toEqual([[true]]);
  });
});
