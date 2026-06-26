import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

type Props = {
  images: string[];
};

export default function DashboardGallery({
  images,
}: Props) {

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  return (
    <section className="mb-16">

      <h2 className="text-3xl font-bold mb-8">
        Dashboard Gallery
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {images.map((image, index) => (

          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow
              overflow-hidden
              transition
              hover:shadow-2xl
              hover:-translate-y-2
              duration-300
            "
          >

            <img
              src={image}
              alt={`Dashboard ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className="
                w-full
                h-72
                object-cover
                cursor-pointer
              "
            />

            <div className="p-5">
              <p className="text-sm text-slate-500">
                Screenshot {index + 1}
              </p>
              <h3 className="font-semibold mt-2">
                Dashboard Preview
              </h3>
            </div>

          </div>

        ))}

      </div>

      {selectedIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() =>
            setSelectedIndex((prev) =>
              prev === null || prev === 0
                ? images.length - 1
                : prev - 1
            )
          }
          onNext={() =>
            setSelectedIndex((prev) =>
              prev === null || prev === images.length - 1
                ? 0
                : prev + 1
            )
          }
        />
      )}

    </section>
  );
}