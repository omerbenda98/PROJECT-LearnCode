import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SiFramer, SiTailwindcss, SiReact, SiCss3 } from "react-icons/si";
import { RiJavascriptLine } from "react-icons/ri";
import EncryptedButton from "./EncryptedButton";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddCourseModal from "./AddCourseModal";

const IconSideNav = () => {
  return (
    <div className="bg-slate-900 text-slate-100 flex">
      <SideNav />
      <div className="w-full">
        <div className="h-[35px] m-4 rounded border-2 border-dashed border-slate-600 bg-slate-800"></div>
        <div className="h-[400px] m-4 rounded border-2 border-dashed border-slate-600 bg-slate-800"></div>
      </div>
    </div>
  );
};

const SideNav = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleCoursesClick = () => {
    navigate("/coursesPage");
  };

  return (
    <nav className="h-[500px] w-100 h-25 sticky top-0 z-10 bg-slate-950 p-4 flex justify-between items-center">
      <div className="flex flex-row gap-2 text-white">
        <Link to="/">Home</Link>
      </div>
      <div className="flex flex-row gap-2">
        {user ? (
          <>
            {user.role === "ADMIN" && (
              <>
                <AddCourseModal />
              </>
            )}
            {(user.role === "SUBSCRIBED" || user.role === "ADMIN") && (
              <EncryptedButton text="COURSES" onClick={handleCoursesClick} />
            )}
            <EncryptedButton text="LOGOUT" onClick={handleLogoutClick} />
          </>
        ) : (
          <>
            <EncryptedButton text="LOGIN" onClick={handleLoginClick} />
            <EncryptedButton text="REGISTER" onClick={handleRegisterClick} />
          </>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="p-3 text-xl bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-indigo-600 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SideNav;
