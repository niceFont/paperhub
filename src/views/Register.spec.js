import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Register from './Register.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('Register.vue', () => {
  const mountPage = () => mount(Register, {
    localVue,
    vuetify: new Vuetify(),
  });


  it('renders', () => {
    const wrapper = mountPage();

    expect(wrapper.isVueInstance()).toBe(true);
  });
});
