import style from "./LoginForm.module.css";
import "../../common.style.css";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";
import style_aurh from "../../../../components/general/Auth/AuthHeader/AuthHeader.module.css";

export default function LoginForm() {
  return (
    <div style={{ background: "none" }}>
      <AuthLayout
        title="Авторизация"
        buttons={{
          next: { link: "/dashboard", text: "Войти" },
          prev: { link: "/register", text: "Вернуться" },
          relink: { link: "/register", text: "Создать аккаунт" },
        }}
      >
        <div className="main">
          <div className={style_aurh.progressContainer}>
            <div className={style_aurh.step} id={style.active}>
              <span className={style_aurh.stepText_login}>Вход в систему</span>
            </div>
          </div>
          <div className="container_auth">
            <h3 className="step_auth" id="h3_auth">
              Войдите в свой аккаунт{" "}
            </h3>
            {/* <span></span> */}
            {/* <h3 id="h3_auth">Войдите в свой аккаунт</h3> */}
            <p className="p_auth">
              Введите свою почту и пароль, чтобы получить доступ к системе.
            </p>
          </div>
          <div className="value_auth">
            <div>
              <div>
                <label>Электронная почта</label>
                <input type="email" placeholder="Введите свою почту" />
              </div>
            </div>
            <div>
              <div>
                <label>Пароль</label>
                <input type="password" placeholder="Введите пароль" />
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
