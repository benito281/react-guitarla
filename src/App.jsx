import { useState } from "react";
import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import { db } from "./data/data.js";

function App() {
  //State para guardar la data de las guitarras
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemsExists = cart.findIndex((guitar) => guitar.id === item.id);

    /* Adding item in cart */
    if (itemsExists >= 0) {
      const updateCart = [...cart];
      updateCart[itemsExists].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }
  function removeFromCart(id) {
    console.log("remove..", id);
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    /* const updateCart = cart.filter(guitar => guitar.id !== id);
        setCart(updateCart); */
  }

  //Creando función para incrementar cantidades
  return (
    <>
      <Header cart={cart} 
        removeFromCart={removeFromCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              guitar={guitar}
              key={guitar.id}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
