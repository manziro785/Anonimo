import style from "./Settings.module.css";
import icon from "../../assets/common/AnonimoIcon.svg";
// import img_icon from "../../assets/sidebar/img_icon.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../App"; // путь может отличаться
import { useContext, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  // const company_name = "KarakolStroy.kg";
  const navigate = useNavigate();

  const [_, setIsAuth] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuth(false);
    setUser({});
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("Токен в сеттингс ", token);

    if (!token) return;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get("http://localhost:8080/api/v1/users/me")
      .then((res) => {
        setIsAuth(true);
        setUser(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении профиля пользователя:", error);
        if (error.response?.status === 403) {
          localStorage.removeItem("access_token"); // Удаляем недействительный токен
          setIsAuth(false);
        }
      });
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.logo_icon}>
            <img src={icon} alt="" />
          </div>
          <div className={style.info}>
            <h2>Мой Профиль</h2>
            <div>
              <div className={style.block}>
                <div>
                  <div className={style.up_side}>юзернейм:</div>
                  <div className={style.value}>{user.username}</div>
                </div>
                <div>
                  <div className={style.up_side}>роль:</div>
                  <div className={style.value}>{user.role}</div>
                </div>
              </div>
              <div className={style.block}>
                <div>
                  <div className={style.up_side}>менеджер код:</div>
                  <div className={style.value}>{user.managerCode}</div>
                </div>
                <div>
                  <div className={style.up_side}>пароль:</div>
                  <div className={style.value} style={{ paddingTop: "5px" }}>
                    * * * * *
                  </div>
                </div>
              </div>
            </div>
            <div className={style.btns}>
              <div className={style.btn_change_info}>Изменить данные</div>
              <div className={style.btn_del_account} onClick={handleLogout}>
                Выйти из аккаунта
              </div>
            </div>
            {/* <div className={style.nickname}>{user.username}</div>
            <div className={style.nickname}>{user.email}</div>
            <div className={style.nickname}>{user.managerCode}</div>
            <div className={style.nickname}>{user.role}</div>

            <div className={style.company_name}>
              <img src={img_icon} alt="" />
              {company_name}
            </div>
            <div className={style.logoutContainer}>
              <button className={style.logoutButton} onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
