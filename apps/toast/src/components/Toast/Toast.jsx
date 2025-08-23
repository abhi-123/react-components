export default function Toast({ toastData,handleCloseToast }) {

   
  return (
    toastData.map((data,index) => (
        <div key={index} className={`Toast ${data.type}`}>
            <div className="ToastMessage">
                <h4>{data.title}</h4>
                <p>{data.message}</p>
            </div>
            <button className="ToastClose" onClick={() => handleCloseToast(index)}>X
            </button>
        </div>
    ))
  )
}