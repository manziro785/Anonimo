import { useState } from "react";
import axios from "axios";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";
import style_aurh from "../../../../components/general/Auth/AuthHeader/AuthHeader.module.css";
import style from "./ChooseAccount.module.css";
import "../../common.style.css";

export default function RegisterRoot() {
  const [selected, setSelected] = useState("admin"); // Начальный выбор типа аккаунта
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          email,
          username,
          password,
          role: selected,
        }
      );
      console.log(response.data);
      // Здесь можно добавить редирект или сообщение о успешной регистрации
    } catch (err) {
      setError("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "none" }}>
      <AuthLayout
        title="Регистрация"
        buttons={{
          next: {
            link: "#",
            text: "Далее",
            onClick: handleSubmit,
          },
          prev: { link: "/", text: "Вернуться" },
          relink: { link: "/login", text: "Уже есть аккаунт?" },
        }}
      >
        <div className="main">
          <div className={style_aurh.progressContainer}>
            <div
              className={style_aurh.step}
              id={style_aurh.active}
              style={{ borderRadius: "18px 18px 0px 0" }}
            >
              <span className={style_aurh.stepNumber}>1</span>
              <span className={style_aurh.stepText}>Заполнение данных</span>
            </div>
          </div>

          <div className="container_auth">
            <h3 className="step_auth" id="h3_auth">
              Заполните данные для регистрации
            </h3>

            <div className="value_auth">
              <div>
                <div>
                  <label>Электронная почта</label>
                  <input
                    type="email"
                    placeholder="Введите свою почту"
                    value={email}
                    className={style.inputt}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Пароль</label>
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    className={style.inputt}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <label>Подтвердите пароль</label>
                  <input
                    type="password"
                    placeholder="Введите пароль снова"
                    value={confirmPassword}
                    className={style.inputt}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label>Имя пользователя</label>
                  <input
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={username}
                    className={style.inputt}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={style.container}>
              <label className={style.radio_container}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selected === "admin"}
                  onChange={() => setSelected("admin")}
                />
                <span className={style.custom_radio}></span>
                Администратор
              </label>
              <label className={style.radio_container}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={selected === "user"}
                  onChange={() => setSelected("user")}
                />
                <span className={style.custom_radio}></span>
                Пользователь
              </label>
            </div>

            {error && <p className="error">{error}</p>}

            <button
              className={style.next_btn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Загружается..." : "Зарегистрироваться"}
            </button>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
