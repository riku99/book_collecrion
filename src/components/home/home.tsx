import React, { FC, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import Login from "../../container/sessions/login_container";
import children from "../../images/children.jpeg";
import readable from "../../images/readable.jpeg";
import yougisyax from "../../images/yougisyax.jpeg";
import linux from "../../images/linux.jpeg";
import mannkyu from "../../images/mannkyu.jpeg";
import "./home.css";

const Home: FC = () => {
  const childrenEle = <img src={children} alt="" key="chil" />;
  const readableEle = <img src={readable} alt="" key="read" />;
  const yougisyaxEle = <img src={yougisyax} alt="" key="x" />;
  const linuxEle = <img src={linux} alt="" key="linux" />;
  const mannkyuEle = <img src={mannkyu} alt="" key="mannkyu" />;
  const imageEle = [
    childrenEle,
    readableEle,
    yougisyaxEle,
    linuxEle,
    mannkyuEle,
  ];

  const [img, changeImg] = useState(childrenEle);
  const [inProps, setInProps] = useState(true);

  let n = 0;
  const setImage = async () => {
    n++;
    if (n === imageEle.length) {
      n = 0;
    }
    setInProps(false);
    setTimeout(() => {
      changeImg(imageEle[n]);
      setInProps(true);
    }, 2000);
  };

  const changeImage = () => {
    const intervalId = setInterval(setImage, 5000);
    const clear = () => {
      clearInterval(intervalId);
    };
    return clear;
  };

  useEffect(changeImage, []);

  return (
    <div className="home-container">
      <div className="books-image">
        <CSSTransition in={inProps} timeout={10000} classNames="fade-image">
          {img}
        </CSSTransition>
      </div>
      <div className="home-login">
        <Login />
      </div>
    </div>
  );
};

export default Home;
