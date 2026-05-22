export default function Biodata() {
  return (
    <div className="p-6">
      <div className="bg-[#ffffff] rounded-2xl shadow-md p-8 border border-[#ffffff] max-w-2xl">
        
        <h1 className="text-3xl font-bold text-red-900 mb-6">
          Biodata Mahasiswa
        </h1>

        <div className="space-y-4 text-red-900">

          <div>
            <p className="font-semibold">Nama</p>
            <p>Faizal Isman</p>
          </div>

          <div>
            <p className="font-semibold">NIM</p>
            <p>24090074</p>
          </div>

          <div>
            <p className="font-semibold">Kelas</p>
            <p>TI 4C</p>
          </div>

          <div>
            <p className="font-semibold">Mata Kuliah</p>
            <p>Pemrograman Web 2</p>
          </div>

        </div>
      </div>
    </div>
  );
}