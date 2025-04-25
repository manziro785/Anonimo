import glob_style from "../Dashboard.page/Dashboard.page.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../CreateSurvey.page/CreateSurvey.module.css";
import style_take_surv from "./TakeSurvey.module.css";

interface Question {
  id: number;
  text: string;
  type: string; // type добавляем для отображения разных типов полей
  answers?: string[]; // Для вопросов с несколькими вариантами
}

interface Survey {
  title: string;
  description: string;
  questions: Question[];
}

interface Answer {
  question_id: number;
  content: string;
}

export default function TakeSurvey() {
  const { id } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

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

  const handleAnswerChange = (questionId: number, content: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.question_id !== questionId
      );
      updatedAnswers.push({ question_id: questionId, content });
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Нет токена для отправки ответов");
      return;
    }

    axios
      .post(
        "http://localhost:8080/api/v1/surveys", // примерный эндпоинт для отправки
        {
          title: survey?.title,
          survey_id: survey?.id,
          answeredBy: {
            username: "username", // заменить на имя пользователя
          },
          answers: answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Ответы отправлены:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке ответов:", error);
      });
  };

  if (!survey) return <p>Загрузка...</p>;

  return (
    <div>
      <div className={glob_style.container}>
        <div id={style.container} style={{ marginBottom: "2rem" }}>
          <div className={style_take_surv.wrapper_head}>
            <h2 className={style_take_surv.title}>
              <strong>Тема опросника: </strong> {survey.title}
            </h2>
            <p className={style_take_surv.description}>
              <strong>Описание:</strong> {survey.description}
            </p>
          </div>

          <div className={style_take_surv.questions_container}>
            {survey.questions.map((q: Question, index) => (
              <div
                key={q.id}
                className={style.question_box}
                style={{ padding: "2rem 2rem" }}
              >
                <div className={style_take_surv.question_up_side}>
                  <p className={style_take_surv.title_input}>
                    <span>
                      Вопрос {index + 1} / {survey.questions.length}
                    </span>
                  </p>

                  <p className={style_take_surv.question}>{q.text}</p>
                </div>

                {q.type === "TEXT" ? (
                  <input
                    type="text"
                    placeholder="Введите ответ"
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                ) : q.type === "SELECT" && q.answers ? (
                  <select
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  >
                    <option value="">Выберите вариант</option>
                    {q.answers.map((answer, index) => (
                      <option key={index} value={answer}>
                        {answer}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Тип вопроса не поддерживается</p>
                )}
              </div>
            ))}
          </div>

          <button className={style.btn_success} onClick={handleSubmit}>
            Отправить ответы
          </button>
        </div>
      </div>
    </div>
  );
}
