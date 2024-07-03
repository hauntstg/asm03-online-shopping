import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Footer from "./Footer";
import LiveChat from "./LiveChat";

function RootLayout() {
  // khi popup hiển thị thêm class active để làm mờ background
  const show = useSelector((state) => state.showPopup.show);
  return (
    <div className={show ? "active" : ""}>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <LiveChat />
      <Footer />
    </div>
  );
}

export default RootLayout;
