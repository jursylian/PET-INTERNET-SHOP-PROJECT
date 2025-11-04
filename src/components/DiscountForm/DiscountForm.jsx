import { useState } from "react";
import axios from "axios";
import styles from "./DiscountForm.module.css";
import animals from "../../assets/pets.png";

const DiscountForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Введи ваше имя";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Некорректный формат телефона";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Некорректный формат email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post("http://localhost:3333/sale/send", formData);
      alert("Заявка на скидку отправлена");
      setFormData({ name: "", phone: "", emeil: "" });
    } catch (err) {
      console.error("Ошибка отправки заявки:", err);
      alert("Ошибка при отправке. Попробуйте позже");
    }
  };

  return (
    <section className={styles.discountSection}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />{" "}
          {errors.name && <p className={styles.errors}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />{" "}
          {errors.phone && <p className={styles.errors}>{errors.phone}</p>}
        </div>
        <div className={styles.field}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />{" "}
          {errors.email && <p className={styles.errors}>{errors.email}</p>}
        </div>
        <button type="submit" className={styles.button}>
          Get a discount
        </button>
        <img src={animals} alt="Animals" className={styles.animals} />
      </form>
    </section>
  );
};

export default DiscountForm;
