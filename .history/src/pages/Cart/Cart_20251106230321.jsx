import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/cartSlice";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import styles from "./Cart.module.css";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.discont_price * item.quantity,
    0
  );

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3333/order/send", {
        customer: data,
        items,
        total: totalPrice,
      });

      setIsModalOpen(true);
      reset();
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  if (items.length === 0 && !isModalOpen) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Shopping cart</h1>
          <div className={styles.divider}></div>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            Back to the store
          </button>
        </div>
      </div>

      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
                className={styles.image}
              />

              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <h3>{item.title}</h3>
                  <button
                    className={styles.removeButton}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ×
                  </button>
                </div>

                <div className={styles.itemBottom}>
                  <div className={styles.quantityBlock}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                    >
                      −
                    </button>
                    <div className={styles.quantityDisplay}>
                      {item.quantity}
                    </div>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.priceBlock}>
                    <span className={styles.newPrice}>
                      ${(item.discont_price * item.quantity).toFixed(2)}
                    </span>
                    {item.price && (
                      <span className={styles.oldPrice}>
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Правая часть — заказ */}
        <div className={styles.orderDetails}>
          <h2>Order details</h2>

          <div className={styles.summary}>
            <p className={styles.itemsCount}>
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className={styles.errorText}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                placeholder="Phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <button type="submit" className={styles.orderButton}>
              Order
            </button>
          </form>
        </div>
      </div>

      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          dispatch(clearCart());
        }}
      />
    </div>
  );
};

export default Cart;
