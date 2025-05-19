import React, { useState } from "react";

const subjects = {
  science: [
    { name: "Khmer", max: 75 },
    { name: "Math", max: 125 },
    { name: "Physics", max: 75 },
    { name: "Chemistry", max: 75 },
    { name: "Biology", max: 75 },
    { name: "History", max: 50 },
    { name: "English", max: 50 },
  ],
  social: [
    { name: "Khmer", max: 125 },
    { name: "Math", max: 75 },
    { name: "Geography", max: 75 },
    { name: "History", max: 75 },
    { name: "Morality-Citizenship", max: 75 },
    { name: "Earth science", max: 50 },
    { name: "English", max: 50 },
  ],
};

export default function Calculator() {
  const [stream, setStream] = useState("science");
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleScoreChange = (subject, value, max) => {
    if (value === "") {
      setScores({ ...scores, [subject]: "" });
      return;
    }

    const numericValue = parseFloat(value);
    if (numericValue > max) {
      alert(`⚠️ Max score for ${subject} is ${max}`);
      return;
    }

    setScores({ ...scores, [subject]: numericValue });
  };

  const calculate = () => {
    const data = subjects[stream];
    let total = 0;

    for (let { name, max } of data) {
      const value = scores[name];

      if (name === "English") {
        // English is optional
        if (value === undefined || value === "") continue;

        if (value > max) {
          alert(`⚠️ ${name} score cannot exceed ${max}`);
          return;
        }

        // Apply English conversion logic
        total += value >= 50 ? 25 : 0;
        continue;
      }

      // For other subjects
      if (value === undefined || value === "") {
        alert(`⚠️ Please enter a score for ${name}`);
        return;
      }

      if (value > max) {
        alert(`⚠️ ${name} score cannot exceed ${max}`);
        return;
      }

      total += value;
    }

    let grade = "";
    if (total >= 427) grade = "A";
    else if (total >= 380) grade = "B";
    else if (total >= 332) grade = "C";
    else if (total >= 286) grade = "D";
    else if (total >= 237) grade = "E";
    else grade = "F";

    const passed = total >= 237;

    setResult({ total: total.toFixed(2), grade, passed });
  };


  return (
    <div className="min-h-screen bg-green-50 p-4 mt-[70px]">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Bac II Calculator</h1>

        <div className="mb-4">
          <label className="font-semibold mr-4">Choose Stream:</label>
          <select
            className="border p-2 rounded"
            value={stream}
            onChange={(e) => {
              setStream(e.target.value);
              setScores({});
              setResult(null);
            }}
          >
            <option value="science">Science</option>
            <option value="social">Social Science</option>
          </select>
        </div>

        <div className="space-y-2">
          {subjects[stream].map(({ name, max }) => (
            <div key={name} className="flex justify-between items-center">
              <label className="w-1/2 font-medium">
                {name} (Max: {max}){name === "English" ? " - optional" : ""}
              </label>
              <input
                type="number"
                min="0"
                max={max}
                value={scores[name] || ""}
                className="border p-2 rounded w-1/2"
                onChange={(e) => handleScoreChange(name, e.target.value, max)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={calculate}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">Total Score: {result.total}</p>
            <p className="text-lg">
              Grade: <span className="font-bold">{result.grade}</span>
            </p>
            <p
              className={`text-xl font-bold mt-2 ${result.passed ? "text-green-600" : "text-red-500"
                }`}
            >
              {result.passed ? "Passed ✅" : "Failed ❌"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
