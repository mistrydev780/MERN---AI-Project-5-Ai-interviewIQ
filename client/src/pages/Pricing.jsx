import React, { useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Crown,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { serverURL } from "../App";

function Pricing() {

  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);

  // ================= DEFAULT SELECTED PLAN =================

  const [selectedPlan, setSelectedPlan] = useState({
    id: "starter",
    title: "Starter Pack",
    price: "₹100",
    amount: 100,
    credits: 150,
  });

  // ================= PLANS =================

  const plans = [
    {
      id: "free",
      title: "Free",
      price: "₹0",
      amount: 0,
      credits: 100,
      badge: "Default",
      button: "Current Plan",
      popular: false,

      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
    },

    {
      id: "starter",
      title: "Starter Pack",
      price: "₹100",
      amount: 100,
      credits: 150,
      badge: "Most Popular",
      button: "Select Plan",
      popular: true,

      features: [
        "150 AI Interview Credits",
        "Detailed AI Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },

    {
      id: "pro",
      title: "Pro Pack",
      price: "₹500",
      amount: 500,
      credits: 650,
      badge: "Best Value",
      button: "Proceed to Pay",
      popular: false,

      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
    },
  ];

  // ================= PAYMENT =================

  const handlePayment = async () => {
    try {

      // FREE PLAN BLOCK

      if (selectedPlan.amount === 0) {
        alert("Free plan already active");
        return;
      }

      setLoadingPlan(selectedPlan.id);

      // CREATE ORDER

      const result = await axios.post(
        serverURL + "/api/payment/order",

        {
          planId: selectedPlan.id,
          amount: selectedPlan.amount,
          credits: selectedPlan.credits,
        },

        {
          withCredentials: true,
        }
      );

      const order = result.data;

      console.log(order);

      // RAZORPAY SDK CHECK

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // OPTIONS

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "InterviewIQ AI",

        description: "AI Interview Credits Purchase",

        order_id: order.id,

        theme: {
          color: "#10b981",
        },

        handler: async function (response) {

          try {

            const verifyResult = await axios.post(

              serverURL + "/api/payment/verify",

              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              },

              {
                withCredentials: true,
              }
            );

            console.log(verifyResult.data);

            alert("Payment Successful 🎉");

            navigate("/");

          } catch (error) {
            console.log(error);
            alert("Payment verification failed");
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Payment failed"
      );

    } finally {

      setLoadingPlan(null);
    }
  };

  return (

    <div className="min-h-screen bg-[#f4faf7] px-6 py-12 overflow-hidden">

      {/* BG */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-200 rounded-full blur-[140px] opacity-30" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-100 rounded-full blur-[140px] opacity-30" />

      {/* MAIN */}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-12">

          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition-all"
          >
            <ArrowLeft size={20} />
          </button>

          <div>

            <h1 className="text-5xl font-black text-gray-900">
              Choose Your Plan
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Flexible pricing to match your interview preparation goals.
            </p>

          </div>
        </div>

        {/* CARDS */}

        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <motion.div

              key={index}

              onClick={() =>
                setSelectedPlan(plan)
              }

              initial={{
                opacity: 0,
                y: 50,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}

              whileHover={{
                y: -10,
              }}

              className={`

relative overflow-hidden rounded-[32px] p-8 border transition-all duration-300 cursor-pointer

${

selectedPlan.id === plan.id

? "bg-white border-emerald-500 shadow-[0_20px_60px_rgba(16,185,129,0.25)] scale-[1.03]"

: "bg-white/90 border-gray-200 shadow-xl hover:border-emerald-400 hover:shadow-[0_20px_60px_rgba(16,185,129,0.18)] hover:scale-[1.02]"

}

`}
            >

              {/* GLOW */}

              {
                selectedPlan.id === plan.id && (

                  <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-200 rounded-full blur-3xl opacity-40" />

                )}

              {/* TOP */}

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h2 className="text-3xl font-bold text-gray-900">
                    {plan.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {plan.credits} Credits
                  </p>

                </div>

                <div
                  className={`px-4 py-2 rounded-full text-sm font-semibold

                  ${
                    selectedPlan.id === plan.id
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }
                  `}
                >
                  {plan.badge}
                </div>
              </div>

              {/* PRICE */}

              <div className="mb-8">

                <div className="flex items-end gap-2">

                  <h1 className="text-6xl font-black text-emerald-500">
                    {plan.price}
                  </h1>

                  <span className="text-gray-400 mb-2">
                    one time
                  </span>

                </div>

                <p className="text-gray-500 mt-3 leading-relaxed">

                  {
                    index === 0
                      ? "Perfect for beginners starting interview preparation."

                      : index === 1
                      ? "Great for focused practice and skill improvement."

                      : "Best value for serious job preparation and premium analytics."
                  }

                </p>
              </div>

              {/* FEATURES */}

              <div className="space-y-5 mb-10">

                {plan.features.map((feature, idx) => (

                  <div
                    key={idx}
                    className="flex items-center gap-3"
                  >

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center

                      ${
                        selectedPlan.id === plan.id
                          ? "bg-emerald-100"
                          : "bg-gray-100"
                      }

                      `}
                    >

                      <CheckCircle2
                        size={16}
                        className="text-emerald-500"
                      />

                    </div>

                    <span className="text-gray-700 font-medium">
                      {feature}
                    </span>

                  </div>
                ))}
              </div>

              {/* BUTTON */}

              <motion.button

                onClick={handlePayment}

                whileTap={{
                  scale: 0.95,
                }}

                className={`

w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300

${
selectedPlan.id === plan.id
? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
: index === 2
? "bg-gray-900 hover:bg-black text-white"
: "bg-gray-100 hover:bg-gray-200 text-gray-700"
}

`}
              >

                {
                  loadingPlan === plan.id

                    ? "Processing..."

                    : selectedPlan.id === plan.id ? (

                      <div className="flex items-center justify-center gap-2">

                        <Sparkles size={20} />

                        {plan.button}

                      </div>

                    ) : index === 2 ? (

                      <div className="flex items-center justify-center gap-2">

                        <Crown size={20} />

                        {plan.button}

                      </div>

                    ) : (
                      plan.button
                    )
                }

              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM */}

        <div className="mt-16 text-center">

          <h2 className="text-2xl font-bold text-gray-800">
            Trusted by aspiring developers preparing for top tech interviews.
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Practice real interview questions, get AI-powered feedback,
            track your performance analytics, and improve your communication confidence.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Pricing;