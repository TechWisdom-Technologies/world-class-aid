import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type TableName = "countries" | "universities" | "courses" | "accommodations" | "scholarships" | "language_centers" | "blogs" | "events";

const SUPABASE_URL = "https://kelwzcacbnrrioophnzh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbHd6Y2FjYm5ycmlvb3BobnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODU0NzYsImV4cCI6MjA4ODU2MTQ3Nn0.VUCY4HY0LNX4umOfEWh1NmkKKHQ-DYj7VvRCJkeDe_c";

export function useTableData(table: TableName, options?: { select?: string; orderBy?: string }) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const orderCol = options?.orderBy || "created_at";
      const ascending = !!options?.orderBy;
      const dir = ascending ? "asc" : "desc";
      const selectParam = options?.select || "*";

      const url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(selectParam)}&order=${orderCol}.${dir}`;
      const res = await fetch(url, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        },
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }
      return (await res.json()) as any[];
    },
    retry: 2,
  });
}

export function useInsertRow(table: TableName) {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (row: Record<string, any>) => {
      const { data, error } = await (supabase.from(table) as any).insert(row).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast({ title: "Created successfully" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useUpdateRow(table: TableName) {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...row }: Record<string, any>) => {
      const { data, error } = await (supabase.from(table) as any).update(row).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast({ title: "Updated successfully" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}

export function useDeleteRow(table: TableName) {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from(table) as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast({ title: "Deleted successfully" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
}
