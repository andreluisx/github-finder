import { useContext, useEffect, useState } from 'react'
import image from './assets/images/image.png'
import elipse from './assets/images/elipse.png'
import search from './assets/images/search.png'
import git from './assets/images/git.png'
import github from './assets/images/github.png'
import './App.css'
import Card from './components/Card/Card'
import { ApiContext } from './context/gitHubContext'

function App() {
  const { data, fetchData, loading, error } = useContext(ApiContext)
  const [name, setName] = useState('')

  const renderComponent = () => {
    if (loading){
      return <h1>carregando...</h1>
    }
    if(!data){
      return null
    }
    if(error){
      if(error.type === 'not-found'){
        return <h1 className='error-Text'>Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente</h1>
      } else if (error.type === 'another') {
        return <h1 className='error-Text'>Ocorreu um erro inesperado</h1>
      }
    }
    if (data.created_at){
      return <Card data={data}/>
    }
  }
  
  return (
    <>
    <div className='background'>
      <img src={image} className='elipse-right'></img>
      <img src={elipse} className='elipse-left'></img>
      <div className='rectangle'>
        <div className='header-logos'>
          <img src={git} className='github-logo' alt="github logo"/>
          <p className='perfil'>Perfil</p>
          <img src={github} className='github-text' alt="github logo"/>

        </div>
        <form action="submit" onSubmit={(e) => { e.preventDefault(); fetchData(name); }}>
          <div className='input-text-div'>
              <input 
                className='input-search' 
                onChange={(e) => setName(e.target.value)} 
                type="text" 
                placeholder='Digite um usuário do GitHub' 
              />
              <button className='button-search'>
                <img src={search}  alt="lupa icone" className='search-icon'/>
              </button>
          </div>
       </form>
       <div className='render-component'>
        {renderComponent()}
       </div>
      </div>
      
    </div>
    </>
  )
}

export default App
