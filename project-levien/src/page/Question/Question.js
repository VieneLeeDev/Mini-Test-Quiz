import { useState, useEffect } from "react";
import styles from "./Question.module.css";
import CheckboxAnswer from "../../components/CheckboxAnswer/CheckboxAnswer";
import Start from "../Start/Start";
import axios from "axios";
import Result from "../Result/Result";
function Question() {
  const [data, setData] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(1);
  const [startPage, setStartPage] = useState(true);
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuesTion] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedValue, setSelectedValue] = useState("nothing");
  const [isCouting, setIsCouting] = useState(false);
  const [time, setTime] = useState(0);

  const handleStartQuiz = () => {
    setStartPage(false);
    setShowQuesTion(true);
    setIsCouting(true);
  };

  const handleNextbtn = (item_corect) => {
    if (item_corect === selectedValue) {
      setScore((score) => score + 1);
    }
    if (indexQuestion < data.length) {
      setIndexQuestion(indexQuestion + 1);
    }
  };
  const handleSubmit = () => {
    setShowQuesTion(false);
    setShowResult(true);
    setIsCouting(false);
  };
  const handlePlayAgainbtn = () => {
    setSelectedValue("nothing");
    setIndexQuestion(1);
    setShowResult(false);
    setStartPage(true);
    setIsCouting(false);
    setScore(0);
    setTime(0);
  };
  //call api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://opentdb.com/api.php?amount=10");
        setData(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      if (isCouting) {
        setTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isCouting]);
  return (
    <div className={styles.wrapper}>
      {startPage && <Start handleStartQuiz={handleStartQuiz} />}
      {showQuestion && (
        <div>
          <div className={styles.box_count}>
            <span
              className={styles.main_count}
            >{`Question ${indexQuestion}`}</span>
            <span>{`/${data.length}`}</span>
          </div>
          {data.map((item, index) =>
            index === indexQuestion - 1 ? (
              <p key={index} className={styles.main_question}>
                {item.question}
              </p>
            ) : null
          )}
          <div className={styles.main_answer}>
            {data.map((item, index) => {
              if (index === indexQuestion - 1) {
                return (
                  <div key={index}>
                    <CheckboxAnswer
                      key={index}
                      info={item.correct_answer}
                      id={index}
                      setSelectedValue={setSelectedValue}
                    />
                    {item.incorrect_answers.map((answer, index) => {
                      return (
                        <CheckboxAnswer
                          key={index}
                          info={answer}
                          id={index}
                          setSelectedValue={setSelectedValue}
                        />
                      );
                    })}
                    <div className={styles.btn_next}>
                      {indexQuestion === data.length ? (
                        <button
                          onClick={handleSubmit()}
                          className={styles.main_btn}
                        >
                          {" "}
                          Submit{" "}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNextbtn(item.correct_answer)}
                          className={styles.main_btn}
                        >
                          {" "}
                          Next{" "}
                        </button>
                      )}
                    </div>
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>
      )}
      {showResult && (
        <Result
          score={score}
          time={time}
          handlePlayAgainbtn={handlePlayAgainbtn}
        />
      )}
    </div>
  );
}
export default Question;
