
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Home from './Home.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('Home.vue', () => {
  const mountPage = () => mount(Home, {
    localVue,
    vuetify: new Vuetify(),
  });


  it('renders', () => {
    const wrapper = mountPage();

    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-home');
  });
});
