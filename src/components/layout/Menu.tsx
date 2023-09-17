import React, { useState, useEffect } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BiTime } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const MenuItems = [
    {
      title_category: null,
      items: [
        {
          title: "Dashboard",
          icon: <BiSolidDashboard color="white" />,
          link: "/dashboard",
        },
      ],
    },
    {
      title_category: "Gestion",
      items: [
        {
          title: "Réservations",
          icon: <BiTime color="white" />,
          link: "/reservations",
        },
      ],
    },
    {
      title_category: null,
      items: [
        {
          title: "Horaires & Services",
          icon: <BiTime color="white" />,
          link: "/horaires_services",
        },
      ],
    },

    {
      title_category: null,
      items: [
        {
          title: "Cartes & Menus",
          icon: <BiTime color="white" />,
          link: "/cartes_menus",
        },
      ],
    },
    {
      title_category: null,
      items: [
        {
          title: "Deconnexion",
          icon: <BiLogOut color="white" />,
          link: "/logout",
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    for (let i = 0; i < MenuItems.length; i++) {
      const items = MenuItems[i].items;
      for (let j = 0; j < items.length; j++) {
        if (items[j].link === currentPath) {
          setSelectedCategory(i);
          setSelectedItem(j);
          return;
        }
      }
    }
  }, [location, MenuItems]);

  const handleMenuItemClick = (categoryIndex: any, itemIndex: any) => {
    setSelectedCategory(categoryIndex);
    setSelectedItem(itemIndex);

    const selectedItem = MenuItems[categoryIndex]?.items[itemIndex];
    if (selectedItem?.link) {
      navigate(selectedItem.link);
    }
  };

  return (
    <div className="flex flex-col w-[90%]">
      {MenuItems.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-[10px]">
          {category.title_category && (
            <p className="text-[white] text-[13px] font-bold mb-[5px]">
              {category.title_category}
            </p>
          )}
          {category.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              style={{
                cursor: "pointer",
              }}
              className={`flex flex-row items-center p-[10px] ${
                selectedCategory === categoryIndex && selectedItem === itemIndex
                  ? "bg-[#4F4F52] rounded-[5px]"
                  : ""
              }`}
              onClick={() => handleMenuItemClick(categoryIndex, itemIndex)}
            >
              {item.icon}
              <p className="ml-[20px] text-[white] text-[14px] font-[400] line-clamp-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
