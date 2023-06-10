import styles from "./Result.module.css";
import img_completed from "../../assets/img/completed.jpg";
function Result({ score, time, handlePlayAgainbtn }) {
  const img_res = img_completed;
  const Message = score >= 5 ? "congratulations!!" : "Completed!";
  const motivation =
    score >= 5 ? "you are amazing!!" : "better luck next time!";
  return (
    <div className={styles.container_result}>
      <div className={styles.box_img_result}>
        <img src={img_res} alt="" />
      </div>
      <div className={styles.main_message}>
        <span className={styles.title}>{`${Message}`}</span>
        <br />
        <span className={styles.feeling_message}>{`${motivation}`}</span>
        <br />
        <span>{`${score}/10 corect answers in ${time}s`}</span>
      </div>
      <button
        onClick={() => handlePlayAgainbtn()}
        className={styles.btn_playagain}
      >
        Play again!
      </button>
    </div>
  );
}
export default Result;
