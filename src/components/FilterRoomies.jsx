import "./FilterPanel.css";

export default function FilterRoomies({ value, onChange }) {
  return (
    <div className="count-row">
      {/* Wrapper for hele række-layoutet */}

      <p className="count-label">Antal roomies</p>
      {/* Label for hvad brugeren justerer */}

      <div className="count-stepper" aria-label="Antal roomies">
        {/* Stepper-container med minus-knap, værdi og plus-knap */}

        <button
          type="button"
          className="count-stepperButton"
          aria-label="Reducer antal roomies"
          onClick={() => onChange(Math.max(1, value - 1))}
        >
          −
        </button>
        {/* Minus-knap — sørger for at værdien aldrig kommer under 1 */}

        <p className="count-stepperValue">{value}</p>
        {/* Viser den aktuelle værdi */}

        <button
          type="button"
          className="count-stepperButton"
          aria-label="Forøg antal roomies"
          onClick={() => onChange(Math.min(8, value + 1))}
        >
          +
        </button>
        {/* Plus-knap — sørger for at værdien aldrig overstiger 8 */}
      </div>
    </div>
  );
}
