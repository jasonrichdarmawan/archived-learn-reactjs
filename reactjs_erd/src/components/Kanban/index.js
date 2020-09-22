// TODO: refactor to make the component reusable.
// Currently only used by features/ListProducts.js

import React from "react";
import styles from "./index.module.css";

function KanbanItem({ photoURL, product_name, price }) {
  return (
    <div className={styles.kanban_item}>
      <div className={styles.kanban_image}>
        <img src={photoURL} className={styles.image_64_contain} />
      </div>
      <div className={styles.kanban_details}>
        <div>{product_name}</div>
        <div>Price: {price}</div>
      </div>
    </div>
  );
}

function KanbanGhost() {
  return (
    <>
      <div className={[styles.kanban_item, styles.kanban_ghost].join(" ")} />
      <div className={[styles.kanban_item, styles.kanban_ghost].join(" ")} />
      <div className={[styles.kanban_item, styles.kanban_ghost].join(" ")} />
      <div className={[styles.kanban_item, styles.kanban_ghost].join(" ")} />
    </>
  );
}

export default function Kanban({ data }) {
  return (
    <div className={styles.kanban}>
      {data.map((item) => (
        <KanbanItem
          photoURL={item.photoURL}
          product_name={item.product_name}
          price={item.price}
        />
      ))}
      <KanbanGhost />
    </div>
  );
}
