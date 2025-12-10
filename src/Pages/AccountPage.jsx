// src/AccountPage.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../AuthContext";

const AccountPage = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({
        name: "",
        address: "",
        avatarUrl: "",
        paymentProfileId: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!user) return;
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setForm((f) => ({ ...f, ...snap.data() }));
            }
            setLoading(false);
        };
        load();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const ref = doc(db, "users", user.uid);
        await updateDoc(ref, form);
        alert("Profile updated");
    };

    if (loading) return <p>Loading account...</p>;

    return (
        <section className="screen">
            <h1>My Account</h1>
            <form onSubmit={handleSave} className="form">
                <label>
                    Name
                    <input name="name" value={form.name} onChange={handleChange} />
                </label>

                <label>
                    Address
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Avatar URL
                    <input
                        name="avatarUrl"
                        value={form.avatarUrl}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Payment Profile ID
                    <input
                        name="paymentProfileId"
                        value={form.paymentProfileId}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Save</button>
            </form>
        </section>
    );
};

export default AccountPage;