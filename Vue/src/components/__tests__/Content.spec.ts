import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Content from '../DropDownContent.vue';

describe('DropDownContent', () => {
  it('renders properly', () => {
    const wrapper = mount(Content);
    expect(wrapper.text()).toContain('Product');
  });
});
