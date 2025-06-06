import { purchaseCart } from '../controllers/carts.controller.js';
import { Router } from 'express';
import {
getCarts,
getCartById,
createCart,
addProductToCart,
updateCart,
updateProductQuantity,
removeProduct,
clearCart
} from '../controllers/carts.controller.js';


const router = Router();

router.get('/', getCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateProductQuantity);
router.delete('/:cid/product/:pid', removeProduct);
router.delete('/:cid', clearCart);
router.post('/:cid/purchase', purchaseCart);

export default router;