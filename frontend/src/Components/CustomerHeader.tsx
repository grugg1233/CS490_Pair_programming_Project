const CustomersHeader = () => {
  return (
    <div className="relative h-64 border-b border-white/10 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />

      <div
        className="
          absolute inset-0 opacity-10
          bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600')]
          bg-cover bg-center
        "
      />

      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
      </div>
    </div>
  );
};

export default CustomersHeader;
