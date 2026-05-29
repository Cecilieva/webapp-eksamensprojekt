/* Side til visning af notifikationer */
import Header from "../components/Header";
import ErrorMessage from "../components/Errormessage";

export default function NotificationsPage() {
  return (
    <main>
      {/* Sidehoved */}
      <Header title="Notifikationer" />

      {/* Viser besked når der ikke er notifikationer */}
      <ErrorMessage />
    </main>
  );
}
