// ...404 side som bruger komponenten...
import ErrorMessage from "../components/Errormessage";

export default function NotFound() {
  return (
    <ErrorMessage
      code="404"
      title="fejl"
      headline="Hov, der skete en fejl…"
      subline="Prøv igen eller kom tilbage senere."
      imageSrc="/assets/puzzle.png"
    />
  );
}
// ...404 side som bruger komponenten...
