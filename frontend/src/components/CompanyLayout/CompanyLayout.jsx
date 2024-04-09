import NavBarCompany from "../NavBarCompany/NavBarCompany";
import Footer from "../Footer/Footer";

function CompanyLayout({ children }) {
  return (
    <div className="container">
      <NavBarCompany />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default CompanyLayout;
