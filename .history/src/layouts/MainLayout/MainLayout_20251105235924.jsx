import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../../ui/Container/Container";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}
