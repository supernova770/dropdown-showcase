import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  it("should render", () => {
    const { container } = render(
      <Dropdown
        options={[]}
        label="Choose an animal"
        defaultValue={""}
        width={350}
        onChange={() => {}}
      />
    );
    // screen.debug();
    expect(container).not.toBeEmptyDOMElement();
  });

  it("should select and how selected option", () => {
    //Arrange
    render(
      <Dropdown
        options={[
          { value: "Select a guitar brand", label: "Select a guitar" },
          { value: "Fender", label: "Fender" },
          { value: "Strandberg", label: "Strandberg" },
        ]}
        label="Choose a guitar brand"
        width={350}
        onChange={() => {}}
      />
    );
    
    //Act
    fireEvent.click(screen.getByText("Select a guitar brand"));
    // screen.debug();
    
    const strandberg = screen.getByText("Strandberg")
    fireEvent.click(screen.getByText("Fender"))
    screen.debug();
    
    //Assert
    expect(strandberg).not.toBeInTheDocument()
 
  });
});
