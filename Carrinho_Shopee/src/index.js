import createItem from "./services/item.js";
import * as cartService from "./services/cart.js"
const mycart = [];
const myWhishList = [];

console.log("Welcome to the your shopee Cart!");

const item1 = await createItem(" Hotwheels Ferrari", 27.99, 1);
const item2 = await createItem(" Hotwheels Lamborghini", 34.99, 3);

await cartService.addItem(mycart, item1);
await cartService.addItem(mycart, item2);

await cartService.removeItem(mycart, item2);
await cartService.removeItem(mycart, item2);
await cartService.removeItem(mycart, item1);

await cartService.displayCart(mycart);  

// await cartService.deleteItem(mycart,item2.name);
// await cartService.deleteItem(mycart,item1.name);


await cartService.caculateTotal(mycart);

