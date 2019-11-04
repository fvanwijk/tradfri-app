import Vue from 'vue';
import Home from '@/components/Home';

describe('Home', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('Trådfri App');
  });
});
