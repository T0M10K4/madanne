import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";
import photo5 from "@/assets/photo5.jpg";
import photo6 from "@/assets/photo6.jpg";
import photo7 from "@/assets/photo7.jpg";
import photo8 from "@/assets/photo8.jpg";
import photo9 from "@/assets/photo9.jpg";
import photo10 from "@/assets/photo10.jpg";

const photos = [
  photo1, photo2, photo3, photo4, photo5,
  photo6, photo7, photo8, photo9, photo10,
];

export const PhotoCarousel = () => {
  return (
    <div className="w-full overflow-hidden bg-card/40 backdrop-blur-sm py-8 border-t border-primary/20 animate-fade-in" style={{ animationDelay: "1s" }}>
      <div className="flex animate-marquee">
        {/* Duplicar as fotos para criar o loop infinito */}
        {[...photos, ...photos].map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-4 group"
          >
            <div className="relative bg-card p-3 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 hover:rotate-2 border-4 border-card">
              <img
                src={photo}
                alt={`Memória ${(index % photos.length) + 1}`}
                className="w-48 h-64 md:w-64 md:h-80 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
