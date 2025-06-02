import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dummfet Platform" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
