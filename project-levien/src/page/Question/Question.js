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
	const [showResult, setShowResult] = useState(false);
	const [isCouting, setIsCouting] = useState(false);
	const [time, setTime] = useState(0);

	const handleStartQuiz = () => {
		setStartPage(false);
		setIsCouting(true);
	};

	const fetchData = async () => {
		try {
			const res = await axios.get("https://opentdb.com/api.php?amount=10");
			setData(res.data.results);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		await fetchData()
		setStartPage(true)
		setIndexQuestion(1)
	};

	useEffect(() => {
		fetchData();
	}, []);


	const parseString = (text) => {
		const parser = new DOMParser();
		const decoded = parser.parseFromString(text, "text/html").body.textContent;
		return decoded;
	}

	const renderAnswerList = () => {
		if (data[indexQuestion - 1]) {
			const listAnswer = [...data[indexQuestion - 1].incorrect_answers, data[indexQuestion - 1].correct_answer]
			return <>
				{listAnswer.map((answer, index) => {
					return <div key={index}><CheckboxAnswer info={parseString(answer)} /></div>
				})}
			</>
		}

	}

	const renderNextBtn = () => {
		return <div className={styles.btn_next}>
			{indexQuestion === data.length ? (
				<button
					className={styles.main_btn}
					onClick={handleSubmit}
				>
					{" "}
					Submit{" "}
				</button>
			) : (
				<button
					className={styles.main_btn}
					onClick={() => setIndexQuestion(prev => prev + 1)}
				>
					{" "}
					Next{" "}
				</button>
			)}
		</div>
	}


	return (
		<div className={styles.wrapper}>
			{startPage ? <Start handleStartQuiz={handleStartQuiz} /> : <div>
				<div className={styles.box_count}>
					<span
						className={styles.main_count}
					>{`Question ${indexQuestion}`}</span>
					<span>{`/${data.length}`}</span>
				</div>
				<div className={styles.main_question}>
					{parseString(data[indexQuestion - 1]?.question)}
				</div>
				<div className={styles.main_answer}>
					{renderAnswerList()}
					{renderNextBtn()}
				</div>
			</div>}
			{/* {showResult && (
				<Result
					score={score}
					time={time}
					handlePlayAgainbtn={handlePlayAgainbtn}
				/>
			)} */}
		</div >
	);
}
export default Question;
