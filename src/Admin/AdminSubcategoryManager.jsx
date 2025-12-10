// src/Admin/AdminSubcategoryManager.jsx
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const AdminSubcategoryManager = ({ selectedCategoryId }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("add");
    const [form, setForm] = useState({
        id: "",
        name: "",
        description: "",
    });

    const reload = async (categoryId) => {
        if (!categoryId) {
            setSubcategories([]);
            return;
        }
        setLoading(true);
        const snap = await getDocs(
            query(
                collection(db, "subCategories"),
                where("categoryId", "==", categoryId),
                orderBy("name")
            )
        );
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setSubcategories(data);
        setLoading(false);
    };

    useEffect(() => {
        setMode("add");
        setForm({ id: "", name: "", description: "" });
        reload(selectedCategoryId);
    }, [selectedCategoryId]);

    const resetForm = () => {
        setForm({ id: "", name: "", description: "" });
        setMode("add");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategoryId) {
            alert("Select a category first.");
            return;
        }
        if (!form.name.trim()) return;

        const payload = {
            name: form.name.trim(),
            description: form.description
                ? [{ text: form.description.trim() }]
                : [],
            categoryId: selectedCategoryId,
        };

        if (mode === "add") {
            await addDoc(collection(db, "subCategories"), payload);
        } else {
            await updateDoc(doc(db, "subCategories", form.id), payload);
        }

        await reload(selectedCategoryId);
        resetForm();
    };

    const handleEditClick = (sub) => {
        let descText = "";

        if (Array.isArray(sub.description) && sub.description.length > 0) {
            descText = sub.description.map((d) => d.text).join("\n");
        } else if (
            typeof sub.description === "object" &&
            sub.description &&
            "text" in sub.description
        ) {
            descText = sub.description.text;
        } else if (typeof sub.description === "string") {
            descText = sub.description;
        }

        setForm({
            id: sub.id,
            name: sub.name,
            description: descText,
        });
        setMode("edit");
    };

    const handleDelete = async (subId) => {
        if (!window.confirm("Delete this subcategory?")) return;
        await deleteDoc(doc(db, "subCategories", subId));
        await reload(selectedCategoryId);
    };

    return (
        <div className="admin-grid">
            <div className="admin-panel">
                <h2>Subcategories</h2>
                {!selectedCategoryId ? (
                    <p>Select a category above to manage its subcategories.</p>
                ) : loading ? (
                    <p>Loading subcategories…</p>
                ) : (
                    <ul className="admin-list">
                        {subcategories.map((sub) => (
                            <li key={sub.id} className="admin-list-item">
                                <div>
                                    <strong>{sub.name}</strong>
                                </div>
                                <div className="admin-item-actions">
                                    <button type="button" onClick={() => handleEditClick(sub)}>
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="danger-text"
                                        onClick={() => handleDelete(sub.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                        {subcategories.length === 0 && (
                            <li>No subcategories yet for this category.</li>
                        )}
                    </ul>
                )}
            </div>

            <div className="admin-panel">
                <h2>{mode === "add" ? "Add Subcategory" : "Edit Subcategory"}</h2>
                {!selectedCategoryId ? (
                    <p>Select a category above.</p>
                ) : (
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
                            Description (optional)
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </label>

                        <div className="form-row-actions">
                            <button type="submit" className="primary-btn">
                                {mode === "add" ? "Create Subcategory" : "Save Subcategory"}
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
                )}
            </div>
        </div>
    );
};

export default AdminSubcategoryManager;