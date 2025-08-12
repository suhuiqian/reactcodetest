// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import CommonButton from "@/components/CommonButton";
// import styles from "./Login.module.css";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ accountId: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.accountId || !formData.password) {
//       setError("アカウントIDとパスワードを入力してください");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     try {
//       // TODO: remove this after testing
//       // 100ms for login redirect
//       await new Promise((resolve) => setTimeout(resolve, 100));
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("userAccountId", formData.accountId);
//       navigate("/dashboard");
//     } catch {
//       setError(
//         "ログインに失敗しました。アカウントIDとパスワードを確認してください。"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.loginPage}>
//       <div className={styles.loginContainer}>
//         <div className={styles.loginHeader}>
//           <h2>ログイン</h2>
//           <p>アカウントにログインしてください</p>
//         </div>
//         <form onSubmit={handleSubmit} className={styles.loginForm}>
//           {error && <div className={styles.errorMessage}>{error}</div>}
//           <div className={styles.inputGroup}>
//             <label htmlFor="accountId">アカウントID</label>
//             <input
//               id="accountId"
//               name="accountId"
//               type="text"
//               value={formData.accountId}
//               onChange={handleInputChange}
//               placeholder="アカウントIDを入力"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <label htmlFor="password">パスワード</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="パスワードを入力"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <div className={styles.formActions}>
//             <CommonButton
//               type="submit"
//               disabled={isLoading}
//               className={styles.loginButton}
//             >
//               {isLoading ? "ログイン中..." : "ログイン"}
//             </CommonButton>
//           </div>
//         </form>
//         <div className={styles.loginFooter}>
//           <div className={styles.passwordResetLink}>
//             <Link to="/forgot-password" className={styles.linkText}>
//               パスワードをお忘れですか？
//             </Link>
//           </div>
//           {/* <div className={styles.registerLink}>
//             <span>アカウントをお持ちでない方は</span>
//             <Link to="/register" className={styles.linkText}>
//               新規登録
//             </Link>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
