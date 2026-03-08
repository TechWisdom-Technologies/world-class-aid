import AdminCrudTable, { FieldConfig } from "@/components/admin/AdminCrudTable";
import { useTableData, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSupabaseData";

const fields: FieldConfig[] = [
  { key: "name", label: "Name", showInTable: true },
  { key: "coverage_amount", label: "Coverage Amount", showInTable: true },
  { key: "criteria", label: "Criteria", showInTable: true },
];

export default function AdminScholarships() {
  const { data, isLoading } = useTableData("scholarships");
  const insert = useInsertRow("scholarships");
  const update = useUpdateRow("scholarships");
  const del = useDeleteRow("scholarships");

  return (
    <AdminCrudTable
      title="Scholarships"
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
