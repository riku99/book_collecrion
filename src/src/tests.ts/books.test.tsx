import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { Dispatch } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import Books from "../../components/books";
import { BooksPropsType } from "../../container/books_container";

let mapDispatch = (dispatch: Dispatch) => ({
  getBooks: (keyword: string) =>
    dispatch({ type: "GET_BOOKS", keyword: keyword }),
});

function renderBooks(props: Partial<BooksPropsType> = {}) {
  const defaultProps: BooksPropsType = {
    serchedBooks: null,
    message: null,
    getBooks: (keword: string) => ({ type: "GET_BOOKS", keyword: keword }),
    registerBooks: (
      title: string,
      authors: string[] | null,
      image: string | null,
      memo: string
    ) => ({
      type: "REGISTER_BOOKS",
      data: {
        title: title,
        authors: authors,
        image: image,
        memo: memo,
      },
    }),
  };

  return render(
    <Router>
      <Books {...defaultProps} {...props} />
    </Router>
  );
}

describe("<Books />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
    const { findByTestId } = renderBooks();
    const serchSet = await findByTestId("serch-set");
    expect(serchSet).toHaveFormValues({ "serch-set-form": "" });
  });
});
