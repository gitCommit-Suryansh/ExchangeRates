"use client"
import React, { useState ,useEffect} from 'react';
import styles from './ExchangeRates.module.css';
import axios from 'axios'

const ExchangeRates = () => {
  

  const [rates, setRates] = useState([])
  const [lastUpdatedRate, setlastUpdatedRate] = useState([])

  async function fetchRates() {
    try {
      const res = await axios.get("/api/rate");
      setRates(res.data);
      const formated={...res.data[0],
        date:new Date(res.data[0].date).toISOString().split('T')[0]
      }
      setlastUpdatedRate(formated)
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    }
  }

  useEffect(() => {
    fetchRates(); // Run only once when component mounts
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.hamburger}>☰</div>
          <div className={styles.navbarTitle}>Exchange Rates</div>
          <div className={styles.navbarSpacer}></div>
        </div>

        <div className={styles.titleSection}>
          <h1 className={styles.title}>Rates</h1>
          
          <div className={styles.currentRates}>
            <div className={styles.rateCard}>
              <div className={styles.currencyCode}>AED</div>
              <div className={`${styles.rateValue} ${styles.aedRate}`}>{lastUpdatedRate.aed}</div>
              <div className={styles.timestamp}>Date: {lastUpdatedRate.date}</div>
            </div>
            <div className={styles.rateCard}>
              <div className={styles.currencyCode}>USDT</div>
              <div className={`${styles.rateValue} ${styles.usdtRate}`}>{lastUpdatedRate.usdt}</div>
              <div className={styles.timestamp}>Date: {lastUpdatedRate.date}</div>
            </div>
          </div>
        </div>

        <div className={styles.ratesTable}>
          <div className={styles.tableHeader}>
            <span>Date</span>
            <span>AED Rate</span>
            <span>USDT Rate</span>
          </div>

          {rates.length>0 ? rates.map((rate, index) => (
            <div key={index} className={styles.rateRow}>
              <div className={styles.dateCell}>{new Date(rate.date).toISOString().split("T")[0]}</div>
              <div className={styles.rateCell}>{rate.aed}</div>
              <div className={styles.rateCell}>{rate.usdt}</div>
            </div>
          )) : <h3 className="text-center text-2xl">Loading</h3>}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;