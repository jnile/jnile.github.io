async function test() {
    const requestURL = 'https://jnile.github.io/Template/Archives/Documents/1/info.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  console.log();
}