// src/Admin/AdminCategoryManager.jsx
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const AdminCategoryManager = ({
    selectedCategoryId,
    onSelectCategory,
}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState("add"); // "add" | "edit"
    const [form, setForm] = useState({
        id: "",
        name: "",
        // your updated defaults:
        type: "catering",
        hasSubSection: false,
        isTray: true,
    });

    const reload = async () => {
        setLoading(true);
        const snap = await getDocs(
            query(collection(db, "categories"), orderBy("name"))
        );
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        reload();
    }, []);

    const resetForm = () => {
        setForm({
            id: "",
            name: "",
            type: "catering",
            hasSubSection: false,
            isTray: true,
        });
        setMode("add");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({
            ...f,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;

        const payload = {
            name: form.name.trim(),
            type: form.type,
            hasSubSection: !!form.hasSubSection,
            isTray: !!form.isTray,
        };

        if (mode === "add") {
            await addDoc(collection(db, "categories"), payload);
        } else {
            await updateDoc(doc(db, "categories", form.id), payload);
        }

        await reload();
        resetForm();
    };

    const handleEditClick = (cat) => {
        setForm({
            id: cat.id,
            name: cat.name,
            type: cat.type || "catering",
            hasSubSection: !!cat.hasSubSection,
            isTray: !!cat.isTray,
        });
        setMode("edit");
    };

    const handleDelete = async (catId) => {
        if (!window.confirm("Delete this category?")) return;
        await deleteDoc(doc(db, "categories", catId));
        await reload();
        if (selectedCategoryId === catId) onSelectCategory("");
    };

    return (
        <div className="admin-grid">
            <div className="admin-panel">
                <h2>Categories</h2>
                {loading ? (
                    <p>Loading categories…</p>
                ) : (
                    <ul className="admin-list">
                        {categories.map((cat) => (
                            <li key={cat.id} className="admin-list-item">
                                <button
                                    type="button"
                                    className={
                                        "tag" +
                                        (selectedCategoryId === cat.id ? " tag-active" : "")
                                    }
                                    onClick={() => onSelectCategory(cat.id)}
                                >
                                    {cat.name}
                                    <span className="tag-pill">
                                        {cat.type || (cat.isTray ? "catering" : "small")}
                                    </span>
                                </button>
                                <div className="admin-item-actions">
                                    <button type="button" onClick={() => handleEditClick(cat)}>
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="danger-text"
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                        {categories.length === 0 && (
                            <li>No categories yet. Create one below.</li>
                        )}
                    </ul>
                )}
            </div>

            <div className="admin-panel">
                <h2>{mode === "add" ? "Add Category" : "Edit Category"}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Type
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <option value="small">Small Plates</option>
                            <option value="catering">Catering</option>
                        </select>
                    </label>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="hasSubSection"
                            checked={form.hasSubSection}
                            onChange={handleChange}
                        />
                        Has Sub-Sections
                    </label>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="isTray"
                            checked={form.isTray}
                            onChange={handleChange}
                        />
                        Is Tray (Catering style)
                    </label>

                    <div className="form-row-actions">
                        <button type="submit" className="primary-btn">
                            {mode === "add" ? "Create Category" : "Save Changes"}
                        </button>
                        {mode === "edit" && (
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCategoryManager;