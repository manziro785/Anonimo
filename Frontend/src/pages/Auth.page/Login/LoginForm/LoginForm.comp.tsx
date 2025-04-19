import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./LoginForm.module.css";
import "../../common.style.css";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";
import style_auth from "../../../../components/general/Auth/AuthHeader/AuthHeader.module.css";
import { useContext } from "react";
import { AuthContext, UserContext } from "../../../../App";

export default function LoginForm() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [, setIsAuth] = useContext(AuthContext);
  const [, setUserContext] = useContext(UserContext);

  const handleLogin = async () => {
    try {
      setError("");
      const authResponse = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = authResponse.data.token;
      localStorage.setItem("access_token", token); // сохраняем как access_token

      const userResponse = await axios.get(
        "http://localhost:8080/api/v1/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userData = userResponse.data;
      setUser(userData); // локально (если надо)
      setUserContext(userData); // глобально
      setIsAuth(true); // глобально
      navigate("/dashboard"); // редирект на главную
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Неверные данные. Попробуйте снова.");
    }
  };

  return (
    <div style={{ background: "none" }}>
      <AuthLayout
        title="Авторизация"
        buttons={{
          next: { text: "Войти", onClick: handleLogin },
          prev: { link: "/register", text: "Вернуться" },
          relink: { link: "/register", text: "Создать аккаунт" },
        }}
      >
        <div className="main">
          <div className={style_auth.progressContainer}>
            <div className={style_auth.step} id={style.active}>
              <span className={style_auth.stepText_login}>Вход в систему</span>
            </div>
          </div>
          <div className="container_auth">
            <h3 className="step_auth" id="h3_auth">
              Войдите в свой аккаунт{" "}
            </h3>
          </div>
          <div className="value_auth">
            <div id={style.box_auth}>
              <div id={style.form_auth}>
                <div>
                  <label>Юзернейм</label>
                  <input
                    type="email"
                    placeholder="Введите свой юзернейм"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>Пароль</label>
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className={style.wrapp_button_auth}>
                <button className={style.button_auth} onClick={handleLogin}>
                  Войти
                </button>
                <div className={style.relink_btn}>
                  <a
                    href="/register"
                    className={style.relink_btn}
                    style={{ background: "none", textAlign: "center" }}
                  >
                    Уже есть аккаунт?
                  </a>
                </div>
              </div>
            </div>
          </div>
          {user && (
            <div className="user-info">
              <h3>Добро пожаловать, {user.username}!</h3>
              <p>Email: {user.username}</p>
              <p>Роль: {user.role}</p>
            </div>
          )}
        </div>
      </AuthLayout>
    </div>
  );
}
