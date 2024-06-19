import burgerConstructorSlice from './burgerConstructorSlice/burgerConstructorSlice';
import feedsSlice from './feedsSlice/feedsSlice';
import ingredientsSlice from './ingredientsSlice/ingredientsSlice';
import orderSlice from './orderSlice/orderSlice';
import userSlice from './userSlice/userSlice';

export const ingredientsReducer = ingredientsSlice.reducer;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const feedsReducer = feedsSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const userReducer = userSlice.reducer;
