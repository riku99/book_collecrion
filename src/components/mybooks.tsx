import React, { FC, useEffect } from "react";

import { MyBooksStateAndDispatchType } from "../container/mybooks_container";
import "./mybooks.css";

type MyBooksPropsType = MyBooksStateAndDispatchType;

const MyBooks: FC<MyBooksPropsType> = ({ mybooks, getMyBooks }) => {
  useEffect(getMyBooks, []);
  console.log(mybooks ? mybooks[1] : null);
  return (
    <>
      <div className="mybooks">
        {mybooks ? (
          mybooks.map((mybook, index) => {
            return (
              <div className="mybook" key={mybook.id}>
                <div className="image">
                  <img src={mybook.image ? mybook.image : ""} alt="" />
                </div>
                <div className="introduce">
                  <div className="title">{mybook.title}</div>
                  <div className="authors">{mybook.authors}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p>登録されていません</p>
        )}
      </div>
    </>
  );
};

export default MyBooks;
