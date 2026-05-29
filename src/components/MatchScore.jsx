import "./MatchScore.css";

export default function MatchScore({ score, breakdown, className = "" }) {
  const raw = Number(score);
  const value = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;

  const ringStyle = {
    "--pct": `${value}%`,
  };

  return (
    <div className={`matchscore-wrapper ${className}`.trim()} style={ringStyle}>
      <div className="match-score" aria-label={`Match score: ${value}%`}>
        <div className="match-score-ring">
          <h5 className="match-score-inner">{value}</h5>
        </div>
      </div>

      {breakdown && <div className="match-breakdown">{breakdown}</div>}
    </div>
  );
}
