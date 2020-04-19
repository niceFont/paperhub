import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Profile from './Profile.vue';

const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
Vue.use(Vuetify);
Vue.use(Vuex);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('Profile.vue', () => {
  const mountPage = () => mount(Profile, {
    localVue,
    store: new Vuex.Store({
      state: {
        session: {
          username: 'hi',
          email: 'bye',
        },
      },
    }),
    vuetify: new Vuetify(),
  });
  beforeEach(() => {
    window.fetch = jest.fn();
  });
  afterEach(() => {
    window.fetch.mockClear();
  });

  it('renders', () => {
    const wrapper = mountPage();

    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-profile');
  });
  it('loads Images', async () => {
    const wrapper = mountPage();
    const mockResponse = { images: [{ id: 0, url: 'mike hawk' }, { id: 1, url: 'rainer unsinn' }] };
    window.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    await wrapper.vm.loadImages();
    await sleep(100);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/me/images/0', {
      method: 'GET',
      credentials: 'include',
    });
    expect(wrapper.vm.$data.images).toEqual([{ id: 0, url: 'mike hawk' }, { id: 1, url: 'rainer unsinn' }]);
  });
  it('deletes image', async () => {
    window.fetch
      .mockResolvedValue()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ images: [] }) });
    window.confirm = jest.fn(() => true);
    const wrapper = mountPage();
    await wrapper.vm.deleteImage(0);
    await sleep(100);
    expect(window.fetch).toHaveBeenLastCalledWith('http://localhost:4000/api/me/images', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: 0 }),
    });
    expect(wrapper.vm.$data.error).toBeNull();
  });
  it('does not delete on cancel', async () => {
    window.fetch
      .mockResolvedValue()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ images: [] }) });
    window.confirm = jest.fn(() => false);
    const wrapper = mountPage();
    await wrapper.vm.deleteImage(0);
    await sleep(100);
    expect(window.fetch).not.toHaveBeenLastCalledWith('http://localhost:4000/api/me/images', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: 0 }),
    });
    expect(wrapper.vm.$data.error).toBeNull();
  });
  it('sets error on error', async () => {
    window.fetch
      .mockRejectedValue(new Error('cool'))
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ images: [] }) });
    const wrapper = mountPage();
    window.confirm = jest.fn(() => true);
    await wrapper.vm.deleteImage(0);
    await sleep(100);
    expect(window.fetch).toHaveBeenLastCalledWith('http://localhost:4000/api/me/images', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: 0 }),
    });
    expect(wrapper.vm.$data.error).not.toBeNull();
  });
});
