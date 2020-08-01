import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MyBookStateAndDispatchType } from "../container/mybook_container";
import "./mybook.css";

const MyBook: FC<MyBookStateAndDispatchType> = ({ mybook, getMyBook }) => {
  let { id } = useParams();
  useEffect(() => {
    getMyBook(id);
  }, [getMyBook, id]);
  return (
    <>
      {mybook ? (
        <div className="one-mybook">
          <div className="image">
            <img src={mybook.image} alt="" />
          </div>
          <div className="title">{mybook.title}</div>
          <div className="authors">{mybook.authors}</div>
          <div className="memo">
            <p className="memo-sbj">Memo</p>
            <p className="memo-content">{mybook.memo}</p>
          </div>
          <div className="date">
            <p className="date-sbj">登録日</p>
            <p className="date-content">{mybook.date}</p>
          </div>
          <div className="operation">
            <button className="delete-button">削除する</button>
            <button>メモを編集する</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyBook;
