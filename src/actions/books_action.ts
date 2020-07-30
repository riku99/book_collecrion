export const getBooks = {
  get: (keyword: string) => ({ type: "GET_BOOKS" as const, keyword: keyword }),
  success: (
    data: { title: string; authors: string[] | null; image: string | null }[]
  ) => ({ type: "SUCCESS_GET_BOOK" as const, data: data }),
  error: (message: { error: string }) => ({
    type: "FAILER_GET_BOOK" as const,
    message: message,
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
};

export type getBooksType =
  | ReturnType<typeof getBooks.get>
  | ReturnType<typeof getBooks.success>
  | ReturnType<typeof getBooks.error>;
