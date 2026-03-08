import AdminCrudTable, { FieldConfig } from "@/components/admin/AdminCrudTable";
import { useTableData, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSupabaseData";

const fields: FieldConfig[] = [
  { key: "name", label: "Name", showInTable: true },
  { key: "city", label: "City", showInTable: true },
  { key: "type", label: "Type", type: "select", options: ["Apartment", "Hostel", "Condominium", "Studio", "Shared House"], showInTable: true },
  { key: "price_per_month", label: "Price/Month (MYR)", type: "number", showInTable: true },
  { key: "amenities", label: "Amenities", type: "tag_input", showInTable: false, placeholder: "e.g. WiFi, Gym, Pool" },
  { key: "near_university_ids", label: "Nearby University IDs", type: "json_array", showInTable: false, helpText: 'JSON array of university UUIDs', placeholder: '["uuid-1","uuid-2"]' },
];

export default function AdminAccommodations() {
  const { data, isLoading } = useTableData("accommodations");
  const insert = useInsertRow("accommodations");
  const update = useUpdateRow("accommodations");
  const del = useDeleteRow("accommodations");

  return (
    <AdminCrudTable
      title="Accommodations"
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
