import { useNavigate } from "react-router-dom";
import QuestionCard from "../../components/general/dashboard/questionCard/questionCard.comp";
import style from "./Dashboard.page.module.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const surveys = [
    {
      id: "survey1",
      title: "Опрос по разработке",
      info: "Расскажите, какие технологии вам нравятся.",
      date: "15.03.25",
      size: 10,
      company_name: "SkillNet.kg",
    },
    {
      id: "survey2",
      title: "Опрос по фильмам",
      info: "Поделитесь любимыми фильмами и жанрами!",
      date: "16.03.25",
      size: 8,
      company_name: "Anonimo",
    },
  ];

  const handleSurveyClick = (surveyId) => {
    navigate(`/survey/${surveyId}`);
  };

  return (
    <div className={style.container}>
      {surveys.map((survey) => (
        <div key={survey.id} onClick={() => handleSurveyClick(survey.id)}>
          <QuestionCard
            title={survey.title}
            info={survey.info}
            size={survey.size}
            company_name={survey.company_name}
            date={survey.date}
          />
        </div>
      ))}
    </div>
  );
}
