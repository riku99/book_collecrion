import React from "react";
import { render } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import reducer from "../../reducer";

import MyBooks from "../../container/books/mybooks_container";

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

  test("mybooksが10個未満の場合はページャーが表示されない", async () => {
    let myBooks = [];
    for (let n = 1; n < 10; n++) {
      myBooks.push({
        id: n,
        title: "test book",
        authors: "riku",
        image: null,
        memo: "ok",
        data: "8/1",
      });
    }

    const { queryByTestId } = render(<MyBooks />, {
      testInitialState: { myBooks: myBooks },
    });
    const pagination = queryByTestId("pagination");
    expect(pagination).toBeNull();
  });

  test("mybooksが10個以上の場合はページャーが表示される", async () => {
    let myBooks = [];
    for (let n = 1; n < 11; n++) {
      myBooks.push({
        id: n,
        title: "test book",
        authors: "riku",
        image: null,
        memo: "ok",
        data: "8/1",
      });
    }

    const { queryByTestId } = render(<MyBooks />, {
      testInitialState: { myBooks: myBooks },
    });
    const pagination = queryByTestId("pagination");
    expect(pagination).toBeTruthy();
  });
});
