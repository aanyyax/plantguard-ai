import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import diseaseData from "./diseaseData";

function App() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // =========================
    // THEME
    // =========================

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("plantguard-theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark-mode",
            darkMode
        );

        localStorage.setItem(
            "plantguard-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((previous) => !previous);
    };

    // =========================
    // FILE HANDLING
    // =========================

    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    // =========================
    // PREDICTION
    // =========================

    const predictDisease = async () => {
        if (!image) {
            alert("Please upload a leaf image first.");
            return;
        }

        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Prediction failed."
                );
            }

            setResult(data);

        } catch (error) {
            setResult({
                error: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // RESET
    // =========================

    const resetAnalysis = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
        setLoading(false);
    };

    const information =
        result && !result.error
            ? diseaseData[result.disease]
            : null;

    return (
        <div className="app">

            {/* =========================
                BACKGROUND
            ========================= */}

            <div className="background-decoration">
                <div className="leaf-decoration leaf-one">
                    🍃
                </div>

                <div className="leaf-decoration leaf-two">
                    🌿
                </div>

                <div className="leaf-decoration leaf-three">
                    🍃
                </div>

                <div className="glow glow-one"></div>
                <div className="glow glow-two"></div>
            </div>


            {/* =========================
                NAVBAR
            ========================= */}

            <header className="navbar">

                <div className="brand">

                    <div className="brand-icon">
                        🌿
                    </div>

                    <div>
                        <h2>
                            PlantGuard <span>AI</span>
                        </h2>

                        <small>
                            Intelligent Plant Health
                        </small>
                    </div>

                </div>


                <nav className="nav-links">

                    <a
                        href="#home"
                        className="active"
                    >
                        Home
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <a href="#features">
                        Features
                    </a>

                    <a href="#contact">
                        Contact
                    </a>

                </nav>


                <div className="navbar-actions">

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>


                    <div className="nav-status">

                        <span className="status-dot"></span>

                        AI System Online

                    </div>

                </div>

            </header>


            {/* =========================
                HERO
            ========================= */}

            <section
                className="hero"
                id="home"
            >

                <div className="hero-badge">

                    <span>🌱</span>

                    PLANT HEALTH ANALYSIS

                </div>


                <h1>

                    Understand Your Plant.

                    <br />

                    <span>
                        Protect Your Harvest.
                    </span>

                </h1>


                <p>

                    Upload a plant leaf image and let
                    PlantGuard AI analyze it for
                    potential diseases using deep
                    learning.

                </p>

            </section>


            {/* =========================
                UPLOAD AREA
            ========================= */}

            <main className="main-content">

                {!result && (

                    <section className="upload-wrapper">

                        <div className="upload-card">

                            {/* LEFT */}

                            <div
                                className={`drop-zone ${
                                    dragActive
                                        ? "drag-active"
                                        : ""
                                }`}
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    setDragActive(true);
                                }}
                                onDragLeave={() =>
                                    setDragActive(false)
                                }
                                onDrop={handleDrop}
                            >

                                {!preview ? (

                                    <>

                                        <div className="upload-cloud">
                                            ↑
                                        </div>

                                        <h3>
                                            Drop your leaf image here
                                        </h3>

                                        <p>
                                            or choose an image from
                                            your computer
                                        </p>


                                        <label className="choose-button">

                                            📷 Choose Image

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={
                                                    handleImageChange
                                                }
                                                hidden
                                            />

                                        </label>


                                        <span className="upload-info">

                                            JPG, JPEG or PNG
                                            <b> • </b>
                                            Clear leaf images
                                            recommended

                                        </span>

                                    </>

                                ) : (

                                    <div className="preview-area">

                                        <img
                                            src={preview}
                                            alt="Uploaded leaf"
                                            className="preview-image"
                                        />

                                        <span className="image-ready">
                                            ✓ Image ready
                                        </span>

                                    </div>

                                )}

                            </div>


                            {/* RIGHT */}

                            {preview ? (

                                <div className="selected-image-panel">

                                    <div className="selected-image">

                                        <img
                                            src={preview}
                                            alt="Selected leaf"
                                        />

                                        <button
                                            className="remove-image"
                                            onClick={resetAnalysis}
                                        >
                                            ×
                                        </button>

                                    </div>


                                    <div className="file-name">

                                        <span>
                                            📄
                                        </span>

                                        <div>

                                            <strong>
                                                {image?.name}
                                            </strong>

                                            <small>
                                                Image ready for analysis
                                            </small>

                                        </div>

                                        <span className="check">
                                            ✓
                                        </span>

                                    </div>


                                    <button
                                        className="analyze-button"
                                        onClick={predictDisease}
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>
                                                <span className="spinner"></span>
                                                Analyzing...
                                            </>

                                        ) : (

                                            <>
                                                🔍
                                                Analyze Plant
                                                <span>→</span>
                                            </>

                                        )}

                                    </button>

                                </div>

                            ) : (

                                <div className="upload-side-info">

                                    <div className="side-leaf">
                                        🌿
                                    </div>

                                    <h3>
                                        Start your plant health check
                                    </h3>

                                    <p>
                                        Upload a clear image of
                                        a plant leaf to begin
                                        your analysis.
                                    </p>

                                    <div className="mini-feature">
                                        ✓ Deep learning analysis
                                    </div>

                                    <div className="mini-feature">
                                        ✓ Disease information
                                    </div>

                                    <div className="mini-feature">
                                        ✓ Prevention guidance
                                    </div>

                                </div>

                            )}

                        </div>

                    </section>

                )}


                {/* =========================
                    LOADING
                ========================= */}

                {loading && (

                    <div className="loading-card">

                        <div className="loading-icon">
                            🌿
                        </div>

                        <h2>
                            PlantGuard AI is analyzing...
                        </h2>

                        <p>
                            Our neural network is examining
                            visual patterns in your leaf image.
                        </p>

                        <div className="loading-bar">
                            <div></div>
                        </div>

                    </div>

                )}


                {/* =========================
                    RESULTS
                ========================= */}

                {result &&
                    !result.error &&
                    information && (

                    <section className="results">

                        <div className="result-header">

                            <div>

                                <span className="section-label">
                                    STEP 02 • AI ANALYSIS
                                </span>

                                <h2>
                                    Plant Health Report
                                </h2>

                                <p>
                                    AI-generated analysis based
                                    on the uploaded leaf image.
                                </p>

                            </div>


                            <div className="ai-badge">
                                ✓ Analysis Complete
                            </div>

                        </div>


                        {/* Diagnosis */}

                        <div className="diagnosis-grid">

                            <div className="result-image-card">

                                <img
                                    src={preview}
                                    alt="Analyzed leaf"
                                />

                                <div className="image-overlay">
                                    Analyzed Image
                                </div>

                            </div>


                            <div className="diagnosis-card">

                                <div className="diagnosis-top">

                                    <span className="result-type">
                                        {information.category}
                                    </span>

                                    <span
                                        className={`severity ${information.severity
                                            .toLowerCase()
                                            .replace(
                                                " ",
                                                "-"
                                            )}`}
                                    >
                                        {information.severity}
                                    </span>

                                </div>


                                <h1>
                                    {information.disease}
                                </h1>


                                <p className="plant-name">
                                    🌱 Detected on{" "}
                                    <strong>
                                        {information.plant}
                                    </strong>
                                </p>


                                <div className="confidence-section">

                                    <div className="confidence-heading">

                                        <span>
                                            AI Confidence
                                        </span>

                                        <strong>
                                            {result.confidence}%
                                        </strong>

                                    </div>


                                    <div className="confidence-track">

                                        <div
                                            className="confidence-fill"
                                            style={{
                                                width:
                                                    `${result.confidence}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>


                                <div className="diagnosis-meta">

                                    <div>

                                        <span>
                                            Type
                                        </span>

                                        <strong>
                                            {information.type}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Cause
                                        </span>

                                        <strong>
                                            {information.cause}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* About */}

                        <div
                            className="info-section"
                            id="about"
                        >

                            <div className="section-title">

                                <span>
                                    🦠
                                </span>

                                <div>

                                    <h2>
                                        About this condition
                                    </h2>

                                    <p>
                                        Understanding the
                                        detected plant condition
                                    </p>

                                </div>

                            </div>


                            <div className="description-box">
                                {information.description}
                            </div>

                        </div>


                        {/* Info */}

                        <div
                            className="info-grid"
                            id="features"
                        >

                            <InfoCard
                                icon="👁️"
                                title="Common Symptoms"
                                items={
                                    information.symptoms
                                }
                            />

                            <InfoCard
                                icon="🌱"
                                title="Affected Parts"
                                items={
                                    information.affectedParts
                                }
                            />

                            <InfoCard
                                icon="🌦️"
                                title="Favorable Conditions"
                                items={
                                    information.favorableConditions
                                }
                            />

                            <InfoCard
                                icon="⚠️"
                                title="Risk Factors"
                                items={
                                    information.riskFactors
                                }
                            />

                        </div>


                        {/* Prevention */}

                        <div className="prevention-section">

                            <div className="section-title">

                                <span>
                                    🛡️
                                </span>

                                <div>

                                    <h2>
                                        Prevention
                                    </h2>

                                    <p>
                                        Steps that can help
                                        reduce disease risk
                                    </p>

                                </div>

                            </div>


                            <div className="action-list">

                                {information.prevention.map(
                                    (item, index) => (

                                    <div
                                        className="action-item"
                                        key={index}
                                    >

                                        <div className="number">
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </div>

                                        <p>
                                            {item}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Management */}

                        <div className="management-section">

                            <div className="section-title">

                                <span>
                                    🔧
                                </span>

                                <div>

                                    <h2>
                                        Management Guidance
                                    </h2>

                                    <p>
                                        General practices for
                                        managing the condition
                                    </p>

                                </div>

                            </div>


                            <div className="management-list">

                                {information.management.map(
                                    (item, index) => (

                                    <div
                                        key={index}
                                        className="management-item"
                                    >

                                        <span>
                                            ✓
                                        </span>

                                        <p>
                                            {item}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Disclaimer */}

                        <div className="disclaimer">

                            <div className="disclaimer-icon">
                                💡
                            </div>

                            <div>

                                <strong>
                                    Important information
                                </strong>

                                <p>
                                    PlantGuard AI provides an
                                    AI-based preliminary
                                    prediction and should not
                                    be considered a confirmed
                                    agricultural diagnosis.
                                    For important crop-management
                                    decisions, consult a qualified
                                    agricultural professional.
                                </p>

                            </div>

                        </div>


                        <button
                            className="another-button"
                            onClick={resetAnalysis}
                        >
                            ↻ Analyze Another Image
                        </button>

                    </section>
                )}


                {/* =========================
                    ERROR
                ========================= */}

                {result?.error && (

                    <div className="error-card">

                        <div className="error-icon">
                            ⚠️
                        </div>

                        <h2>
                            Analysis Failed
                        </h2>

                        <p>
                            {result.error}
                        </p>

                        <button
                            onClick={resetAnalysis}
                            className="another-button"
                        >
                            Try Again
                        </button>

                    </div>

                )}

            </main>


            {/* =========================
                FOOTER
            ========================= */}

            <footer id="contact">

                <div>
                    🌿 <strong>PlantGuard AI</strong>
                </div>

                <span>
                    AI-powered plant disease screening system
                </span>

                <span>
                    Built with Deep Learning • Computer Vision
                </span>

            </footer>

        </div>
    );
}


// ======================================
// INFO CARD
// ======================================

function InfoCard({
    icon,
    title,
    items
}) {

    return (

        <div className="info-card">

            <div className="info-card-header">

                <div className="card-icon">
                    {icon}
                </div>

                <h3>
                    {title}
                </h3>

            </div>


            <ul>

                {items.map((item, index) => (

                    <li key={index}>

                        <span>
                            •
                        </span>

                        {item}

                    </li>

                ))}

            </ul>

        </div>
    );
}


// ======================================
// ROOT
// ======================================

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <App />

    </React.StrictMode>
);