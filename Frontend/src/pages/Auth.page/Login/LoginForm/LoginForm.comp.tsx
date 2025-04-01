import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Для навигации после входа
import axios from "axios";
import style from "./LoginForm.module.css";
import "../../common.style.css";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";
import style_auth from "../../../../components/general/Auth/AuthHeader/AuthHeader.module.css";

export default function LoginForm() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Для вывода ошибок
  const navigate = useNavigate(); // Хук для редиректа

  const handleLogin = async () => {
    try {
      setError(""); // Очищаем ошибки перед запросом

      // Отправляем запрос на аутентификацию
      const authResponse = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Получаем токен
      const token = authResponse.data.token;
      localStorage.setItem("token", token); // Сохраняем токен

      // Получаем данные пользователя
      const userResponse = await axios.get(
        "http://localhost:8080/api/v1/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(userResponse.data); // Устанавливаем пользователя
      navigate("/"); // Перенаправляем на главную страницу
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
            <p className="p_auth">
              Введите свою почту и пароль, чтобы получить доступ к системе.
            </p>
          </div>
          <div className="value_auth">
            <div>
              <label>Электронная почта</label>
              <input
                type="email"
                placeholder="Введите свою почту"
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleLogin}>Войти</button>
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
