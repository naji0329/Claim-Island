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

export const Modal = ({ isShowing, onClose, className, children, width, maxWidth, title }) =>
  isShowing
    ? ReactDOM.createPortal(
      <React.Fragment>
        <div
          className={`fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster`}
          style={{ background: `rgba(0,0,0,.7)`, zIndex: 1000 }}
        >
          <div
            className="border border-blue-500 shadow-lg bg-white w-2/3 md:max-w-11/12 mx-auto rounded-2xl z-50 overflow-y-auto"
            style={{ width: width ? width : undefined, maxHeight: '95%', maxWidth: maxWidth ? maxWidth : undefined }}
          >
            <div className="py-4 px-6">
              <div className="cursor-pointer z-50 flex flex-row-reverse" onClick={onClose}>
                <svg
                  className="fill-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
              <div className=" flex flex-col text-center text-gray-600 font-aristotelica-bold text-3xl">
                {title}
              </div>

              <div className={`${className}`}>{children}</div>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
    : null;
