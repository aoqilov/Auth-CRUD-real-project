import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">
        You traveled abit to far my friend. I wish you well in your journey and
        remember,
      </p>
      <p className="mt-2 text-lg italic">
        “If one dream should fall and break into a thousand pieces, never be
        afraid to pick one of those pieces up and begin again.” -
      </p>
      <h6 className="text-center">Flavia Weedn</h6>
      <div className="mt-6">
        <a
          href="/"
          className="px-4 py-2 bg-white text-blue-500 font-semibold rounded"
        >
          Go to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
