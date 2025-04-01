import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Dashboard.page/Dashboard.page.module.css";
import axios from "axios";
import {
  Button,
  TextInput,
  Textarea,
  Select,
  Text,
  Group,
  Checkbox,
} from "@mantine/core";
import { UserContext } from "../../App";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<any[]>([]); // Массив вопросов
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

  // Добавить новый вопрос
  const handleAddQuestion = () => {
    const newQuestion = {
      type: "TEXT", // По умолчанию текстовый вопрос
      text: "",
      choices: [], // Для Multiple Choice будут варианты ответов
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTypeChange = (index: number, type: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (
    index: number,
    choiceIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push("");
    setQuestions(updatedQuestions);
  };

  const handleSaveSurvey = () => {
    if (!user.id) {
      console.error("Ошибка: пользователь не найден");
      return;
    }

    const surveyData = {
      title,
      description,
      createdBy: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        enabled: user.enabled,
      },
      questions: questions.map((q, index) => ({
        id: 0, // Или убери, если сервер сам проставляет
        text: q.text,
        type: q.type,
        survey: null, // Если сервер ожидает null
        answers: [], // Или передавать null
      })),
      createdAt: new Date().toISOString(),
    };

    console.log("Отправка опросника", surveyData);
    console.log("Отправляемый JSON:", JSON.stringify(surveyData, null, 2));

    console.log("Токен:", localStorage.getItem("access_token"));

    axios
      .post("http://localhost:8080/api/v1/surveys/", surveyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log("Опросник сохранен:", response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Ошибка при сохранении опросника:", error);
      });
  };

  return (
    <div>
      <div className={style.container}>
        <h1>Создание нового опросника</h1>
        <TextInput
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h3>Вопросы:</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <TextInput
              label={`Вопрос ${index + 1}`}
              value={question.text}
              onChange={(e) => handleQuestionTextChange(index, e.target.value)}
            />

            {/* Выбор типа вопроса */}
            <Select
              label="Тип вопроса"
              value={question.type}
              onChange={(value) => handleQuestionTypeChange(index, value!)}
              data={[
                { value: "TEXT", label: "Текст" },
                { value: "MULTIPLE_CHOICE", label: "Множественный выбор" },
              ]}
            />

            {/* Для вопросов типа Multiple Choice */}
            {question.type === "MULTIPLE_CHOICE" && (
              <div>
                <h4>Варианты ответов:</h4>
                {question.choices.map((choice, choiceIndex) => (
                  <Group key={choiceIndex}>
                    <TextInput
                      value={choice}
                      onChange={(e) =>
                        handleChoiceChange(index, choiceIndex, e.target.value)
                      }
                      label={`Вариант ${choiceIndex + 1}`}
                    />
                  </Group>
                ))}
                <Button onClick={() => handleAddChoice(index)}>
                  Добавить вариант
                </Button>
              </div>
            )}
          </div>
        ))}

        <Button onClick={handleAddQuestion}>Добавить вопрос</Button>
        <Button onClick={handleSaveSurvey}>Сохранить</Button>
      </div>
    </div>
  );
};

export default CreateSurvey;
