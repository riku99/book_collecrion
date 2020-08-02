import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import { MyBooksStateAndDispatchType } from "../container/mybooks_container";
import "./mybooks.css";

type MyBooksPropsType = MyBooksStateAndDispatchType;

const MyBooks: FC<MyBooksPropsType> = ({ mybooks, message, getMyBooks }) => {
  useEffect(getMyBooks, []);
  return (
    <>
      <div className="mybooks">
        {mybooks ? (
          mybooks.map((mybook) => {
            return (
              <div className="mybook" key={mybook.id}>
                <div className="image">
                  <img src={mybook.image ? mybook.image : ""} alt="" />
                </div>
                <div className="introduce">
                  <Link to={`/mybooks/${mybook.id}`}>
                    <div className="title">{mybook.title}</div>
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
      {message && message.error ? <div>{message.error}</div> : null}
      {message && message.success ? <div>{message.success}</div> : null}
    </>
  );
};

export default MyBooks;
