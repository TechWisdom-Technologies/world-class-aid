import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  options?: string[];
  showInTable?: boolean;
  placeholder?: string;
}

interface AdminCrudTableProps {
  title: string;
  data: any[] | undefined;
  isLoading: boolean;
  fields: FieldConfig[];
  searchKey: string;
  onInsert: (row: Record<string, any>) => void;
  onUpdate: (row: Record<string, any>) => void;
  onDelete: (id: string) => void;
  renderCell?: (row: any, key: string) => React.ReactNode;
}

export default function AdminCrudTable({
  title, data, isLoading, fields, searchKey, onInsert, onUpdate, onDelete, renderCell,
}: AdminCrudTableProps) {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const tableFields = fields.filter((f) => f.showInTable !== false);

  const filtered = (data || []).filter((row) =>
    String(row[searchKey] || "").toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingRow(null);
    const empty: Record<string, any> = {};
    fields.forEach((f) => (empty[f.key] = f.type === "number" ? 0 : ""));
    setForm(empty);
    setDialogOpen(true);
  };

  const openEdit = (row: any) => {
    setEditingRow(row);
    const vals: Record<string, any> = {};
    fields.forEach((f) => (vals[f.key] = row[f.key] ?? ""));
    setForm(vals);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const cleaned: Record<string, any> = {};
    fields.forEach((f) => {
      cleaned[f.key] = f.type === "number" ? Number(form[f.key]) || 0 : form[f.key];
    });
    if (editingRow) {
      onUpdate({ id: editingRow.id, ...cleaned });
    } else {
      onInsert(cleaned);
    }
    setDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />Add {title.replace(/s$/, "")}
          </Button>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRow ? "Edit" : "Add"} {title.replace(/s$/, "")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {fields.map((f) => (
                <div key={f.key}>
                  <Label>{f.label}</Label>
                  {f.type === "textarea" ? (
                    <Textarea
                      value={form[f.key] || ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder || f.label}
                      rows={3}
                    />
                  ) : f.type === "select" ? (
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={form[f.key] || ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    >
                      <option value="">Select...</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <Input
                      type={f.type || "text"}
                      value={form[f.key] || ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder || f.label}
                    />
                  )}
                </div>
              ))}
              <Button className="w-full" onClick={handleSave}>
                {editingRow ? "Update" : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-lg border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableFields.map((f) => (
                <TableHead key={f.key}>{f.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableFields.length + 1} className="text-center py-8 text-muted-foreground">
                  No {title.toLowerCase()} found. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow key={row.id}>
                  {tableFields.map((f) => (
                    <TableCell key={f.key} className={f.key === searchKey ? "font-medium" : ""}>
                      {renderCell ? renderCell(row, f.key) ?? String(row[f.key] ?? "") : String(row[f.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(row.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
