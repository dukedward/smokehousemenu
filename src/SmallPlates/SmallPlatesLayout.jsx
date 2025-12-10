// src/SmallPlates/SmallPlatesLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const SmallPlateCategoryContent = ({ categoryId, titleOverride }) => {
    const [category, setCategory] = useState(null);
    const [subSections, setSubSections] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔧 FIX: Properly render category & subcategory descriptions
    const renderDescription = (desc) => {
        if (!desc) return null;

        // If it's an array (Mongo style: [{ text, _id }])
        if (Array.isArray(desc)) {
            return desc.map((item, idx) => {
                if (typeof item === "string") return <p key={idx}>{item}</p>;
                if (item && typeof item === "object") {
                    return <p key={item._id || idx}>{item.text}</p>;
                }
                return null;
            });
        }

        // If it's a single object: { text }
        if (typeof desc === "object" && desc.text) {
            return <p>{desc.text}</p>;
        }

        // If it's a plain string
        if (typeof desc === "string") {
            return <p>{desc}</p>;
        }

        return null;
    };

    useEffect(() => {
        if (!categoryId) return;
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError("");
            setCategory(null);
            setSubSections([]);
            setProducts([]);

            try {
                const catRef = doc(db, "categories", categoryId);
                const catSnap = await getDoc(catRef);

                if (!catSnap.exists()) throw new Error("Category not found");
                const catData = { id: catSnap.id, ...catSnap.data() };

                if (cancelled) return;
                setCategory(catData);

                // Category has sub-sections
                if (catData.hasSubSection) {
                    const subSnap = await getDocs(
                        query(
                            collection(db, "subCategories"),
                            where("categoryId", "==", categoryId),
                            orderBy("name")
                        )
                    );

                    const subs = subSnap.docs.map((d) => ({
                        id: d.id,
                        ...d.data(),
                    }));

                    if (!cancelled) {
                        const subsWithProducts = await Promise.all(
                            subs.map(async (sub) => {
                                const prodSnap = await getDocs(
                                    query(
                                        collection(db, "products"),
                                        where("subCategoryId", "==", sub.id),
                                        orderBy("name")
                                    )
                                );

                                const prods = prodSnap.docs.map((d) => ({
                                    id: d.id,
                                    ...d.data(),
                                }));

                                return { ...sub, products: prods };
                            })
                        );

                        setSubSections(subsWithProducts);
                    }
                } else {
                    // Category with no subsections
                    const prodSnap = await getDocs(
                        query(
                            collection(db, "products"),
                            where("categoryId", "==", categoryId),
                            orderBy("name")
                        )
                    );

                    const prods = prodSnap.docs.map((d) => ({
                        id: d.id,
                        ...d.data(),
                    }));

                    if (!cancelled) {
                        setProducts(prods);
                    }
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) setError(err.message || "Failed to load menu");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [categoryId]);

    const formatPrice = (price) => {
        if (price == null || price <= 0) return "";
        if (price % 1 !== 0) return `$${price.toFixed(2)}`;
        return `$${price}`;
    };

    if (!categoryId) return null;
    if (loading) return <p>Loading menu…</p>;
    if (error) return <p style={{ color: "#fecaca" }}>Error: {error}</p>;
    if (!category) return <p>No category found.</p>;

    return (
        <div className="sect">
            <hr />
            <h2>{titleOverride || category.name}</h2>

            {/* FIX: Show category-level description safely */}
            {renderDescription(category.description)}

            {subSections.length > 0 ? (
                subSections.map((sub) => (
                    <div key={sub.id} className="sub-sect">
                        <h4>{sub.name}</h4>

                        {/* FIX: Subcategory description */}
                        {renderDescription(sub.description)}

                        <ul>
                            {sub.products.map((p) => (
                                <li key={p.id}>
                                    {p.name}
                                    {p.price > 0 && ` - ${formatPrice(p.price)}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <ul>
                    {products.map((p) => (
                        <li key={p.id}>
                            {p.name}
                            {p.price > 0 && ` - ${formatPrice(p.price)}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const SmallPlatesLayout = () => {
    return (
        <section className="screen">
            <header className="section-header">
                <h1>Small Plates</h1>
                <p>Tap a category to see our small plate offerings.</p>
            </header>

            <nav className="menu-nav">
                <NavLink to="bbq-entrees" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>BBQ Entrees</NavLink>
                <NavLink to="fried-entrees" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Fried Entrees</NavLink>
                <NavLink to="burgers-sandwiches" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Burgers & Sandwiches</NavLink>
                <NavLink to="sides" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Sides</NavLink>
                <NavLink to="beverages" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Beverages</NavLink>
                <NavLink to="specials" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Specials</NavLink>
            </nav>

            <div className="menu-content">
                <Outlet />
            </div>
        </section>
    );
};

export default SmallPlatesLayout;