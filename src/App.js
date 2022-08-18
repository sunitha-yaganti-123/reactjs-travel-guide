import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import TravelGuideItem from './components/TravelGuideItem'

import './App.css'

const App = () => {
  const [loadItem, setLoadItem] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const url = 'https://apis.ccbp.in/tg/packages'
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const resultData = await response.json()
      const formatData = resultData.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      setLoadItem(false)
      setData(formatData)
    }
    getData()
  }, [])
  return (
    <div className="container">
      <h1 className="heading">Travel Guide</h1>
      <>
        {loadItem === true ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travel-list-element">
            {data.map(i => (
              <TravelGuideItem details={i} key={i.id} />
            ))}
          </ul>
        )}
      </>
    </div>
  )
}

export default App
