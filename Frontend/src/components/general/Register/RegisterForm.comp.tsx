import style from "../../../pages/Auth.page/Register/ChooseAccount/ChooseAccount.module.css";
import "../../../pages/Auth.page/common.style.css";

type Props = {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  username: string;
  setUsername: (val: string) => void;
  error?: string;
  selectedRole: string;
};

export default function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  username,
  setUsername,
  error,
  selectedRole,
}: Props) {
  return (
    <div className="container_auth">
      <div className="value_auth">
        <div id={style.box_auth}>
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
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              className={style.inputt}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {selectedRole === "MANAGER" && (
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
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
