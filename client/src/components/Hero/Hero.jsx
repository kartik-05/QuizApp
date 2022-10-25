import React from "react";
import "./Hero.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const FormButtonStyles = {
  backgroundColor: "#4169E1",
  textTransform: "none",
  fontSize: "0.9rem",
};

const NextButtonStyles = {
  backgroundColor: "rgba(0,0,0,0.8)",
  textTransform: "none",
  fontSize: "0.8rem",
};

const PrevButtonStyles = {
  border: "1px solid rgba(0,0,0,0.8)",
  textTransform: "none",
  color: "rgba(0,0,0,0.8)",
  fontWeight: "bold",
  fontSize: "0.8rem",
};

function Hero({ data, setScore }) {
  const [userAns, setUserAns] = useState(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(data?.length).fill(null));
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    setUserAns(e.target.value);
  };

  const handleNext = () => {
    setUserAns(null);
    setIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    setUserAns(null);
    setIdx((prev) => prev - 1);
  };

  const HandleOnSubmit = () => {
    if (userAns !== null) {
      if (userAns === data[idx].correct_answer) {
        setScore((prev) => prev + 5);
      } else {
        setScore((prev) => prev - 1);
      }
      const Arr = [...answers];
      Arr[idx] = userAns;
      setAnswers(Arr);
      setUserAns(null);
    }
  };

  const shuffle = (myArray) => {
    var newArray = [];
    const len = myArray.length;
    for (let i = 0; i < len; i++) {
      let index = Math.floor(Math.random() * myArray.length);
      newArray.push(myArray[index]);
      myArray.splice(index, 1);
    }
    return newArray;
  };

  useEffect(() => {
    const Arr = data?.map((obj) => {
      const optionArr = [...obj.incorrect_answers, obj.correct_answer];
      const newOptArr = shuffle(optionArr);
      return {
        question: obj.question,
        options: newOptArr,
      };
    });

    setQuestions(Arr);
  }, [data]);

  return (
    <section className="hero-container">
      <div className="hero-items">
        <div className="notice-container">
          # Correct answer carry +5 marks and wrong answer carry -1 mark.
        </div>
        {questions.length === 0 ? (
          <CircularProgress />
        ) : (
          <form
            className={
              answers[idx] !== null
                ? "question-container fade"
                : "question-container"
            }
          >
            <div className="question">
              <span>Q{idx + 1}</span> &nbsp;
              <div> {questions[idx]?.question}</div>
            </div>
            <div className="options">
              <RadioGroup
                value={answers[idx] === null ? userAns : answers[idx]}
                onChange={handleChange}
              >
                {questions[idx]?.options?.map((opt, optIdx) => (
                  <FormControlLabel
                    value={opt}
                    control={<Radio size="small" />}
                    label={
                      <div className="options-label">
                        {opt} &nbsp;
                        {answers[idx] !== null && (
                          <>
                            {opt === data[idx].correct_answer ? (
                              <CheckCircleOutlineRoundedIcon
                                style={{ fontSize: "0.9rem" }}
                              />
                            ) : (
                              <CancelIcon style={{ fontSize: "0.9rem" }} />
                            )}
                          </>
                        )}
                      </div>
                    }
                    key={optIdx}
                  />
                ))}
              </RadioGroup>
            </div>
            <div className="form-button">
              <Button
                variant="contained"
                style={FormButtonStyles}
                onClick={HandleOnSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="hero-footer">
        <Button
          variant="outlined"
          style={PrevButtonStyles}
          size="small"
          onClick={handlePrev}
          className={idx === 0 ? "fade" : ""}
        >
          &lt; Previous
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button
          variant="contained"
          style={NextButtonStyles}
          size="small"
          onClick={handleNext}
          className={
            idx === data.length - 1 || answers[idx] === null ? "fade" : ""
          }
        >
          Next &gt;
        </Button>
      </div>
    </section>
  );
}

export default Hero;
