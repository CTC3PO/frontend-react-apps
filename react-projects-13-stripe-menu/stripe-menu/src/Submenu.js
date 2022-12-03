import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const Submenu = () => {
  //only display submenu when mouse hover over it
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext();

  const container = useRef(null);
  const [columns, setColumns] = useState("col-2");
  //useEffect for whenever location changes (when hover over)
  useEffect(
    () => {
      setColumns("col-2");
      //get the node
      const submenu = container.current;
      //location from the context, change the location of the submenu (dynamically check value for the button when mouse over)
      const { center, bottom } = location;
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      if (links.length === 3) {
        setColumns("col-3");
      }
      if (links.length > 3) {
        setColumns("col-4");
      }
    },
    //add depencies when location and links change:
    [location, links]
  );

  return (
    <aside
      className={`${isSubmenuOPen ? "submenu show" : "submenu"}`}
      ref={container}
    >
      <h4>{page}</h4>
      <div className={`submenu-center col-2`}>
        {links.map((link, index) => {
          const { label, icon, url } = link;
          return (
            <a key={index} href={url}>
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};
