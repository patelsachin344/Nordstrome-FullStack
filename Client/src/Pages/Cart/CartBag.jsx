import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaShuttleVan } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import payment from "./img/payment.png";
import style from "./Cart.module.css";

import { Link } from "react-router-dom";
import { AddShow } from "../../Components/AddShow";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, updateData } from "../../Features/cart/action";
import { createLater } from "../../Features/later/action";

export const CartBag = () => {
  const dispatch = useDispatch();
  // data get in redux for bag by click add to cart
  const { cartData, userData } = useSelector((state) => ({
    cartData: state.cart.cartData,
    userData: state.loginState.userData,
  }));

  let totlePrice = 0;

  // remove data from bag data
  const handleRemove = (cartId) => {
    dispatch(deleteData(cartId, userData.user._id));
  };

  //  SaveData to laterData  also removeData from cartData
  const handleLater = (item, cartId) => {
    dispatch(createLater(userData.user._id, item));
    dispatch(deleteData(cartId, userData.user._id));
  };
  // console.log(cartData, "CartData moved");

  // for decreament quantity of products in cart
  const handleDecrement = (id, count) => {
    dispatch(updateData(id, --count, userData.user._id));
  };

  // for increment quantity of products in cart
  const handleIncreament = (id, count) => {
    dispatch(updateData(id, ++count, userData.user._id));
  };

  // for showing this when  data is not available
  if (cartData.length === 0 || cartData.success.length === 0) {
    return (
      <ChakraProvider>
        <Box>
          <Box m="3% 0">
            <Text fontSize="2rem">Your bag is empty</Text>
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
      </ChakraProvider>
    );
  }

  // for showing data when available--------------------------------------------------
  return (
    <ChakraProvider>
      <Box>
        <Box>
          <Text fontSize={"2rem"} m="2% 0">
            Shopping Bag
          </Text>
          <Text p="1% 0">Items in your bag are not on hold.</Text>
          <Flex alignItems="center">
            {" "}
            <GoGift />
            <Text p="0 1%">Choose gift options when you check out.</Text>
          </Flex>
          <hr />
          <Box m="3% 0">
            <Flex alignItems="center">
              <FaShuttleVan />
              <Text fontSize="1.5rem" p="0 1%">
                Delivery ({cartData.success.length} items) to{" "}
                <span className={style.blueColore}>India</span>
              </Text>
            </Flex>
            <Text m="0 2%">International shipping</Text>
          </Box>
        </Box>
        <hr />

        {cartData.success.map((item, index) => (
          <Box
            fontSize="0.8em"
            key={item.products.id + Date.now() + Math.random()}
          >
            <Box display="none">
              {" "}
              {(totlePrice += item.products.price * item.products.count)}
            </Box>
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

                  <Flex margin="3% 1%">
                    <Button
                      disabled={item.products.count === 1}
                      onClick={() =>
                        handleDecrement(item._id, item.products.count)
                      }
                    >
                      -
                    </Button>
                    <Button>{item.products.count}</Button>
                    <Button
                      onClick={() =>
                        handleIncreament(item._id, item.products.count)
                      }
                    >
                      +
                    </Button>
                  </Flex>

                  <Flex gap="5%" fontSize={18}>
                    <button
                      className={style.blueColore}
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className={style.blueColore}
                      onClick={() => handleLater(item.products, item._id)}
                    >
                      Save for later
                    </button>
                  </Flex>
                </Box>
              </Flex>
              <Flex>
                <Box>
                  <Checkbox
                    isDisabled
                    borderRadius="50%"
                    m="5% 0"
                    color="black"
                  >
                    Not available for pickup
                  </Checkbox>

                  <br />

                  <label htmlFor="checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="checkbox"
                      className={style.checkbox_round}
                    />
                    Delivery
                    <Text m="1% 8%">
                      International orders usually arrive within 5–13 business
                      days. We'll give you delivery dates in checkout.
                    </Text>
                  </label>
                </Box>
                <Box textAlign={"center"} m="3%">
                  ₹{item.products.price * item.products.count}
                </Box>
              </Flex>
            </SimpleGrid>
            <hr />
          </Box>
        ))}

        <SimpleGrid columns={[1, null, 2]} gap="10%" m="2% 0">
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
          <Box>
            <Flex justifyContent="space-between" m="2% 0">
              <Text>Subtotal</Text>
              <Text>₹ {totlePrice}</Text>
              <Box display="none">
                {localStorage.setItem("totlePrice", JSON.stringify(totlePrice))}
              </Box>
            </Flex>
            <hr />
            <Link to={"/paymentpage"}>
              <Button
                m="2% 0"
                p="6% 40%"
                borderRadius="none"
                bg="black"
                color="white"
                _hover={{ bg: "rgb(41, 38, 38)" }}
              >
                Check Out
              </Button>
            </Link>
          </Box>
        </SimpleGrid>

        <AddShow />
      </Box>
    </ChakraProvider>
  );
};
