import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "material-ui-flat-pagination";

import { MyBooksStateAndDispatchType } from "../../container/books/mybooks_container";
import "./mybooks.css";

type MyBooksPropsType = MyBooksStateAndDispatchType;

const MyBooks: FC<MyBooksPropsType> = ({ mybooks, message, getMyBooks }) => {
  const [offset, changeOffset] = useState(0);
  useEffect(getMyBooks, []);
  return (
    <>
      <div className="mybooks">
        {mybooks ? (
          mybooks.slice(offset, offset + 10).map((mybook) => {
            return (
              <div className="mybook" key={mybook.id} data-testid="mybook">
                <div className="image">
                  <img src={mybook.image ? mybook.image : ""} alt="" />
                </div>
                <div className="introduce">
                  <Link to={`/mybooks/${mybook.id}`}>
                    <div className="title" data-testid="title">
                      {mybook.title}
                    </div>
                  </Link>
                  <div className="authors">{mybook.authors}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p>登録されていません</p>
        )}
      </div>
      {mybooks && mybooks.length < 10 ? null : (
        <Pagination
          limit={10}
          offset={offset}
          total={mybooks ? mybooks.length : 0}
          onClick={(e, offset) => {
            changeOffset(offset);
          }}
          classes={{ root: "pagination" }}
          data-testid={"pagination"}
        ></Pagination>
      )}
      {message && message.error ? (
        <div style={{ color: "red", textAlign: "center" }}>{message.error}</div>
      ) : null}
    </>
  );
};

export default MyBooks;
