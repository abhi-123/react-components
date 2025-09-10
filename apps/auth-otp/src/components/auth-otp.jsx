import { useState, useRef, useEffect } from "react";

function AuthOtp() {
  const [inputArr, setInputArr] = useState(new Array(6).fill(""));
  const inputRef = useRef(null);
  let timer = useRef(null);

  useEffect(() => {
    inputRef[0] ? inputRef[0].focus() : null;
  }, []);

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return;
    inputRef[index + 1] && e.target.value ? inputRef[index + 1].focus() : null;
    if (e.target.value.length > 1) return;
    setInputArr((prev) => {
      const newState = [...prev];
      newState[index] = e.target.value;
      return newState;
    });
  }
  function handleKeyDown(e, index) {
    timer.current = setTimeout(() => {
      if (e.key === "Backspace") {
        inputRef[index - 1] ? inputRef[index - 1].focus() : null;
      }
    }, 0);
  }
  function handleKeyUp(e, index) {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      return;
    }
    if (e.key === "Backspace") {
      inputRef[index - 1] ? inputRef[index - 1].focus() : null;
    }
  }
  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center", marginBottom: "50px" }}>
        OTP Authentication Input
      </h1>
      <div className="authContainer">
        {inputArr.map((input, index) => {
          return (
            <input
              key={index}
              name={`auth-input-${index}`}
              ref={(el) => (inputRef[index] = el)}
              className="auth-input"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              value={input}
            />
          );
        })}
      </div>
    </>
  );
}

export default AuthOtp;
