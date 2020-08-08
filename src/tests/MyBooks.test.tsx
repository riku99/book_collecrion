import React from "react";
import { render, fireEvent } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import reducer from "../reducer";

import MyBooks from "../container/mybooks_container";
import { customState } from "./test-utils";

describe("<MyBooks />", () => {
  test("mybooksプロップスにデータが入れば要素が表示される", async () => {
    const mybooks = [
      {
        id: 1,
        title: "マンキュー経済学",
        authors: ["N.グレゴリー マンキュー"],
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        memo: "テストメモ",
        date: "8/8",
      },
    ];
    const { findByTestId } = render(<MyBooks />, {
      testInitialState: { myBooks: mybooks },
    });
    const mybook = await findByTestId("mybook");
    expect(mybook).toBeTruthy();
  });

  test("MyBooksコンポーネントをレンダリングするとdispatchされる", async () => {
    const store = createStore(reducer);
    store.dispatch = jest.fn();
    render(<MyBooks />, { store: store });
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GET_MYBOOKS" });
  });
});
