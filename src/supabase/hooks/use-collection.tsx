import { useEffect, useState } from 'react';
import { useSupabase } from '../provider';

// Define a type for the query object to mimic the Firebase query builder behavior loosely
export type QueryOptions = {
    table: string;
    eq?: { column: string, value: any };
    order?: { column: string, ascending?: boolean };
}

type CollectionSnapshot<T> = { docs: T[] };
type UseCollectionResult<T> = readonly [
  CollectionSnapshot<T> | null,
  boolean,
  Error | null,
] & {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
};

export function useCollection<T = any>(options: QueryOptions | null): UseCollectionResult<T> {
  const { supabase } = useSupabase();
  const [data, setData] = useState<CollectionSnapshot<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      if (!options) {
        if (mounted) {
          setData(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let query = (supabase as any).from(options.table).select('*');
        
        if (options.eq) {
            query = query.eq(options.eq.column, options.eq.value);
        }

        if (options.order) {
            query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
        }

        const { data: result, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (mounted) {
          setData({ docs: (result || []) as T[] });
        }
      } catch (err: any) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    // Optional: Add real-time subscription here later if needed, 
    // but for now, simple fetching is safer to get the migration working.

    return () => {
      mounted = false;
    };
  }, [supabase, options?.table, options?.eq?.column, options?.eq?.value, options?.order?.column, options?.order?.ascending]);

  return Object.assign([data, loading, error] as const, {
    data: data?.docs ?? null,
    isLoading: loading,
    error,
  });
}
