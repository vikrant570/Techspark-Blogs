import { useState, useEffect} from "react";
import { Outlet, useLocation} from "react-router-dom";
import Header from "./Components/Partials/Header";
import FormPopup from "./Components/Authorization/FormPopup";
import Footer from "./Components/Partials/Footer";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [categorySearch, setCategorySearch] = useState("");

  const openForm = () => setModalOpen(true);
  const closeForm = () => setModalOpen(false);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({top : 0, behavior : 'smooth'}); // Scrolls to top on route change
  }, [location]); // Re-run when location changes

  return (
    <>
      {modalOpen ? <FormPopup closeForm={closeForm} /> : <></>}
      <Header openForm={openForm} />;
      <div id="main-content" className="mt-36 px-16 min-h-screen">
        <Outlet context={{pageNo, setPageNo, categorySearch, setCategorySearch, openForm}}/>
      </div>
      <Footer />
    </>
  );
}

export default App;
