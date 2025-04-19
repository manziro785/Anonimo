import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import style from "../Dashboard.page/Dashboard.page.module.css";
import style_survey from "./CreateSurvey.module.css";
import img_icon from "../../assets/common/icon (3).svg";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

  const handleAddQuestion = () => {
    const newQuestion = { type: "TEXT", text: "", choices: [] };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTypeChange = (index: number, type: string) => {
    const updated = [...questions];
    updated[index].type = type;
    setQuestions(updated);
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].text = text;
    setQuestions(updated);
  };

  const handleChoiceChange = (qIdx: number, cIdx: number, value: string) => {
    const updated = [...questions];
    updated[qIdx].choices[cIdx] = value;
    setQuestions(updated);
  };

  const handleAddChoice = (index: number) => {
    const updated = [...questions];
    updated[index].choices.push("");
    setQuestions(updated);
  };

  const handleSaveSurvey = () => {
    if (!user.username) return console.error("Нет пользователя");

    const surveyData = {
      title,
      description,
      createdBy: { username: user.username },
      questions: questions.map((q) => ({
        text: q.text,
        type: q.type,
        ...(q.type === "MULTIPLE_CHOICE" && {
          options: q.choices.filter((c: string) => c.trim() !== ""),
        }),
      })),
    };

    axios
      .post("http://localhost:8080/api/v1/surveys", surveyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("Ошибка:", err));
  };

  return (
    <div className={style.container}>
      <div className="survey-container" id={style_survey.container}>
        {/* <h2>Создать опрос</h2> */}
        <div>
          <h3>Тема опросника</h3>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название опросника"
          />
        </div>
        <div>
          <h3>Описание</h3>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание"
          />
        </div>

        <h2>Вопросы:</h2>
        <div className={style_survey.block}>
          {questions.map((q, i) => (
            <div className={style_survey.question_box} key={i}>
              <div>
                <label>{`Вопрос ${i + 1}`}</label>
                <input
                  className="input"
                  value={q.text}
                  onChange={(e) => handleQuestionTextChange(i, e.target.value)}
                  placeholder="Введите вопрос"
                />
              </div>
              <div>
                <label>Тип вопроса</label>
                <select
                  className={style_survey.select}
                  style={{ background: "none" }}
                  value={q.type}
                  onChange={(e) => handleQuestionTypeChange(i, e.target.value)}
                >
                  <option value="TEXT">Текст</option>
                  <option value="MULTIPLE_CHOICE">Множественный выбор</option>
                </select>
              </div>
              {q.type === "MULTIPLE_CHOICE" && (
                <div className={style_survey.choices}>
                  {/* <h4>Варианты ответов:</h4> */}
                  {q.choices.map((c: string, j: number) => (
                    <div className={style_survey.choice} key={j}>
                      <img src={img_icon} alt="" />
                      <input
                        className={style_survey.input}
                        value={c}
                        placeholder={`Вариант ${j + 1}`}
                        onChange={(e) =>
                          handleChoiceChange(i, j, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <button
                    className={style_survey.btn_secondary}
                    onClick={() => handleAddChoice(i)}
                  >
                    Добавить вариант
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={style_survey.actions}>
          <button
            className={style_survey.btn_primary}
            onClick={handleAddQuestion}
          >
            Добавить вопрос
          </button>
          <button
            className={style_survey.btn_success}
            onClick={handleSaveSurvey}
          >
            Сохранить опрос
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;
