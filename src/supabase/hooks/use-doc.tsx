import { useEffect, useState } from 'react';
import { useSupabase } from '../provider';

export type DocOptions = {
    table: string;
    id: string;
}

export function useDoc(options: DocOptions | null) {
  const { supabase } = useSupabase();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      if (!options || !options.id) {
        if (mounted) {
          setData(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data: result, error: fetchError } = await supabase
            .from(options.table as any)
            .select('*')
            .eq('id', options.id)
            .single();

        if (fetchError) throw fetchError;

        if (mounted && result) {
            // Match the old API somewhat
           setData({ data: () => result, id: (result as any).id });
        }
      } catch (err: any) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [supabase, options?.table, options?.id]);

  return { data, isLoading: loading, error };
}
