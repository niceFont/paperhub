
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
    vuetify: new Vuetify(),
  });

  const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

  it('renders', () => {
    const wrapper = mountPage({});
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-app');
  });
  it('loads session on mount', async () => {
    const loadSession = jest.fn();
    mountPage({ loadSession });
    await sleep(1000);
    expect(loadSession).toHaveBeenCalled();
  });
});
