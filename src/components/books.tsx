import React, { FC, useState } from "react";

import "./books.css";
import { BooksPropsType } from "../container/books_container";

const Books: FC<BooksPropsType> = ({ serchedBooks, getBooks }) => {
  const [keyword, changeKeyword] = useState("");
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="books-container">
            <div className="serch-field">
              <form>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    changeKeyword(e.target.value);
                  }}
                />
                <input type="button" onClick={() => getBooks(keyword)} />
              </form>
            </div>
            {serchedBooks.length ? serchedBooks[0].title : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
