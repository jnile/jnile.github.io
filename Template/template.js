async function test() {
    fetch('https://jnile.github.io/Template/Archives/Documents/1/info.json')
    .then(res => res.json())
    .then(json => {
      //json vaiable contains object with data
      console.log(json)
    })
}