import { createContext, useState } from "react";

const Contextapi = createContext();

const Appprovider = ({ children }) => {
  const [activetopbar, setactivetopbar] = useState(false);
  const [activesidebar, setactivesidebar] = useState(false);
  const [pro_tax, set_protax] = useState(0);
  const [pro_total_amount, set_prototal_amount] = useState(0);
  const [taxData, setTaxData] = useState({
    taxType: "Exclusive",
    taxAmount: 0,
    isCustomTaxEnabled: false,
    customTaxMethod: "Fixed",
    customTaxAmount: 0,
    description: "",
    taxSelection: "custom",
  });

  // Store discounts for multiple products using product.id as key
  const [productDiscounts, setProductDiscounts] = useState({});

  const updateProductDiscount = (productId, discountData) => {
    setProductDiscounts((prev) => ({
      ...prev,
      [productId]: discountData,
    }));
  };

  return (
    <Contextapi.Provider
      value={{
        activetopbar,
        setactivetopbar,
        activesidebar,
        setactivesidebar,
        pro_tax,
        set_protax,
        pro_total_amount,
        set_prototal_amount,
        productDiscounts,
        taxData, setTaxData ,
        updateProductDiscount, // Function to update discount per product
      }}
    >
      {children}
    </Contextapi.Provider>
  );
};

export { Contextapi, Appprovider };
