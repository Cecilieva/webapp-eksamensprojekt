import "./MatchScore.css";

export default function MatchScore({ score, breakdown, className = "" }) {
  /* Konverter score til tal og begræns den til intervallet 0–100 */
  const raw = Number(score);
  const value = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;

  /* CSS variabel til progress-ring (bruges i styling til cirkel-fyld) */
  const ringStyle = {
    "--pct": `${value}%`,
  };

  return (
    <div className={`matchscore-wrapper ${className}`.trim()} style={ringStyle}>
      
      {/* Visuel matchscore (cirkulær indikator) */}
      <div className="match-score" aria-label={`Match score: ${value}%`}>
        <div className="match-score-ring">
          <h5 className="match-score-inner">{value}</h5>
        </div>
      </div>

      {/* Valgfri detaljeret opdeling af scoren */}
      {breakdown && <div className="match-breakdown">{breakdown}</div>}
    </div>
  );
}
