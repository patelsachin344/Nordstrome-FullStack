import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import payment from "./img/payment.png";
import style from "./Cart.module.css";
import React from "react";

import { Link } from "react-router-dom";
import { AddShow } from "../../Components/AddShow";
import { useDispatch, useSelector } from "react-redux";
import { deleteLater } from "../../Features/later/action";
import { createData } from "../../Features/cart/action";

export const CartLater = () => {
  const { laterData, userData } = useSelector((state) => ({
    laterData: state.later.laterData,
    userData: state.loginState.userData,
  }));
  // console.log(laterData, "laterData");

  const dispatch = useDispatch();

  // remove data from later data
  const handleRemove = (laterId) => {
    dispatch(deleteLater(laterId, userData.user._id));
  };

  // again moveData to cartData and go bag data  also removeData from laterData

  const handleMoveBag = (item, laterId) => {
    dispatch(createData(userData.user._id, item));
    dispatch(deleteLater(laterId, userData.user._id));
  };

  // for showing this when data is not available
  if (laterData.success === 0 || laterData.success.length === 0) {
    return (
      <Box>
        <Box m="3% 0">
          <Text fontSize="2rem">You have no saved items</Text>
          <Button
            p="2% 8%"
            m="1% 0"
            bg="none"
            border="1px solid black"
            borderRadius={"none"}
            _hover={{ border: "none", bg: "#e3e3e3" }}
          >
            <Link to={"/productPage"}>Continue Shopping</Link>
          </Button>
          <Box>
            <Text m="2% 0">Accepted Payment Methods</Text>
            <img src={payment} alt="" />
            <Text m="2% 0">
              Need help? Call 1.888.282.6060 or{" "}
              <span className={style.blueColore}>chat with us</span>
              <br />
              <span className={style.blueColore}>
                Shipping internationally?
              </span>
            </Text>
          </Box>
        </Box>
        <AddShow />
      </Box>
    );
  }

  // for showing data when available--------------------------------------------------

  return (
    <Box>
      <Box>
        <Text fontSize={"2rem"} m="2% 0">
          Saved for Later
        </Text>
      </Box>
      <hr />

      {laterData.success.map((item) => (
        <Box
          fontSize="0.8em"
          key={item.products.id + Date.now() + Math.random()}
        >
          <SimpleGrid columns={[1, null, 2]} gap="2%" m="2% 0">
            <Flex>
              <Box m="5% 0">
                <Image height={150} src={item.products.searchImage} />
              </Box>
              <Box m="0 3%">
                <Text m="5% 0">{item.products.product}</Text>
                <Text>Size: {item.products.sizes}</Text>
                <Text>Brand: {item.products.brand}</Text>
                <Text>Item: {item.products.id}</Text>

                <Flex gap="5%" margin="10% 0" fontSize={18}>
                  <button
                    className={style.blueColore}
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                  <button
                    className={style.blueColore}
                    onClick={() => handleMoveBag(item.products, item._id)}
                  >
                    Move to bag
                  </button>
                </Flex>
              </Box>
            </Flex>
            <Flex justifyContent="space-around" alignItems="center">
              <Box>Qty:{item.products.count}</Box>
              <Box textAlign={"center"} m="3%">
                ₹{item.products.price * item.products.count}
              </Box>
            </Flex>
          </SimpleGrid>
          <hr />
        </Box>
      ))}

      <Box>
        <Text m="2% 0">Accepted Payment Methods</Text>
        <img src={payment} alt="" />
        <Text m="2% 0">
          Need help? Call 1.888.282.6060 or{" "}
          <span className={style.blueColore}>chat with us</span>
          <br />
          <span className={style.blueColore}>Shipping internationally?</span>
        </Text>
      </Box>

      <AddShow />
    </Box>
  );
};
