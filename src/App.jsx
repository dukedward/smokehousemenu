// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/Home";
import Header from "./Pages/Header";
import AccountPage from "./Pages/AccountPage";
import AdminMenuPage from "./Pages/AdminMenuPage";
import LoginPage from "./Pages/LoginPage";

// Small Plates
// import SmallPlatesLayout from "./SmallPlates/SmallPlatesLayout";
// import BBQEntrees from "./SmallPlates/BBQEntrees";
// import FriedEntrees from "./SmallPlates/FriedEntrees";
// import BurgersSandwiches from "./SmallPlates/BurgersSandwiches";
// import SmallSides from "./SmallPlates/Sides";
// import SmallBeverages from "./SmallPlates/Beverages";
// import SmallSpecials from "./SmallPlates/Specials";

// Catering
import CateringLayout from "./Catering/CateringLayout";
import CateringEntrees from "./Catering/Entrees";
import CateringSides from "./Catering/Sides";
import HandCraftedSauces from "./Catering/HandCraftedSauces";
import CateringBeverages from "./Catering/Beverages";
import Breads from "./Catering/Breads";
import CateringSpecials from "./Catering/Specials";

import { AuthProvider } from "./AuthContext";
import { RequireAuth, RequireAdmin } from "./RouteGuards";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-root">
                    <Header />

                    <main className="app-main">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            {/* Small Plates nested routes 
                            <Route path="/small-plates" element={<SmallPlatesLayout />}>
                                <Route index element={<BBQEntrees />} />
                                <Route path="bbq-entrees" element={<BBQEntrees />} />
                                <Route path="fried-entrees" element={<FriedEntrees />} />
                                <Route
                                    path="burgers-sandwiches"
                                    element={<BurgersSandwiches />}
                                />
                                <Route path="sides" element={<SmallSides />} />
                                <Route path="beverages" element={<SmallBeverages />} />
                                <Route path="specials" element={<SmallSpecials />} />
                            </Route>*/}

                            {/* Catering nested routes */}
                            <Route path="/catering" element={<CateringLayout />}>
                                <Route index element={<CateringEntrees />} />
                                <Route path="entrees" element={<CateringEntrees />} />
                                <Route path="sides" element={<CateringSides />} />
                                <Route
                                    path="hand-crafted-sauces"
                                    element={<HandCraftedSauces />}
                                />
                                <Route path="beverages" element={<CateringBeverages />} />
                                <Route path="breads" element={<Breads />} />
                                <Route path="specials" element={<CateringSpecials />} />
                            </Route>

                            {/* Account page: any logged-in user */}
                            <Route
                                path="/account"
                                element={
                                    <RequireAuth>
                                        <AccountPage />
                                    </RequireAuth>
                                }
                            />

                            {/* Admin-only menu editor */}
                            <Route
                                path="/admin/menu"
                                element={
                                    <RequireAdmin>
                                        <AdminMenuPage />
                                    </RequireAdmin>
                                }
                            />

                            {/* you can add /login, /signup routes here */}
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;