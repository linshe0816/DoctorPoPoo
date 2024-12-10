"use client";

import { useState } from 'react';
import styles from '../css/Home.module.css';
import Map from "../components/Map";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState({ lat: 25.033964, lng: 121.564468 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 20) {
      alert('最多只能輸入 20 個字！');
      return;
    }
    setInputValue(value);
    setSuccess(false);
  };

  const handleButtonClick = async () => {
    if (!inputValue.trim()) {
      alert('輸入框不能為空！');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 呼叫 API
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: inputValue }),
      });

      if (!response.ok) {
        throw new Error("API 呼叫失敗");
      }

      const result = await response.json();
      setDisplayValue(result.message || "提交成功！");
      setInputValue(""); // 清空輸入框
      setSuccess(true); // 設置提交成功狀態
    } catch (err) {
      setError((err as Error).message || "發生未知錯誤");
    } finally {
      setLoading(false); // 停止加載狀態
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="輸入內容"
          className={styles.input}
        />
        <button
          onClick={handleButtonClick}
          className={styles.button}
          disabled={loading}
        >
          {loading
            ? "提交中..."
            : success
              ? "提交成功！"
              : "提交"}
        </button>
        <div className={styles.displayBox}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {displayValue && <p>{displayValue}</p>}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Map location={location} />
      </div>
    </div>
  );
}
