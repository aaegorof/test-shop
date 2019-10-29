import React from "react";
import { scrollTo } from "../../helpers";

const Header = () => {
  return (
    <header className="App-header container">
      <h1>Тестовое задание</h1>
      <div className="project-description">
        <div>
          Автор{" "}
          <a
            href="https://sitewanted.ru/cv"
            className="author"
            target="_blank"
            rel="noopener noreferrer"
          >
            Артемий Егоров
          </a>
        </div>
        <time className="date">Дата: 23/10/2019</time>
        <div className="time">Затраченное время: 5ч.</div>
        <div onClick={scrollTo("#footer")} className="about">
          Подробнее о задаче
        </div>
      </div>
    </header>
  );
};

export default Header;
