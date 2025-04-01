import React, { useEffect, useState } from "react";
import style from "./Dashboard.page.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [surveys, setSurveys] = useState<any[]>([]); // Начальное состояние — пустой массив
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    // Логика для получения роли пользователя
    const role = "ADMIN"; // Это пример, можно получить роль пользователя через auth-систему
    setUserRole(role);

    // Получение списка опросников с бэка
    axios
      .get("/api/v1/surveys")
      .then((response) => {
        // Убедимся, что данные в response.data это массив
        if (Array.isArray(response.data)) {
          setSurveys(response.data);
        } else {
          console.error("Данные не в формате массива", response.data);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке опросников:", error);
      });
  }, []);

  return (
    <div>
      <div className={style.container}>
        <h1>Все опросники</h1>
        <div>
          {Array.isArray(surveys) && surveys.length > 0 ? (
            surveys.map((survey) => (
              <div key={survey.id}>
                <h3>{survey.title}</h3>
                <p>{survey.description}</p>
                {/* Ссылка на редактирование опросника */}
                <a href={`/survey/${survey.id}`}>Редактировать</a>
              </div>
            ))
          ) : (
            <p>Нет доступных опросников</p>
          )}
        </div>

        {userRole === "MANAGER" || userRole === "ADMIN" ? (
          <NavLink to="/create_survey">Создать новый опросник</NavLink>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
