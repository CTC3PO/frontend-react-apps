import React from "react";
import { FaTimes } from "react-icons/fa";
import sublinks from "./data";
import { useGlobalContext } from "./context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      <div className="sidebar">
        //add button X to close the sidebar (when in phone view, narrow)
        <button className="close-btn" onClick={closeSidebar}>
          {FaTimes}
        </button>
        <div className="sidebar-links">
          //mapping the page and the link of each sublink from data.js
          {sublinks.map((item, index) => {
            const { links, page } = item;
            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className="sidebar-sublinks">
                  //iterate over links array
                  {links.map((link, index) => {
                    //define what a link is
                    const { url, icon, label } = link;
                    //return each link with icon and label
                    return (
                      <a key={index} href={url}>
                        {icon}
                        {label}
                      </a>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
