import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4 min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
