import React from "react";
import classnames from "classnames";

const ActionButton = ({
  children,
  type = "submit",
  style = "btn-primary", // btn-deposit btn-harvest btn-withdraw
  isDisabled,
  isLoading,
  ...rest
}) => {
  //style: btn-deposit, btn-withdraw

  return (
    <button
      type={type}
      className={classnames(
        "inline-flex items-center transition ease-in-out duration-150",
        { "btn btn-disabled": isDisabled },
        "btn",
        style
      )}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default ActionButton;
