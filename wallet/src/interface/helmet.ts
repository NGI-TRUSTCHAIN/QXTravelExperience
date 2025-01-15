export interface UseHelmetProps {
  title?: string;
  description?: string;
  metaTags?: { name: string; content: string }[];
  loading?: boolean;
}
