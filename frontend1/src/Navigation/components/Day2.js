import React, { useState } from "react";
import "./Day1.css"; // reuse the same CSS as Day1

function Day2() {
  const [workouts, setWorkouts] = useState([
    { name: "Squat 4x8", weight: 45, hasPassFail: true },
    { name: "Overhead Press 4x8", weight: 45, hasPassFail: true },
    { name: "Deadlift 3x5", weight: 95, hasPassFail: true },
    { name: "Chin-Ups 3x15", weight: 0, hasPassFail: true },
    { name: "Abs 3x15", weight: null, hasPassFail: false },
  ]);

  const handleResult = (index, result) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout, i) => {
        if (i === index && workout.hasPassFail) {
          const newWeight =
            result === "pass"
              ? workout.weight + 5
              : Math.max(0, workout.weight - 5);
          return { ...workout, weight: newWeight };
        }
        return workout;
      })
    );
  };

  return (
    <div className="tracker-container">
      <h2>Day 2 Workout</h2>
      <div className="workout-list">
        {workouts.map((workout, index) => (
          <div key={index} className="workout-card">
            <h3>{workout.name}</h3>
            <p className="weight">
              {workout.hasPassFail
                ? `${workout.weight} lbs`
                : "Bodyweight"}
            </p>
            {workout.hasPassFail && (
              <div className="buttons">
                <button
                  className="pass-btn"
                  onClick={() => handleResult(index, "pass")}
                >
                  Pass
                </button>
                <button
                  className="fail-btn"
                  onClick={() => handleResult(index, "fail")}
                >
                  Fail
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day2;