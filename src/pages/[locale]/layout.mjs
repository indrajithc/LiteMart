import HeaderWidget from "../../widgets/Header/index.mjs";

const localeBaseLayout = async (children) => {
  return `<html><head><title>Home Page</title></head><body>
  ${await HeaderWidget()}
  ${children}</body></html>`;
};

export default localeBaseLayout;
