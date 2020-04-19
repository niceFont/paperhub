
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Login from './Login.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('Login.vue', () => {
  const mountPage = () => mount(Login, {
    localVue,
    vuetify: new Vuetify(),
  });


  it('renders', () => {
    const wrapper = mountPage();

    expect(wrapper.isVueInstance()).toBe(true);
  });
});
