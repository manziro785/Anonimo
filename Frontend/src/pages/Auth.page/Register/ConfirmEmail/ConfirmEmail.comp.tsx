import style from "./ConfirmEmail.module.css";
import "../../common.style.css";
import AuthLayout from "../../../../components/general/Auth/AuthLayout/AuthLayout.comp";
import style_aurh from "../../../../components/general/Auth/AuthHeader/AuthHeader.module.css";
import { useRef } from "react";

export default function ConfirmEmail() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div style={{ background: "none" }}>
      <AuthLayout
        title="Регистация"
        buttons={{
          next: { link: "/dashboard", text: "Продолжить" },
          prev: { link: "/", text: "Вернуться" },
          relink: { link: "/register", text: "Неправильная почта?" },
        }}
      >
        <div className="main">
          <div className={style_aurh.progressContainer}>
            <div className={style_aurh.step}>
              <span className={style_aurh.stepNumber}>1</span>
              <span className={style_aurh.stepText}>Выбор типа аккаунта</span>
            </div>
            <div className={style_aurh.step} id={style.middle}>
              <span className={style_aurh.stepNumber}>2</span>
              <span className={style_aurh.stepText}>Ввод данных</span>
            </div>
            <div className={style_aurh.step} id={style.active}>
              <span className={style_aurh.stepNumber} id={style.stepNumber}>
                3
              </span>
              <span className={style_aurh.stepText}>Подтверждение почты</span>
            </div>
          </div>
          <div className="container_auth">
            <h3 className="step_auth" id="h3_auth">
              Этап 3
            </h3>
            <h3 id="h3_auth">Подтвердите свою почту</h3>
            <p className="p_auth">
              Мы отправили код на вашу почту. Введите его ниже, чтобы завершить
              регистрацию.
            </p>
          </div>
          <div className={style.input_container}>
            {/* <div> */}
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                onChange={(e) => handleInput(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
            {/* </div> */}
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
