import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "../../assets/css/public/register.css";

export default function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!fullName.trim()) {
            alert("Enter Full Name");
            return;
        }

        if (!email.trim() || !email.includes("@")) {
            alert("Enter Valid Email");
            return;
        }

        if (!role) {
            alert("Select Role");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            const data = await authService.register({
                fullName,
                email,
                password,
                confirmPassword,
                role
            });

            if (data.userId) {
                localStorage.setItem("userId", data.userId);
            }

            alert(data.message || "Registration Successful!");

            switch (role) {

                case "NGO":
                    navigate("/ngo-register");
                    break;

                case "RESTAURANT":
                    navigate("/restaurant-register");
                    break;

                case "VOLUNTEER":
                    navigate("/volunteer-register");
                    break;

                default:
                    navigate("/login");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                error.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page-wrapper">

            <div className="register-container">

                {/* LEFT PANEL */}

                <div className="left-panel">

                    <div className="bg-circle-1"></div>
                    <div className="bg-circle-2"></div>

                    <div className="overlay">

                        <div className="left-content">

                            <div className="logo">

                                <i className="fa-solid fa-hand-holding-heart"></i>

                                <h1>Food Rescue</h1>

                            </div>

                            <h2>Join Our Mission</h2>

                            <p>
                                Help reduce food waste and feed people in need by
                                becoming a verified Restaurant, NGO or Volunteer.
                            </p>

                            <div className="benefits">

                                <div className="benefit">

                                    <div className="benefit-icon">
                                        <i className="fa-solid fa-store"></i>
                                    </div>

                                    <span>Donate Surplus Food</span>

                                </div>

                                <div className="benefit">

                                    <div className="benefit-icon">
                                        <i className="fa-solid fa-hand-holding-heart"></i>
                                    </div>

                                    <span>Support Local Communities</span>

                                </div>

                                <div className="benefit">

                                    <div className="benefit-icon">
                                        <i className="fa-solid fa-truck"></i>
                                    </div>

                                    <span>Deliver Food Efficiently</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="right-panel">

                    <div className="register-card">

                        <h2>Create Account</h2>

                        <p className="subtitle">
                            Register to continue
                        </p>

                        <form onSubmit={handleSubmit}>
                          {/* ================= FULL NAME ================= */}

<div className="input-group">

    <label htmlFor="fullName">Full Name</label>

    <div className="input-box">

        <span className="icon-left">
            <i className="fa-solid fa-user"></i>
        </span>

        <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
        />

    </div>

</div>

{/* ================= EMAIL ================= */}

<div className="input-group">

    <label htmlFor="email">Email Address</label>

    <div className="input-box">

        <span className="icon-left">
            <i className="fa-solid fa-envelope"></i>
        </span>

        <input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

    </div>

</div>

{/* ================= REGISTER AS ================= */}

<div className="input-group">

    <label htmlFor="role">Register As</label>

    <div className="input-box">

        <span className="icon-left">
            <i className="fa-solid fa-users"></i>
        </span>

        <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
        >
            <option value="">Select Role</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="NGO">NGO</option>
            <option value="VOLUNTEER">Volunteer</option>
        </select>

        <span className="select-arrow">
            <i className="fa-solid fa-chevron-down"></i>
        </span>

    </div>

</div>

{/* ================= PASSWORD ================= */}

<div className="input-group">

    <label htmlFor="password">Password</label>

    <div className="input-box">

        <span className="icon-left">
            <i className="fa-solid fa-lock"></i>
        </span>

        <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
        >
            <i
                className={`fa-solid ${
                    showPassword
                        ? "fa-eye-slash"
                        : "fa-eye"
                }`}
            ></i>
        </span>

    </div>

</div>

{/* ================= CONFIRM PASSWORD ================= */}

<div className="input-group">

    <label htmlFor="confirmPassword">
        Confirm Password
    </label>

    <div className="input-box">

        <span className="icon-left">
            <i className="fa-solid fa-lock"></i>
        </span>

        <input
            type={
                showConfirmPassword
                    ? "text"
                    : "password"
            }
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
                setConfirmPassword(e.target.value)
            }
            required
        />

        <span
            className="toggle-password"
            onClick={() =>
                setShowConfirmPassword(
                    !showConfirmPassword
                )
            }
        >
            <i
                className={`fa-solid ${
                    showConfirmPassword
                        ? "fa-eye-slash"
                        : "fa-eye"
                }`}
            ></i>
        </span>

    </div>

</div>

{/* ================= TERMS ================= */}

<div className="terms">

    <label>

        <input type="checkbox" required />

        I agree to the
        <a href="#"> Terms & Conditions</a>

    </label>

</div>

{/* ================= REGISTER BUTTON ================= */}

<button
    type="submit"
    className="register-btn"
    disabled={loading}
>

    <i
        className={`fa-solid ${
            loading
                ? "fa-spinner fa-spin"
                : "fa-user-plus"
        }`}
    ></i>

    {loading
        ? "Creating Account..."
        : "Create Account"}

</button>

</form>

<div className="divider">
    <span>OR</span>
</div>

<div className="login-link">
    Already have an account?
    <Link to="/login"> Login</Link>
</div>

<div className="back-home">
    <Link to="/">
        <i className="fa-solid fa-arrow-left"></i>
        {" "}Back to Home
    </Link>
</div>

</div>

</div>

</div>

</div>

);

}
