import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export type ContentItem = Record<string, string | number | boolean>;

export function useContent() {
  const [data, setData] = useState<Record<string, ContentItem[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getAllContent();
        setData(res || {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading };
}