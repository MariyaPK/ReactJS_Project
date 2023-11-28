import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles["not-found"]}>
      <h2> Blank pages </h2>

      <img src="/public/images/notFound404.jpg" alt="not-found" />
    </section>
  );
}
