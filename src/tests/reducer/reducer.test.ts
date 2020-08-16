import reducer from "../../reducer";

export let defaultState = {
  login: { logged_in: false, current_user: null, checked: false },
  serchedBooks: null,
  myBooks: null,
  myBook: null,
  message: null,
  redirectToNewPage: false,
};

describe("reducer", () => {
  test("initialState", () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  test("SUCCESS_GET_BOOK", () => {
    const data = [
      {
        title: "マンキュー経済学",
        authors: ["N.グレゴリー マンキュー"],
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      },
    ];
    expect(
      reducer(defaultState, { type: "SUCCESS_GET_BOOK", data: data })
    ).toEqual({
      ...defaultState,
      serchedBooks: data,
    });
  });

  test("SUCCESS_GET_MYBOOKS", () => {
    const data = [
      {
        id: 1,
        title: "マンキュー経済学",
        authors: "N.グレゴリー マンキュー",
        image:
          "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        memo: "テストメモ",
        date: "8/8",
      },
    ];

    expect(
      reducer(defaultState, { type: "SUCCESS_GET_MYBOOKS", mybooks: data })
    ).toEqual({ ...defaultState, myBooks: data });
  });

  test("SUCCESS_GETMYBOOK", () => {
    const data = {
      id: 1,
      title: "マンキュー経済学",
      authors: "N.グレゴリー マンキュー",
      image:
        "http://books.google.com/books/content?id=PviOoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      memo: "テストメモ",
      date: "8/8",
    };
    expect(
      reducer(defaultState, { type: "SUCCESS_GETMYBOOK", mybook: data })
    ).toEqual({ ...defaultState, myBook: data });
  });

  test("SUCCESS_DELETE_MYBOOK", () => {
    expect(
      reducer(defaultState, {
        type: "SUCCESS_DELETE_MYBOOK",
        redirectToNewPage: true,
        message: { success: "OK" },
      })
    ).toEqual({
      ...defaultState,
      redirectToNewPage: true,
      message: { success: "OK" },
    });
  });

  test("SUCCESS_MESSAGE", () => {
    expect(
      reducer(defaultState, {
        type: "SUCCESS_MESSAGE",
        message: { success: "OK" },
      })
    ).toEqual({ ...defaultState, message: { success: "OK" } });
  });

  test("FAILER_MESSAGE", () => {
    expect(
      reducer(defaultState, {
        type: "FAILER_MESSAGE",
        message: { error: "OK" },
      })
    ).toEqual({ ...defaultState, message: { error: "OK" } });
  });

  test("CAHNGE_REDIRECT_STATE", () => {
    const customState = { ...defaultState, redirectToNewPage: true };
    expect(reducer(customState, { type: "CAHNGE_REDIRECT_STATE" })).toEqual({
      ...customState,
      redirectToNewPage: false,
    });
  });
});
