import './Card.css'

export default function Card({data}) {

 

  return (
    <div className='bg-card'>
      <div className='div-image'>
        <a className='div-image-avatar' href={data.html_url} target="_blank">
          <img src={data.avatar_url} alt="asdasd" className='image-avatar' />
        </a>
      </div>
      <div className='div-text'>
        <h1 className='username'>{data.name}</h1>
        <p className='description'>{data.bio}</p>
      </div>
    </div>
  )
}