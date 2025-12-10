// src/Catering/CateringLayout.jsx
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

export const CateringCategoryContent = ({ categoryId, titleOverride }) => {
    const [category, setCategory] = useState(null);
    const [subSections, setSubSections] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔧 FIX: Proper description rendering
    const renderDescription = (desc) => {
        if (!desc) return null;

        if (Array.isArray(desc)) {
            return desc.map((item, idx) => {
                if (typeof item === "string") return <p key={idx}>{item}</p>;
                if (item && typeof item === "object") {
                    return <p key={item._id || idx}>{item.text}</p>;
                }
                return null;
            });
        }

        if (typeof desc === "object" && desc.text) {
            return <p>{desc.text}</p>;
        }

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

                    if (!cancelled) setSubSections(subsWithProducts);
                } else {
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

                    if (!cancelled) setProducts(prods);
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => (cancelled = true);
    }, [categoryId]);

    const formatPrice = (price) => {
        if (price == null || price <= 0) return "";
        if (price % 1 !== 0) return `$${price.toFixed(2)}`;
        return `$${price}`;
    };

    if (!categoryId) return null;
    if (loading) return <p>Loading menu…</p>;
    if (error) return <p style={{ color: "salmon" }}>Error: {error}</p>;

    return (
        <div className="sect">
            <hr />
            <h2>{titleOverride || category.name}</h2>

            {/* Category description */}
            {renderDescription(category.description)}

            {subSections.length > 0 ? (
                subSections.map((sub) => (
                    <div key={sub.id} className="sub-sect">
                        <h4>{sub.name}</h4>

                        {/* Subcategory description */}
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

const CateringLayout = () => {
    return (
        <section className="screen">
            <header className="section-header">
                <h1>Catering Platters</h1>
                <p>Build the perfect spread for your group or event.</p>
            </header>

            <nav className="menu-nav">
                <NavLink to="entrees" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Entrees</NavLink>
                <NavLink to="sides" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Sides</NavLink>
                <NavLink to="hand-crafted-sauces" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Hand-crafted Sauces</NavLink>
                <NavLink to="beverages" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Beverages</NavLink>
                <NavLink to="breads" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Breads</NavLink>
                <NavLink to="specials" className={({ isActive }) => "nav-tab" + (isActive ? " nav-tab-active" : "")}>Specials</NavLink>
            </nav>

            <div className="menu-content">
                <Outlet />
            </div>
        </section>
    );
};

export default CateringLayout;