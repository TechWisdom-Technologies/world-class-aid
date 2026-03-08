import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type TableName = "countries" | "universities" | "courses" | "accommodations" | "scholarships" | "language_centers" | "blogs" | "events";

export function useTableData(table: TableName, options?: { select?: string; orderBy?: string }) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const orderCol = options?.orderBy || "created_at";
      const ascending = options?.orderBy ? true : false;
      const { data, error } = await supabase
        .from(table)
        .select(options?.select || "*")
        .order(orderCol, { ascending });
      if (error) throw error;
      return (data || []) as any[];
    },
    retry: 1,
    staleTime: 0,
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
