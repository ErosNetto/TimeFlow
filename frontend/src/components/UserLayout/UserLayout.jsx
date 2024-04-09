import NavBarUser from "../NavBarUser/NavBarUser";
import Footer from "../Footer/Footer";

function UserLayout({ children }) {
  return (
    <div className="container">
      <NavBarUser />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default UserLayout;
