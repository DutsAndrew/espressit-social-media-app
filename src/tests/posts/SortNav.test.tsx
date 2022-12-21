import SortNav from "../../components/web/Posts/SortNav";
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe('unit test for SortNav', () => {

  const handleSortChangeMock = jest.fn();
  const sortTypeMock = {
    type: "New"
  };

  test('renders the correct items', () => {

    render(
      <SortNav handleSortChange={handleSortChangeMock}
        sortType={sortTypeMock}
      />
    );

    const sortText = screen.getByText("Sort by:");
    const sortBtn = screen.getByRole("button", { name: "New"});

    expect(sortText).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();

  });

  test('chevron arrow click renders sort by buttons when not open and closes them when open', () => {

    render(
      <SortNav handleSortChange={handleSortChangeMock}
        sortType={sortTypeMock}
      />
    );

    const chevronArrow = screen.getByRole("img");
    expect(chevronArrow).toBeInTheDocument();

    userEvent.click(chevronArrow);

    const hotBtn = screen.getByRole("button", { name: "Hot"});
    expect(hotBtn).toBeInTheDocument();

    userEvent.click(chevronArrow);
    expect(hotBtn).not.toBeInTheDocument();

  });

  test('sort type is displayed after new sort selection', () => {

    render(
      <SortNav handleSortChange={handleSortChangeMock}
        sortType={sortTypeMock}
      />
    );

    const newBtn = screen.getByText("New");
    const chevronArrow = screen.getByRole("img");
    expect(newBtn).toBeInTheDocument();
    expect(chevronArrow).toBeInTheDocument();

    userEvent.click(chevronArrow);

    const controversialBtn = screen.getByText("Controversial");
    expect(controversialBtn).toBeInTheDocument();
    
    userEvent.click(controversialBtn);

    expect(screen.queryByText("Controversial")).not.toBeInTheDocument();
    
  });

});