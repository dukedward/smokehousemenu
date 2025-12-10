// migrate-firestore.js
// Run with: node migrate-firestore.js

import fs from "fs";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(
    fs.readFileSync("./serviceAccountKey.json", "utf-8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// --- Helper: safe getter for nested OID ---
const getOid = (obj) => {
    if (!obj || typeof obj !== "object") return null;
    if (obj.$oid) return obj.$oid;
    return null;
};

// --- Load JSON files ---
const categoriesJson = JSON.parse(
    fs.readFileSync("./4theforkofit.categories.json", "utf-8")
);
const subcategoriesJson = JSON.parse(
    fs.readFileSync("./4theforkofit.subcategories.json", "utf-8")
);
const productsJson = JSON.parse(
    fs.readFileSync("./4theforkofit.products.json", "utf-8")
);

// --- Migration functions ---
async function migrateCategories() {
    console.log("Migrating categories...");
    for (const c of categoriesJson) {
        const id = getOid(c._id);
        if (!id) continue;

        const isTray = !!c.isTray;
        const type = isTray ? "catering" : "small";

        const docRef = db.collection("categories").doc(id);
        const data = {
            name: c.name,
            hasSubSection: !!c.hasSubSection,
            isTray,
            type,
            description: c.description || [],
            // Optional: store original timestamps as strings or Firestore timestamps
            createdAtRaw: c.createdAt?.$date || null,
            updatedAtRaw: c.updatedAt?.$date || null,
        };

        await docRef.set(data, { merge: true });
        console.log("  → category", id, "-", c.name);
    }
}

async function migrateSubcategories() {
    console.log("Migrating subCategories...");
    for (const s of subcategoriesJson) {
        const id = getOid(s._id);
        if (!id) continue;

        const categoryId = getOid(s.category);

        const docRef = db.collection("subCategories").doc(id);
        const data = {
            name: s.name,
            description: s.description || [],
            categoryId: categoryId || null,
            createdAtRaw: s.createdAt?.$date || null,
            updatedAtRaw: s.updatedAt?.$date || null,
        };

        await docRef.set(data, { merge: true });
        console.log("  → subCategory", id, "-", s.name);
    }
}

async function migrateProducts() {
    console.log("Migrating products...");
    for (const p of productsJson) {
        const id = getOid(p._id);
        if (!id) continue;

        const categoryId = getOid(p.category);
        const subCategoryId = getOid(p.subCategory);

        const docRef = db.collection("products").doc(id);
        const data = {
            name: p.name,
            image: p.image || "",
            price: typeof p.price === "number" ? p.price : 0,
            categoryId: categoryId || null,
            subCategoryId: subCategoryId || null,
            createdAtRaw: p.createdAt?.$date || null,
            updatedAtRaw: p.updatedAt?.$date || null,
        };

        await docRef.set(data, { merge: true });
        console.log("  → product", id, "-", p.name);
    }
}

async function run() {
    try {
        await migrateCategories();
        await migrateSubcategories();
        await migrateProducts();
        console.log("✅ Migration complete.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

run();
