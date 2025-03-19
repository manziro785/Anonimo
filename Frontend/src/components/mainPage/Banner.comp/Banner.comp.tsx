import { NavLink } from "react-router-dom";
import StatsCounter from "../CounterBanner/StatsCounter.comp";
import style from "./Banner.comp.module.css";

import bg from "../../../assets/main_page/anonimo_bg.svg";
import line from "../../../assets/main_page/LineBG.svg";

export default function Banner() {
  return (
    <div>
      <div className={style.component}>
        <div className={style.left_side}>
          <div className={style.title}>
            Оставьте отзыв <br />
            <span>Анонимно</span>
          </div>
          <div className={style.info}>
            Ваш голос имеет значение! Безопасно делитесь своими мыслями,
            оставаясь анонимными, и помогайте компании становиться лучше.
          </div>
          <div className={style.btns}>
            <NavLink
              to="/reg"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                background: "none",
              }}
            >
              <div className={style.btn_reg}>Регистрация</div>
            </NavLink>
            <NavLink
              to="/login"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                background: "none",
              }}
            >
              <div className={style.btn_aut}>Вход</div>
            </NavLink>
          </div>
          <div className={style.statistic}>
            <StatsCounter />
          </div>
        </div>
        <div className={style.right_side}>
          <img src={line} alt="" className={style.line} />
          <img src={bg} alt="" className={style.bg_anonimo} />
        </div>
      </div>
    </div>
  );
}
