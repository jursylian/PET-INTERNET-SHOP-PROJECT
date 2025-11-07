import Categories from "../Categories/Categories";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import Sales from "../../components/Sales/Sales";
import styles from "./Home.module.css";

function Home() {
  return (
    <MainLayout>
      <main className={styles.wrapper}>
        <PromoBanner />

        <Categories />
        <DiscountForm />
        <Sales />
      </main>
    </MainLayout>
  );
}

export default Home;
