import Link from "next/link";
// import dayjs from "dayjs";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { IoLockOpenOutline } from "react-icons/io5";
import { FiPhoneCall, FiUser } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

//internal import
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const NavBarTop = () => {
  const userInfo = getUserSession();
  const router = useRouter();

  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const handleLogOut = () => {
    signOut();
    Cookies.remove("userInfo");
    Cookies.remove("couponInfo");
    Cookies.remove("shippingAddress");
    router.push("/");
  };

  useEffect(() => {
    if (userInfo) {
      const decoded = jwtDecode(userInfo?.token);

      const expireTime = new Date(decoded?.exp * 1000);
      const currentTime = new Date();

      // console.log(
      //   // decoded,
      //   "expire",
      //   dayjs(expireTime).format("DD, MMM, YYYY, h:mm A"),
      //   "currentTime",
      //   dayjs(currentTime).format("DD, MMM, YYYY, h:mm A")
      // );
      if (currentTime >= expireTime) {
        console.log("token expire, should sign out now..");
        handleLogOut();
      }
    }
  }, [userInfo]);

  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-10">
          <div className="text-gray-700 py-2 sm:py-2.5 font-sans text-xs font-medium border-b flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <span className="flex items-center text-xs sm:text-xs">
              <FiPhoneCall className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {showingTranslateValue(
                  storeCustomizationSetting?.navbar?.help_text
                )}
              </span>
              <a
                href={`tel:${
                  storeCustomizationSetting?.navbar?.phone || "+099949343"
                }`}
                className="font-bold text-[#EF4036] ml-0 sm:ml-1 text-xs sm:text-xs"
              >
                {storeCustomizationSetting?.navbar?.phone || "+099949343"}
              </a>
            </span>

            <div className="text-center sm:text-right flex items-center justify-center sm:justify-end navBar gap-2 sm:gap-0">
              {/* Contact item removed as per request */}
              {/* <Link
                href="/user/my-account"
                className="font-medium hover:text-[#EF4036]"
              >
                {showingTranslateValue(
                  storeCustomizationSetting?.navbar?.my_account
                )}
              </Link>
              <span className="mx-2">|</span> */}
              {/* {userInfo?.email ? (
                <button
                  onClick={handleLogOut}
                  className="flex items-center font-medium hover:text-[#EF4036]"
                >
                  <span className="mr-1">
                    <IoLockOpenOutline />
                  </span>
                  {showingTranslateValue(
                    storeCustomizationSetting?.navbar?.logout
                  )}
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center font-medium hover:text-[#EF4036]"
                >
                  <span className="mr-1">
                    <FiUser />
                  </span>

                  {showingTranslateValue(
                    storeCustomizationSetting?.navbar?.login
                  )}
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(NavBarTop), { ssr: false });
