import style from "./Settings.module.css";
import icon from "../../assets/common/AnonimoIcon.svg";
import img_icon from "../../assets/sidebar/img_icon.svg";

export default function Settings() {
  const company_name = "KarakolStroy.kg";
  return (
    <div>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.logo_icon}>
            <img src={icon} alt="" />
          </div>
          <div className={style.info}>
            <div className={style.nickname}>Magamed 001</div>
            <div className={style.company_name}>
              <img src={img_icon} alt="" />
              {company_name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
