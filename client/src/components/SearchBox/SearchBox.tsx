export const SearchBox = () => {
  return (
    <div id='search'>
      <form id='search-form'>
        <div id='search-inputs'>
          <input id='show-title-input' type='text' placeholder='Enter show title' />
          <input id='character-input' type='text' placeholder='Enter character name' />
        </div>
        <input id='submit' type='submit' value='GO' disabled />
      </form>
    </div>
  )
}
