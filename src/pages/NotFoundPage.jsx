/* 404-side som vises, når en side ikke kan findes */
import ErrorMessage from "../components/Errormessage";

export default function NotFoundPage() {
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
