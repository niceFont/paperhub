
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import RegisterForm from './RegisterForm.vue';

window.fetch = jest.fn();

Vue.use(Vuetify);
Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('RegisterForm.vue', () => {
  const mountPage = ({ push }) => mount(RegisterForm, {
    localVue,
    store: new Vuex.Store({
      state: {
        isLoggedIn: false,
      },
      actions: {
      },
    }),
    mocks: {
      $router: {
        push: push || jest.fn(),
      },
    },
    vuetify: new Vuetify(),
  });

  const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

  it('renders', () => {
    const wrapper = mountPage({});
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-registerform');
  });
  it('sends request to api', async () => {
    const push = jest.fn();
    window.fetch.mockResolvedValue({ ok: true });
    const wrapper = mountPage({ push });
    wrapper.setData({ username: 'tester', password: '12345678', email: 'test@tester.de' });
    await sleep(100);
    wrapper.find('.qa-registerform-register').vm.$emit('click');
    await sleep(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'tester', email: 'test@tester.de', password: '12345678' }),
    });
    expect(push).toHaveBeenCalledWith({ name: 'home' });
  });
  it('sets error on api error', async () => {
    const push = jest.fn();
    window.fetch.mockRejectedValue(new Error('Internal shitter error'));
    const wrapper = mountPage({ push });
    wrapper.setData({ username: 'tester', password: '12345678', email: 'test@tester.de' });
    await sleep(100);
    wrapper.find('.qa-registerform-register').vm.$emit('click');
    await sleep(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'tester', email: 'test@tester.de', password: '12345678' }),
    });
    expect(push).not.toHaveBeenCalledWith({ name: 'home' });
    expect(wrapper.vm.$data.error).not.toBeNull();
  });
});
