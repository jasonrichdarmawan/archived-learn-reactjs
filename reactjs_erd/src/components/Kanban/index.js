// TODO: refactor to make the component reusable.
// Currently only used by features/ListProducts.js

import React from "react";
import styles from "./index.module.css";

function KanbanItem({ photoURL, product_name, price, qty }) {
  return (
    <div className={styles.kanban_item}>
      <div className={styles.kanban_image}>
        <img src={photoURL} className={styles.image_64_contain} />
      </div>
      <div className={styles.kanban_details}>
        <div>{product_name}</div>
        <div>Price: {price}</div>
        {qty && <div>Stock: {qty}</div>}
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
        <KanbanItem key={item.id}
          photoURL={item.data.photoURL}
          product_name={item.data.product_name}
          price={item.data.price}
          qty={item.data.qty}
        />
      ))}
      <KanbanGhost />
    </div>
  );
}
