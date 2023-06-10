import styles from "./Start.module.css";
import img_start from "../../assets/img/start.jpg";
function Start({ handleStartQuiz }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.img_start}>
          <img src={img_start} alt="" />
        </div>
        <button
          onClick={() => {
            handleStartQuiz();
          }}
          className={styles.start_btn}
        >
          Start Quiz!
        </button>
      </div>
    </div>
  );
}
export default Start;
