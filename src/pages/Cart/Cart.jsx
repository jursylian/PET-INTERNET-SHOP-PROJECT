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
      dispatch(clearCart());
      reset();
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  if (items.length === 0)
    return <p className={styles.empty}>Your cart is empty.</p>;

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
        {/* Левая часть — товары */}
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
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.countBtn}
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
                    <span className={styles.countValue}>{item.quantity}</span>
                    <button
                      className={styles.countBtn}
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

        {/* Правая часть — детали заказа */}
        <div className={styles.orderDetails}>
          <h2>Order details</h2>

          <p className={styles.itemsCount}>{items.length} items</p>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className={styles.error}>Name is required</span>
            )}

            <input
              placeholder="Phone number"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className={styles.error}>Phone is required</span>
            )}

            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className={styles.error}>Email is required</span>
            )}

            <button type="submit" className={styles.orderButton}>
              Order
            </button>
          </form>
        </div>
      </div>

      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Cart;
