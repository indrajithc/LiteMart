const HeaderWidget = async (children) => {
  //  api logic here
  const response = await fetch(
    "https://api.sampleapis.com/futurama/characters"
  );

  const data = await response.json();

  return `<header>
    <h1>Header</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      ${JSON.stringify(data)}
    </nav>`;
};

export default HeaderWidget;
