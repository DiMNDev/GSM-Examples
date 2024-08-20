export enum linkRefs {
  home = "/home",
  products = "/products",
  cart = "/cart",
  login = "/login",
}

export enum linkNames {
  home = "Home",
  products = "Products",
  cart = "Cart",
  login = "Login",
}

export interface NavLink {
  linkName: linkNames;
  linkHref: linkRefs;
}

export type NavLinks = NavLink[];

export interface FormInputData {
  username: string;
  password: string;
  email?: string;
  confirm?: string;
}

export interface ProductData {
  title: string;
  image: string;
  description: string;
  price: number;
  featured: boolean;
}
