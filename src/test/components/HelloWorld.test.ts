import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import i18n from "@/i18n";
import router from "@/router";
import FloatingVue from "floating-vue";

describe("HelloWorld.vue", () => {
  it.each([{ msg: "" }, { msg: "Hello World" }])(
    "should render with props %#",
    (props) => {
      const wrapper = mount(HelloWorld, {
        global: { plugins: [i18n, router, FloatingVue] },
        props,
      });
      console.log(wrapper.find("h3"));
      expect(wrapper.html()).toMatchSnapshot();
    }
  );
});
