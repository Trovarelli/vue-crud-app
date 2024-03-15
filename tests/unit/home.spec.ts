import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("renderização deve ser correta", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.exists()).toBe(true);
  });

  it("tem o elemento container", () => {
    const wrapper = shallowMount(Home);
    const container = wrapper.find(".container");
    expect(container.exists()).toBe(true);
  });

  it("tem o elemento h1", () => {
    const wrapper = shallowMount(Home);
    const title = wrapper.find("h1");
    expect(title.exists()).toBe(true);
    expect(title.text()).toMatch(
      "Bem-vindo ao sistema de gerenciamento de clientes e produtos"
    );
  });
});
