export const Display = () => {
  return (
    <div id='info-display'>
      <div id='character'>
        <h3 id='character-name'>Character Name Here</h3>
      </div>
      <h4>
        from <span id='show-title'>show title</span>
      </h4>
      <h5>is portrayed by</h5>
      <div id='actor'>
        <img id='actor-img' src={''} height='450' width='300' />
        <h3 id='actor-name'>Actor Name Here</h3>
      </div>
    </div>
  )
}
