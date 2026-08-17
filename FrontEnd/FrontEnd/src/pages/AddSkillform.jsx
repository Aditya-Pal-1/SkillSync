import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSkill } from "@/api/skills";
import { Upload, Plus } from "lucide-react";
const EMPTY_FORM = {
  name: "",
  description: "",
  level: "Beginner",
  image: null,
};
const AddSkillForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      setForm(EMPTY_FORM);
    },
  });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("level", form.level);
    if (form.image) fd.append("image", form.image);
    mutation.mutate(fd);
  };
  return (
    <form onSubmit={submit} className="surface form-card">
      <div className="form-grid">
        <div>
          <label className="field-label">Skill name</label>
          <input
            className="field"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. React fundamentals"
            required
          />
        </div>
        <div>
          <label className="field-label">Level</label>
          <select
            className="field"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="full">
          <label className="field-label">Description</label>
          <textarea
            className="field"
            style={{ height: 88, paddingTop: 11, resize: "vertical" }}
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What will learners get from your session?"
          />
        </div>
        <div className="full">
          <label className="field-label">Cover image</label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 14,
              border: "1px dashed #cfd4e2",
              borderRadius: 11,
              color: "#667085",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            <Upload size={17} />
            {form.image?.name || "Choose an image (optional)"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
      {mutation.isError && (
        <div className="form-error" style={{ marginTop: 14 }}>
          {mutation.error.message}
        </div>
      )}
      <div className="form-footer">
        <button className="btn-primary" disabled={mutation.isPending}>
          <Plus size={15} />
          {mutation.isPending ? "Adding..." : "Add skill"}
        </button>
      </div>
    </form>
  );
};
export default AddSkillForm;
