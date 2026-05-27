import { NavLink } from "react-router-dom";

import "./Botnav.css";

import HomeIcon from "../assets/home-icon.svg";
import HomeFilledIcon from "../assets/home-filled-icon.svg";

import ConnectionsIcon from "../assets/connections-icon.svg";
import ConnectionsFilledIcon from "../assets/connections-filled-icon.svg";

import MapIcon from "../assets/map-icon.svg";
import MapFilledIcon from "../assets/map-filled-icon.svg";

import ChatIcon from "../assets/chat-icon.svg";
import ChatFilledIcon from "../assets/chat-filled-icon.svg";

import ProfileIcon from "../assets/profile-icon.svg";
import ProfileFilledIcon from "../assets/profile-filled-icon.svg";

const navItems = [
  {
    label: "Hjem",
    to: "/",
    icon: HomeIcon,
    activeIcon: HomeFilledIcon,
  },
  {
    label: "Forbindelser",
    to: "/requests",
    icon: ConnectionsIcon,
    activeIcon: ConnectionsFilledIcon,
  },
  {
    label: "Kort",
    to: "/map",
    icon: MapIcon,
    activeIcon: MapFilledIcon,
  },
  {
    label: "Chat",
    to: "/chat",
    icon: ChatIcon,
    activeIcon: ChatFilledIcon,
  },
  {
    label: "Profil",
    to: "/profile",
    icon: ProfileIcon,
    activeIcon: ProfileFilledIcon,
  },
];

export default function Botnav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className="bottom-nav-link">
          {({ isActive }) => (
            <>
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt={item.label}
                className="bottom-nav-icon"
              />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
