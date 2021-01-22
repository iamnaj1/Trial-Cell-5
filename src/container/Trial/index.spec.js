import React from "react";
import { shallow } from "enzyme";
import Trial from ".";
import { Modal } from "semantic-ui-react";
import App from "../../App";
describe("Trial", () => {
  let container;
  let wrapper;

  beforeEach(() => {
    container = shallow(<App />);
    wrapper = shallow(<Trial />);
  });
  it("Should Render Cell 5 Trial Title", () => {
    expect(wrapper.find("h1.trial-header").text()).toEqual("Trial");
  });
  it("Should be able to render Table", () => {
    setTimeout(() => {
      expect(wrapper.find("table.products-table").length).toEqual(1);
    }, 1000);
  });
  it("Should be able to render add product button", () => {
    setTimeout(() => {
      expect(wrapper.find(".product-btn").length).toEqual(1);
    }, 1000);
  });
  it("Should be able to click add product", () => {
    setTimeout(() => {
      wrapper.find("button.product-btn").prop("onClick")();
      let modal = shallow(<Modal />);
      expect(container.find(modal).length).toEqual(1);
    }, 1000);
  });
});
