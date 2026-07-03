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

      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Dashboard Gallery
      </h2>

      {/* Thu nhỏ gallery */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {images.map((image, index) => (

          <div
            key={index}
            className="
              group
              bg-white
              rounded-2xl
              overflow-hidden

              border-2
              border-green-200

              shadow-lg

              transition-all
              duration-500

              hover:border-green-500
              hover:-translate-y-2
              hover:shadow-[0_18px_40px_rgba(34,197,94,0.18)]
            "
          >

            <img
              src={image}
              alt={`Dashboard ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className="
                w-full
                h-56
                object-cover
                cursor-pointer
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />

            <div className="p-4">

              <p className="text-sm text-gray-500">
                Screenshot {index + 1}
              </p>

              <h3 className="font-semibold text-gray-800 mt-2">
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