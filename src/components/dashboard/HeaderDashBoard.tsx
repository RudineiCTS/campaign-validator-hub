import { Database } from "lucide-react";

export function HeaderDash(){
    return(
    <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Dashboard de Validação de Campanhas
              </h1>
              <p className="text-muted-foreground mt-1">
                Valide e monitore suas campanhas
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">SQL Conectado</span>
            </div>
          </div>
        </div>
    </header>
    )
}