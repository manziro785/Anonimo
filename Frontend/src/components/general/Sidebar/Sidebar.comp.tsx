import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "./Sidebar.module.css";
import img1 from "../../../assets/sidebar/img_sidebar1.svg";
import img2 from "../../../assets/sidebar/img_sidebar2.svg";
import img3 from "../../../assets/sidebar/img_sidebar3.svg";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const chats = [{ name: "chat1" }, { name: "chat2" }, { name: "chat3" }];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.style.height = isOpen
        ? `${chatRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  const handleChatClick = (chatName) => {
    navigate(`/survey/${chatName}`); // Теперь используется chatName
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <a href="/">Anonimo</a>
      </div>
      <nav className={style.btns}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              <img src={img1} alt="" /> Опросники
            </NavLink>
          </li>
          <li onClick={() => setIsOpen(!isOpen)}>
            <div className={style.chat_wrapper}>
              <NavLink to="#">
                <div className={style.li_wrap}>
                  <img src={img2} alt="" /> Чаты
                </div>
              </NavLink>
              <div
                ref={chatRef}
                className={`${style.chat_container} ${isOpen ? style.open : ""}`}
              >
                {chats.map((chat) => (
                  <NavLink
                    key={chat.name}
                    to={`/survey/${chat.name}`} // Используем название вместо ID
                    className={({ isActive }) =>
                      `${style.a_chats} ${isActive ? style.active : ""}`
                    }
                  >
                    <p>{chat.name}</p>
                  </NavLink>
                ))}
              </div>
            </div>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              <img src={img3} alt="" /> Настройки
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
