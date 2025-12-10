// src/Pages/AdminMenuPage.jsx
import React, { useState } from "react";
import AdminCategoryManager from "../Admin/AdminCategoryManager";
import AdminSubcategoryManager from "../Admin/AdminSubcategoryManager";
import AdminProductManager from "../Admin/AdminProductManager";

const AdminMenuPage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    return (
        <section className="screen">
            <h1>Admin Menu Management</h1>
            <p className="screen-subtitle">
                Only admins can access this page. Manage categories, subcategories, and
                products below.
            </p>

            <AdminCategoryManager
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
            />

            <hr style={{ margin: "1.5rem 0" }} />

            <AdminSubcategoryManager selectedCategoryId={selectedCategoryId} />

            <hr style={{ margin: "1.5rem 0" }} />

            <AdminProductManager selectedCategoryId={selectedCategoryId} />
        </section>
    );
};

export default AdminMenuPage;