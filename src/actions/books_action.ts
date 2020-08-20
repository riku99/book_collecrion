export const getBooks = {
  get: (keyword: string) => ({ type: "GET_BOOKS" as const, keyword: keyword }),
  success: (
    data: { title: string; authors: string[] | null; image: string | null }[]
  ) => ({ type: "SUCCESS_GET_BOOK" as const, data: data }),
  error: (message: string) => ({
    type: "FAILER_MESSAGE" as const,
    message: { error: message },
  }),
};

export const registerBooks = {
  register: (data: {
    title: string;
    authors: string[] | null;
    image: string | null;
    memo: string;
  }) => ({
    type: "REGISTER_BOOKS",
    data: {
      title: data.title,
      authors: data.authors,
      image: data.image,
      memo: data.memo,
    },
  }),
  success: (message: string) => ({
    type: "SUCCESS_MESSAGE" as const,
    message: { success: message },
  }),
  error: (message: string) => ({
    type: "FAILER_MESSAGE" as const,
    message: { error: message },
  }),
};

export const getMyBooks = {
  get: () => ({ type: "GET_MYBOOKS" as const }),
  success: (
    data:
      | {
          id: number;
          title: string;
          authors: string;
          image: string | null;
          memo: string;
          date: string;
        }[]
      | null
  ) => ({ type: "SUCCESS_GET_MYBOOKS" as const, mybooks: data }),
  error: (message: string) => ({
    type: "FAILER_MESSAGE" as const,
    message: { error: message },
  }),
};

export const getMyBook = {
  get: (id: number) => ({ type: "GET_MYBOOK", id: id }),
  success: (mybook: {
    id: number;
    title: string;
    authors: string;
    image: string;
    memo: string;
    date: string;
  }) => ({
    type: "SUCCESS_GETMYBOOK" as const,
    mybook: mybook,
  }),
  error: (e: string) => ({
    type: "FAILER_MESSAGE" as const,
    message: { error: e },
  }),
};

export const deleteMyBook = {
  delete: (id: number) => ({
    type: "DELETE_MYBOOK" as const,
    id: id,
  }),
  success: (message: string) => ({
    type: "SUCCESS_DELETE_MYBOOK" as const,
    redirectToNewPage: true,
    message: { success: message },
  }),
  error: (m: string) => ({
    type: "FAILER_MESSAGE" as const,
    message: { error: m },
  }),
};

type getBooksType =
  | ReturnType<typeof getBooks.get>
  | ReturnType<typeof getBooks.success>
  | ReturnType<typeof getBooks.error>;

type getMyBooksType =
  | ReturnType<typeof getMyBooks.success>
  | ReturnType<typeof getMyBooks.error>;

type registerBooksType = ReturnType<typeof registerBooks.success>;

type getMyBookType =
  | ReturnType<typeof getMyBook.success>
  | ReturnType<typeof getMyBook.error>;

type deleteMyBookType =
  | ReturnType<typeof deleteMyBook.success>
  | ReturnType<typeof deleteMyBook.error>;

export type booksType =
  | getBooksType
  | getMyBooksType
  | registerBooksType
  | getMyBookType
  | deleteMyBookType;
