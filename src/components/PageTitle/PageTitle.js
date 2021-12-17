export const PageTitle = ({ title }) => (
  <>
    {title && (
      <h1 className="text-6xl pt-2 text-shadow font-extrabold font-aristotelica-bold text-white">
        {title}
      </h1>
    )}
  </>
);
