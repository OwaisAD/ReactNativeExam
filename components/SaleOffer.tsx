import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { OfferType } from "../types/offerType";
import Moment from "react-moment";
import { formatFirebaseDate } from "../utils/formatDate";
import { formatCurrencyDA } from "../utils/currencyFormat";
import { useRouter } from "expo-router";
import { FontAwesome5, Feather, FontAwesome, Entypo } from "@expo/vector-icons";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { deleteSaleOffer, saveOffer, updateSaleOfferStatus } from "../helperMethods/saleoffer.methods";
import { useState } from "react";
import Loading from "./Loading";
import Modal from "react-native-modal";
import { StatusTypes } from "../constants/StatusTypes";

interface SaleOfferProps {
  saleOffer: OfferType;
  user: any;
  isGrid?: boolean;
  refetch?: () => Promise<void>;
  setActiveTab?: React.Dispatch<React.SetStateAction<StatusTypes>>;
}

const SaleOffer = ({ saleOffer, user, isGrid = false, refetch, setActiveTab }: SaleOfferProps) => {
  const router = useRouter();
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveOffer = async () => {
    try {
      if (!saleOffer.saleOfferId || !user.userId) throw new Error("No offer id or user id found");

      const res = await saveOffer(saleOffer.saleOfferId, user.savedOffers, user.userId);

      showMessage({
        message: res.msg,
        type: "info",
      });

      if (res.msg.includes("removed")) {
        setIsSaved(false);
        refetch && refetch();
      }

      if (res.msg.includes("saved")) {
        setIsSaved(true);
        refetch && refetch();
      }
    } catch (error: any) {
      showMessage({
        message: "Error saving offer. Please try again.",
        type: "danger",
      });
    }
  };

  const renderRightActions = () => {
    if (user?.userId === saleOffer.userId) {
      return (
        <View className="flex-row items-center ml-4">
          <TouchableOpacity
            className="bg-blue-500 justify-center items-center rounded-l-lg w-10 h-10"
            onPress={() => router.push(`/(app)/editoffer/${saleOffer.saleOfferId}`)}
          >
            <Feather name="edit" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 justify-center items-center rounded-r-lg w-10 h-10"
            onPress={handleDeleteOffer}
          >
            <EvilIcons name="trash" size={30} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderLeftActions = () => {
    if (user?.userId === saleOffer.userId) {
      return (
        <View className="flex-row items-center mr-4">
          <TouchableOpacity
            className="bg-blue-500 justify-center items-center rounded-l-lg w-10 h-10"
            onPress={() => router.push(`/messages/${saleOffer.saleOfferId}`)}
          >
            <Feather name="message-circle" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-indigo-500 justify-center items-center rounded-r-lg w-10 h-10"
            onPress={() => setStatusModalOpen(true)}
          >
            <Feather name="repeat" size={20} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const handleDeleteOffer = async () => {
    try {
      Alert.alert("Delete offer", "Are you sure you want to delete this offer?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // Make the onPress function async
            console.log("Deleting offer");
            if (!saleOffer.id || !saleOffer.userId) return;

            // Await the deleteSaleOffer function
            const deletionResult = await deleteSaleOffer(saleOffer.id, saleOffer.userId, user.userId);

            // Check deletion success
            if (deletionResult.success) {
              // If deletion is successful, refetch data and show a success message
              refetch && refetch();
              showMessage({
                message: `Offer: ${saleOffer.title} was deleted successfully.`,
                type: "info",
              });
            } else {
              // If deletion fails, show an error message
              showMessage({
                message: "Error deleting offer. Please try again.",
                type: "danger",
              });
            }
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message);
      showMessage({
        message: "Error deleting offer. Please try again.",
        type: "danger",
      });
    }
  };

  const handleChangeOfferStatus = async (status: string) => {
    try {
      Alert.alert(
        "Change offer status",
        `Are you sure you want to change the status of the offer to ${status.toLowerCase()}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Change",
            onPress: async () => {
              setLoading(true);
              if (!saleOffer.id) throw new Error("No offer id found");
              await updateSaleOfferStatus(saleOffer.id, status as StatusTypes);
              setLoading(false);
              setStatusModalOpen(false);
              setActiveTab && setActiveTab(status as StatusTypes);
              !setActiveTab && refetch && refetch();
            },
          },
        ]
      );
    } catch (error: any) {
      setLoading(false);
      console.error("Error changing offer status:", error);
    }
  };

  return (
    <GestureHandlerRootView className={`${isGrid && "w-[180px]"}`}>
      <Modal
        isVisible={statusModalOpen}
        onBackdropPress={() => setStatusModalOpen(false)}
        animationIn={"fadeInUp"}
        animationOut={"fadeOutDown"}
        className="gap-4"
      >
        {loading ? (
          <>
            <View className="bg-[#EEE] rounded-lg items-center py-8 w-full">
              <Loading size={100} />
            </View>
          </>
        ) : (
          <>
            <View className="bg-[#EEE] rounded-lg items-center py-2 w-full">
              <Text className="text-xl">Change offer status</Text>
            </View>
            <View className="flex-row justify-around rounded-lg bg-[#EEE] py-8 px-4 w-full">
              {/* ACTIVE */}
              <TouchableOpacity
                className={`items-center p-3 bg-[#e1dcdc] rounded-lg h-20 w-20 justify-center ${
                  saleOffer && saleOffer.status === StatusTypes.ACTIVE && "bg-green-400 opacity-50"
                }`}
                disabled={saleOffer && saleOffer.status === StatusTypes.ACTIVE}
                onPress={() => handleChangeOfferStatus(StatusTypes.ACTIVE)}
              >
                <FontAwesome name="toggle-on" size={24} color="black" />
                <Text>Active</Text>
              </TouchableOpacity>
              {/* INACTIVE */}
              <TouchableOpacity
                className={`items-center p-3 bg-[#e1dcdc] rounded-lg h-20 w-20 justify-center ${
                  saleOffer && saleOffer.status === StatusTypes.INACTIVE && "bg-green-400 opacity-50"
                }`}
                disabled={saleOffer && saleOffer.status === StatusTypes.INACTIVE}
                onPress={() => handleChangeOfferStatus(StatusTypes.INACTIVE)}
              >
                <FontAwesome name="toggle-off" size={24} color="black" />
                <Text>Inactive</Text>
              </TouchableOpacity>
              {/* SOLD */}
              <TouchableOpacity
                className={`items-center p-3 bg-[#e1dcdc] rounded-lg h-20 w-20 justify-center ${
                  saleOffer && saleOffer.status === StatusTypes.SOLD && "bg-green-400 opacity-50"
                }`}
                disabled={saleOffer && saleOffer.status === StatusTypes.SOLD}
                onPress={() => handleChangeOfferStatus(StatusTypes.SOLD)}
              >
                <Feather name="check-circle" size={24} color="black" />
                <Text>Sold</Text>
              </TouchableOpacity>
              {/* ARCHIVED */}
              <TouchableOpacity
                className={`items-center p-3 bg-[#e1dcdc] rounded-lg h-20 w-20 justify-center ${
                  saleOffer && saleOffer.status === StatusTypes.ARCHIVED && "bg-green-400 opacity-50"
                }`}
                disabled={saleOffer && saleOffer.status === StatusTypes.ARCHIVED}
                onPress={() => handleChangeOfferStatus(StatusTypes.ARCHIVED)}
              >
                <FontAwesome name="archive" size={24} color="black" />
                <Text>Archive</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Modal>
      <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
        <TouchableOpacity
          className={`flex-1 ${
            isGrid ? "flex-col h-[200px] w-[180px]" : "flex-row h-28"
          } bg-[#D1D5DB] rounded-xl border-[0.2px] border-indigo-200 shadow-sm`}
          onPress={() => router.push(`/offer/${saleOffer.saleOfferId}`)}
        >
          <View className="absolute shadow-sm right-[-1px] bg-white rounded-bl-2xl rounded-tr-lg flex-row items-center py-1 px-2 gap-1 z-10">
            {saleOffer.shipping ? (
              <>
                <FontAwesome5 name="shipping-fast" size={10} color="black" />
              </>
            ) : (
              <>
                <Text className="text-[10px] font-light">No shipping</Text>
              </>
            )}
          </View>

          {/* IMAGE */}
          <View>
            <Image
              source={
                saleOffer.images && saleOffer.images.length > 0
                  ? { uri: saleOffer.images[0] }
                  : require("../assets/images/No-Image.png")
              }
              className={`h-full ${
                isGrid ? "h-28 w-full rounded-t-lg" : "h-full w-28 rounded-bl-xl rounded-br-[31px] rounded-tl-xl"
              }  object-contain`}
            />

            <View
              className={`${
                isGrid ? "text-xs " : "text-sm"
              } bg-[#eee] shadow-xl font-semibold absolute bottom-2 px-2 py-1 rounded-r-xl`}
            >
              <Text>{formatCurrencyDA(saleOffer.price)}</Text>
            </View>
          </View>

          <View className="flex flex-col px-4 mt-1 w-full">
            <View className="flex flex-col ">
              <Text className={`${isGrid ? "text-sm" : "text-base"} font-light`}>{saleOffer.title}</Text>
              {!isGrid && (
                <Text className={`text-xs font-light `}>
                  {saleOffer.description.replace(/\s+/g, " ").trim().slice(0, 30)}...
                </Text>
              )}
            </View>

            <View
              className={`flex flex-row justify-between ${isGrid ? "space-x-6" : "space-x-12"} rounded-lg items-start`}
            >
              <View className="">
                <Text className="text-sm font-light">{saleOffer.zipCode}</Text>
                <Moment element={Text} fromNow className={`${isGrid ? "text-xs" : "text-sm"} font-light`}>
                  {saleOffer.createdAt && formatFirebaseDate(saleOffer.createdAt)}
                </Moment>
                <Text className={`text-sm font-light ${isGrid && "text-xs"}`}>
                  {saleOffer.cityInfo?.zipCode} {saleOffer.cityInfo?.city}
                </Text>
              </View>
            </View>
          </View>
          {/* Save button - only show on offers made by others */}
          {saleOffer.userId !== user?.userId && (
            <TouchableOpacity className="absolute right-1 bottom-1 bg-white rounded-full p-1" onPress={handleSaveOffer}>
              {isSaved || (user.savedOffers && user.savedOffers.includes(saleOffer.saleOfferId)) ? (
                <Feather name="bookmark" size={14} color={"blue"} />
              ) : (
                <Feather name="bookmark" size={14} color={"gray"} />
              )}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default SaleOffer;
