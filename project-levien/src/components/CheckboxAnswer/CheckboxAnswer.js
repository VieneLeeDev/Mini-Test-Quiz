import styles from "./CheckboxAnswer.module.css";
import { useState } from "react";
function CheckboxAnswer({ info, id, setSelectedValue }) {
	return (
		<div className={styles.container}>
			<input
				// id={id}
				type="radio"
				name="answer"
			/>
			<label htmlFor={id}>{info}</label>
		</div>
	);
}
export default CheckboxAnswer;
