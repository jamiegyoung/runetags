import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { Dispatch, SetStateAction } from 'react';
import Input from '@/components/atoms/Input';
import { SearchContext } from '@/components/organisms/Page';

const testInputWithContext = (
  searchVal: string | undefined,
  setSearchVal: Dispatch<SetStateAction<string>>,
) => (
  <SearchContext.Provider value={[searchVal, setSearchVal]}>
    <div>
      <Input />
      <button></button>
    </div>
  </SearchContext.Provider>
);
describe(`Input`, () => {
  it(`should render correctly`, () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSetSearchVal = jest.fn();

  // noinspection JSUnusedGlobalSymbols
  jest.mock(`react`, () => ({
    useState: (initial: string) => [initial, mockSetSearchVal],
  }));

  it(`should expand on focus`, () => {
    const { container } = render(testInputWithContext(``, mockSetSearchVal));

    const input = container.querySelector(`input`);
    if (!input) {
      throw new Error(`No input found`);
    }
    act(() => {
      fireEvent.focus(input);
    });
    expect(input.placeholder).toBe(``);
  });

  it(`should shrink on blur`, () => {
    const { container } = render(testInputWithContext(``, mockSetSearchVal));

    const input = container.querySelector(`input`);
    if (!input) {
      throw new Error(`No input found`);
    }
    act(() => {
      fireEvent.focus(input);
    });
    expect(input.placeholder).toBe(``);
    act(() => {
      input.value = ``;
      fireEvent.blur(input);
    });
    expect(input.placeholder).toBe(`type here to search`);
  });

  it(`should update the search value on change`, () => {
    const { container } = render(testInputWithContext(``, mockSetSearchVal));

    const input = container.querySelector(`input`);
    if (!input) {
      throw new Error(`No input found`);
    }
    act(() => {
      fireEvent.focus(input);
    });
    expect(input.placeholder).toBe(``);
    act(() => {
      fireEvent.change(input, { target: { value: `test` } });
    });
    expect(mockSetSearchVal).toHaveBeenCalledTimes(1);
    expect(mockSetSearchVal).toHaveBeenCalledWith(`test`);
  });

  it(`should clear the search value when the clear button is clicked`, () => {
    const { container } = render(testInputWithContext(``, mockSetSearchVal));

    const input = container.querySelector(`input`);
    if (!input) {
      throw new Error(`No input found`);
    }

    act(() => {
      fireEvent.change(input, { target: { value: `test` } });
    });

    expect(mockSetSearchVal).toHaveBeenCalledTimes(1);
    expect(mockSetSearchVal).toHaveBeenCalledWith(`test`);
    const clearButton = container.querySelector(`.clearButton`);
    if (!clearButton) {
      throw new Error(`No clear button found`);
    }
    act(() => {
      fireEvent.click(clearButton);
    });
    expect(mockSetSearchVal).toHaveBeenCalledTimes(2);
    expect(mockSetSearchVal).toHaveBeenCalledWith(``);
  });
});
