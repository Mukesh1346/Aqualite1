import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const fetchCartItems = createAsyncThunk(
  "cart/getCartItem",
  async (thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/v1/cart/get-cart");
      console.log("XXXXXXXXX>>=>", res)
      return res?.data?.cart?.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantityToServer",
  async (payload, thunkAPI) => {
    try {
      const { productId, action } = payload;
      const res = await axiosInstance.put("/api/v1/cart/update-cart-quantity", {
        productId,
        action,
      });

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const AddToCartToServer = createAsyncThunk(
  "cart/updateQuantity",
  async (items, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/api/v1/cart/add-to-cart", {
        items: [items],
      });

      return res.updatedCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    resetCartState(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    addToCart(state, action) {
      const {
        productId,
        quantity,
        image,
        price,
        name,
        dimensionsCm,
        finalPrice,
        discount,
        sizeName,
        thickness,
        mattressDimension,
        mattressPrice,
        mattressFinalPrice
      } = action.payload;

      const existingItem = state.items?.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items?.push({
          productId,
          quantity,
          image,
          price,
          name,
          dimensionsCm,
          finalPrice,
          discount,
          sizeName,
          thickness,
          mattressDimension,
          mattressPrice,
          mattressFinalPrice
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action) {
      state.items = state.items?.filter((item) => {
        const id = item?.productId?._id || item?.productId;
        return id !== action.payload.productId;
      });

      if (!state.items?.[0]?.productId?._id) {
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
    increaseQuantity(state, action) {
      const { productId } = action.payload;
      const item = state.items?.find((item) => item.productId === productId);
      if (item) {
        item.quantity++;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    increaseQuantityVal(state, action) {
      const { productId } = action.payload;
      const item = state.items?.find((item) => item.productId === productId);
      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity(state, action) {
      const { productId } = action.payload;

      const item = state?.items?.find((item) => item.productId === productId);

      if (item && item.quantity > 1) {
        item.quantity--;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantityVal(state, action) {
      const { productId } = action.payload;

      const item = state?.items?.find((item) => item.productId === productId);

      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    setCartFromLocalStorage(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(AddToCartToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCartToServer.fulfilled, (state, action) => {
        state.loading = false;
        const incomingItem = action.payload;
        const index = state.items.findIndex(
          (item) => item._id === incomingItem?._id
        );

        if (index == -1) {
          state.items.push(incomingItem);
        }
      })
      .addCase(AddToCartToServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  resetCartState,
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  setCartFromLocalStorage,
  increaseQuantityVal,
  decreaseQuantityVal,
} = cartSlice.actions;

export default cartSlice.reducer;
