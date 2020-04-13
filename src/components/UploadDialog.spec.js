import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import UploadDialog from './UploadDialog.vue';

window.fetch = jest.fn();
document.body.setAttribute('data-app', true);

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
describe('UploadDialog.vue', () => {
  const mountPage = () => mount(UploadDialog, {
    localVue,
    vuetify: new Vuetify(),
  });

  const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

  it('renders', () => {
    const wrapper = mountPage();
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.classes()).toContain('qa-uploaddialog');
  });
  it('shows the dialog on click', async () => {
    const wrapper = mountPage();
    wrapper.find('.qa-uploaddialog-open').trigger('click');
    await sleep(100);
    expect(wrapper.vm.$data.dialog).toEqual(true);
    expect(wrapper.find('.qa-uploaddialog-card').isVisible()).toBe(true);
  });
  it('closes the dialog on click', async () => {
    const wrapper = mountPage();
    wrapper.find('.qa-uploaddialog-open').trigger('click');
    await sleep(100);
    expect(wrapper.vm.$data.dialog).toEqual(true);
    expect(wrapper.find('.qa-uploaddialog-card').isVisible()).toBe(true);
    wrapper.find('.qa-uploaddialog-close').trigger('click');
    await sleep(200);
    expect(wrapper.vm.$data.dialog).toEqual(false);
    expect(wrapper.find('.qa-uploaddialog-card').isVisible()).toBe(false);
  });
  it('sets the filePreview after selecting a file', async () => {
    const file = new File(Buffer.from('hello'), 'logo.png', {
      type: 'image/png',
    });
    const wrapper = mountPage();
    wrapper.setData({
      dialog: true,
    });
    await sleep(100);
    wrapper.find('.qa-uploaddialog-fileuploader').vm.$emit('change', file);
    await sleep(200);
    expect(wrapper.vm.$data.selectedFile).not.toEqual(null);
    expect(wrapper.vm.$data.filePreview).not.toEqual(null);
  });
  it('clears selection on clear()', async () => {
    const file = new File(Buffer.from('hello'), 'logo.png', {
      type: 'image/png',
    });
    const wrapper = mountPage();
    wrapper.setData({
      dialog: true,
    });
    await sleep(100);
    wrapper.find('.qa-uploaddialog-fileuploader').vm.$emit('change', file);
    await sleep(200);
    expect(wrapper.vm.$data.selectedFile).not.toEqual(null);
    expect(wrapper.vm.$data.filePreview).not.toEqual(null);
    wrapper.vm.clear();
    await sleep(100);
    expect(wrapper.vm.$data.selectedFile).toEqual(null);
    expect(wrapper.vm.$data.filePreview).toEqual(null);
  });
  it('cancels the upload', async () => {
    const file = new File(Buffer.from('hello'), 'logo.png', {
      type: 'image/png',
    });
    const wrapper = mountPage();
    wrapper.setData({
      dialog: true,
    });
    await sleep(100);
    wrapper.find('.qa-uploaddialog-fileuploader').vm.$emit('change', file);
    await sleep(200);
    expect(wrapper.vm.$data.selectedFile).not.toEqual(null);
    expect(wrapper.vm.$data.filePreview).not.toEqual(null);
    wrapper.vm.cancelUpload();
    await sleep(100);
    expect(wrapper.vm.$data.selectedFile).toEqual(null);
    expect(wrapper.vm.$data.filePreview).toEqual(null);
    expect(wrapper.vm.$data.dialog).toEqual(false);
  });
  it('sends request to api', async () => {
    window.fetch.mockResolvedValue({ url: 'test' });
    const file = new File(Buffer.from('hello'), 'logo.png', {
      type: 'image/png',
    });
    const wrapper = mountPage();
    wrapper.setData({
      dialog: true,
    });
    await sleep(100);
    wrapper.find('.qa-uploaddialog-fileuploader').vm.$emit('change', file);
    await sleep(100);
    wrapper.find('.qa-uploaddialog-upload').vm.$emit('click');
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/images', {
      method: 'POST',
      credentials: 'include',
      body: expect.anything(),
    });
  });
  it('sets error on api error', async () => {
    window.fetch.mockRejectedValue(new Error('Internal Server Error'));
    const file = new File(Buffer.from('hello'), 'logo.png', {
      type: 'image/png',
    });
    const wrapper = mountPage();
    wrapper.setData({
      dialog: true,
    });
    await sleep(100);
    wrapper.find('.qa-uploaddialog-fileuploader').vm.$emit('change', file);
    await sleep(100);
    wrapper.find('.qa-uploaddialog-upload').vm.$emit('click');
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:4000/api/images', {
      method: 'POST',
      credentials: 'include',
      body: expect.anything(),
    });
    expect(wrapper.vm.$data.error).not.toBeNull();
  });
});
