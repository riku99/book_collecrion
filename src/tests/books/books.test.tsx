import React from "react";
import { render, fireEvent } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import reducer from "../../reducer";

import Books from "../../container/books/books_container";
import { customState } from "../test-utils";

describe("<Books />", () => {
  test("serch-formにkeyword-formがあり、valueが''である", async () => {
    const { findByTestId } = render(<Books />);
    const serchForm = await findByTestId("search-form");
    expect(serchForm).toHaveFormValues({ "keyword-form": "" });
  });

  test("keywordを入力できる", async () => {
    const { findByTestId } = render(<Books />);
    const keywordForm = await findByTestId("keyword-form");
    fireEvent.change(keywordForm, { target: { value: "マンキュー経済学" } });
    expect(keywordForm).toHaveValue("マンキュー経済学");
  });

  test("serchedBooksに値が入ったらbook要素が表示される", async () => {
    const searchedBooks = [
      {
        title: "マンキュー経済学",
        authors: ["N.グレゴリー マンキュー"],
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      },
    ];
    const { findByTestId } = render(<Books />, {
      testInitialState: { serchedBooks: searchedBooks },
    });

    const bookElement = await findByTestId("book");
    expect(bookElement).toBeTruthy();
  });

  test("messageがnullならmessage要素は表示されない", async () => {
    const { queryByTestId } = render(<Books />);
    const errorMessageElement = queryByTestId("error-message");
    const successMessageElement = queryByTestId("success-message");
    expect(errorMessageElement).toBeNull();
    expect(successMessageElement).toBeNull();
  });

  test("message{error}に値が入ったらエラーメッセージが表示される", async () => {
    const errorMessage = { message: { error: "エラーメッセージ" } };
    const { findByTestId } = render(<Books />, {
      testInitialState: errorMessage,
    });
    const errorMessageEle = await findByTestId("error-message");
    expect(errorMessageEle.textContent).toBe("エラーメッセージ");
  });

  test("検索ボタンを押すとアクションがdispatchされる", async () => {
    const store = createStore(reducer);
    store.dispatch = jest.fn();
    const { findByTestId } = render(<Books />, { store: store });
    const keywordForm = await findByTestId("keyword-form");
    const searchButton = await findByTestId("search-button");
    fireEvent.change(keywordForm, { target: { value: "マンキュー経済学" } });
    fireEvent.click(searchButton);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "GET_BOOKS",
      keyword: "マンキュー経済学",
    });
  });

  test("メモを入力できる", async () => {
    const searchedBooks = [
      {
        title: "マンキュー経済学",
        authors: ["N.グレゴリー マンキュー"],
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      },
    ];
    const { findByTestId } = render(<Books />, {
      testInitialState: { serchedBooks: searchedBooks },
    });
    const memoField = await findByTestId("memo");
    fireEvent.change(memoField, { target: { value: "テストメモ" } });
    expect(memoField).toHaveValue("テストメモ");
  });

  test("登録ボタンを押すとアクションがdispatchされる", async () => {
    const searchedBooks = [
      {
        title: "マンキュー経済学",
        authors: ["N.グレゴリー マンキュー"],
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      },
    ];
    const store = createStore(
      reducer,
      customState({ serchedBooks: searchedBooks })
    );
    store.dispatch = jest.fn();
    const { findByTestId } = render(<Books />, { store: store });
    const memoField = await findByTestId("memo");
    fireEvent.change(memoField, { target: { value: "テストメモ" } });
    const registerButton = await findByTestId("register");
    fireEvent.click(registerButton);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "REGISTER_BOOKS",
      data: {
        title: "マンキュー経済学",
        authors: ["N.グレゴリー マンキュー"],
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        memo: "テストメモ",
      },
    });
  });
});
