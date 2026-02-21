const Info = ({ label, value }: { label: string; value: string | number }) => (
  <div
    className="
      pl-4 p-2 rounded-xl
      bg-gradient-to-br from-zinc-900 to-black
      border border-white/10
      shadow-[0_8px_30px_rgba(0,0,0,0.4)]
    "
  >
    <p className="text-sm text-white/60 tracking-wide">{label}</p>
    <p className="mt-1 text-lg font-semibold text-white">{value}</p>
  </div>
);

export default Info;
