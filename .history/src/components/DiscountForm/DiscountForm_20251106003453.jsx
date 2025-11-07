import { useState } from "react";
import axios from "axios";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import styles from "./DiscountForm.module.css";
import animals from "../../assets/pets.png";

const DiscountForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.phone.trim()) newErrors.phone = "Введите номер телефона";
    else if (!/^\+?\d{7,15}$/.test(formData.phone))
      newErrors.phone = "Некорректный формат телефона";
    if (!formData.email.trim()) newErrors.email = "Введите email";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Некорректный формат email";

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
      setFormData({ name: "", phone: "", email: "" });
    } catch (err) {
      console.error("Ошибка отправки:", err);
      alert("Ошибка при отправке. Попробуйте позже");
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.discountSection}>
        <h2 className={styles.title}>5% off on the first order</h2>

        <div className={styles.content}>
          <div className={styles.imageWrap}>
            <img src={animals} alt="Animals" className={styles.animals} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Button type="submit" onClick={handleSubmit}>
              Get a discount
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DiscountForm;
