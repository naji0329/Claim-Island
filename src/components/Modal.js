import classNames from "classnames";
import React, { useState } from "react";
import ReactDOM from "react-dom";

export const useModal = (props) => {
  const show = props && props.show ? true : false;
  const [isShowing, setIsShowing] = useState(show);

  const toggleModal = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggleModal,
  };
};

export const Modal = ({
  isShowing,
  onClose,
  className,
  children,
  width,
  maxWidth,
  title,
  modalClassName,
  page,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="div_lg">
            <div
              className={`fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster`}
              style={{ background: `rgba(0,0,0,.7)`, zIndex: 1000 }}
            >
              <div
                className={classNames(
                  "border border-blue-500 shadow-lg bg-white  mx-auto rounded-2xl z-50 overflow-y-auto",
                  {
                    "w-2/3 sm:w-full md:max-w-11/12": modalClassName === undefined,
                    [`${modalClassName}`]: modalClassName !== undefined,
                  }
                )}
                style={{ width: "80%", maxHeight: "95%", maxWidth: maxWidth }}
              >
                <div className="py-4 px-6">
                  <div className="z-50 flex justify-end">
                    <button className="cursor-pointer" onClick={onClose}>
                      <svg
                        className="fill-current text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 20 20"
                      >
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                      </svg>
                    </button>
                    </div>
                  <div className={`flex flex-row justify-center text-center text-gray-600 font-aristotelica-bold text-3xl ${!title ? "hidden" : ""}`}>
                    {title}
                  </div>

                  <div className={`${className}`}>{children}</div>
                </div>
              </div>
            </div>

          </div>
          <div className="div_sm">

            <div
              className={`fixed bg-white w-full inset-0 z-50 overflow-hidden flex justify-center animated fadeIn faster`}
              style={{ zIndex: 5, paddingTop: "75px", paddingBottom: "70px" }}
            >
              <div
                className={classNames(
                  "mx-auto z-50 overflow-y-auto",
                  {
                    "w-full md:max-w-11/12": modalClassName === undefined,
                    [`${modalClassName}`]: modalClassName !== undefined,
                  }
                )}
                style={{ width: "100%", maxHeight: "100%", maxWidth: maxWidth }}
              >
                <div className="py-4 px-2">
                  <div className={`flex flex-row justify-center text-center text-gray-600 font-aristotelica-bold text-3xl ${!title ? "hidden" : ""}`}>
                    {title}
                  </div>
                  <div className={`${className}`}>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
