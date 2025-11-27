"use client";

import { useState } from "react";

type Step = "main" | "skinTone" | "occasion";

function renderResponse(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*(.*?)\*\*/g;

  return text.split("\n").map((line, i) => {
    // eslint-disable-next-line prefer-const
    let formattedLine: (string | JSX.Element)[] = [];

    const urlSplit = line.split(urlRegex);

    urlSplit.forEach((part, idx) => {
      if (urlRegex.test(part)) {
        formattedLine.push(
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {part}
          </a>
        );
      } else {
        const segments = part.split(boldRegex);

        segments.forEach((seg, j) => {
          if (j % 2 === 1) {
            formattedLine.push(
              <strong key={`b-${j}`} className="font-semibold">
                {seg}
              </strong>
            );
          } else {
            formattedLine.push(<span key={`t-${j}`}>{seg}</span>);
          }
        });
      }
    });

    return (
      <p key={i} className="mb-1">
        {formattedLine}
      </p>
    );
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("main");
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (msg: string) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://petiole-demo-2.pgsangeethkumar.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      setResponse(data?.response?.response ?? "No response");
    } catch {
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const skinTones = ["Fair", "Light", "Medium", "Wheatish", "Tan", "Brown", "Dark"];
  const occasions = ["Office", "Interview", "Party", "Wedding", "Date", "Casual Outing", "Festival"];

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
          setStep("main");
        }}
        className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4 flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Fashion Assistant</h3>

          {response && !loading && (
            <div className="bg-gray-100 p-2 rounded-md text-sm max-h-40 overflow-auto border">
              {renderResponse(response)}
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.15s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]"></div>
              <span className="text-xs text-gray-500 ml-2">Thinking…</span>
            </div>
          )}

          {step === "main" && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setStep("skinTone")}
                className="p-2 bg-gray-100 border rounded-md hover:bg-gray-200 transition"
              >
                Choose Skin Tone
              </button>

              <button
                onClick={() => setStep("occasion")}
                className="p-2 bg-gray-100 border rounded-md hover:bg-gray-200 transition"
              >
                Choose Occasion
              </button>
            </div>
          )}

          {step === "skinTone" && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Select your Skin Tone:</p>
              {skinTones.map((tone) => (
                <button
                  key={tone}
                  onClick={() => {
                    sendMessage(`My skin tone is ${tone}. Suggest dress colors.`);
                    setStep("main");
                  }}
                  className="p-2 bg-gray-100 border rounded-md hover:bg-gray-200 transition text-sm"
                >
                  {tone}
                </button>
              ))}
              <button
                onClick={() => setStep("main")}
                className="text-sm text-blue-600 underline mt-1"
              >
                ← Back
              </button>
            </div>
          )}

          {step === "occasion" && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Select an Occasion:</p>

              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => {
                    sendMessage(`I need an outfit for a ${occ}.`);
                    setStep("main");
                  }}
                  className="p-2 bg-gray-100 border rounded-md hover:bg-gray-200 transition text-sm"
                >
                  {occ}
                </button>
              ))}

              <button
                onClick={() => setStep("main")}
                className="text-sm text-blue-600 underline mt-1"
              >
                ← Back
              </button>
            </div>
          )}

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded-md text-sm"
            rows={3}
            placeholder="Ask anything…"
          />

          <button
            onClick={() => {
              if (message.trim()) sendMessage(message);
              setMessage("");
            }}
            className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
