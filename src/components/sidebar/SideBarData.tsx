import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/app",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "New",
    path: "/app/new",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: "Reports",
    //     path: "/reports/reports1",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Reports 2",
    //     path: "/reports/reports2",
    //     icon: <IoIcons.IoIosPaper />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Reports 3",
    //     path: "/reports/reports3",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  {
    title: "About",
    path: "/app/about",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Contact",
    path: "/app/contact",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: "Message 1",
    //     path: "/messages/message1",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    //   {
    //     title: "Message 2",
    //     path: "/messages/message2",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  {
    title: "List Car",
    path: "/app/listcar",
    icon: <IoIcons.IoIosPaper />,
  },

  {
    title: "Mybooking",
    path: "/app/listbookings",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
