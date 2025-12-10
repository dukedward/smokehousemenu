// src/Admin/AdminProductManager.jsx
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

const AdminProductManager = ({ selectedCategoryId }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [prodLoading, setProdLoading] = useState(false);
    const [mode, setMode] = useState("add");
    const [form, setForm] = useState({
        id: "",
        name: "",
        price: "",
        subCategoryId: "",
    });

    const reloadSubcategories = async (categoryId) => {
        if (!categoryId) {
            setSubcategories([]);
            return;
        }
        const snap = await getDocs(
            query(
                collection(db, "subCategories"),
                where("categoryId", "==", categoryId),
                orderBy("name")
            )
        );
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setSubcategories(data);
    };

    const reloadProducts = async (categoryId) => {
        if (!categoryId) {
            setProducts([]);
            return;
        }
        setProdLoading(true);
        const snap = await getDocs(
            query(
                collection(db, "products"),
                where("categoryId", "==", categoryId),
                orderBy("name")
            )
        );
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProducts(data);
        setProdLoading(false);
    };

    useEffect(() => {
        setMode("add");
        setForm({ id: "", name: "", price: "", subCategoryId: "" });
        reloadSubcategories(selectedCategoryId);
        reloadProducts(selectedCategoryId);
    }, [selectedCategoryId]);

    const resetForm = () => {
        setForm({ id: "", name: "", price: "", subCategoryId: "" });
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
            price: parseFloat(form.price || "0"),
            categoryId: selectedCategoryId,
            subCategoryId: form.subCategoryId || null,
        };

        if (mode === "add") {
            await addDoc(collection(db, "products"), payload);
        } else {
            await updateDoc(doc(db, "products", form.id), payload);
        }

        await reloadProducts(selectedCategoryId);
        resetForm();
    };

    const handleEditClick = (p) => {
        setForm({
            id: p.id,
            name: p.name,
            price: p.price?.toString() || "",
            subCategoryId: p.subCategoryId || "",
        });
        setMode("edit");
    };

    const handleDelete = async (prodId) => {
        if (!window.confirm("Delete this product?")) return;
        await deleteDoc(doc(db, "products", prodId));
        await reloadProducts(selectedCategoryId);
        if (form.id === prodId) resetForm();
    };

    return (
        <div className="admin-grid">
            <div className="admin-panel">
                <h2>Products</h2>

                {!selectedCategoryId ? (
                    <p>Select a category above to manage its products.</p>
                ) : prodLoading ? (
                    <p>Loading products…</p>
                ) : (
                    <ul className="admin-list">
                        {products.map((p) => (
                            <li key={p.id} className="admin-list-item">
                                <div>
                                    <strong>{p.name}</strong>{" "}
                                    {typeof p.price === "number" && p.price > 0 && (
                                        <span> - ${p.price.toFixed(2)}</span>
                                    )}
                                </div>
                                <div className="admin-item-actions">
                                    <button type="button" onClick={() => handleEditClick(p)}>
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="danger-text"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                        {products.length === 0 && (
                            <li>No products yet for this category.</li>
                        )}
                    </ul>
                )}
            </div>

            <div className="admin-panel">
                <h2>{mode === "add" ? "Add Product" : "Edit Product"}</h2>
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
                            Price
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Subcategory (optional)
                            <select
                                name="subCategoryId"
                                value={form.subCategoryId}
                                onChange={handleChange}
                            >
                                <option value="">-- None --</option>
                                {subcategories.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="form-row-actions">
                            <button type="submit" className="primary-btn">
                                {mode === "add" ? "Create Product" : "Save Product"}
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

export default AdminProductManager;