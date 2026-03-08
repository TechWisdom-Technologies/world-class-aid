import AdminCrudTable, { FieldConfig } from "@/components/admin/AdminCrudTable";
import { useTableData, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSupabaseData";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", showInTable: true },
  { key: "type", label: "Type", type: "select", options: ["Open Day", "Workshop", "Webinar", "Info Session"], showInTable: true },
  { key: "date", label: "Date", showInTable: true, placeholder: "2026-04-15" },
  { key: "time", label: "Time", showInTable: true, placeholder: "10:00 AM" },
  { key: "description", label: "Description", type: "textarea", showInTable: false },
  { key: "spots_left", label: "Spots Left", type: "number", showInTable: true },
];

export default function AdminEvents() {
  const { data, isLoading } = useTableData("events");
  const insert = useInsertRow("events");
  const update = useUpdateRow("events");
  const del = useDeleteRow("events");

  return (
    <AdminCrudTable
      title="Events"
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
