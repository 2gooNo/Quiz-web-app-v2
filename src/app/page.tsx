import { HomePage } from "./_components/homePage";
import { NavBar } from "./_components/navBar";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <NavBar />
      <div className="flex items-center">
        <HomePage />
      </div>
    </main>
  );
}
