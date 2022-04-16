import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import WelcomeItem from "@/components/WelcomeItem.vue";
import i18n from "@/i18n";
import router from "@/router";
import FloatingVue from "floating-vue";

describe("WelcomeItem.vue", () => {
  it("should render", () => {
    const wrapper = mount(WelcomeItem, {
      global: { plugins: [i18n, router, FloatingVue] },
      slots: {
        icon: "Icon slot",
        heading: "Heading slot",
        default: "Default slot",
      },
    });
    console.log(wrapper.find("h3"));
    expect(wrapper.html()).toMatchSnapshot();
  });
});
