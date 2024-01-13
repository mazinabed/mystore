// import React, { useState } from "react";
// import "./Card.css";
// import Button from "../Button/Button";
// function Card({ food, onAdd, onRemove }) {
//   const [count, setCount] = useState(0);
//   const { title, Image, price, id, description } = food;

//   const handleIncrement = () => {
//     setCount(count + 1);
//     onAdd(food);
//   };
//   const handleDecrement = () => {
//     setCount(count - 1);
//     onRemove(food);
//   };

//   return (
//     <div className="card">
//       <span
//         className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
//       >
//         {count}
//       </span>
//       <div className="image__container">
//         <img src={Image} alt={title} />
//         {description}
//       </div>
//       <h4 className="card__title">
//      {title} . <span className="card__price">د.ع. {price}</span>
//       </h4>

//       <div className="btn-container">
//         <Button title={"+"} type={"add"} onClick={handleIncrement} />
//         {count !== 0 ? (
//           <Button title={"-"} type={"remove"} onClick={handleDecrement} />
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;

import React, { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";

function Card({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const { title, Image, price, id, description } = food;

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onRemove(food);
    }
  };

  const totalPrice = count * price; // Calculate the total price

  return (
    <div className="card">
      <span className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}>
        {count}
      </span>
      <div className="image__container">
        <img src={Image} alt={title} />
        {description}
      </div>
      <h4 className="card__title">
        {title} . <span className="card__price">السعر د.ع. {price}</span> 
      </h4>
      <p>المجموع: د.ع. {totalPrice}</p> {/* Display total price */}
      <div className="btn-container">
        <Button title={"+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Card;
