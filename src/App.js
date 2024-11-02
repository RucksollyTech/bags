import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./Home";
import NavBar from "./Components/NavBar";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
import BagDetails from "./BagDetails";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import AllBags from "./AllBags";
import Success from "./Success";
import StripeCheckout from "./StripeCheckout";
import Unsubscribe from "./Unsubscribe";
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
    return (
        <div className="App">
            <Router>
				<ScrollToTop />
				<NavBar />
				<Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/details/:id" element={<BagDetails />} />
                    <Route path="/products/cart" element={<Cart />} />
                    <Route path="/wish/list" element={<Wishlist />} />
                    <Route path="/items/list" element={<AllBags />} />
                    <Route path="/success" element ={<Success />} />
                    <Route path="/unsubscribe/:email" element ={<Unsubscribe />} />
					<Route path="/checkout/:link/:type" element ={<StripeCheckout />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
