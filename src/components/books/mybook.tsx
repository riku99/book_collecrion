import React, { FC, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";

import { MyBookStateAndDispatchType } from "../../container/books/mybook_container";
import "./mybook.css";

const MyBook: FC<MyBookStateAndDispatchType & RouteComponentProps> = ({
  history,
  mybook,
  message,
  redirectToNewPage,
  getMyBook,
  deleteMyBook,
  changeRedirectState,
}) => {
  const { id } = useParams<any>();
  const [loading, changeLoading] = useState(true);
  const firstRender = useRef(true);

  let redirectToMybooks = () => {
    if (redirectToNewPage) {
      history.replace("/mybooks");
      changeRedirectState();
    }
  };

  useEffect(() => {
    getMyBook(id);
  }, [getMyBook, id]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      changeLoading(false);
    }
  }, [mybook]);

  useEffect(redirectToMybooks, [redirectToNewPage]);

  return (
    <>
      {loading ? null : mybook ? (
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
            <button
              className="delete-button"
              onClick={() => {
                let r = window.confirm("削除しますか?");
                if (r) {
                  deleteMyBook(mybook.id);
                }
              }}
            >
              削除する
            </button>
          </div>
        </div>
      ) : null}
      {message && message.error ? (
        <div style={{ color: "red", textAlign: "center" }}>{message.error}</div>
      ) : null}
    </>
  );
};

export default withRouter(MyBook);
