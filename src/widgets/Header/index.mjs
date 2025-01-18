const HeaderWidget = async (children) => {
  //  api logic here
  const response = await fetch(
    "https://raw.githubusercontent.com/indrajithc/LiteMart/refs/heads/main/__mocks__/api/navigation.json"
  );

  const { navigation } = await response.json();

  return `<header>
    <h1>Header</h1>
    <nav>
      <ul>
      ${navigation.map((link, index) => {
        return `<li key=${index}>
            <a href=${link.path}>${link.label}</a>
          </li>`;
      })}
      </ul>
    </nav>`;
};

export default HeaderWidget;
