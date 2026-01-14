"use client";

import dynamic from "next/dynamic";

const RouterWrapper = dynamic(() => import("@/components/router-wrapper").then(mod => ({ default: mod.RouterWrapper })), {
  ssr: false,
});

export default function Home() {
  return <RouterWrapper />;
}
