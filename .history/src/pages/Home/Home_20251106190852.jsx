import Categories from "../../components/Categories/Categories";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import SaleSection from "../../components/SaleSection/SaleSection";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.wrapper}>
      <PromoBanner />
      <Categories />
      <DiscountForm />
      <SaleSection />
    </main>
  );
}

export default Home;
