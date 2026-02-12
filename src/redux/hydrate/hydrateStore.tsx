"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateCart } from "../cart/slice";
import { hydrateWishlist } from "../wishlist/slice";

export default function HydrateStore() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        dispatch(hydrateCart(JSON.parse(cart)));
      }
    } catch (err) {
      console.error("Error loading cart:", err);
    }

    try {
      const wishlist = localStorage.getItem("wishlist");
      if (wishlist) {
        dispatch(hydrateWishlist(JSON.parse(wishlist)));
      }
    } catch (err) {
      console.error("Error loading wishlist:", err);
    }
  }, [dispatch]);

  return null;
}
