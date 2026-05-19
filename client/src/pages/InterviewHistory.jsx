import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Trophy,
  Brain,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import { motion } from "framer-motion";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          serverURL + "/api/interview/get-interview",
          {
            withCredentials: true,
          }
        );

        setInterviews(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMyInterviews();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 8) {
      return "text-green-600 bg-green-100";
    }

    if (score >= 5) {
      return "text-yellow-600 bg-yellow-100";
    }

    return "text-red-500 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-[#edf5f1] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Interview History
            </h1>

            <p className="text-gray-500 mt-1">
              Track your AI interview performance and detailed reports
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : interviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-14 shadow-lg text-center">
            <Brain className="mx-auto w-16 h-16 text-green-500 mb-5" />

            <h2 className="text-2xl font-bold text-gray-800">
              No Interviews Found
            </h2>

            <p className="text-gray-500 mt-3">
              Start your first AI interview and track your performance here.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="mt-8 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Total Interviews
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-gray-800">
                      {interviews.length}
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Brain className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Completed
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-gray-800">
                      {
                        interviews.filter(
                          (i) => i.status === "completed"
                        ).length
                      }
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <CheckCircle2 className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Best Score
                    </p>

                    <h2 className="text-4xl font-bold mt-2 text-gray-800">
                      {Math.max(
                        ...interviews.map(
                          (i) => i.finalScore || 0
                        ),
                        0
                      )}
                      /10
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <Trophy className="text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* INTERVIEW LIST */}
            <div className="space-y-6">
              {interviews.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  key={index}
                  onClick={() =>
                    navigate(`/report/${item._id}`)
                  }
                  className="bg-white rounded-3xl p-7 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* LEFT */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-gray-800">
                          {item.role}
                        </h2>

                        <span
                          className={`px-4 py-1 rounded-full text-xs font-semibold ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="text-gray-500 mt-3">
                        {item.experience} • {item.mode}
                      </p>

                      <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
                        <CalendarDays className="w-4 h-4" />

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div
                          className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold ${getScoreColor(
                            item.finalScore
                          )}`}
                        >
                          {item.finalScore || 0}
                          /10
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          Overall Score
                        </p>
                      </div>

                      <ChevronRight className="text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InterviewHistory;