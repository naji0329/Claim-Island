import OnramperWidget from "@onramper/widget";

export const Onramper = () => {
  return (
    <OnramperWidget
      className="Onramper"
      API_KEY={process.env.REACT_APP_ONRAMPER_API_KEY}
      defaultCrypto="BNB"
      defaultFiat="USD"
      fontFamily="Montserrat-Medium"
      color="#367bfb"
    />
  );
};
