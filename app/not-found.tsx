import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6 py-10">
      <section className="bg-card w-full max-w-lg rounded-2xl border p-8 text-center shadow-xs">
        <div className="bg-background mx-auto flex size-20 items-center justify-center rounded-2xl border">
          <Image
            src="/favicon.svg"
            alt="Imigração Portugal Assistente"
            width={44}
            height={44}
            priority
          />
        </div>

        <p className="text-muted-foreground mt-6 text-sm font-medium">Erro 404</p>
        <h1 className="text-card-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="text-muted-foreground mt-4 text-sm sm:text-base">
          A página que você tentou acessar não existe ou foi movida.
        </p>

        <Button asChild className="mt-8">
          <Link href="/">Voltar para o início</Link>
        </Button>
      </section>
    </main>
  );
}
