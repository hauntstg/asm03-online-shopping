import { createSlice, configureStore, current } from "@reduxjs/toolkit";

// store popup detail
const initialState = { show: false, data: "" };

const showPopupSlice = createSlice({
  name: "show popup",
  initialState,
  reducers: {
    showPopup(state, action) {
      state.show = true;
      state.data = action.payload;
    },
    closePopup(state) {
      state.show = false;
    },
  },
});

// store popup live chat
const initialStatePopupLiveChat = { show: false };

const showPopupLiveChatSlice = createSlice({
  name: "show popup livechat",
  initialState: initialStatePopupLiveChat,
  reducers: {
    showPopupLiveChat(state) {
      state.show = !state.show;
    },
  },
});

// store lưu trữ data từ fetch api
const productsInitialState = { data: "" };

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    dataProducts(state, action) {
      state.data = action.payload;
    },
  },
});

// store button input ở route detail và cart
const counterInitialState = { count: 1 };

const counterSlice = createSlice({
  name: "count",
  initialState: counterInitialState,
  reducers: {
    decrement(state, action) {
      if (state.count === 1) {
        // input min='1'
        state.count = 1;
      } else state.count = state.count + action.payload;
    },
    increment(state, action) {
      state.count = state.count + action.payload;
    },
    resetCount(state) {
      state.count = 1;
    },
  },
});

// store check đăng nhập và thêm/sửa/xóa sản phẩm trong giỏ hàng
const authInitialState = {
  isAuthenticated: false,
  user: { email: "", fullname: "", index: "", cart: [] },
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    deleteProduct(state, action) {
      state.user.cart.splice(action.payload, 1);
    },
    addToCart(state, action) {
      state.user.cart.push(action.payload);
    },
    updateCart(state, action) {
      const indexProductOfCart = state.user.cart.findIndex(
        (prod) => prod.productId === action.payload.productId
      );
      const currQuantity = state.user.cart[indexProductOfCart].quantity;
      console.log(current(state).user.cart);
      state.user.cart[indexProductOfCart].quantity =
        currQuantity + action.payload.quantity;
      console.log(current(state).user.cart);
    },
  },
});

const store = configureStore({
  reducer: {
    showPopup: showPopupSlice.reducer,
    showPopupLiveChat: showPopupLiveChatSlice.reducer,
    products: productsSlice.reducer,
    count: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
export const showPopupActions = showPopupSlice.actions;
export const showPopupLiveChatActions = showPopupLiveChatSlice.actions;
export const updateProductsActions = productsSlice.actions;
export const countActioncs = counterSlice.actions;
export const authActions = authSlice.actions;
