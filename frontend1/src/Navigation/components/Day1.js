import React, { useState } from "react";
import "./Day1.css"; 

function Day1() {
  const [workouts, setWorkouts] = useState([
    { name: "Squat 4x8", weight: 45, hasPassFail: true },
    { name: "Bench Press 4x8", weight: 45, hasPassFail: true },
    { name: "Rows 3x12", weight: 45, hasPassFail: true },
    { name: "Pushups 3x15", weight: 45, hasPassFail: true },
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
      <h2>Day 1 Workout</h2>
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

export default Day1;