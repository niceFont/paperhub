import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Home from './Home.vue';

describe('Home.vue', () => {
  Vue.use(Vuetify);
  const mountPage = mount(Home, {

  });

  it('renders', () => {
    expect(mountPage.isVueInstance()).toBe(true);
  });
});
