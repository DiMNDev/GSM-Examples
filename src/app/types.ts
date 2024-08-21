export interface AppContextType {
  Products: Products;
  FeaturedProducts: Products;
  userInfo: UserInfo;
  cartItems: CartItems;
  addToCart: (newItem: ProductData, quantity: number) => void;
  removeFromCart: (removeItem: ProductData) => void;
  handleSignIn: (data: FormInputData) => Promise<any>;
  handleSignUp: (data: FormInputData) => Promise<any>;
  handleLogOut: () => void;
}

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

export type Products = ProductData[];

export interface UserInfo {
  username: string;
  loggedIn: boolean;
}

export interface CartItem {
  product: ProductData;
  quantity: number;
}

export type CartItems = CartItem[];
