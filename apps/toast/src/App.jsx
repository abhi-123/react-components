import { useState } from "react";
import "./App.css";
import Toast from "./components/Toast/Toast";
function App() {

  let timer = null;
   const [toastData,setToastData] = useState([]);
  function handleToastClick(type) {
    console.log(type);
    const Id = Date.now();
   setToastData((prevState) => {

    const newState = [...prevState];
    newState.unshift({
          type: type,
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
          message: `This is a ${type} toast message.`,
          id : Id,
        })
      return newState;
   })
     timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      setToastData((prevState) => {
        const newState = [...prevState];
        const index = newState.findIndex((toast) => toast.id === Id);
        if(index !== -1) {
          newState.splice(index,1);
        }
        return newState;
      });
    }, 3000);
  }
  function handleCloseToast(index) {
     setToastData((prevState) => {
  const newToastData = [...prevState];
       newToastData.splice(index,1);
       return newToastData
     })

  }
  return (
    <div className="ToastContainerScreen">
      <div className="ButtonContainer">
        <button

          onClick={() => handleToastClick("success")}
        >Success</button>
        <button

          onClick={() => handleToastClick("error")}
        >Error</button>
        <button

          onClick={() => handleToastClick("info")}
        >Info</button>
        <button

          onClick={() => handleToastClick("warning")}
        >Warning</button>
      </div>
      <div className="ToastContainer">
        <Toast toastData={toastData} handleCloseToast={handleCloseToast}/>
      </div>
    </div>
  );
}
export default App;
