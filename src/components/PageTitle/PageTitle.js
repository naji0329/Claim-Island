export const PageTitle = ({ title }) => (
  <>
    {title && (
      <h1 className="text-6xl text-shadow pt-2 font-extrabold font-aristotelica-bold text-white">
        {title}
      </h1>
    )}
  </>
);
