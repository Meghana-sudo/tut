"use client";

import { useEffect } from "react";
import Ping from "../components/Ping";

export default function ViewClient({ id, totalViews }: { id: string; totalViews: number }) {
  useEffect(() => {
    fetch("/api/increment-view", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
}
