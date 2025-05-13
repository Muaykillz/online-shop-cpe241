// src/components/FlashSaleBanner.jsx
const salesData = [
  {
    title: "พี่แฮมสั่งลด!",
    desc: "Limited time offers. Up to 50% off selected items!",
    time: { h: 11, m: 24, s: 36 },
    bgColor: "from-pink-400 to-pink-600",
    imageUrl: "/images/ham1.png", // แก้ path ตามจริง
  },
  {
    title: "พี่แฮมถูกหวย!",
    desc: "Limited time offers. Up to 70% off selected items!",
    time: { h: 8, m: 55, s: 12 },
    bgColor: "from-green-300 to-green-500",
    imageUrl: "/images/ham2.png",
  },
  {
    title: "เพียวริคุสักหน่อยมั้ย!",
    desc: "Limited time offers. Up to 5% off selected items!",
    time: { h: 72, m: 1, s: 49 },
    bgColor: "from-yellow-300 to-yellow-500",
    imageUrl: "/images/pureiku.png",
  },
];

const FlashSaleBanner = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold text-purple-600">⚡ Flash sale baner</h2>
      {salesData.map((sale, index) => (
        <div
          key={index}
          className={`rounded-xl overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r ${sale.bgColor} shadow-md`}
        >
          <div>
            <h3 className="text-2xl font-bold text-white">{sale.title}</h3>
            <p className="text-white mt-1">{sale.desc}</p>
            <div className="mt-3 flex gap-2 text-sm text-white font-mono">
              <span className="bg-black bg-opacity-30 rounded px-2 py-1">{sale.time.h}h</span>
              <span className="bg-black bg-opacity-30 rounded px-2 py-1">{sale.time.m}m</span>
              <span className="bg-black bg-opacity-30 rounded px-2 py-1">{sale.time.s}s</span>
            </div>
            <button className="mt-4 px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-100 transition">
              Learn more
            </button>
          </div>
          <img
            src={sale.imageUrl}
            alt="Promo"
            className="w-28 h-28 object-contain ml-4"
          />
        </div>
      ))}
    </div>
  );
};

export default FlashSaleBanner;
