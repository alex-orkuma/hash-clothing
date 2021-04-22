import cartActionsTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: cartActionsTypes.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type: cartActionsTypes.ADD__ITEM,
    payload: item
})