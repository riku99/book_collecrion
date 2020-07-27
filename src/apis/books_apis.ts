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
    let book = {
      title: response.data.items[i].volumeInfo.title,
      auhors: response.data.items[i].volumeInfo.authors,
      image: response.data.items[i].volumeInfo.imageLinks.smallThumbnail,
    };
    books_data.push(book);
  }

  return books_data;
};
