import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Timer from "./Timer";
import femaleAi from "../assets/Videos/female-ai.mp4";
import maleAi from "../assets/Videos/male-ai.mp4";
import axios from "axios";

import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaRobot,
} from "react-icons/fa";

import {
  HiSparkles,
} from "react-icons/hi";

function Step2Interviw({
  interviewData,
  onFinish,
}) {


  const [aiFeedback, setAiFeedback] =
  useState("");

const [isSubmitting, setIsSubmitting] =
  useState(false);

  const {
    interviewId,
    questions,
    userName,
  } = interviewData;

  const [currentQuestionIndex,
    setCurrentQuestionIndex] =
    useState(0);

  const [answer,
    setAnswer] =
    useState("");

  const [timeLeft,
    setTimeLeft] =
    useState(
      questions?.[0]?.timeLimit || 60
    );

  const [isSpeaking,
    setIsSpeaking] =
    useState(true);

    const [
  isInterviewStarted,
  setIsInterviewStarted
] = useState(false);

  const currentQuestion =
    questions[currentQuestionIndex];


  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  const transcriptRef = useRef("");


const speakText = (text) => {

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  const voices =
    speechSynthesis.getVoices();

  const femaleVoice =
    voices.find((voice) =>
      voice.name.includes("Female")
    );

  utterance.voice =
    femaleVoice || voices[0];

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  utterance.onstart = () => {
    setIsSpeaking(true);
  };

  utterance.onend = () => {
    setIsSpeaking(false);
  };

  speechSynthesis.speak(
    utterance
  );
};

useEffect(() => {

  const loadVoices = () => {

    const welcomeMessage = `
      Welcome ${userName}.

      Welcome to your AI interview session.

      Let's start the interview.
    `;

    const utterance =
      new SpeechSynthesisUtterance(
        welcomeMessage
      );

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {

      setIsSpeaking(false);

      setTimeout(() => {

        setIsInterviewStarted(true);

      }, 1000);
    };

    speechSynthesis.speak(
      utterance
    );
  };

  speechSynthesis.onvoiceschanged =
    loadVoices;

  loadVoices();

}, []);

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onresult = (event) => {

  let currentTranscript = "";

  for (
    let i = event.resultIndex;
    i < event.results.length;
    i++
  ) {

    currentTranscript +=
      event.results[i][0].transcript;

  }

  const finalTranscript =
    transcriptRef.current +
    " " +
    currentTranscript;

  setAnswer(finalTranscript);
};

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

  }, []);



  const startListening = () => {

    if (isSpeaking) return;

    if (recognitionRef.current) {

      recognitionRef.current.start();

      setIsListening(true);
    }
  };

 const stopListening = () => {

  if (recognitionRef.current) {

    recognitionRef.current.stop();

    transcriptRef.current = answer;

    setIsListening(false);
  }
};
  // ================= TIMER =================
useEffect(() => {

  if (!isInterviewStarted) return;

  if (isSpeaking) return;

  if (timeLeft <= 0) {

    handleNextQuestion();

    return;
  }

  const interval =
    setInterval(() => {
setTimeLeft((prev) =>
  prev > 0 ? prev - 1 : 0
);

    }, 1000);

  return () =>
    clearInterval(interval);

}, [
  timeLeft,
  isSpeaking,
  isInterviewStarted
]);

  // ================= SPEAK QUESTION =================

useEffect(() => {

  if (!isInterviewStarted)
    return;

  if (!currentQuestion)
    return;

  speechSynthesis.cancel();

  const questionText = `
    Question
    ${currentQuestionIndex + 1}.

    ${currentQuestion.question}
  `;

  const utterance =
    new SpeechSynthesisUtterance(
      questionText
    );

  utterance.onstart = () => {
    setIsSpeaking(true);
  };

  utterance.onend = () => {
    setIsSpeaking(false);
  };

  speechSynthesis.speak(
    utterance
  );

}, [
  currentQuestionIndex,
  isInterviewStarted
]);


const submitAnswer = async () => {

  speechSynthesis.cancel();

  if (isSubmitting) return;

  stopListening();

  setIsSubmitting(true);

  try {

    const result =
      await axios.post(

        "http://localhost:8000/api/interview/submit-answer",

        {
          interviewId,

          questionIndex:
            currentQuestionIndex,

          answer,

          timeTaken:
            currentQuestion.timeLimit -
            timeLeft,
        },

        {
          withCredentials: true,
        }
      );

    console.log(result.data);

    const feedback =
      result.data.feedback;

    setAiFeedback(feedback);

    // AI FEEDBACK SPEAK

    const utterance =
      new SpeechSynthesisUtterance(
        feedback
      );

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {

      setIsSpeaking(false);

      // 2 sec pause

      setTimeout(() => {

        handleNextQuestion();

      }, 2000);
    };

    speechSynthesis.speak(
      utterance
    );

  } catch (error) {

    console.log(error);

  } finally {

    setIsSubmitting(false);

  }
};

  // ================= NEXT QUESTION =================

  const handleNextQuestion = () => {

    if (
      currentQuestionIndex
      <
      questions.length - 1
    ) {

      const nextIndex =
        currentQuestionIndex + 1;

      setCurrentQuestionIndex(
        nextIndex
      );

      setTimeLeft(
        questions[nextIndex]
          .timeLimit
      );

      setAnswer("");

      transcriptRef.current = "";

    } else {

      speechSynthesis.cancel();

const utterance =
  new SpeechSynthesisUtterance(

    `Congratulations ${userName}.

    Your interview has been completed successfully.

    Generating your AI report now.`
  );

utterance.onstart = () => {
  setIsSpeaking(true);
};

utterance.onend = () => {

  setIsSpeaking(false);
setTimeout(async () => {

  try {

    const result =
      await axios.post(

        "http://localhost:8000/api/interview/finish",

        {
          interviewId,
        },

        {
          withCredentials: true,
        }
      );

    console.log(
      "FINAL REPORT:",
      result.data
    );

    onFinish(result.data);

  } catch (error) {

    console.log(error);
  }

}, 2000);
};

speechSynthesis.speak(
  utterance
);
    }
  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 40,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
      min-h-screen
      w-full
      bg-gradient-to-br
      from-[#eefbf5]
      via-[#f7f7f7]
      to-[#eefbf5]
      flex
      items-center
      justify-center
      p-6
    "
    >

      <div
        className="
        w-full
        max-w-7xl
        bg-white/80
        backdrop-blur-xl
        border
        border-white/40
        rounded-[35px]
        shadow-[0_20px_80px_rgba(0,0,0,0.08)]
        overflow-hidden
        grid
        md:grid-cols-[380px_1fr]
      "
      >

        {/* LEFT SIDE */}

        <div
          className="
          bg-gradient-to-b
          from-[#f3fff8]
          to-white
          p-6
          border-r
        "
        >

          {/* AI CARD */}

          <motion.div

            animate={{
              y: [0, -6, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 4,
            }}

            className="
            bg-white
            rounded-3xl
            shadow-lg
            overflow-hidden
            border
          "
          >

            <div className="relative w-full h-[240px] overflow-hidden">

              <video
                src={
                  interviewData?.mode === "HR"
                    ? femaleAi
                    : maleAi
                }
                autoPlay
                muted
                loop
                playsInline
                className="
    w-full
    h-full
    object-cover
  "
              />

              {/* DARK OVERLAY */}

              <div
                className="
    absolute
    inset-0
    bg-gradient-to-t
    from-black/30
    via-transparent
    to-transparent
  "
              />

              {/* LIVE BADGE */}

              <div
                className="
    absolute
    top-4
    right-4
    bg-white/20
    backdrop-blur-md
    border
    border-white/30
    px-4
    py-2
    rounded-full
    flex
    items-center
    gap-2
    text-white
    text-sm
    font-medium
  "
              >

                <span
                  className="
      w-2
      h-2
      rounded-full
      bg-emerald-400
      animate-pulse
    "
                />

                LIVE AI

              </div>

              {/* BOTTOM TEXT */}

              <div
                className="
    absolute
    bottom-4
    left-4
    text-white
  "
              >

                <h2
                  className="
      text-xl
      font-bold
    "
                >
                  AI Interviewer
                </h2>

                <p
                  className="
      text-sm
      text-white/80
      mt-1
    "
                >
                  Real-time Interview Session
                </p>

              </div>

            </div>

            <div className="p-5">

              <div
                className="
                flex
                items-center
                justify-between
              "
              >

                <div>

                  <h2
                    className="
                    text-xl
                    font-bold
                    text-gray-800
                  "
                  >
                    AI Interviewer
                  </h2>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                  >
                    Welcome {userName}
                  </p>

                </div>

                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-emerald-100
                  flex
                  items-center
                  justify-center
                "
                >
                  <FaRobot
                    className="
                    text-emerald-600
                    text-xl
                  "
                  />
                </div>

              </div>

              {/* STATUS */}

              <div
                className="
                mt-6
                flex
                items-center
                justify-between
                text-sm
              "
              >

                <span
                  className="
                  text-gray-500
                "
                >
                  Interview Status
                </span>

                <span
                  className="
                  text-emerald-600
                  font-semibold
                  flex
                  items-center
                  gap-2
                "
                >

                  <span
                    className="
                    w-2
                    h-2
                    bg-emerald-500
                    rounded-full
                    animate-pulse
                  "
                  />

                  {isSpeaking
                    ? "AI Speaking"
                    : "Listening"}

                </span>

              </div>

              {/* TIMER */}

              <div
                className="
                flex
                justify-center
                mt-8
              "
              >
                <Timer
                  timeLeft={timeLeft}
                  totalTime={
                    currentQuestion
                      ?.timeLimit || 60
                  }
                />
              </div>

              {/* STATS */}

              <div
                className="
                mt-8
                grid
                grid-cols-2
                gap-4
              "
              >

                <div
                  className="
                  bg-gray-50
                  rounded-2xl
                  p-4
                  text-center
                "
                >

                  <h3
                    className="
                    text-2xl
                    font-bold
                    text-emerald-600
                  "
                  >
                    {currentQuestionIndex + 1}
                  </h3>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                  >
                    Current
                  </p>

                </div>

                <div
                  className="
                  bg-gray-50
                  rounded-2xl
                  p-4
                  text-center
                "
                >

                  <h3
                    className="
                    text-2xl
                    font-bold
                    text-emerald-600
                  "
                  >
                    {questions.length}
                  </h3>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                  >
                    Questions
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8">

          {/* HEADER */}

          <div
            className="
            flex
            items-center
            gap-3
            mb-8
          "
          >

            <div
              className="
              w-12
              h-12
              rounded-2xl
              bg-emerald-100
              flex
              items-center
              justify-center
            "
            >
              <HiSparkles
                className="
                text-emerald-600
                text-2xl
              "
              />
            </div>

            <div>

              <h1
                className="
                text-3xl
                font-bold
                text-gray-800
              "
              >
                AI Smart Interview
              </h1>

              <p
                className="
                text-gray-500
                mt-1
              "
              >
                Real-time AI powered
                interview session
              </p>

            </div>

          </div>

          {/* QUESTION CARD */}

          <motion.div

            key={currentQuestionIndex}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
            bg-gray-50
            border
            rounded-3xl
            p-6
          "
          >

            <p
              className="
              text-sm
              text-gray-400
            "
            >
              Question
              {" "}
              {currentQuestionIndex + 1}
              {" "}
              of
              {" "}
              {questions.length}
            </p>

            <h2
              className="
              text-2xl
              font-semibold
              text-gray-800
              mt-3
              leading-relaxed
            "
            >
              {
                currentQuestion?.question
              }
            </h2>

            <div
              className="
              mt-5
              inline-flex
              px-4
              py-2
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
              font-medium
            "
            >
              {
                currentQuestion
                  ?.difficulty
              }
            </div>

          </motion.div>

          {/* ANSWER BOX */}

          <div className="mt-6">

            <textarea

              value={answer}

              onChange={(e) => setAnswer(e.target.value)}

              placeholder="
              Type your answer here...
            "

              className="
              w-full
              h-[280px]
              bg-white
              border
              rounded-3xl
              p-6
              outline-none
              resize-none
              text-gray-700
              text-lg
              shadow-sm
              focus:ring-4
              focus:ring-emerald-100
            "
            />

          </div>

          {/* BUTTONS */}

          <div
            className="
            mt-6
            flex
            items-center
            gap-4
          "
          >

            {/* MIC */}

          <motion.button

  whileTap={{
    scale: 0.9,
  }}

  onClick={
    isListening
      ? stopListening
      : startListening
  }

  className={`
    w-16
    h-16
    rounded-2xl
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    transition-all
    duration-300

    ${
     isListening
 ? "bg-red-500"
 : "bg-black"
    }                                 
  `}
>

  {
    isListening
      ? (
        <FaMicrophone
          className="text-xl"
        />
      )                      
      : (
        < FaMicrophoneSlash
          className="text-xl"
        />
      )
  }

</motion.button>

            {/* SUBMIT */}

          <motion.button

  disabled={isSubmitting}

  whileHover={{
    scale: 1.01,
  }}

  whileTap={{
    scale: 0.98,
  }}

  onClick={submitAnswer}

  className={`
    flex-1
    h-16
    rounded-2xl
    bg-gradient-to-r
    from-emerald-500
    to-emerald-600
    text-white
    font-semibold
    text-lg
    shadow-lg
    transition-all

    ${
      isSubmitting
        ? "opacity-50"
        : ""
    }
  `}
>
  {
    isSubmitting
      ? "Submitting..."
      : "Submit Answer"
  }
</motion.button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default Step2Interviw;