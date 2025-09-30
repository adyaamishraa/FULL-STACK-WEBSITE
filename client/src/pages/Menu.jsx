import React, { useState, useEffect} from 'react'
import MenuPage from '../assets/menubg.jpg'
import '../pages/Menu.css'
import {useNavigate} from 'react-router-dom'


const Menu = () => {

   const [menuData, setMenuData] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(5); //when we click particular category, only that category's dishes will be shown
   const [searchDish, setSearchDish] = useState(''); // to store the search input value
   const [cartItems, setCartItems] = useState({}); // to store items added to cart


   const navigate = useNavigate();



   useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch ('http://localhost:4000/menu');
        const jsonData = await response.json();
        setMenuData(jsonData.data);
        console.log(jsonData.data); // we log the fetched data to the console not the state variable
      
      } catch (error) {
          console.error("Error fetching menu data:", error);
 
        }
      }

      fetchMenuData();
   }, []);
   



   
   //Goal - show all dishes category wise, filter by category selected and search input
   const gettingFilteredMenu = () =>{
    
    return menuData  //menuData is array of categories with dishes in each category

    .filter((category) => selectedCategory === category.category_id) 
    //decide which category to show based on selectedCategory which is set when we click category button



    //ye search functionality hai, this is step 2 after category is selected.
    .map((category) => {
      const filteredDishes = category.dishes.filter((dish) => {
        if(searchDish === ''){
          return true; //agar search box empty hai toh sab dikhado
        }

        else{
          return dish.dish_name.toLowerCase().includes(searchDish.toLowerCase()); 
          //agar search box me kuch likha hai toh ussi se match karne wale dishes dikhado
        }
      }
    );
    


    // step 3
    // ab hume decide karna hai ki category ko rakhna hai ya nahi, based on filteredDishes
      
    if (filteredDishes.length > 0) { // agar dishes match kar rhi hai to..
        return { ...category, dishes: filteredDishes }; 
        // keep category but replace dishes array with matching ones
      }
      else {
        return null; 
        // no dishes left, it shows null below that category
      }
    })


    .filter(category => category !== null); 
    // remove categories with no dishes that match the search

   }




   const addToCart = (dishId) => {

    //we need to copy cart items as we cant directly change state. why? because state should be immutable, obj array is created it cant be changed directly
    const newCartItems = {...cartItems}; //copy of cart items

    // agar dish already cart me hai toh uska quantity badhao
    if (newCartItems[dishId]){
      newCartItems[dishId] += 1;
    }
    else{
      newCartItems[dishId] = 1; //agar dish cart me nahi hai toh uska quantity 1 set karo
    }

    setCartItems(newCartItems); //update cart items state

   }


   const removeFromCart = (dishId) => {

    const newCartItems = {...cartItems}; //copy of cart items

    if (newCartItems[dishId] > 1) {
      
      newCartItems[dishId] -= 1; //decrease quantity by 1

    } else {
      
      delete newCartItems[dishId]; //remove item from cart if quantity is 0

    }

    setCartItems(newCartItems); //update cart items state


   }




   const handleCheckOut = () => {

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); //store cart items in local storage as string

    navigate('/billing', {state: {cartItems: cartItems, menuData: menuData}});
    //cartItems → current items in the cart, menuData → full menu info (so Billing can access dish names, prices, etc.).
    //we can access this state in Billing component using useLocation hook from react-router-dom 


   }



  return (
    <>
    <div className="menu-container">
      
      
      
      
      <nav className="menu-nav" >
        <h1 className="menu-heading">Menu</h1>

        {
          Object.keys(cartItems).length > 0 && (
            <button className='checkOut' onClick={handleCheckOut}> Checkout </button>
          )
        }

        <div className="nav-inputs">
          <input type="text" placeholder='Search Your Dish' className='search-dish' value={searchDish} onChange={(e) => setSearchDish(e.target.value)}/>
        </div>
      </nav>





      <div className="category-buttons"> {/* imp for category selection */}
        {menuData.map((category) => {
          return(
            <button key={category.category_id} 
            onClick={() => setSelectedCategory(category.category_id)}
            className= {`cat-btn ${selectedCategory === category.category_id ? "active" : ""}`}>
                {category.category_name}
            </button>
          )
        })}
      </div>



      
      <div className="menu-section">
        { gettingFilteredMenu()
        .map((category) => {
          return(
          <div key={category.category_id}> {/* ye div category key dene ke liye hai taki uniquely identify ho! */}
          
          <h1 className='category-heading'>{category.category_name}</h1>

          

          <div className="menu-cards">
            {category.dishes
            .map((dish) => {
              return(
                <div className='menu-card' key={dish.dish_id}>
                  <div className="left-section">
                    <div className="upper-section">
                      <h3 className='dish-heading'> {dish.dish_name} </h3>
                      <p className='dish-price'>{dish.price}</p>
                    </div>

                    <div className="lower-section">
                      <p className='dish-desc'>{dish.description}</p>
                    </div>
                  </div>

                  <div className="right-section">
                    {
                      cartItems[dish.dish_id] 
                      
                      ? 

                      (
                        <div className='quantity-section'>
                          <button className='minus' onClick={() => removeFromCart(dish.dish_id)}>-</button>
                          <span className='quantity'>{cartItems[dish.dish_id]}</span>
                          <button className='plus' onClick={() => addToCart(dish.dish_id)}>+</button>
                        </div>
                      )

                      : 

                      (
                        <button className='cart-btn' onClick={() => addToCart(dish.dish_id)}>Add to Cart</button>
                      )
                    }
                    
                  </div>
                </div>
              )
            })}
          
          </div>


        </div>
          )
        })}
      </div>





    </div>


    </>
  )
}

export default Menu