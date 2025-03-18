import { useLocation } from "react-router-dom";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";
import style_aurh from "../../../../components/general/Auth/AuthHeader/AuthHeader.module.css";
import style from "./AdminInfoStep.module.css";
import "../../common.style.css";

export default function AdminInfoStep() {
  const location = useLocation();
  const role = location.state?.role || "USER"; // Дефолтное значение

  return (
    <div style={{ background: "none" }}>
      <AuthLayout
        title={`Регистрация ${role === "admin" ? "администратора" : "пользователя"}`}
        buttons={{
          next: { link: "/register_verification", text: "Продолжить" },
          prev: { link: "/choose-role", text: "Вернуться" },
          relink: { link: "/login", text: "Уже есть аккаунт?" },
        }}
      >
        <div className="main">
          <div className={style_aurh.progressContainer}>
            <div className={style_aurh.step}>
              <span className={style_aurh.stepNumber}>1</span>
              <span className={style_aurh.stepText}>Выбор типа аккаунта</span>
            </div>
            <div className={style_aurh.step} id={style.active}>
              <span className={style_aurh.stepNumber} id={style.stepNumber}>
                2
              </span>
              <span className={style_aurh.stepText}>Ввод данных</span>
            </div>
            <div className={style_aurh.step} id={style_aurh.last_item}>
              <span className={style_aurh.stepNumber}>3</span>
              <span className={style_aurh.stepText}>Подтверждение почты</span>
            </div>
          </div>

          <div className="container_auth">
            <h3 className="step_auth" id="h3_auth">
              Этап 2
            </h3>
            <h3 id="h3_auth">Заполните данные для регистрации</h3>
            <p className="p_auth">
              Выбранная роль: <strong>{role}</strong>
            </p>
          </div>

          <div className="value_auth">
            <div>
              <div>
                <label>Электронная почта</label>
                <input type="email" placeholder="Введите свою почту" />
              </div>
              <div>
                <label>Пароль</label>
                <input type="password" placeholder="Введите пароль" />
              </div>
            </div>

            <div>
              <div>
                <label>Подтвердите пароль</label>
                <input type="password" placeholder="Введите пароль снова" />
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
