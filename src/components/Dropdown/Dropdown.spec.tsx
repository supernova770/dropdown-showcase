import { render } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  it("should render", () => {
    const { container } = render(<Dropdown options={[]} label="Choose an animal" defaultValue={""} width={350} onChange={()=>{}} />);
    expect(container).not.toBeEmptyDOMElement();
  });

  // Bonus points for adding unit tests.
});
