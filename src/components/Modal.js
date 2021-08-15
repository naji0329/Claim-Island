import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from "react";
import ReactDOM from "react-dom";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export const Modal = ({ isShowing, onClose, className, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className={`fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster`}
            style={{ background: `rgba(0,0,0,.7)`, zIndex: 1000 }}
          >
            <div className="border border-blue-500 shadow-lg bg-white w-2/3 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
              <div className="py-4 text-left px-6">
                <div className="flex justify-end items-center pb-3">
                  {/* <p className="text-2xl font-bold text-gray-500">{title}</p> */}
                  <div className="cursor-pointer z-50" onClick={onClose}>
                    <svg
                      className="fill-current text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                  </div>
                </div>

                <div className={`${className}`}>{children}</div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
