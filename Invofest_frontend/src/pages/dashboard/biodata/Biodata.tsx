// @ts-ignore
import Izal from "../../../assets/izal.jpeg";

export default function BiodataIndex() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#7d2020]">
          Biodata Mahasiswa
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Profile Card */}
        <div className="w-full md:w-1/3 bg-[#ffffff] rounded-2xl shadow-sm border border-[#7d2020] overflow-hidden flex justify-center">
          <div className="flex flex-col pb-8 px-6 py-8 justify-center items-center">

            <img
              src={Izal}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[#7d2020] shadow-md bg-white mb-4 object-cover"
            />

            <h2 className="text-xl font-bold text-[#7d2020]">
              Faizal Isman
            </h2>

            <span className="text-sm font-medium bg-[#ffffff] text-[#7d2020] px-3 py-1 rounded-full mt-2 border border-[#7d2020]">
              D4 Teknik Informatika
            </span>

            <span className="text-sm font-medium bg-[#ffffff] text-[#7d2020] px-3 py-1 rounded-full mt-2 border border-[#7d2020]">
              Universitas Harkat Negeri
            </span>

          </div>
        </div>

        {/* Detail */}
        <div className="w-full md:w-2/3 bg-[#ffffff] rounded-2xl shadow-sm border border-[#7d2020] p-8">
          <h3 className="text-lg font-bold text-[#7d2020] border-b border-[#7d2020] pb-4 mb-6">
            Informasi Detail
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">

            <div className="flex flex-col">
              <span className="text-sm text-[#7d2020] mb-1">
                Nama
              </span>
              <span className="font-semibold text-[#000000]">
                Faizal Isman
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-[#7a6a58] mb-1">
                NIM
              </span>
              <span className="font-semibold text-[#000000]">
                24090074
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-[#7a6a58] mb-1">
                Program Studi
              </span>
              <span className="font-semibold text-[#000000]">
                D4 Teknik Informatika
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-[#7a6a58] mb-1">
                Project
              </span>
              <span className="font-semibold text-[#000000]">
                Web Invofest
              </span>
            </div>

            <div className="flex flex-col sm:col-span-2 mt-2">
              <span className="text-sm text-[#7a6a58] mb-2">
                Tentang Saya
              </span>

              <p className="text-[#000000] text-sm leading-relaxed bg-[#ffffff] p-4 rounded-xl border border-[#7d2020]">
                Saya adalah mahasiswa Teknik Informatika yang memiliki passion besar dalam membangun solusi digital. Saat ini, saya aktif mendalami ekosistem Full-stack Web Development (HTML, CSS, React) dan pemrosesan data menggunakan Python. Selain itu, saya juga mengeksplorasi pengembangan aplikasi berbasis Java untuk memperkuat pemahaman saya tentang pemrograman berorientasi objek.
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}