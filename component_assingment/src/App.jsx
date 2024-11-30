
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom'
import { FindDrink, Header2, OpenData } from './components/coctailcorner'
import { Header, ProductForm } from './components/productpage'


const router = createBrowserRouter([
  {
    path:'/',
    element: <NavigationBar/>,
    children: [
    { 
      path: '/',
      element: <Home/>
    },
    {
      path: '/productpage',
      element: <Productpage/>
    },
    {
      path: '/coctailcorner',
      element: <CoctailCorner/>
    }
  ]
  }  
])


function App() {

  return (   
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

function NavigationBar() {
  return(
    <div className='nav'>
      <Link to={'/'}> Home </Link>
      <Link to={'/productpage'}> Product page </Link>
      <Link to={'/coctailcorner'}> Coctail Corner </Link>
      <Outlet/>
    </div>
  )
}

function Home() {
  return(
    <div>
      <h1>Welcome to my page!</h1>
    </div>
  )
}
function Productpage() { 
  return( 
    <div>
      <Header/>
      <div className='productpage'>
        <ProductForm/>
      </div>
    </div>
  )
}
function CoctailCorner() { 
  return( 
    <div>
      <Header2/>
      <div className='component-container'>
        <div className='drink'>
          <OpenData/>
        </div>
        <div className='search'>
          <FindDrink/>
        </div>  
      </div>
  </div>
  )
}

export default App