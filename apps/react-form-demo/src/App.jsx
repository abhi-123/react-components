import { useState, useRef } from "react";
import "./App.css";

function App() {
  const formref = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, ...{ [name]: value } };
    });
  }
  function handleSubmit(e) {
   e.preventDefault();
   const formData = new FormData(formref.current);
   const resume = formData.get('resume');
   console.log(resume);

   if(formData.username && formData.username.length < 5) 
    setErrors((prev) => {
      return {...prev, ...{username: 'Username must be greater than 5 characters'}}
    })
    console.log(formData);
  }
  return (
    <form onSubmit={handleSubmit} ref={formref} className="form-demo">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {errors && errors.username && (
        <p style={{ color: "red" }}>{errors.username}</p>
      )}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors && errors.password && (
        <p style={{ color: "red" }}>{errors.password}</p>
      )}
      <input type="file" name="resume" />
      <input type="submit" />
    </form>
  );
}

export default App;
