import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const value = useMemo(
    () => ({ mobileOpen, toggleMobile, closeMobile }),
    [mobileOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSidebar() {
  return useContext(SidebarContext);
}

export default SidebarContext;
