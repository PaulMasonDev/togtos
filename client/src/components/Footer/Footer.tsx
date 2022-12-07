import TMDBLogo from './tmdb-logo.svg'

export const Footer = () => {
  return (
    <footer>
      <div id='attribution'>
        <p id='powered-by'>Powered by</p>
        <a href='https://www.themoviedb.org/'>
          <img src={TMDBLogo} width='50' />
        </a>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>&copy;2022 Paul Mason</p>
      </div>
    </footer>
  )
}
