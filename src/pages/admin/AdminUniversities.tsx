import AdminCrudTable, { FieldConfig } from "@/components/admin/AdminCrudTable";
import { useTableData, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSupabaseData";

const fields: FieldConfig[] = [
  { key: "name", label: "Name", showInTable: true },
  { key: "city", label: "City", showInTable: true },
  { key: "description", label: "Description", type: "textarea", showInTable: false },
  { key: "ranking", label: "Ranking", type: "number", showInTable: true },
  { key: "global_score", label: "Global Score", type: "number", showInTable: true },
  { key: "logo_url", label: "Logo URL", showInTable: false },
  { key: "hero_image", label: "Hero Image URL", showInTable: false },
  { key: "about_text", label: "About", type: "textarea", showInTable: false },
  { key: "total_students", label: "Total Students", type: "number", showInTable: false },
  { key: "international_ratio", label: "International %", type: "number", showInTable: false },
  { key: "established", label: "Established Year", type: "number", showInTable: false },
  { key: "campus_size", label: "Campus Size", showInTable: false },
];

export default function AdminUniversities() {
  const { data, isLoading } = useTableData("universities");
  const insert = useInsertRow("universities");
  const update = useUpdateRow("universities");
  const del = useDeleteRow("universities");

  return (
    <AdminCrudTable
      title="Universities"
      data={data}
      isLoading={isLoading}
      fields={fields}
      searchKey="name"
      onInsert={(row) => insert.mutate(row)}
      onUpdate={(row) => update.mutate(row)}
      onDelete={(id) => del.mutate(id)}
    />
  );
}
