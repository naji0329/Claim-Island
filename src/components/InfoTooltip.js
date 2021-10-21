const InfoTooltip = ({ text }) => {
  return (
    <div
      className="group cursor-pointer absolute inline-block  justify-center items-center"
      style={{ marginTop: "2px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div
        className="mb-1 opacity-0 w-56 bg-black text-white text-left text-xs rounded-lg py-2 absolute z-50 group-hover:opacity-100 bottom-full px-3 pointer-events-none"
        style={{ left: "-650%" }}
      >
        {text}
        <svg
          className="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

export default InfoTooltip;
