import "../styles/components/_exerciseStatusTable.scss";

function ExerciseStatusTable({ exercises = [] }) {
  if (!exercises.length) {
    return <p>No exercise data available.</p>;
  }

  return (
    <table className="exercise-status-table">
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {exercises.map((ex) => (
          <tr key={ex.name}>
            <td>{ex.name}</td>
            <td>
              <span
                className={`status-label ${
                  ex.correct ? "correct" : "incorrect"
                }`}
              >
                {ex.correct ? "Correct" : "Incorrect"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseStatusTable;