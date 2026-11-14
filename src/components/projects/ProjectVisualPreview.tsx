"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Radio,
  FileText,
  AlertTriangle,
  Upload,
  UtensilsCrossed,
  Droplets,
  CreditCard,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import type { ProjectItem } from "@/lib/portfolio-data";

interface ProjectVisualPreviewProps {
  project: ProjectItem;
}

export function ProjectVisualPreview({ project }: ProjectVisualPreviewProps) {
  const [imageError, setImageError] = useState(false);

  // Render project-specific visual preview interfaces
  const renderPreviewContent = () => {
    switch (project.id) {
      // ========================================================
      // 1. SILENTKROWD — Lounge Website
      // ========================================================
      case "silentkrowd":
        return (
          <div className="flex flex-col h-full justify-between p-3.5 sm:p-5 space-y-3">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(243,242,238,0.08)]">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-3.5 w-3.5 text-lime" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime font-semibold">
                  SILENTKROWD LOUNGE · TABLE 04
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                SUPABASE REALTIME SYNC
              </span>
            </div>

            {/* Feature 1: Online Ordering & Order Tracking */}
            <div className="rounded-xl border border-[rgba(200,255,0,0.35)] bg-[rgba(200,255,0,0.04)] p-3 shadow-[0_4px_20px_rgba(200,255,0,0.06)]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-lime font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                  <span>ORDER #SK-408 · IN KITCHEN (EST. 8 MINS)</span>
                </div>
                <span className="font-mono text-[9px] text-ink-muted">1x Grilled Steak, 2x Cocktails</span>
              </div>

              {/* Order Tracking Progress Bar */}
              <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center font-mono text-[8.5px] uppercase tracking-wider">
                <div className="rounded-md bg-lime/20 text-lime py-1 font-semibold border border-lime/30">
                  1. Placed
                </div>
                <div className="rounded-md bg-lime text-canvas py-1 font-bold animate-pulse">
                  2. In Kitchen
                </div>
                <div className="rounded-md bg-canvas/60 text-ink-muted py-1 border border-[rgba(243,242,238,0.08)]">
                  3. Served
                </div>
              </div>
            </div>

            {/* Feature 2: Reservation Functionality & Menu Upload / Admin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Reservation Card */}
              <div className="rounded-xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.7)] p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-muted mb-1">
                  <Clock className="h-3 w-3 text-lime" />
                  <span>TABLE RESERVATION</span>
                </div>
                <div className="font-display text-[13px] font-bold text-ink">
                  VIP Lounge Booth 04
                </div>
                <div className="font-mono text-[10px] text-lime mt-0.5">
                  Tonight · 8:30 PM · 4 Guests
                </div>
              </div>

              {/* Admin Dashboard & Menu Upload */}
              <div className="rounded-xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.7)] p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-muted mb-1">
                  <Upload className="h-3 w-3 text-lime" />
                  <span>ADMIN &amp; MENU UPLOAD</span>
                </div>
                <div className="font-display text-[13px] font-bold text-ink">
                  Seasonal Menu v2.4
                </div>
                <div className="font-mono text-[10px] text-ink-secondary mt-0.5 truncate">
                  Uploaded &amp; Synced · Supabase
                </div>
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="flex items-center justify-between pt-1 text-[9.5px] font-mono text-ink-muted">
              <span>Customer Ordering · Tracking · Reservations</span>
              <span className="text-lime font-semibold">Active Lounge Ops</span>
            </div>
          </div>
        );

      // ========================================================
      // 2. NIHSA — Informational Website
      // ========================================================
      case "nihsa":
        return (
          <div className="flex flex-col h-full justify-between p-3.5 sm:p-5 space-y-3">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(243,242,238,0.08)]">
              <div className="flex items-center gap-2">
                <Droplets className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  NIHSA OFFICIAL PORTAL
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                FEDERAL MINISTRY OF WATER RESOURCES
              </span>
            </div>

            {/* Official Agency Title Card */}
            <div className="rounded-xl border border-[rgba(110,231,183,0.3)] bg-[rgba(110,231,183,0.05)] p-3 sm:p-3.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-semibold block mb-0.5">
                STATUTORY AGENCY MANDATE
              </span>
              <h4 className="font-display text-[14px] sm:text-[16px] font-bold text-ink leading-snug">
                Nigeria Hydrological Services Agency
              </h4>
              <p className="mt-1 text-[11.5px] sm:text-[12px] text-ink-secondary leading-relaxed">
                Providing reliable hydrological data, river basin water level assessments, and national flood advisories.
              </p>
            </div>

            {/* Informational Data Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.7)] p-2.5 sm:p-3">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-ink-muted block mb-0.5">
                  HYDROLOGICAL BULLETIN
                </span>
                <div className="font-display text-[12.5px] font-semibold text-ink">
                  Annual Flood Outlook (AFO)
                </div>
                <div className="font-mono text-[9.5px] text-emerald-400 mt-0.5">
                  National River Basin Advisory
                </div>
              </div>

              <div className="rounded-xl border border-[rgba(243,242,238,0.1)] bg-[rgba(13,15,18,0.7)] p-2.5 sm:p-3">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-ink-muted block mb-0.5">
                  BASIN WATER LEVELS
                </span>
                <div className="font-display text-[12.5px] font-semibold text-ink">
                  Niger &amp; Benue Monitoring
                </div>
                <div className="font-mono text-[9.5px] text-ink-secondary mt-0.5">
                  Daily Hydrometric Telemetry
                </div>
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="flex items-center justify-between pt-1 text-[9.5px] font-mono text-ink-muted">
              <span>Informational Agency Website</span>
              <span className="text-emerald-400 font-semibold">Official Federal Portal</span>
            </div>
          </div>
        );

      // ========================================================
      // 3. NACOS DUES — Student Payment Platform
      // ========================================================
      case "nacos-dues":
        return (
          <div className="flex flex-col h-full justify-between p-3.5 sm:p-5 space-y-3">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(243,242,238,0.08)]">
              <div className="flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-lime" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime font-semibold">
                  NACOS DUES PAYMENT &amp; CLEARANCE
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                FIREBASE BACKEND
              </span>
            </div>

            {/* Temporary to Permanent Receipt Verification Flow */}
            <div className="space-y-2.5">
              {/* Stage 1: Temporary Receipt Notice */}
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-2.5 sm:p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-amber-400 font-semibold">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>TEMPORARY RECEIPT #TMP-7821</span>
                  </div>
                  <span className="font-mono text-[9px] text-amber-400/90 font-semibold">
                    AWAITING VERIFICATION
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-ink-secondary leading-snug">
                  Session Dues (₦ 3,500) paid online. <span className="text-amber-300 font-medium">* Note: Temporary receipt is NOT valid for final clearance until approved by admin.</span>
                </p>
              </div>

              {/* Stage 2: Admin Verification & Permanent Receipt */}
              <div className="rounded-xl border border-[rgba(200,255,0,0.45)] bg-[rgba(200,255,0,0.05)] p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(200,255,0,0.06)]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-lime font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
                    <span>PERMANENT CLEARANCE RECEIPT</span>
                  </div>
                  <span className="rounded-full bg-lime text-canvas font-mono text-[8.5px] font-bold px-2 py-0.5">
                    VERIFIED &amp; APPROVED
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-ink">
                  <span className="font-semibold">Official Clearance Valid</span>
                  <span className="font-mono text-[10px] text-lime">QR Stamp: #NC-CLR-8921</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="flex items-center justify-between pt-1 text-[9.5px] font-mono text-ink-muted">
              <span>Online Payment ➔ Admin Verification ➔ Permanent Receipt</span>
              <span className="text-lime font-semibold">Clearance Ready</span>
            </div>
          </div>
        );

      // ========================================================
      // 4. SYSTEM VET — Professional Portfolio Website
      // ========================================================
      case "system-vet":
        return (
          <div className="flex flex-col h-full justify-between p-3.5 sm:p-5 space-y-3">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(243,242,238,0.08)]">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-3.5 w-3.5 text-blue-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">
                  DR. SYSTEM VET // CLINICAL PORTFOLIO
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                FIREBASE BLOG ENGINE
              </span>
            </div>

            {/* Practitioner Profile Header */}
            <div className="rounded-xl border border-[rgba(147,197,253,0.3)] bg-[rgba(147,197,253,0.05)] p-3">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-blue-400 font-semibold block mb-0.5">
                VETERINARY MEDICINE &amp; SURGERY
              </span>
              <div className="font-display text-[14px] sm:text-[15px] font-bold text-ink">
                Veterinary Professional Portfolio
              </div>
              <div className="font-mono text-[10px] text-ink-secondary mt-0.5">
                Small Animal Surgery · Preventive Diagnostics · Clinical Consultation
              </div>
            </div>

            {/* Feature: Blog Upload Interface */}
            <div className="rounded-xl border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.7)] p-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-muted">
                  <BookOpen className="h-3 w-3 text-blue-400" />
                  <span>BLOG UPLOAD FEATURE</span>
                </div>
                <span className="font-mono text-[9px] text-blue-400 font-semibold">
                  + PUBLISH ARTICLE
                </span>
              </div>
              <div className="font-display text-[12.5px] font-semibold text-ink truncate">
                "Preventive Care Protocols &amp; Post-Operative Canine Care"
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[9px] text-ink-muted">
                <span>Clinical Case Study · 4 min read</span>
                <span className="text-lime font-medium">Published &amp; Synced</span>
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="flex items-center justify-between pt-1 text-[9.5px] font-mono text-ink-muted">
              <span>Minimal Portfolio Presentation with Blog Publishing</span>
              <span className="text-blue-400 font-semibold">Live Interface</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[rgba(243,242,238,0.14)] bg-[rgba(13,15,18,0.85)] shadow-2xl backdrop-blur-xl">
      {/* Top Browser / Chassis Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(243,242,238,0.08)] bg-[rgba(7,8,9,0.7)] px-3.5 py-2.5">
        {/* macOS Action Pips */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* Domain Lock Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.12)] bg-canvas/80 px-3 py-0.5 font-mono text-[10px] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          <span className="text-ink-secondary">
            {project.links?.demo
              ? project.links.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : `${project.id}.app`}
          </span>
        </div>

        {/* Live Interface Preview Pill */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-lime">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="hidden sm:inline">LIVE PREVIEW</span>
        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]">
        {renderPreviewContent()}
      </div>

      {/* Identifiable Asset Status Bar */}
      <div className="flex items-center justify-between border-t border-[rgba(243,242,238,0.08)] bg-canvas/60 px-3.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-muted">
        <span>PROJECT {project.number} // {project.category}</span>
        <span className="text-ink-muted/80">INTERACTIVE INTERFACE PREVIEW</span>
      </div>
    </div>
  );
}
