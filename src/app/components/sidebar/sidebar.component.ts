import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // {
  //   path: "/dashboard",
  //   title: "Dashboard",
  //   icon: "icon-chart-pie-36",
  //   class: ""
  // },
  {
    path: "/user",
    title: "User",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/order",
    title: "Order",
    icon: "icon-paper",
    class: ""
  },
  {
    path: "/album",
    title: "Album",
    icon: "icon-headphones",
    class: ""
  },
  // {
  //   path: "/top-hit",
  //   title: "Top Hit",
  //   icon: "icon-chart-bar-32",
  //   class: ""
  // },
  {
    path: "/playlist",
    title: "Playlist",
    icon: "icon-triangle-right-17",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}