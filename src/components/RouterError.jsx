export default function RouterError() {
  return (
    <div className="flex flex-col relative items-center justify-center space-y-20 h-full w-full bg-grey">
      <div className="relative items-start justify-center text-center w-full">
        <h2 className="font-extrabold text-4xl scale-[5.5] text-text-black opacity-10">
          404
        </h2>
        <div className="absolute m-auto font-semibold text-2xl flex items-center justify-center bg-grey w-full">
          Lost in space
        </div>
      </div>
      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity z-10 cursor-pointer"
      >
        Go Back
      </button>
    </div>
  );
}
