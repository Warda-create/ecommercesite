import React from "react";

export default function ExtraServices() {
  const services = [
    {
      title: "Source From Industry Hubs",
      img: "/images/industry.jpg",
    },
    {
      title: "Customize Your Products",
      img: "/images/customize.jpg",
    },
    {
      title: "Fast, reliable shipping by ocean or air",
      img: "/images/air.jpg",
    },
    {
      title: "Product monitoring and inspection",
      img: "/images/inspection.jpg",
    },
  ];

  const regions = [
    { country: "Arabic Emirates", flag: "/images/arabic.png" },
    { country: "Australia", flag: "/images/australia.png" },
    { country: "United States", flag: "/images/united.png" },
    { country: "Russia", flag: "/images/russia.png" },
    { country: "Italy", flag: "/images/italy.png" },
    { country: "Denmark", flag: "/images/denmark.png" },
    { country: "France", flag: "/images/france.png" },
    { country: "Pakistan", flag: "/images/1.png" },
    { country: "China", flag: "/images/china.png" },
    { country: "Great Britain", flag: "/images/britain.jpg" },
  ];

  return (
    <div className="space-y-16">

      {/* EXTRA SERVICES */}
      <div className="space-y-6">
  <h2 className="text-2xl font-bold text-start">
    Our extra services
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {services.map((item, index) => (
      <div
        key={index}
        className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition w-full"
      >
        {/* IMAGE WITH BLACK OVERLAY */}
        <div className="h-44 w-full relative">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold leading-snug text-gray-900">
            {item.title}
          </h3>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* SUPPLIERS BY REGION */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-start">
          Suppliers by region
        </h2>

        {/* ROW 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {regions.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg hover:shadow-md transition w-full"
            >
              <div className="flex justify-center flex-shrink-0">
                <img
                  src={item.flag}
                  alt={item.country}
                  className="w-10 h-7 object-cover rounded-sm"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.country}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {item.country.toLowerCase()}.com
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {regions.slice(5, 10).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg hover:shadow-md transition w-full"
            >
              <div className="flex justify-center flex-shrink-0">
                <img
                  src={item.flag}
                  alt={item.country}
                  className="w-10 h-7 object-cover rounded-sm"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.country}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {item.country.toLowerCase()}.com
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}