import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import { BooksPropsType } from "../container/books_container";
import "./books.css";

const Books: FC<BooksPropsType> = ({
  serchedBooks,
  message,
  getBooks,
  registerBooks,
}) => {
  const [keyword, changeKeyword] = useState("");
  const [memos, changeMemo] = useState(() => {
    if (serchedBooks) {
      let o: { [memo: string]: string } = {};
      for (let i = 0; i < serchedBooks.length; i++) {
        o["memo" + i] = "";
      }
      return o;
    }
    return null;
  });

  return (
    <>
      <div className="books-page">
        <div className="books-container">
          <div className="serch-field">
            <div className="serch-set">
              <form data-testid="search-form">
                <input
                  name="keyword-form"
                  data-testid="keyword-form"
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
                  data-testid="search-button"
                />
              </form>
            </div>
          </div>
          <div className="books" data-testid="books">
            {serchedBooks
              ? serchedBooks.map((book, index) => {
                  return (
                    <div
                      className="book"
                      key={index.toString()}
                      data-testid="book"
                    >
                      <div className="introduce">
                        <div className="title">{book.title}</div>
                        {book.authors ? (
                          <div className="authors">
                            {book.authors.toString()}
                          </div>
                        ) : (
                          <div className="authors">作者不明</div>
                        )}
                        <div className="registerBooks">
                          <div className="register-form">
                            <textarea
                              value={memos ? memos["memo" + index] : undefined}
                              placeholder="メモやコメントを残す"
                              onChange={(e) => {
                                changeMemo({
                                  ...memos,
                                  ["memo" + index]: e.target.value,
                                });
                              }}
                              data-testid="memo"
                            ></textarea>
                          </div>
                          <div className="register-form">
                            <button
                              type="button"
                              onClick={() => {
                                registerBooks(
                                  book.title,
                                  book.authors,
                                  book.image,
                                  memos ? memos["memo" + index] : ""
                                );
                              }}
                              data-testid="register"
                            >
                              MyBookに登録
                            </button>
                          </div>
                        </div>
                      </div>
                      {book.image ? <img src={book.image} alt=""></img> : null}
                    </div>
                  );
                })
              : null}
          </div>
          {message && message.error ? (
            <div data-testid="error-message">{message.error}</div>
          ) : null}
        </div>
        <div className="others">
          <Link className="link" to="/mybooks">
            MyBooks
          </Link>
        </div>
      </div>
    </>
  );
};

export default Books;
