import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Graphlung Virtual Lab - Home';
  }, []);

  return (
    <div className="pt-[70px]">
      <section id="home" className="h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-6xl font-black-ops">
            Welcome to <span className="text-[#7a3595] animate-color-pulse">Graphlung</span> Virtual Lab
          </h1>
        </div>
      </section>

      <section id="general" className="min-h-screen flex justify-center items-center px-4">
        <div className="w-1/2 bg-white rounded-lg shadow-md p-8 mr-8">
          <h2 className="text-right text-3xl text-purple-900 mb-4">General / About</h2>
          <p className="text-justify">
            Virtual Lab Matematika ini dirancang sebagai platform interaktif untuk mempelajari dan menyimulasikan grafik 
            dari berbagai persamaan matematika, seperti cubic, sinus, cosinus, dan tangen. Dengan menggunakan lab ini, 
            mahasiswa dapat lebih mudah memahami bagaimana perubahan dalam persamaan berdampak pada grafik secara visual. 
            Target utama dari virtual lab ini adalah mahasiswa yang ingin memperdalam pemahaman mereka tentang logika 
            matematika dan grafik persamaan. Di masa depan, virtual lab ini akan dikembangkan dengan menambahkan fitur 
            game yang menyerupai Desmos, sehingga mahasiswa tidak hanya belajar teori, tetapi juga melatih keterampilan 
            logika matematika mereka melalui pengalaman interaktif.
          </p>
        </div>
        <div className="w-1/3 h-[425px] bg-white rounded-lg shadow-md p-4 flex justify-center items-center">
          <img 
            src="/src/assets/general.jpg" 
            alt="General" 
            className="w-4/5 h-4/5 object-cover rounded-lg shadow-md animate-float"
          />
        </div>
      </section>

      <section id="math" className="min-h-screen flex justify-center items-center px-4">
        <div className="w-1/3 h-[380px] bg-white rounded-lg shadow-md p-4 flex justify-center items-center">
          <img 
            src="/src/assets/math.jpg" 
            alt="Math" 
            className="w-4/5 h-4/5 object-cover rounded-lg shadow-md animate-float"
          />
        </div>
        <div className="w-1/2 bg-white rounded-lg shadow-md p-8 ml-8">
          <h2 className="text-3xl text-purple-900 mb-4">Math</h2>
          <p className="text-justify">
            Dalam dunia perkuliahan, matematika merupakan salah satu fondasi penting, khususnya dalam memahami berbagai 
            persamaan dan hubungan logis di baliknya. Virtual Lab ini fokus pada persamaan cubic, kuadrat, sinus, 
            cosinus, dan tangen, yang semuanya memiliki aplikasi luas di berbagai bidang studi. Memahami logika matematika 
            di balik persamaan-persamaan ini membantu mahasiswa tidak hanya dalam menyelesaikan soal, tetapi juga dalam 
            mengembangkan cara berpikir kritis. Virtual lab ini memberikan simulasi langsung yang membantu menghubungkan 
            teori persamaan dengan penerapan grafik, menjadikannya alat pembelajaran yang sangat berguna.
          </p>
        </div>
      </section>

      <section id="graph" className="min-h-screen flex justify-center items-center px-4">
        <div className="w-1/2 bg-white rounded-lg shadow-md p-8 mr-8">
          <h2 className="text-3xl text-purple-900 mb-4">Graph</h2>
          <p className="text-justify">
            Persamaan yang digunakan di Virtual Lab ini semuanya berbentuk satu variabel dengan format umum y = f(x). 
            Melalui lab ini, mahasiswa dapat melihat secara langsung bagaimana perubahan kecil dalam persamaan, seperti 
            koefisien atau konstanta, dapat mempengaruhi bentuk grafik. Misalnya, pada persamaan kuadrat, jika nilai a 
            negatif, grafik akan membentuk parabola yang menghadap ke bawah, sementara jika positif, grafik menghadap ke 
            atas. Begitu juga dengan persamaan sinus dan cosinus yang menunjukkan pola gelombang, serta tangen yang 
            memiliki karakteristik unik berupa asimtot vertikal. Melalui visualisasi ini, mahasiswa dapat lebih cepat 
            memahami sifat-sifat khusus dari setiap jenis persamaan dan grafik yang dihasilkannya.
          </p>
        </div>
        <div className="w-1/3 h-[430px] bg-white rounded-lg shadow-md p-4 flex justify-center items-center">
          <img 
            src="/src/assets/graph.jpg" 
            alt="Graph" 
            className="w-4/5 h-4/5 object-cover rounded-lg shadow-md animate-float"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;