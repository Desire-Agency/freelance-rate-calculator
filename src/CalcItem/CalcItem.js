import React, { useState } from "react";
import "./calcItem.css";

const riskFactors = [
  {
    name: "Depression",
    icon:
      <svg width="17" height="21" viewBox="0 0 17 21" fill="none">
        <g clipPath="url(#clip0_1_74)">
          <path d="M15.03 6.1C15.12 6.7 15.25 7.6 15.22 8.26C15.18 9.89 16.48 11.03 16.65 11.95C16.56 12.56 14.8 12.59 15.06 13.08C15.53 13.99 14.57 14.09 14.84 14.53C15.39 15.47 14.13 14.92 14.32 15.76C14.51 16.6 14.51 16.93 14.19 17.38C13.88 17.82 12.33 17.86 11.38 17.84C10.96 17.84 10.61 18.16 10.59 18.58V20.76H2.92001V17.39C2.92001 16.41 2.80001 15.37 2.51001 14.48C2.51001 14.48 2.27001 13.9 1.99001 13.31C2.51001 12.28 3.10001 11.92 4.38001 11.77C6.51001 13.61 9.69001 13.93 12.18 12.35C14.38 10.96 15.41 8.49 15.03 6.11V6.1Z" fill="#94D5F0" />
          <path d="M15.03 6.1C15.12 6.7 15.25 7.6 15.22 8.26C15.18 9.89 16.48 11.03 16.65 11.95C16.56 12.56 14.8 12.59 15.06 13.08C15.53 13.99 14.57 14.09 14.84 14.53C15.39 15.47 14.13 14.92 14.32 15.76C14.51 16.6 14.51 16.93 14.19 17.38C13.88 17.82 12.33 17.86 11.38 17.84C10.96 17.84 10.61 18.16 10.59 18.58V20.76" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M2.91999 20.75V17.38C2.91999 16.4 2.79999 15.36 2.50999 14.47C2.50999 14.47 2.26999 13.89 1.98999 13.3C1.80999 12.92 1.60999 12.53 1.44999 12.27C0.859994 11.34 0.429994 9.99 0.309994 8.71C-6.26221e-06 5.85 1.04999 3.05 3.60999 1.43C7.09999 -0.780001 11.77 0.199999 14.05 3.62C14.56 4.38 14.88 5.21 15.02 6.05C15.02 6.07 15.02 6.09 15.02 6.1C15.4 8.48 14.37 10.95 12.17 12.34C9.67999 13.91 6.48999 13.6 4.36999 11.76C3.93999 11.39 3.55999 10.96 3.22999 10.47C1.59999 8.03 2.29999 4.78 4.78999 3.2C7.27999 1.62 10.61 2.32 12.24 4.77C13.54 6.72 12.99 9.32 10.99 10.58C8.99999 11.84 6.32999 11.28 5.02999 9.33C4.04999 7.87 4.46999 5.92 5.96999 4.97C7.45999 4.02 9.45999 4.44 10.44 5.91C11.09 6.89 10.81 8.19 9.81999 8.82C8.81999 9.45 7.48999 9.17 6.83999 8.19C6.50999 7.7 6.64999 7.05 7.14999 6.74C7.64999 6.42 8.30999 6.56 8.63999 7.05" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_74">
            <rect width="16.89" height="20.75" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 5,
    description: "Depression can significantly lower libido and sexual desire, and it often disrupts the brain\"s ability to send the necessary signals to trigger an erection."
  },
  {
    name: "Anxiety",
    icon:
      <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
        <g clipPath="url(#clip0_1_79)">
          <path d="M16.29 9.73C16.29 9.73 16.29 9.78 16.29 9.8C17.34 9.81 18.19 10.75 18.19 11.91C18.19 13.07 17.33 14.02 16.27 14.02H6.22C5.16 14.02 4.3 13.07 4.3 11.91C4.3 10.89 4.96 10.04 5.83 9.84C5.83 9.8 5.83 9.76 5.83 9.72C5.83 8.6 6.66 7.68 7.68 7.68C8.12 7.68 8.52 7.85 8.83 8.12C9.05 7.13 9.86 6.39 10.83 6.39C11.95 6.39 12.86 7.38 12.89 8.6C13.22 8.04 13.79 7.67 14.44 7.67C15.46 7.67 16.29 8.58 16.29 9.71V9.73Z" fill="#94D5F0" />
          <path d="M12.86 10.7C12.39 11.16 11.65 11.23 11.1 10.84C10.68 10.54 10.47 10.04 10.52 9.55" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.43 14.04C15.43 14.04 15.39 14.04 15.37 14.03C14.88 13.9 14.52 13.44 14.53 12.89C14.53 12.46 14.78 12.09 15.12 11.9" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.75 10.49C10.76 10.83 10.56 11.15 10.22 11.27C9.88 11.39 9.51 11.27 9.31 10.97" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M7.66001 12.42C7.36001 12.69 7.26001 13.13 7.45001 13.51C7.61001 13.84 7.93001 14.03 8.26001 14.03" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M6.22 14.03C5.16 14.03 4.3 13.08 4.3 11.92C4.3 10.9 4.96 10.05 5.83 9.85" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M6.30001 11.1C6.02001 10.77 5.85001 10.33 5.82001 9.85C5.82001 9.81 5.82001 9.77 5.82001 9.73C5.82001 8.61 6.65001 7.69 7.67001 7.69C8.11001 7.69 8.51001 7.86 8.82001 8.13" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.7 9.05C12.75 8.9 12.81 8.75 12.89 8.62C13.22 8.06 13.79 7.69 14.44 7.69C15.46 7.69 16.29 8.6 16.29 9.73C16.29 9.75 16.29 9.78 16.29 9.8" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.89 8.62C12.86 7.39 11.95 6.41 10.83 6.41C9.86 6.41 9.05 7.15 8.83 8.14C8.79 8.31 8.77 8.49 8.77 8.68C8.77 8.79 8.77 8.91 8.79 9.02" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M6.22 14.03H16.27C17.33 14.03 18.19 13.08 18.19 11.92C18.19 10.76 17.34 9.82 16.29 9.81C16.29 9.81 16.28 9.81 16.27 9.81C15.84 9.81 15.45 9.96 15.13 10.22" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.68 12.9C10.47 13.09 10.4 13.41 10.53 13.68C10.62 13.87 10.79 14 10.99 14.04C11.03 14.04 11.07 14.05 11.11 14.05" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M11.52 0.0899963L10.64 2.49L11.85 2.46L11 4.78" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M16.88 1.32L15.19 3.24L16.33 3.65L14.7 5.51" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M21.75 4.93L19.49 6.12L20.4 6.91L18.21 8.06" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M5.28999 1.64L5.84999 4.13L6.85999 3.45L7.39999 5.86" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M0.190002 5.36L1.8 7.35L2.4 6.3L3.95 8.23" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M18.62 14.12C18.62 14.37 18.62 14.63 18.62 14.89C18.58 16.52 19.88 17.66 20.05 18.58C19.96 19.19 18.2 19.22 18.46 19.71C18.93 20.62 17.97 20.72 18.24 21.16C18.79 22.1 17.53 21.55 17.72 22.39C17.91 23.23 17.91 23.56 17.59 24.01C17.28 24.45 15.73 24.49 14.78 24.47C14.36 24.47 14.01 24.79 13.99 25.21V27.39" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M3.72 14.12C3.64 15.69 4.06 17.67 4.84 18.9C5.25 19.55 5.89 21.08 5.9 21.1C6.2 22 6.31 23.03 6.3 24.01V27.38" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_79">
            <rect width="21.87" height="27.38" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 5,
    description: "Anxiety, particularly performance anxiety, can interfere with the natural process of sexual arousal, leading to difficulties in achieving or maintaining an erection."
  },
  {
    name: "Regular smoker",
    icon:
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
        <g clipPath="url(#clip0_1_98)">
          <path d="M6.38 17.16H0.25V13.53H6.38V17.16Z" fill="#94D5F0" />
          <path d="M21.2 13.53V17.16M23.32 13.53V17.16M21.19 11.57V10.9C21.19 9.89999 20.38 9.08999 19.38 9.08999H16.21C15.06 9.08999 14.13 8.15999 14.13 7.00999V5.88999H13.34C11.94 5.88999 10.81 4.75999 10.81 3.35999V2.78999C10.81 1.38999 11.94 0.259995 13.34 0.259995M6.38 13.53V17.16M17.41 5.10999C17.41 5.10999 22.61 3.21999 23.32 9.37999V11.57M15.62 1.67999C15.99 1.42999 16.44 1.27999 16.92 1.27999C18.2 1.27999 19.24 2.31999 19.24 3.59999C19.24 4.04999 19.11 4.47999 18.88 4.82999M19.17 17.16H0.25V13.53H19.17V17.16Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_98">
            <rect width="23.57" height="17.41" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 10,
    description: "Smoking damages blood vessels, reducing blood flow to the penis and impairing the ability to achieve an erection."
  },
  {
    name: "Diabetes",
    icon:
      <svg width="30" height="16" viewBox="0 0 30 16" fill="none">
        <g clipPath="url(#clip0_1_101)">
          <path d="M20.88 9.02V12.28C20.88 13.73 19.7 14.91 18.25 14.91H2.88C1.43 14.91 0.25 13.73 0.25 12.28V2.88C0.25 1.43 1.43 0.25 2.88 0.25H18.25C19.7 0.25 20.88 1.43 20.88 2.88V5.95" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M2.58 2.62L2.58 12.72H16.18V2.62H2.58Z" fill="#94D5F0" />
          <path d="M2.58 2.62L2.58 12.72H16.18V2.62H2.58Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M18.08 7.51V7.49C18.08 6.75 18.68 6.14 19.43 6.14L29.06 6.14V8.86H19.43C18.69 8.86 18.08 8.26 18.08 7.51Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M25.93 7.49001H27.93" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M6.95999 5.11H4.42999V10H6.95999V5.11Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.64 5.11H8.11V10H10.64V5.11Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M4.42999 7.55H6.94999" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M8.22 7.55H10.6" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.47 5.11H14.72" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.47 6.37H14.72" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_101">
            <rect width="29.31" height="15.16" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 20,
    description: "Diabetes can cause nerve and blood vessel damage, which are critical for maintaining an erection, making it one of the most significant medical conditions linked to ED."
  },
  {
    name: "Heart disease",
    icon:
      <svg width="30" height="19" viewBox="0 0 30 19" fill="none">
        <g clipPath="url(#clip0_1_113)">
          <path d="M8.51 5.65C7.2 3.97 5.08 3.28 3.19 4.11C0.799998 5.16 -0.490002 7.99 0.699998 10.69C1.7 12.95 5.68 15.27 8.51 18.56" fill="#94D5F0" />
          <path d="M14.87 4.73C14.55 4.48 14.2 4.28 13.83 4.11C11.94 3.28 9.82 3.97 8.51 5.65C7.2 3.97 5.08 3.28 3.19 4.11C0.799998 5.16 -0.490002 7.98999 0.699998 10.69C1.7 12.95 5.68 15.27 8.51 18.56C10.52 16.23 13.1 14.39 14.79 12.71" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M9.77 9.39H12.73L13.63 7.96L15.15 10.99L16.89 0.25L18.55 16.77L20.46 4.96L22.16 12.75L24.23 7.86L25.17 9.39H29.06" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_113">
            <rect width="29.06" height="18.81" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 20,
    description: "Cardiovascular diseases can impair blood flow to the penis, a crucial factor for achieving and maintaining an erection."
  },
  {
    name: "Overweight",
    icon:
      <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
        <g clipPath="url(#clip0_1_117)">
          <path d="M3.07 0.25C1.37 0.25 0.109997 1.64 0.259997 3.33L1.18 15.26C1.33 16.95 2.85 18.34 4.55 18.34H14.76C16.46 18.34 17.98 16.95 18.13 15.26L19.05 3.33C19.2 1.64 17.94 0.25 16.24 0.25H3.07Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M14.28 6.72999H5.03999C5.03999 4.17999 7.10999 2.10999 9.65999 2.10999C12.21 2.10999 14.28 4.17999 14.28 6.72999ZM9.65999 2.10999V3.16999V2.10999ZM6.38999 3.45999L7.13999 4.20999L6.38999 3.45999ZM12.92 3.45999L12.17 4.20999L12.92 3.45999ZM9.65999 4.67999V6.59999V4.67999Z" fill="#94D5F0" />
          <path d="M9.65999 2.10999C7.10999 2.10999 5.03999 4.17999 5.03999 6.72999H14.28C14.28 4.17999 12.21 2.10999 9.65999 2.10999ZM9.65999 2.10999V3.16999M6.38999 3.45999L7.13999 4.20999M12.92 3.45999L12.17 4.20999M9.65999 4.67999V6.59999" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_117">
            <rect width="19.31" height="18.59" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 10,
    description: "Being overweight is associated with reduced testosterone levels and impaired blood flow, both of which can contribute to ED."
  },
  {
    name: "High blood pressure",
    icon:
      <svg width="21" height="18" viewBox="0 0 21 18" fill="none">
        <g clipPath="url(#clip0_1_120)">
          <path d="M15.57 13.05C18.3259 13.05 20.56 10.8159 20.56 8.06001C20.56 5.30411 18.3259 3.07001 15.57 3.07001C12.8141 3.07001 10.58 5.30411 10.58 8.06001C10.58 10.8159 12.8141 13.05 15.57 13.05Z" fill="#94D5F0" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.58 8.06H11.35" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.57 9.21C16.2051 9.21 16.72 8.69513 16.72 8.06C16.72 7.42488 16.2051 6.91 15.57 6.91C14.9349 6.91 14.42 7.42488 14.42 8.06C14.42 8.69513 14.9349 9.21 15.57 9.21Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.57 3.07001V3.84001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M20.56 8.06H19.79" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M17.49 6.14001L16.38 7.25001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.57 12.28V13.05" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M16.72 12.92V14.21C16.72 14.85 16.21 15.36 15.57 15.36C15.25 15.36 14.96 15.23 14.76 15.02C14.56 14.81 14.42 14.52 14.42 14.21V12.92" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.57 15.36C15.57 15.36 15.57 16.33 15.28 17.66" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M11.16 12.41C10.25 13.22 9.33 14.09 8.51 15.05C5.68 11.76 1.7 9.44 0.699998 7.18C-0.490002 4.48 0.799998 1.65 3.19 0.600001C5.08 -0.229999 7.2 0.460001 8.51 2.14C9.82 0.460001 11.94 -0.229999 13.83 0.600001C14.43 0.860001 14.96 1.24 15.4 1.69" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_120">
            <rect width="20.81" height="17.71" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 15,
    description: "High blood pressure can damage the blood vessels, reducing blood flow to the penis and making it difficult to achieve an erection."
  },
  {
    name: "High cholesterol",
    icon:
      <svg width="23" height="26" viewBox="0 0 23 26" fill="none">
        <g clipPath="url(#clip0_1_132)">
          <path d="M11.52 0.0899963L10.64 2.49L11.85 2.46L11 4.78" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M16.88 1.32001L15.19 3.24001L16.33 3.65001L14.7 5.51001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M21.75 4.92999L19.49 6.11999L20.4 6.90999L18.21 8.05999" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M5.29001 1.63998L5.85001 4.12998L6.86001 3.44998L7.40001 5.85998" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M0.190002 5.35999L1.8 7.34999L2.4 6.29999L3.95 8.22998" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.81 12.35C13.7 9.33 10.83 7 10.83 7C10.83 7 6.63 10.42 4.65 14.33C4.01 15.41 3.64 16.66 3.64 18C3.64 21.97 6.86 25.19 10.83 25.19C12.42 25.19 13.9 24.67 15.09 23.79" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M16.77 16.61V23.59H18.5H20.24V16.61H22.64L18.5 11.73L14.37 16.61H16.77Z" fill="#94D5F0" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_132">
            <rect width="22.89" height="25.43" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 5,
    description: "High cholesterol can lead to atherosclerosis (hardening of the arteries), which can restrict blood flow to the penis and cause ED."
  },
  {
    name: "Pelvic surgery",
    icon:
      <svg width="25" height="22" viewBox="0 0 25 22" fill="none">
        <g clipPath="url(#clip0_1_141)">
          <path d="M22.9 5.61C25.58 8.1 24.02 11.26 22.34 11.85C20.35 12.54 20.85 13.36 20.97 15.23C21.11 17.58 19.7 16.8 19.4 18.31C19.1 19.82 18.65 21.15 17.11 21.15C14.74 21.15 14.52 18.39 12.3 18.39C10.08 18.39 9.85 21.15 7.5 21.15C5.96 21.15 5.51 19.82 5.2 18.31C4.89 16.8 3.48 17.58 3.63 15.23C3.75 13.36 4.24 12.54 2.25 11.85C0.570003 11.26 -0.989997 8.1 1.69 5.61C5.84 1.73 9.08 6.62 9.08 6.62C8.77 7.14 8.43 8.11 8.65 9.71C8.65 9.71 6.76 11.18 7.09 12.83C7.44 14.48 8.9 15.61 12.29 15.61C15.68 15.61 17.14 14.48 17.49 12.83C17.83 11.18 15.93 9.71 15.93 9.71C16.15 8.12 15.81 7.15 15.5 6.62C15.5 6.62 18.75 1.74 22.89 5.61H22.9ZM17.08 18.27V17.32C17.08 17.05 16.84 16.85 16.57 16.9L15.91 17.04C15.6 17.1 15.47 17.47 15.66 17.72L16.33 18.54C16.39 18.62 16.48 18.67 16.58 18.69C16.84 18.73 17.08 18.54 17.08 18.27ZM8.93 17.72C9.13 17.47 8.99 17.11 8.68 17.04L8.02 16.9C7.75 16.85 7.51 17.05 7.51 17.32V18.27C7.51 18.54 7.75 18.73 8.01 18.69C8.11 18.67 8.2 18.62 8.26 18.54L8.93 17.72Z" fill="#94D5F0" />
          <path d="M12.3 6.09H9.52C9.52 6.09 9.31 6.24 9.08 6.61C8.77 7.13 8.43 8.1 8.65 9.7C8.65 9.74 8.67 9.8 8.68 9.85C8.68 9.85 10.2 10.53 10.65 11.47C11.09 12.42 11.74 12.88 12.3 12.88" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M8.66001 9.70999C8.66001 9.70999 6.77001 11.18 7.10001 12.83C7.45001 14.48 8.91001 15.61 12.3 15.61" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.3 18.39C10.08 18.39 9.85 21.15 7.5 21.15C5.96 21.15 5.51 19.82 5.2 18.31C4.89 16.8 3.48 17.58 3.63 15.23C3.75 13.36 4.24 12.54 2.25 11.85C0.570003 11.26 -0.989997 8.1 1.69 5.61C5.84 1.73 9.08 6.62 9.08 6.62" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M4.71 6.73001L3.3 9.18001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M8.01001 18.69C7.75001 18.73 7.51001 18.54 7.51001 18.27V17.32C7.51001 17.05 7.75001 16.85 8.02001 16.9L8.68001 17.04C8.99001 17.1 9.12001 17.47 8.93001 17.72L8.26001 18.54C8.20001 18.62 8.11001 18.67 8.01001 18.69Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.3 6.09H15.08C15.08 6.09 15.29 6.24 15.52 6.61C15.83 7.13 16.17 8.1 15.95 9.7C15.95 9.74 15.93 9.8 15.92 9.85C15.92 9.85 14.4 10.53 13.95 11.47C13.51 12.42 12.86 12.88 12.3 12.88" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M15.94 9.70999C15.94 9.70999 17.83 11.18 17.5 12.83C17.15 14.48 15.69 15.61 12.3 15.61" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.3 18.39C14.52 18.39 14.75 21.15 17.11 21.15C18.65 21.15 19.09 19.82 19.4 18.31C19.71 16.8 21.12 17.58 20.97 15.23C20.85 13.36 20.35 12.54 22.34 11.85C24.02 11.26 25.58 8.1 22.9 5.61C18.75 1.73 15.51 6.62 15.51 6.62" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M19.89 6.73001L21.29 9.18001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M16.59 18.69C16.85 18.73 17.09 18.54 17.09 18.27V17.32C17.09 17.05 16.85 16.85 16.58 16.9L15.92 17.04C15.61 17.1 15.48 17.47 15.67 17.72L16.34 18.54C16.4 18.62 16.49 18.67 16.59 18.69Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.66 6.09V3.96V1.87V0" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M13.94 6.09V3.96V1.87V0" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M9.45 1.87H10.66H13.94H15.15" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M9.45 3.95999H10.66H13.94H15.15" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.71 7.28C11.02 7.63 11.62 7.86 12.29 7.86C12.96 7.86 13.56 7.63 13.87 7.28" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M10.71 9.25C11.02 9.6 11.62 9.83 12.29 9.83C12.96 9.83 13.56 9.6 13.87 9.25" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_141">
            <rect width="24.6" height="21.4" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 10,
    description: "Surgeries in the pelvic area, such as prostate surgery, can damage nerves and blood vessels involved in erectile function."
  },
  {
    name: "Antidepressants",
    icon:
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
        <g clipPath="url(#clip0_1_160)">
          <path d="M12.9 10.4H7.47V17.68H12.9V10.4Z" fill="#94D5F0" />
          <path d="M10.55 0.6V3.38C10.55 3.57 10.4 3.73 10.21 3.73H2.94C2.74 3.73 2.59 3.57 2.59 3.38V0.6C2.59 0.4 2.74 0.25 2.94 0.25H10.21C10.4 0.25 10.55 0.4 10.55 0.6Z" fill="#94D5F0" />
          <path d="M9.24 3.73H10.21C10.4 3.73 10.55 3.57 10.55 3.38V0.6C10.55 0.4 10.4 0.25 10.21 0.25H2.94C2.74 0.25 2.59 0.4 2.59 0.6V3.38C2.59 3.57 2.74 3.73 2.94 3.73H9.24Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.9 17.68H7.47V10.4H12.9" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M9.24 4.64999L9.81 5.83999C10.04 6.29999 10.51 6.59999 11.03 6.59999C12.06 6.59999 12.9 7.43999 12.9 8.46999V19.85C12.9 20.41 12.44 20.86 11.88 20.86H1.26C0.7 20.86 0.25 20.41 0.25 19.85V8.46999C0.25 7.43999 1.08 6.59999 2.11 6.59999C2.63 6.59999 3.11 6.29999 3.33 5.83999L3.9 4.64999" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M2.11 6.60001H7.9" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_160">
            <rect width="13.15" height="21.11" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 10,
    description: "Certain antidepressants can interfere with sexual function, including causing or worsening ED as a side effect."
  },
  {
    name: "Low testosterone",
    icon:
      <svg width="34" height="23" viewBox="0 0 34 23" fill="none">
        <g clipPath="url(#clip0_1_169)">
          <path d="M25.92 7.08001V11.77L21.84 14.13L17.75 11.77V7.06001L21.84 4.70001L25.92 7.06001V7.08001Z" fill="#94D5F0" />
          <path d="M13.65 14.12L13.67 14.13V18.84L9.58999 21.2L5.94999 19.1L5.50999 18.84V18.35V14.13L9.58999 11.77L13.65 14.12Z" fill="#94D5F0" />
          <path d="M13.65 14.13V14.12V9.42001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M25.94 7.06001V2.35001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M13.67 18.84L9.58999 21.2L5.94999 19.1L5.50999 18.84V18.35V14.13L9.58999 11.77L13.65 14.12L13.67 14.13" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M21.84 14.13V18.84L17.75 21.2L13.67 18.84V14.13L17.75 11.77" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M25.92 11.77L21.84 14.13L17.75 11.77V7.06001L21.84 4.70001L25.92 7.06001V7.08001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M5.51 18.35L2.17 20.28" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M5.95 19.1L2.64 21.01" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M12.29 18.29L9.61 19.84" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M25.92 7.08001L30.36 5.64001L33.1 9.42001L30.36 13.2L25.92 11.77V7.08001Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M31.77 2.51001L30.38 5.64001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M32.25 0.25C32.9 0.25 33.43 0.78 33.43 1.43C33.43 2.08 32.9 2.61 32.25 2.61C32.08 2.61 31.92 2.57 31.77 2.51C31.36 2.32 31.07 1.91 31.07 1.43C31.07 0.78 31.6 0.25 32.25 0.25Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M1.43 20.02C1.71 20.02 1.96 20.12 2.16 20.29C2.39 20.46 2.55 20.72 2.59 21.01C2.59 21.07 2.61 21.14 2.61 21.2C2.61 21.85 2.08 22.38 1.43 22.38C0.78 22.38 0.25 21.85 0.25 21.2C0.25 20.55 0.78 20.02 1.43 20.02Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_169">
            <rect width="33.68" height="22.63" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 15,
    description: "Low levels of testosterone can reduce sexual desire and contribute to difficulties in achieving an erection."
  },
  {
    name: "Regular alcohol use",
    icon:
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
        <g clipPath="url(#clip0_1_186)">
          <path d="M13.17 14.49C13.34 16.46 11.66 18 9.8 18C7.94 18 6.26 16.46 6.44 14.49L6.57 13.28H13.05L13.18 14.49H13.17Z" fill="#94D5F0" />
          <path d="M4.65 11.52V18.48H0.28H0.25V11.52H0.28H4.65Z" fill="#94D5F0" />
          <path d="M3.83 4.89001H5.48" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M6.07 23H1.14C0.65 23 0.25 22.61 0.25 22.12V10.28C0.25 8.72 1.17 7.37 2.47 6.77V0.99C2.47 0.58 2.8 0.25 3.21 0.25H4.79C5.19 0.25 5.52 0.58 5.52 0.99V6.76C6.48 7.21 7.23 8.06 7.57 9.09" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M0.279999 11.52H4.65V18.48H0.279999" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M9.81 22.92V18.03" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M7.39999 23H9.80999H12.2" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M9.81 18C11.67 18 13.35 16.46 13.18 14.49L13.05 13.28L12.76 10.5H6.85L6.57 13.29L6.44 14.5C6.26 16.47 7.94 18.01 9.8 18.01L9.81 18Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M6.56 13.28H6.57H12.94" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_186">
            <rect width="13.44" height="23.25" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 5,
    description: "Regular alcohol consumption can depress the central nervous system and impair the ability to achieve and maintain an erection."
  },
  {
    name: "Regular drug use",
    icon:
      <svg width="18" height="21" viewBox="0 0 18 21" fill="none">
        <g clipPath="url(#clip0_1_198)">
          <path d="M14.88 1.91C16.42 2.5 17.19 4.22 16.59 5.76L14.22 11.94L8.66 9.8L11.03 3.62C11.62 2.08 13.35 1.32 14.88 1.91Z" fill="#94D5F0" />
          <path d="M1.25 1.26001L6.08 6.08001C4.75 7.42001 2.59 7.42001 1.25 6.08001C-0.0899978 4.74001 -0.0799978 2.59001 1.25 1.26001Z" fill="#94D5F0" />
          <path d="M1.25 1.26C2.59 -0.0799952 4.75 -0.0799952 6.08 1.26C7.41 2.59 7.41 4.75 6.08 6.08C4.75 7.42 2.59 7.42 1.25 6.08C-0.0899978 4.74 -0.0799978 2.59 1.25 1.26Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M1.25 1.26001L6.08 6.08001" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M14.22 11.94L11.84 18.12C11.25 19.65 9.53001 20.42 7.99001 19.83C6.45001 19.24 5.69001 17.51 6.28001 15.98L8.66001 9.8L11.03 3.62C11.62 2.08 13.35 1.32 14.88 1.91C16.42 2.5 17.19 4.22 16.59 5.76L14.22 11.94Z" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
          <path d="M8.66 9.79999L14.22 11.94" stroke="#003F82" strokeWidth="0.5" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_198">
            <rect width="17.04" height="20.27" fill="white" />
          </clipPath>
        </defs>
      </svg>,
    weight: 5,
    description: "The use of recreational drugs can interfere with sexual arousal and function, leading to ED."
  },
];

const EDcalculator = () => {
  const [age, setAge] = useState("");
  const [selectedFactors, setSelectedFactors] = useState({});
  const [normalizedFactors, setNormalizedFactors] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [errorAge, setErrorAge] = useState(false);
  const [riskLevel, setRiskLevel] = useState("");
  const [riskPercentage, setRiskPercentage] = useState(0);

  const handleToggle = (name, weight) => {
    const updatedFactors = { ...selectedFactors };

    if (updatedFactors[name]) {
      delete updatedFactors[name];
    } else {
      updatedFactors[name] = weight;
    }

    setSelectedFactors(updatedFactors);

    const normalizedFactorsConst = Object.entries(updatedFactors).map(([key, weight]) => ({
      name: key,
      weight: weight ? (weight / 135) * 100 : 0,
    }));

    setNormalizedFactors(normalizedFactorsConst);

    const totalRiskPercentage = normalizedFactorsConst.reduce((sum, factor) => sum + factor.weight, 0);
    setRiskPercentage(totalRiskPercentage);

    switch (true) {
      case totalRiskPercentage <= 25:
        setRiskLevel("Low Risk");
        break;
      case totalRiskPercentage <= 50:
        setRiskLevel("Moderate Risk");
        break;
      case totalRiskPercentage <= 75:
        setRiskLevel("High Risk");
        break;
      default:
        setRiskLevel("Very High Risk");
        break;
    }
  };

  return (
    <div className="calculator">
      <div className="container">
        <div className="title-block">
          <svg width="96" height="109" viewBox="0 0 96 109" fill="none">
            <g clipPath="url(#clip0_1_15)">
              <path d="M88.52 13.3H6.63C2.96835 13.3 0 16.2684 0 19.93V101.82C0 105.482 2.96835 108.45 6.63 108.45H88.52C92.1816 108.45 95.15 105.482 95.15 101.82V19.93C95.15 16.2684 92.1816 13.3 88.52 13.3Z" fill="#EDF0FA" />
              <path d="M46.76 48.24C54.0115 48.24 59.89 42.3615 59.89 35.11C59.89 27.8585 54.0115 21.98 46.76 21.98C39.5085 21.98 33.63 27.8585 33.63 35.11C33.63 42.3615 39.5085 48.24 46.76 48.24Z" stroke="#FF8400" strokeWidth="4.11" strokeMiterlimit="10" strokeLinecap="round" />
              <path d="M86.11 13.05L78.49 23.55L67.99 15.93" stroke="#FF8400" strokeWidth="3.5" strokeMiterlimit="10" strokeLinecap="round" />
              <path d="M46.03 20.94C46.13 15.5 47.72 4.33001 58.81 2.06001C74.38 -1.11999 77.77 21.4 77.77 21.4" stroke="#FF8400" strokeWidth="3.5" strokeMiterlimit="10" strokeLinecap="round" />
              <path d="M27.7 35.76H18.6C16.3 35.76 14.43 37.63 14.43 39.93V96.21C14.43 98.51 16.3 100.38 18.6 100.38H74.88C77.18 100.38 79.05 98.51 79.05 96.21V39.93C79.05 37.63 77.18 35.76 74.88 35.76H65.78" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.73 43.06V55.56H71.76V43.06" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M69.68 60.78H23.81C22.6612 60.78 21.73 61.7113 21.73 62.86V92.05C21.73 93.1988 22.6612 94.13 23.81 94.13H69.68C70.8288 94.13 71.76 93.1988 71.76 92.05V62.86C71.76 61.7113 70.8288 60.78 69.68 60.78Z" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38.41 60.78V94.13" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M55.08 60.78V94.13" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.73 77.45H55.08" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30.07 82.66V88.92" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26.94 85.79H33.2" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M43.62 85.79H49.87" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26.95 65.99L33.2 72.24" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26.94 72.24L33.2 65.99" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M43.62 69.11H49.87" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M46.75 64.95C46.17 64.95 45.71 65.42 45.71 65.99C45.71 66.56 46.18 67.03 46.75 67.03C47.32 67.03 47.79 66.56 47.79 65.99C47.79 65.42 47.32 64.95 46.75 64.95Z" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M46.75 71.2C46.17 71.2 45.71 71.67 45.71 72.24C45.71 72.81 46.18 73.28 46.75 73.28C47.32 73.28 47.79 72.81 47.79 72.24C47.79 71.67 47.32 71.2 46.75 71.2Z" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60.3 75.37H66.55" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60.3 79.54H66.55" stroke="#003F82" strokeWidth="0.91" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_1_15">
                <rect width="95.15" height="108.45" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="title-block-text">
            <span className="title-block-text-top">Erectile Dysfunction</span>
            <span className="title-block-text-bottom">Calculator</span>
          </div>
        </div>
        {!showResult && <p className="tagline-bg">
          Please enter your age and select any risk factors that you have to see your risk of E.D.
        </p>}

        {!showResult &&
          <div className="input-block">
            <span>What is your age?</span>
            <input
              type="number"
              value={age}
              onChange={(e) =>
                /^[0-9]{0,3}$/.test(e.target.value) &&
                e.target.value <= 120 &&
                (e.target.value >= 0 || e.target.value === "") &&
                setAge(e.target.value)
              }
              required
              className={errorAge ? "error" : ""}
            />
          </div>
        }

        {!showResult &&
          <div className="checkbox-block">
            {riskFactors.map((factor) => (
              <div className="checkbox-item" key={factor.name} onClick={() => handleToggle(factor.name, factor.weight)}>
                <div className="checkbox-item-title">
                  {factor.icon}
                  <span>{factor.name}</span>
                </div>

                <div className="checkbox-item-switcher">
                  <span className={`${!selectedFactors[factor.name] ? "act" : ""}`}>No</span>
                  <span className={`${!!selectedFactors[factor.name] ? "act" : ""}`}>Yes</span>
                </div>
              </div>
            ))}
          </div>
        }

        {!!showResult &&
          <div className="result-block">
            <p className="result-block-text-top">Your chance of <b>having erectile</b> dysfunction is</p>
            <div className="circular-progress">
              <svg className="circular-progress-svg" viewBox="0 0 36 36">
                <path
                  className="circular-progress-bg"
                  d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circular-progress-bar"
                  strokeDasharray={`${riskPercentage.toFixed(1)}, 100`}
                  d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="circular-progress-text">
                {riskPercentage.toFixed(1)}%
              </div>
            </div>
            <p className="result-block-text-bottom">which is {riskLevel}</p>
          </div>
        }

        {!!showResult &&
          <div className="description-block">
            {normalizedFactors.map((factor) => (
              <div className="description-item" key={factor.name}>
                {riskFactors.find(riskFactor => riskFactor.name === factor.name).icon}
                <div className="description-item-text">
                  <span>{factor.name}</span>
                  <p>{riskFactors.find(riskFactor => riskFactor.name === factor.name).description}</p>
                </div>
              </div>
            ))}
          </div>
        }

        {showResult ?
          <button className="calculate-button again" onClick={() => setShowResult(false)}>Try Again</button> :
          <button className="calculate-button calculate"
            onClick={age > 0 ? () => { setErrorAge(false); setShowResult(true) } : () => setErrorAge(true)}>Calculate my risk</button>
        }

      </div>
      <div className="logo-block">
        <a href="/">
          <svg width="210" height="56" viewBox="0 0 210 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="210" height="56" fill="#D9D9D9" />
            <path d="M81.2354 35.9878V39H70.1704V35.9878H81.2354ZM71.23 16.9609V39H67.4307V16.9609H71.23ZM100.747 27.375V28.5859C100.747 30.251 100.53 31.7445 100.096 33.0664C99.6618 34.3883 99.0412 35.5135 98.2339 36.4419C97.4367 37.3703 96.478 38.0817 95.3579 38.5762C94.2378 39.0605 92.9966 39.3027 91.6343 39.3027C90.2821 39.3027 89.0459 39.0605 87.9258 38.5762C86.8158 38.0817 85.8521 37.3703 85.0347 36.4419C84.2173 35.5135 83.5815 34.3883 83.1274 33.0664C82.6834 31.7445 82.4614 30.251 82.4614 28.5859V27.375C82.4614 25.71 82.6834 24.2215 83.1274 22.9097C83.5715 21.5877 84.1971 20.4626 85.0044 19.5342C85.8218 18.5957 86.7855 17.8843 87.8955 17.3999C89.0156 16.9054 90.2518 16.6582 91.604 16.6582C92.9663 16.6582 94.2075 16.9054 95.3276 17.3999C96.4478 17.8843 97.4115 18.5957 98.2188 19.5342C99.026 20.4626 99.6466 21.5877 100.081 22.9097C100.525 24.2215 100.747 25.71 100.747 27.375ZM96.9473 28.5859V27.3447C96.9473 26.1136 96.8262 25.0288 96.584 24.0903C96.3519 23.1418 96.0037 22.3496 95.5396 21.7139C95.0854 21.068 94.5254 20.5837 93.8594 20.2607C93.1934 19.9277 92.4416 19.7612 91.604 19.7612C90.7664 19.7612 90.0197 19.9277 89.3638 20.2607C88.7078 20.5837 88.1478 21.068 87.6836 21.7139C87.2295 22.3496 86.8813 23.1418 86.6392 24.0903C86.397 25.0288 86.2759 26.1136 86.2759 27.3447V28.5859C86.2759 29.8171 86.397 30.9069 86.6392 31.8555C86.8813 32.804 87.2345 33.6063 87.6987 34.2622C88.173 34.908 88.7381 35.3975 89.394 35.7305C90.05 36.0534 90.7967 36.2148 91.6343 36.2148C92.4819 36.2148 93.2337 36.0534 93.8896 35.7305C94.5456 35.3975 95.1006 34.908 95.5547 34.2622C96.0088 33.6063 96.3519 32.804 96.584 31.8555C96.8262 30.9069 96.9473 29.8171 96.9473 28.5859ZM121.469 27.7383V36.1543C121.156 36.568 120.667 37.0221 120 37.5166C119.345 38.001 118.472 38.4198 117.382 38.7729C116.292 39.1261 114.935 39.3027 113.31 39.3027C111.928 39.3027 110.661 39.0706 109.511 38.6064C108.36 38.1322 107.366 37.4409 106.529 36.5327C105.701 35.6245 105.061 34.5195 104.606 33.2178C104.152 31.9059 103.925 30.4124 103.925 28.7373V27.2085C103.925 25.5435 104.132 24.0601 104.546 22.7583C104.97 21.4465 105.575 20.3364 106.362 19.4282C107.149 18.52 108.098 17.8338 109.208 17.3696C110.328 16.8953 111.595 16.6582 113.007 16.6582C114.814 16.6582 116.307 16.9609 117.488 17.5664C118.679 18.1618 119.597 18.9893 120.243 20.0488C120.889 21.1084 121.297 22.3193 121.469 23.6816H117.745C117.624 22.9147 117.387 22.2285 117.034 21.623C116.691 21.0176 116.196 20.5433 115.55 20.2002C114.915 19.847 114.087 19.6704 113.068 19.6704C112.19 19.6704 111.418 19.8369 110.752 20.1699C110.086 20.5029 109.531 20.9924 109.087 21.6382C108.653 22.284 108.325 23.0711 108.103 23.9995C107.881 24.9279 107.77 25.9875 107.77 27.1782V28.7373C107.77 29.9482 107.896 31.0229 108.148 31.9614C108.411 32.8999 108.784 33.6921 109.269 34.3379C109.763 34.9837 110.363 35.4731 111.07 35.8062C111.776 36.1291 112.573 36.2905 113.461 36.2905C114.329 36.2905 115.041 36.2199 115.596 36.0786C116.151 35.9272 116.59 35.7507 116.913 35.5488C117.246 35.3369 117.503 35.1351 117.685 34.9434V30.5688H113.098V27.7383H121.469ZM143.25 27.375V28.5859C143.25 30.251 143.034 31.7445 142.6 33.0664C142.166 34.3883 141.545 35.5135 140.738 36.4419C139.941 37.3703 138.982 38.0817 137.862 38.5762C136.742 39.0605 135.5 39.3027 134.138 39.3027C132.786 39.3027 131.55 39.0605 130.43 38.5762C129.32 38.0817 128.356 37.3703 127.539 36.4419C126.721 35.5135 126.085 34.3883 125.631 33.0664C125.187 31.7445 124.965 30.251 124.965 28.5859V27.375C124.965 25.71 125.187 24.2215 125.631 22.9097C126.075 21.5877 126.701 20.4626 127.508 19.5342C128.326 18.5957 129.289 17.8843 130.399 17.3999C131.52 16.9054 132.756 16.6582 134.108 16.6582C135.47 16.6582 136.711 16.9054 137.832 17.3999C138.952 17.8843 139.915 18.5957 140.723 19.5342C141.53 20.4626 142.151 21.5877 142.584 22.9097C143.028 24.2215 143.25 25.71 143.25 27.375ZM139.451 28.5859V27.3447C139.451 26.1136 139.33 25.0288 139.088 24.0903C138.856 23.1418 138.508 22.3496 138.043 21.7139C137.589 21.068 137.029 20.5837 136.363 20.2607C135.697 19.9277 134.945 19.7612 134.108 19.7612C133.27 19.7612 132.524 19.9277 131.868 20.2607C131.212 20.5837 130.652 21.068 130.188 21.7139C129.733 22.3496 129.385 23.1418 129.143 24.0903C128.901 25.0288 128.78 26.1136 128.78 27.3447V28.5859C128.78 29.8171 128.901 30.9069 129.143 31.8555C129.385 32.804 129.738 33.6063 130.203 34.2622C130.677 34.908 131.242 35.3975 131.898 35.7305C132.554 36.0534 133.301 36.2148 134.138 36.2148C134.986 36.2148 135.738 36.0534 136.394 35.7305C137.049 35.3975 137.604 34.908 138.059 34.2622C138.513 33.6063 138.856 32.804 139.088 31.8555C139.33 30.9069 139.451 29.8171 139.451 28.5859Z" fill="#979797" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default EDcalculator;

