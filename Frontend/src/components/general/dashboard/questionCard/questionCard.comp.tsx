import React, { useEffect, useState } from "react";
import style from "./questionCard.module.css";

interface DashboardProps {
  id: number;
  title: string;
  info: string;
  date: string;
  company_name: string;
  onDelete: (id: number) => void;
}

const QuestionCard: React.FC<DashboardProps> = ({
  id,
  info,
  date,
  title,
  company_name,
  onDelete,
}) => {
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const role = "MANAGER";
    setUserRole(role);
  }, []);

  return (
    <div>
      <div className={style.card}>
        <div className={style.left}>
          <div className={style.company_name}>Тема опросника: {title}</div>
          {/* <div className={style.title}>Тема опросника: {title}</div> */}
          <div className={style.info}>{info}</div>
        </div>
        <div className={style.right}>
          <div>
            <div className={style.date}>Опросник создан {date}</div>
          </div>
          {userRole === "MANAGER" || userRole === "ADMIN" ? (
            <div className={style.btns}>
              <div className={style.btn}>Результаты</div>
              <button className={style.btn_delete} onClick={() => onDelete(id)}>
                Удалить
              </button>
            </div>
          ) : (
            <div className={style.btn}>Начать опросник</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
