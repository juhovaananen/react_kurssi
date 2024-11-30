import { useState, useEffect } from 'react'
import '../App.css'
import axios from "axios"
import logo from '../assets/cclogo.webp'

function Header2() {

  const headertext = 'Welcome to Coctail Corner!'

  return (
    <div className='header'>
      <img src={logo} />
      <h1>{headertext}</h1>
    </div>
  )
}

function OpenData() {

  const [drink, setDrink] = useState(null)
  const [img, setImg] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [reciep, setReciep] = useState(null)
  const [text, setText] = useState('')

  async function getDrink() {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      const data = response.data.drinks[0]
      setDrink(data.strDrink)
      setImg(data.strDrinkThumb)
      setReciep(data.strInstructions)

      // Käydään läpi ainesosat (strIngredient1 - strIngredient15)
      const ingredientList = []
      for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`]
        const measure = data[`strMeasure${i}`]
        if (ingredient) {
          ingredientList.push(`${measure ? measure : ''} ${ingredient}`)
        }
      }
      setIngredients(ingredientList)
      setText('How about: ')

    } catch (error) {
      console.error('Sorry, did not find anything :(', error)
    }
  }

  return (
    <div className='drink'>
      <img src="src/assets/bored.webp" alt="bored" />
      <h3>I am so bored!</h3>
      <button onClick={getDrink}>Get me a drink!</button>
      <h3>{text} {drink}</h3>
      <img src={img} />
      <ul>
        {
          ingredients.map((ingr, index) => (
            <li key={index}>{ingr}</li>
          ))
        }
      </ul>
      <p>{reciep}</p>
    </div>
  )
}

function FindDrink() {

  const [search, setSearch] = useState('')
  const [coctail, setCoctail] = useState(null)
  const [img, setImg] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [reciep, setReciep] = useState(null)

  async function getCoctail() {

    try {
      console.log({ search })
      const response = await axios('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + search);
      const data = response.data.drinks[0]
      setCoctail(data.strDrink)
      setImg(data.strDrinkThumb)
      setReciep(data.strInstructions)

      // Käydään läpi ainesosat (strIngredient1 - strIngredient15)
      const ingredientList = []
      for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`]
        const measure = data[`strMeasure${i}`]
        if (ingredient) {
          ingredientList.push(`${measure ? measure : ''} ${ingredient}`)
        }
      }
      setIngredients(ingredientList)

    } catch (e) {
      setCoctail('Did not find any drink named '+ search + ' :(')
    }
  }

  return (
    <div className='search'>
      <h3>Find a drink:</h3>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      <button onClick={getCoctail}>Search</button>
      <h3>{coctail}</h3>
      <img src={img} />
      <ul>
        {
          ingredients.map((ingr, index) => (
            <li key={index}>{ingr}</li>
          ))
        }
      </ul>
      <p>{reciep}</p>
    </div>
  )
}

export { Header2, OpenData, FindDrink }