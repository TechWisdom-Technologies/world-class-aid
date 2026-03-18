import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "json_array" | "json_object" | "relation" | "tag_input";
  options?: string[];
  showInTable?: boolean;
  placeholder?: string;
  /** For relation fields: { data, valueKey, labelKey } */
  relationConfig?: {
    data: any[];
    valueKey: string;
    labelKey: string;
  };
  /** Help text shown below the field */
  helpText?: string;
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

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1 pr-1">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder={placeholder || "Type and press Enter"}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={addTag}>Add</Button>
      </div>
    </div>
  );
}

function JsonObjectEditor({ value, onChange, placeholder }: { value: any; onChange: (v: any) => void; placeholder?: string }) {
  const [text, setText] = useState(() => {
    try { return typeof value === "string" ? value : JSON.stringify(value, null, 2); } catch { return "{}"; }
  });
  const [error, setError] = useState("");

  const handleBlur = () => {
    try {
      const parsed = JSON.parse(text);
      onChange(parsed);
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder || '{"key": "value"}'}
        rows={4}
        className="font-mono text-xs"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function JsonArrayEditor({ value, onChange, placeholder }: { value: any; onChange: (v: any) => void; placeholder?: string }) {
  const [text, setText] = useState(() => {
    try { return typeof value === "string" ? value : JSON.stringify(value, null, 2); } catch { return "[]"; }
  });
  const [error, setError] = useState("");

  const handleBlur = () => {
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("Must be array");
      onChange(parsed);
      setError("");
    } catch {
      setError("Invalid JSON array");
    }
  };

  return (
    <div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder || '[{"key": "value"}]'}
        rows={4}
        className="font-mono text-xs"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
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

  const getDefaultValue = (f: FieldConfig) => {
    if (f.type === "number") return 0;
    if (f.type === "json_array") return [];
    if (f.type === "json_object") return {};
    if (f.type === "tag_input") return [];
    return "";
  };

  const openCreate = () => {
    setEditingRow(null);
    const empty: Record<string, any> = {};
    fields.forEach((f) => (empty[f.key] = getDefaultValue(f)));
    setForm(empty);
    setDialogOpen(true);
  };

  const openEdit = (row: any) => {
    setEditingRow(row);
    const vals: Record<string, any> = {};
    fields.forEach((f) => {
      const val = row[f.key];
      if (f.type === "json_array" || f.type === "tag_input") {
        vals[f.key] = Array.isArray(val) ? val : [];
      } else if (f.type === "json_object") {
        vals[f.key] = val && typeof val === "object" ? val : {};
      } else {
        vals[f.key] = val ?? "";
      }
    });
    setForm(vals);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const cleaned: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.type === "number") {
        cleaned[f.key] = Number(form[f.key]) || 0;
      } else if (f.type === "json_array" || f.type === "tag_input") {
        cleaned[f.key] = Array.isArray(form[f.key]) ? form[f.key] : [];
      } else if (f.type === "json_object") {
        cleaned[f.key] = form[f.key] && typeof form[f.key] === "object" ? form[f.key] : {};
      } else if (f.type === "relation") {
        cleaned[f.key] = form[f.key] || null;
      } else {
        cleaned[f.key] = form[f.key];
      }
    });
    if (editingRow) {
      onUpdate({ id: editingRow.id, ...cleaned });
    } else {
      onInsert(cleaned);
    }
    setDialogOpen(false);
  };

  const renderField = (f: FieldConfig) => {
    if (f.type === "textarea") {
      return (
        <Textarea
          value={form[f.key] || ""}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          placeholder={f.placeholder || f.label}
          rows={3}
        />
      );
    }
    if (f.type === "select") {
      return (
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={form[f.key] || ""}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
        >
          <option value="">Select...</option>
          {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    if (f.type === "relation") {
      const cfg = f.relationConfig;
      return (
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={form[f.key] || ""}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
        >
          <option value="">None</option>
          {cfg?.data?.map((item: any) => (
            <option key={item[cfg.valueKey]} value={item[cfg.valueKey]}>
              {item[cfg.labelKey]}
            </option>
          ))}
        </select>
      );
    }
    if (f.type === "tag_input") {
      return (
        <TagInput
          value={Array.isArray(form[f.key]) ? form[f.key] : []}
          onChange={(v) => setForm({ ...form, [f.key]: v })}
          placeholder={f.placeholder}
        />
      );
    }
    if (f.type === "json_array") {
      return (
        <JsonArrayEditor
          value={form[f.key]}
          onChange={(v) => setForm({ ...form, [f.key]: v })}
          placeholder={f.placeholder}
        />
      );
    }
    if (f.type === "json_object") {
      return (
        <JsonObjectEditor
          value={form[f.key]}
          onChange={(v) => setForm({ ...form, [f.key]: v })}
          placeholder={f.placeholder}
        />
      );
    }
    return (
      <Input
        type={f.type || "text"}
        value={form[f.key] || ""}
        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
        placeholder={f.placeholder || f.label}
      />
    );
  };

  const formatCellValue = (row: any, key: string) => {
    const val = row[key];
    if (val === null || val === undefined) return "—";
    if (Array.isArray(val)) return val.length > 0 ? val.slice(0, 3).join(", ") + (val.length > 3 ? "…" : "") : "—";
    if (typeof val === "object") return JSON.stringify(val).slice(0, 50) + "…";
    return String(val);
  };

  if (isLoading) {
    return (
      <LoadingScreen label={`Loading ${title.toLowerCase()}`} sublabel="Fetching latest records" className="py-8" />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />Add {title.replace(/s$/, "")}
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRow ? "Edit" : "Add"} {title.replace(/s$/, "")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {fields.map((f) => (
              <div key={f.key}>
                <Label className="mb-1 block">{f.label}</Label>
                {renderField(f)}
                {f.helpText && <p className="text-xs text-muted-foreground mt-1">{f.helpText}</p>}
              </div>
            ))}
            <Button className="w-full" onClick={handleSave}>
              {editingRow ? "Update" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                      {renderCell ? renderCell(row, f.key) ?? formatCellValue(row, f.key) : formatCellValue(row, f.key)}
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
