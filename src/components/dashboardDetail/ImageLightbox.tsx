import { useEffect } from "react";

type Props = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/80
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onClose}
    >

      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="
            absolute
            -top-4
            -right-4
            bg-white
            w-10
            h-10
            rounded-full
            shadow
            text-xl
            font-bold
            hover:bg-slate-100
          "
        >
          ×
        </button>

        <button
          onClick={onPrev}
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            -translate-x-14
            bg-white
            w-10
            h-10
            rounded-full
            shadow
            text-xl
            font-bold
            hover:bg-slate-100
          "
        >
          ‹
        </button>

        <button
          onClick={onNext}
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            translate-x-14
            bg-white
            w-10
            h-10
            rounded-full
            shadow
            text-xl
            font-bold
            hover:bg-slate-100
          "
        >
          ›
        </button>

        <img
          src={images[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="
            max-w-[90vw]
            max-h-[85vh]
            rounded-xl
            shadow-2xl
          "
        />

        <p className="
          text-center
          text-white
          text-sm
          mt-4
        ">
          {currentIndex + 1} / {images.length}
        </p>

      </div>

    </div>
  );
}