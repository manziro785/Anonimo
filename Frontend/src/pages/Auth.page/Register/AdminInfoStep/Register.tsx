import { useLocation } from "react-router-dom";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";

export default function Register() {
  const location = useLocation();
  const role = location.state?.role || "user"; // По умолчанию "user", если роль не передали

  return (
    <div style={{ background: "none" }}>
      <AuthLayout
        title="Регистрация"
        buttons={{
          next: { link: "/register_verification", text: "Продолжить" },
          prev: { link: "/choose-role", text: "Назад" },
          relink: { link: "/login", text: "Уже есть аккаунт?" },
        }}
      >
        <div className="container_auth">
          <h3>
            Регистрация {role === "admin" ? "администратора" : "пользователя"}
          </h3>
          <p>Введите вашу почту и пароль для регистрации.</p>
        </div>
        <div className="value_auth">
          <div>
            <label>Электронная почта</label>
            <input type="email" placeholder="Введите почту" />
          </div>
          <div>
            <label>Пароль</label>
            <input type="password" placeholder="Введите пароль" />
          </div>
          <div>
            <label>Подтвердите пароль</label>
            <input type="password" placeholder="Повторите пароль" />
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
