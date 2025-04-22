// import style from "./TakeSurvey.module.css";
import glob_style from "../Dashboard.page/Dashboard.page.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  id: number;
  text: string;
}

interface Survey {
  title: string;
  description: string;
  questions: Question[];
}

export default function TakeSurvey() {
  const { id } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Нет токена, доступ запрещён");
      return;
    }
    axios
      .get(`http://localhost:8080/api/v1/surveys/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSurvey(res.data))
      .catch((err) => console.error("Ошибка при получении опросника:", err));
  }, [id]);
  console.log(survey);
  if (!survey) return <p>Загрузка...</p>;
  return (
    <div>
      <div className={glob_style.container}>
        <h2>Тема опросника: {survey.title}</h2>
        <p>{survey.description}</p>
        {survey.questions.map((q: Question, index: number) => (
          <div key={q.id}>
            <p>
              Вопрос {index + 1}: {q.text}
            </p>
          </div>
        ))}

        {/* <div>{survey.}</div> */}
      </div>
    </div>
  );
}
