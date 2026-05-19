import React from 'react'
import { useState } from 'react';
import Step1SetUp from '../components/Step1SetUp';
import Step2Interviw from '../components/Step2Interviw';
import Step3Report from '../components/Step3Report';


function InterviewPage() {

const [step, setStep] = useState(1);
const [ interviewData, setInterviewData] = useState(null);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>


        {step === 1 && (
            <Step1SetUp 
            onStart={(data)=>{
                setInterviewData(data);
                setStep(2)
            }}/>)}

           {step === 2 && (
   <Step2Interviw
      interviewData={interviewData}

      onFinish={(report)=>{
         setInterviewData(report);
         setStep(3)
      }}
   />
)}
                {step === 3 && (
                    <Step3Report report={interviewData}/>)}

    </div>
  )
}

export default InterviewPage
