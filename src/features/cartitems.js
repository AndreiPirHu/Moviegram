import { createAction, createReducer } from '@reduxjs/toolkit';

const addItem = createAction('Add item to cart')
const removeItem = createAction('Remove item from cart')
const clearItems = createAction('Clear all items from cart')

const actions ={addItem, removeItem, clearItems}


const initialState = [];

const reducer = createReducer(initialState, builder => {
  builder
.addCase(addItem,  (state, action) => [...state, action.payload])

.addCase(removeItem, (state, action) => (
		state.filter(item => item.id !== action.payload)))

.addCase(clearItems, (state, action) => initialState)
});

export { reducer, actions}