import { Link } from "react-router-dom";
import React from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getCompanyData } from "../../services/companyDataService";
import { companyProps } from "../../types/companyData";

export function Header() {
  const [data, setData] = React.useState<companyProps>();
  const [showInput, setShowInput] = React.useState(false)  
  React.useEffect(() => {
    async function fetchCompany() {
      const data = await  getCompanyData();
      setData(data);
    }

    fetchCompany();
  }, []);

  return (
    <div className="w-full bg-black text-white">

      <div className="px-4 py-2 mx-auto max-w-7xl flex items-center justify-between relative">
        <span className="text-[#DBCE06] font-semibold text-sm">
          {data?.name}
        </span>

        <Link
          to="/"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={data?.image_url}
            className="rounded-full w-[80px] mt-12  border-black bg-white"
            alt="Logo"
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-white text-sm">
            <IoIosInformationCircle /> Info
          </span>

          <div className="block md:hidden items-center">

            {!showInput ? (
                <button onClick={() => setShowInput(true)} className="py-1">
                    <FaSearch className="text-black bg-[#D4D4D4] p-1 rounded-md" />
                </button>
            ) : (
                <div 
                className="flex items-center bg-[#D4D4D4] px-2 s py-1 roudend-md transition-ease-in duration-300 ">

                    <input type="text"
                        placeholder="Buscar"
                        className="bg-transparent text-black text-sm placeholder-black placeholder:font-medium outline-none w-[50px] "
                    />

                    <button onClick={() => setShowInput(false)}>
                    <FaSearch className="text-black text-xs ml-1" />
                    </button>

                </div>
            )
            }

          </div>



          <div className="hidden md:flex items-center bg-[#D4D4D4] px-2 py-1 rounded-md">
            <input
              type="text"
              placeholder="Buscar"
              className="bg-transparent text-black text-sm placeholder-black placeholder:font-medium outline-none w-[80px]"
            />
            <FaSearch className="text-black text-xs ml-1" />
          </div>
        </div>
      </div>

      <div className="bg-white">
          <div className=" text-black text-sm px-4 py-1 flex items-center justify-between max-w-7xl mx-auto">
            <span className="text-green-600">• Loja aberta</span>
            <div className="flex items-center justify-end gap-1 md:text-[12px] text-[10px]">
              <FaLocationDot className="text-black" />
              <span className="text-[#0e0b0b]  md:max-w-[60%] max-w-[47%] leading-3.5 font-semibold font-inter">{data?.address}</span>
            </div>
          </div>
      </div>
    </div>
  );
}
