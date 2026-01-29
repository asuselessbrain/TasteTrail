"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadGroceryPDFButton() {
  const handleDownload = async () => {
    const res = await fetch("/api/grocery-list/pdf", {
      credentials: "include",
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "grocery-list.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button 
      onClick={handleDownload}
    >
      <Download /> Download PDF
    </Button>
  );
}
