import Categories from "../../components/Categories/Categories";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import Sales from "../../components/Sales/Sales";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.wrapper}>
      <PromoBanner />
      <Categories />
      <DiscountForm />
      <Sales />
    </main>
  );
}

export default Home;
