import AdminCrudTable, { FieldConfig } from "@/components/admin/AdminCrudTable";
import { useTableData, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSupabaseData";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", showInTable: true },
  { key: "degree_level", label: "Degree Level", type: "select", options: ["Foundation", "Bachelor", "Master", "PhD"], showInTable: true },
  { key: "tuition_fee", label: "Tuition Fee (USD/yr)", type: "number", showInTable: true },
  { key: "duration", label: "Duration", showInTable: true },
  { key: "overview", label: "Overview", type: "textarea", showInTable: false },
];

export default function AdminCourses() {
  const { data, isLoading } = useTableData("courses");
  const insert = useInsertRow("courses");
  const update = useUpdateRow("courses");
  const del = useDeleteRow("courses");

  return (
    <AdminCrudTable
      title="Courses"
      data={data}
      isLoading={isLoading}
      fields={fields}
      searchKey="title"
      onInsert={(row) => insert.mutate(row)}
      onUpdate={(row) => update.mutate(row)}
      onDelete={(id) => del.mutate(id)}
    />
  );
}
