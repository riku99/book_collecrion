import axios from "axios";

export let getGoogleBooksApi = async (keyword: string) => {
  let response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=serch+${keyword}`
  );

  if (response.status !== 200) {
    throw new Error("サーバーエラーが発生しました");
  }

  if (!response.data.items) {
    throw new Error("本の情報が存在しません");
  }

  let books_data = [];

  for (let i = 0; i < response.data.items.length && i < 20; i++) {
    let title = response.data.items[i].volumeInfo.title;
    let authors = response.data.items[i].volumeInfo.authors
      ? response.data.items[i].volumeInfo.authors
      : null;
    let image = response.data.items[i].volumeInfo.imageLinks
      ? response.data.items[i].volumeInfo.imageLinks.smallThumbnail
      : null;
    let book = {
      title: title,
      authors: authors,
      image: image,
    };
    books_data.push(book);
  }

  return books_data;
};

export let registerBookToRailsApi = async (data: {
  title: string;
  authors: string[] | null;
  image: string | null;
  memo: string;
}) => {
  let response = await axios.post(
    "http://localhost:4000/api/v1/registerBooks",
    {
      book: {
        title: data.title,
        authors: data.authors?.toString(),
        image: data.image,
        memo: data.memo,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("エラーが発生しました");
  }

  return response.data;
};

export let getMyBooksToRailsApi = async () => {
  let response = await axios.get("http://localhost:4000/api/v1/mybooks");

  if (response.status !== 200) {
    throw new Error("エラーが発生しました");
  }

  if (response.data.length !== 0) {
    let d = response.data;
    let mybooks = [];
    for (let i = 0; i < response.data.length; i++) {
      let mybook = {
        id: d[i].id,
        title: d[i].title,
        authors: d[i].authors,
        image: d[i].image ? d[i].image : null,
        memo: d[i].memo,
        date: d[i].created_at,
      };
      mybooks.push(mybook);
    }
    console.log(mybooks);
    return mybooks;
  }

  return null;
};

export let getMyBookFromRailsApi = async (id: number) => {
  let response = await axios(`http://localhost:4000/api/v1/mybooks/${id}`);

  if (response.status !== 200) {
    throw new Error("エラーが発生しました");
  }

  let data = response.data;
  let mybook = {
    id: data.id,
    title: data.title,
    authors: data.authors,
    image: data.image,
    memo: data.memo,
    date: data.created_at,
  };

  return mybook;
};
