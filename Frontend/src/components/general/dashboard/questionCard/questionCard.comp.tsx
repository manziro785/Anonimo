import style from "./questionCard.module.css";

interface DashboardProps {
  title: string;
  info: string;
  date: string;
  size: number;
  company_name: string;
}

const QuestionCard: React.FC<DashboardProps> = ({
  info,
  date,
  size,
  title,
  company_name,
}) => {
  return (
    <div>
      <div className={style.card}>
        <div className={style.left}>
          <div className={style.company_name}>{company_name}</div>
          <div className={style.title}>Тема опросника: {title}</div>
          <div className={style.info}>{info}</div>
        </div>
        <div className={style.right}>
          <div>
            <div className={style.date}>Опросник создан {date}</div>
            <div className={style.size}>{size} вопросов</div>
          </div>
          <div className={style.btn}>Начать опросник</div>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
