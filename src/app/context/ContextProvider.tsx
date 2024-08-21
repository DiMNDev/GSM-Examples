"use client";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  AppContextType,
  UserInfo,
  CartItems,
  ProductData,
  Products,
  FormInputData,
} from "@/app/types";

const defaultValue: AppContextType = {
  Products: [
    {
      title: "",
      image: "",
      description: "",
      price: 0,
      featured: false,
    },
  ],
  FeaturedProducts: [
    {
      title: "",
      image: "",
      description: "",
      price: 0,
      featured: false,
    },
  ],
  userInfo: {
    username: "Guest",
    loggedIn: false,
  },
  cartItems: [],
  addToCart: function (newItem: ProductData, quantity: number) {},
  removeFromCart: function (removeItem: ProductData) {},
  handleSignIn: () => new Promise<void>((resolve, reject) => {}),
  handleSignUp: () => new Promise<void>((resolve, reject) => {}),
  handleLogOut: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({
  children,
}: ContextProviderProps): React.JSX.Element => {
  //#region Handle UserInfo
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "Guest",
    loggedIn: false,
  });

  const handleSignUp = async (data: FormInputData) => {
    const endpoint = "/api/sign-up";
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const responseData = await response.json();
    setUserInfo((prev) => ({
      ...prev,
      username: responseData.user.name,
      loggedIn: true,
    }));
    return responseData;
  };

  const handleSignIn = async (data: FormInputData) => {
    const endpoint = "/api/sign-in";
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const responseData = await response.json();
    setUserInfo((prev) => ({
      ...prev,
      username: responseData.user.name,
      loggedIn: true,
    }));
    return responseData;
  };

  const handleLogOut = () => {
    setUserInfo({ username: "Guest", loggedIn: false });
  };
  //#endregion

  //#region Handle Cart
  const [cartItems, updateCart] = useState<CartItems>([
    {
      product: {
        title: "",
        image: "",
        description: "",
        price: 0,
        featured: false,
      },
      quantity: 0,
    },
  ]);

  const addToCart = (newItem: ProductData, quantity?: number | 1) => {
    console.log("ADDED");
    console.log(newItem);
    updateCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product.title === newItem.title
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product.title === newItem.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product: { ...newItem }, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    console.log("contextCart:", cartItems);
  }, [addToCart]);

  const removeFromCart = (removeItem: ProductData) => {
    updateCart((prev) =>
      prev.filter((item) => item.product.title === removeItem.title)
    );
  };
  //#endregion

  //#region Handle Products
  const [Products, setProducts] = useState<Products>([
    { title: "", image: "", description: "", price: 0, featured: false },
  ]);
  const [FeaturedProducts, setFeaturedProducts] = useState<Products>([
    { title: "", image: "", description: "", price: 0, featured: false },
  ]);

  const loadProducts = async () => {
    const endpoint = "/api/get-all-products";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      const productData = await response.json();
      const FeaturedProducts = productData.Featured;
      const Products = productData.Products;
      setProducts(Products);
      setFeaturedProducts(FeaturedProducts);
    } else {
      console.log(response);
      return null;
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  //#endregion
  const Values: AppContextType = {
    userInfo,
    Products,
    FeaturedProducts,
    cartItems,
    addToCart,
    removeFromCart,
    handleSignUp,
    handleSignIn,
    handleLogOut,
  };

  return <AppContext.Provider value={Values}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  return useContext(AppContext);
}
