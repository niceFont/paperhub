
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import LoginForm from './LoginForm.vue';

window.fetch = jest.fn();

Vue.use(Vuetify);
Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('LoginForm.vue', () => {
  const mountPage = ({ push }) => mount(LoginForm, {
    localVue,
    store: new Vuex.Store({
      state: {
        isLoggedIn: false,
      },
      actions: {
      },
      mutations: {
        'user/login': jest.fn(),
      },
    }),
    mocks: {
      $router: {
        push: push || jest.fn(),
      },
    },
    vuetify: new Vuetify(),
    stubs: ['router-link'],
  });

  const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

  it('renders', () => {
    const wrapper = mountPage({});
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-loginform');
  });
  it('sends request to api', async () => {
    const push = jest.fn();
    window.fetch.mockResolvedValue({ ok: true });
    const wrapper = mountPage({ push });
    wrapper.setData({ username: 'tester', password: '12345678' });
    await sleep(100);
    wrapper.find('.qa-loginform-login').vm.$emit('click');
    await sleep(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username: 'tester', password: '12345678' }),
    });
    expect(push).toHaveBeenCalledWith({ name: '/' });
  });
  it('sets error on api error', async () => {
    const push = jest.fn();
    window.fetch.mockRejectedValue(new Error('Internal shitter error'));
    const wrapper = mountPage({ push });
    wrapper.setData({ username: 'tester', password: '12345678' });
    await sleep(100);
    wrapper.find('.qa-loginform-login').vm.$emit('click');
    await sleep(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username: 'tester', password: '12345678' }),
    });
    expect(push).not.toHaveBeenCalledWith({ name: '/' });
    expect(wrapper.vm.$data.error).not.toBeNull();
  });
});
