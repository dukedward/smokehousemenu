// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="screen home-screen">
            <h1 className="screen-title">Welcome to 4 The Fork Of IT</h1>
            <p className="screen-subtitle">
                Choose a menu to explore our BBQ, plates, and catering options.
            </p>

            <div className="home-grid">
                {/*<Link to="/small-plates" className="nav-card">
                    <h2>Small Plates</h2>
                    <p>Perfect for individual cravings and casual bites.</p>
                </Link>*/}

                <Link to="/catering" className="nav-card">
                    <h2>Catering Platters</h2>
                    <p>Ideal for parties, events, and big family gatherings.</p>
                </Link>
            </div>
        </section>
    );
};

export default Home;