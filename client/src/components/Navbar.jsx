import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  SiFramer,
  SiTailwindcss,
  SiReact,
  SiJavascript,
  SiCss3,
} from "react-icons/si";
import { RiJavascriptLine } from "react-icons/ri";

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

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <nav className="h-[500px] w-100 h-25 sticky top-0 z-10 bg-slate-950 p-4 flex flex-row items-center gap-2">
      {/* Temp logo from https://logoipsum.com/ */}

      <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
        <SiTailwindcss className="bright-icon" />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <SiReact className="bright-icon" />
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <RiJavascriptLine className="bright-icon" />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <SiFramer className="bright-icon" />
      </NavItem>
      <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
        <SiCss3 className="bright-icon" />
      </NavItem>
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