import { useEffect } from "react";

interface UseInfiniteScrollProps {
  target: React.RefObject<Element | null>;
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  target,
  onLoadMore,
  hasMore,
  loading,
  rootMargin = "100px",
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    if (!target.current) return;
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 1.0, rootMargin }
    );

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [target, onLoadMore, hasMore, loading, rootMargin]);
};
