export interface PreloadProgress {
  loaded: number;
  total: number;
  progress: number; // 0 to 1
  isComplete: boolean;
}

// In-memory cache for all decoded image elements to guarantee instantaneous rendering
let cachedFrames: HTMLImageElement[] | null = null;

export function getCachedPorscheFrames(): HTMLImageElement[] | null {
  return cachedFrames;
}

export function preloadPorscheFrames(
  totalFrames: number = 300,
  onProgress?: (progress: PreloadProgress) => void
): Promise<HTMLImageElement[]> {
  if (cachedFrames && cachedFrames.length === totalFrames) {
    onProgress?.({
      loaded: totalFrames,
      total: totalFrames,
      progress: 1,
      isComplete: true,
    });
    return Promise.resolve(cachedFrames);
  }

  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      const progress = loadedCount / totalFrames;
      onProgress?.({
        loaded: loadedCount,
        total: totalFrames,
        progress,
        isComplete: loadedCount === totalFrames,
      });

      if (loadedCount === totalFrames) {
        cachedFrames = images;
        resolve(images);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      // Explicitly load .webp from /frames/
      img.src = `/frames/frame_${paddedIndex}.webp`;

      img.onload = () => {
        images[i - 1] = img;
        checkAllLoaded();
      };

      img.onerror = () => {
        // Fallback: still record slot so preloader completes gracefully without hanging
        console.warn(`[PorschePreloader] Não foi possível carregar /frames/frame_${paddedIndex}.webp`);
        images[i - 1] = img;
        checkAllLoaded();
      };
    }
  });
}
