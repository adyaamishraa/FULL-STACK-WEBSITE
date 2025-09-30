import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../pages/Billing.css'

const Billing = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { cartItems, menuData } = location.state || {}; //destructure cartItems and menuData from location.state
    //cartItems → something like {1: 2, 5: 1} (dish_id → quantity)
    //menuData → categories and dishes

    useEffect(() => {
        if (!menuData || !cartItems) return; // if nothing, stop

        menuData.forEach(category => {  //Loops through each category in the menuData array. { category_name: "Starters", dishes: [...] }
            category.dishes.forEach(dish => {
                const qty = cartItems[dish.dish_id];

                if (qty){
                    console.log(`Dish: ${dish.dish_name}, Quantity: ${qty}, Price per item: ${dish.price}`);
                }

            })
        })
    }, []);


    const totalBill = () => {
        let total = 0;

        if (!menuData || !cartItems) return total;
        else {
            menuData.forEach((category) => {
                category.dishes.forEach((dish) => {
                    const qty = cartItems[dish.dish_id];
                    if (qty) {
                        total += dish.price * qty;
                    }
                })
            })
        }

        return total;
    }


    const handleCancel = () => {
    localStorage.removeItem("cartItems"); // remove cart from localStorage
    alert("Cart cleared!"); 
    
    window.location.href = '/menu'; // redirect to menu page
    };

    

    const handlePayment = () => {
    alert("Payment processing...");
    
    localStorage.removeItem("cartItems");
    
    navigate('/thank-you');
    };


  return (
    <>
    <div className="main-container">

    <div className="billing-container">

        <div className='billing-nav'>
            <h1>Billing Page</h1>
        </div>

        <div className="billing-details">
            <h2>Order Summary</h2>

            <div className="order">
                {menuData && cartItems 
                
                ? 
                
                (
                    menuData.map((category) => (
                        category.dishes.map((dish) => {
                            const qty = cartItems[dish.dish_id];

                            if(qty){
                                return(
                                    <>
                                    <div key={dish.dish_id} className='order-item'> 
                                       
                                       <div className="left">
                                            <span className='dish-name'>{dish.dish_name}</span>
                                            <span className='dish-qty'> x {qty} </span>
                                       </div>
                                        
                                        <div className="right">
                                            <span className='dish-price'> ₹{(dish.price * qty).toFixed(2)} </span>
                                        </div>
                                        
                                    </div>

                                    </>
                                       
                                )
                            }

                            
                        })
                    ))
                )
                
                : 
                
                (
                    <p>No Items in Cart</p>
                )}

            </div>


            <div className="total-price">
                    <h3>Total Amount : <span className="amt">Rs. {totalBill().toFixed(2)}</span></h3>
            </div>

        </div>

    </div>

    <div className="billing-actions">
            <div className="btns">
                <button className="cancel-btn" onClick={handleCancel}>
                Cancel Billing
                </button>

                <button className="proceed-btn" onClick={handlePayment}>
                Proceed to Payment - COD
                </button>
            </div>
    </div>

    </div>
    </>
  )
}

export default Billing