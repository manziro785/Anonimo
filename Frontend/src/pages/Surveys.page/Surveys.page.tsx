import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Surveys.module.css";

export default function SurveyPage() {
  let { name } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});

  const mockSurveys = [
    {
      name: "chat1",
      title: "Опрос по разработке",
      questions: [
        {
          id: "q1",
          type: "radio",
          text: "Каким фреймворком вы пользуетесь?",
          options: ["React", "Vue", "Angular"],
        },
        {
          id: "q2",
          type: "text",
          text: "Напишите ваш любимый язык программирования",
        },
      ],
    },
    {
      name: "chat2",
      title: "Опрос по фильмам",
      questions: [
        {
          id: "q1",
          type: "radio",
          text: "Какой ваш любимый жанр?",
          options: ["Боевик", "Комедия", "Драма"],
        },
        {
          id: "q2",
          type: "text",
          text: "Какой фильм последний раз смотрели?",
        },
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const foundSurvey = mockSurveys.find((s) => s.name === name);
      if (foundSurvey) {
        setSurvey(foundSurvey);
      } else {
        setError("Опросник не найден");
      }
      setLoading(false);
    }, 1000);
  }, [name]);

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("Ответы пользователя:", responses);
    alert("Спасибо за участие в опросе!");
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!survey) return <div>Опросник не найден</div>;

  return (
    <div className={style.container}>
      <h1>{survey.title}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {survey.questions.map((q) => (
          <div key={q.id}>
            <p>{q.text}</p>
            {q.type === "radio" ? (
              q.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={responses[q.id] === option}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  />
                  {option}
                </label>
              ))
            ) : (
              <input
                type="text"
                value={responses[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
          </div>
        ))}
        <button onClick={handleSubmit}>Отправить</button>
      </form>
    </div>
  );
}
