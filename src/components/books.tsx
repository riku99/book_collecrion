import React, { FC, useState } from "react";

import "./books.css";
import { BooksPropsType } from "../container/books_container";

const Books: FC<BooksPropsType> = ({ serchedBooks, message, getBooks }) => {
  const [keyword, changeKeyword] = useState("");
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="books-container">
            <div className="serch-field">
              <div className="serch-set">
                <form>
                  <input
                    className="serch-form"
                    type="text"
                    value={keyword}
                    placeholder="キーワードを入力"
                    onChange={(e) => {
                      changeKeyword(e.target.value);
                    }}
                  />
                  <input
                    className="serch-button"
                    type="button"
                    value="検索"
                    onClick={() => getBooks(keyword)}
                  />
                </form>
              </div>
            </div>
            <div className="books">
              {serchedBooks
                ? serchedBooks.map((book, index) => {
                    return (
                      <div className="book" key={index}>
                        <div className="introduce">
                          <div className="title">{book.title}</div>
                          {book.authors ? (
                            <div className="authors">
                              {book.authors.toString()}
                            </div>
                          ) : (
                            <div className="authors">作者不明</div>
                          )}
                        </div>
                        {book.image ? (
                          <img src={book.image} alt=""></img>
                        ) : null}
                      </div>
                    );
                  })
                : null}
            </div>
            <div>{message && message.error ? message.error : null}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
