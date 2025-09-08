import { useState } from "react";
export default function Stepper() {
const [filled , setFilled] = useState(0);
const stepperData = [
    {
        name: '1',
        label: 'Step 1',
        text: 'This is Step 1!!!'
    },
    {
        name: '2',
        label: 'Step 2',
        text: 'This is Step 2!!!'
    },
    {
        name: '3',
        label: 'Step 3',
        text: 'This is Step 3!!!'
    }
]
function handlePrevNext(type) {
    setFilled((prev) => {
        return type == 'prev' ? prev - 1 : prev + 1
    })
}
    return (
        <div className="container">
    <div className="stepperContainer">
    {stepperData.map((step,index) => {
     return (
        <>
        <div className="step">
        <span className={'stepCircle ' + (index < filled ? 'whiteBackground' : '')}>{step.name}</span>
        <span className="stepLabel">{step.label}</span>
        </div>
        { index < stepperData.length - 1 && <div style={{width: '15rem',display:'flex'}}>
            <span className={'stepperLine ' + (index < filled ? 'whiteBackground' : '')}></span>
        </div>}
       </>
     ) 
    })
}
</div>
{stepperData[filled] && <div style={{display:'flex',justifyContent:'center'}}>{stepperData[filled].text}</div>}
{ filled > 2 && <div style={{display:'flex',justifyContent:'center'}}>Data Submitted Successfully</div>}

{ filled < 3 && <div className="buttonContainer">
<button onClick={() => handlePrevNext('prev')} disabled={filled == 0}>Previous</button>
<button onClick={() => handlePrevNext('next')} disabled={filled == 3}>{filled === 2 ? 'Finish' : 'Next'}</button>
</div>}
    </div>
    )
}