// import React from 'react';
// // Here we are importing a CSS file as a dependency
// import '../styles/Header.css';


// function Header() {
//   return (
//     <header className="header">
//            <h2 className="heading">شركة الحر العراقية</h2>

//     </header>
//   );
// }

// export default Header;
import React from 'react';
import '../styles/Header.css';
import Cart from './Cart/Cart'; // Import the Cart component
import Button from "./Button/Button";
function Header({ cartItems, onCheckout }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <header className="header">
      <h2 className="heading">شركة الحرة العراقية</h2>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cart__content">
        {cartItems.length === 0 ? " لا توجد طلبات" : ""}
        <br />
        <span className="">
          اجمالي الفاتورة : د.ع. {totalPrice.toFixed(2)}
        </span>
   
      </div>
    </header>
  );
}

export default Header;
