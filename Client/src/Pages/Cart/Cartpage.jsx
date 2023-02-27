import {
  Box,
  Center,
  ChakraProvider,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { CartBag } from "./CartBag";
import { CartLater } from "./CartLater";
import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../Contex/StateContext";
import ScrollToTop from "react-scroll-to-top";
import { RiArrowUpSLine } from "react-icons/ri";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getLater } from "../../Features/later/action";
import { getData } from "../../Features/cart/action";

export const Cartpage = () => {
  const { laterBagLen } = useContext(StateContext);

  const [bagstate, setBagState] = useState(true);
  const handlBag = () => {
    setBagState(true);
  };
  const handleLater = () => {
    setBagState(false);
  };

  const { cartData, laterData, userData } = useSelector((state) => ({
    cartData: state.cart.cartData,
    laterData: state.later.laterData,
    userData: state.loginState.userData,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.user) {
      dispatch(getData(userData.user._id));
      dispatch(getLater(userData.user._id));
    }
  }, [userData.user]);
  // console.log(cartData.success, "cartPage");

  return (
    <ChakraProvider>
      <ScrollToTop
        smooth={"true"}
        viewBox={"0 0 30 30"}
        component={
          <Box>
            <Center>
              <RiArrowUpSLine size={"20px"} width={"400"} />
            </Center>
            <Text color={"#393939"} fontSize={"13px"}>
              Top
            </Text>
          </Box>
        }
      />
      <Navbar />

      <Box p="0% 5%">
        <Tabs>
          <TabList border="none">
            <Tab onClick={handlBag} border="1px solid black">
              Shoping Bag ({cartData.success ? cartData.success.length : 0})
            </Tab>{" "}
            <Tab onClick={handleLater} border="1px solid black">
              Save for later ({laterData.success ? laterData.success.length : 0}
              )
            </Tab>
          </TabList>
        </Tabs>
        {bagstate ? <CartBag /> : <CartLater />}
      </Box>
      <Footer />
    </ChakraProvider>
  );
};
