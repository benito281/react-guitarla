import { useState, useEffect, useMemo } from "react";
import { db } from "../data/data"
export function useCart(){
      /* Obtiene el contenido del carrito */
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  //State para guardar la data de las guitarras
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  /* Carga de carrito en el localstorage */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemsExists = cart.findIndex((guitar) => guitar.id === item.id);

    /* Agregando items en carrito */
    if (itemsExists >= 0) {
      if (cart[itemsExists].quantity >= item.stock) {
        alert('No hay más stock disponible para la guitarra seleccionada'); 
        return;
      }
      const updateCart = [...cart];
      updateCart[itemsExists].quantity++;
      setCart(updateCart);
    } else {
      if (item.stock > 0) {
        // Agregar nuevo artículo al carrito con cantidad inicial 1
        item.quantity = 1;
        setCart([...cart, item]);
      } else {
        alert('Producto sin stock disponible');
      }
    }
  }
  /* Eliminar guitarra de carrito */
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    
  }

  //Función para incrementar cantidades
  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const product = db.find(product => product.id === id);
        if (item.quantity < product.stock) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
      }
      return item;
    });
  
    setCart(updatedCart);
  }

  //Función para decrementar cantidades
  function decreaseQuantity(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity > 1){
        return {
          ...item,
          quantity : item.quantity - 1,
        }
      }
      return item;
    })
    setCart(updateCart);
  }

  function clearCart(){
    setCart([])
  }
  //state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, guitar) => acc + (guitar.price * guitar.quantity), 0), [cart]);
  
  
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}