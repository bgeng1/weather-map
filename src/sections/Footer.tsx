const Section = () => {
  return (
    <a href="https://www.google.com" target="_blank">
      Link
    </a>
  );
};

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: "red" }}>
      <Section />
      <Section />
      <Section />
    </div>
  );
};

export default Footer;
