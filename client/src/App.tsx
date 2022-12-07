import './App.css'
import './global.css'
import { Header } from './components/Header/Header'
import { SearchBox } from './components/SearchBox/SearchBox'
import { Display } from './components/Display/Display'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className='App'>
      <Header />
      <hr />
      <SearchBox />
      <hr />
      <Display />
      <hr />
      <Footer />
    </div>
  )
}

export default App
