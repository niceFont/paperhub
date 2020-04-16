import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Home from './Home.vue';

window.fetch = jest.fn();
const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
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
  it('loads Images', async () => {
    const wrapper = mountPage();
    const mockResponse = { images: [{ url: 'mike hawk' }, { url: 'rainer unsinn' }] };
    window.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    await wrapper.vm.loadImages();
    await sleep(100);
    expect(wrapper.vm.$data.images).toEqual([{ url: 'mike hawk' }, { url: 'rainer unsinn' }]);
  });
});
