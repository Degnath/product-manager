// import logo from './logo.svg';
import './App.css';
import ProductForm from './components/ProductForm';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import OneProduct from './components/OneProduct';
import AllProducts from './components/AllProducts';
import Edit from './components/Edit';
import {useState} from "react";

function App() {

  const[submitted, setSubmitted] =useState(false) // this is used to refress the form once submit or created is clicked.

  return (
    <BrowserRouter>
      <div className="App container">
        <h2>Product Manager</h2>
        <Switch>


          <Route exact path="/">
            <ProductForm submitted={submitted} setSubmitted={setSubmitted}/>
            <AllProducts submitted={submitted}/>
          </Route>

          <Route exact path="/products/edit/:idParam">
            <Edit/>
          </Route>

          <Route exact path="/products/:idParam">
            <OneProduct/>
          </Route>
          {/* <Route  path="/products/edit/:idParam">
            <Edit/>
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
