import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { FirebaseConnectionButton } from "@/features/firebase-connection/components/firebase-connection-button";

const colorTokens = [
  { name: "Primary", className: "bg-primary" },
  { name: "Lime", className: "bg-energy-lime" },
  { name: "Orange", className: "bg-achievement" },
  { name: "Navy", className: "bg-deep-navy" },
];

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <section className="container-page grid gap-6">
        <div className="rounded-panel border border-border bg-surface p-6 shadow-soft md:p-8">
          <div className="mb-6 flex justify-end">
            <ThemeToggle />
          </div>
          <div className="max-w-3xl">
            <Badge variant="success">Theme foundation</Badge>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-text md:text-5xl">
              Fitness Challenge
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">
              Shared tokens, typography, surfaces, and reusable UI primitives are ready for future
              feature screens.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-3">
                <Button>Primary action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <FirebaseConnectionButton />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <label className="grid gap-2 text-sm font-semibold text-text" htmlFor="preview-input">
                Label
                <Input id="preview-input" placeholder="Reusable input style" />
              </label>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tokens</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {colorTokens.map((token) => (
              <div
                className="rounded-card border border-border bg-bg p-4"
                key={token.name}
              >
                <div className={`h-14 rounded-button ${token.className}`} />
                <p className="mt-3 text-sm font-bold text-text">{token.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
