import { StatsCard } from "@/components/dashboard/StatsCard";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { RulesList } from "@/components/dashboard/RulesList";
import { DivergenceTable } from "@/components/dashboard/DivergenceTable";
import { ValidationPanel } from "@/components/dashboard/ValidationPanel";
import { ReportsSection } from "@/components/dashboard/ReportsSection";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Database,
  TrendingUp,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Dashboard de Validação de Campanhas
              </h1>
              <p className="text-muted-foreground mt-1">
                Valide e monitore suas campanhas em tempo real
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">SQL Conectado</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Visão Geral - Stats Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatsCard
              title="Total Analisadas"
              value="48"
              icon={TrendingUp}
              description="Campanhas processadas"
              variant="default"
            />
            <StatsCard
              title="Válidas"
              value="42"
              icon={CheckCircle2}
              description="87.5% aprovadas"
              variant="success"
            />
            <StatsCard
              title="Divergências"
              value="4"
              icon={AlertTriangle}
              description="8.3% com alertas"
              variant="warning"
            />
            <StatsCard
              title="Não Encontradas"
              value="2"
              icon={XCircle}
              description="4.2% ausentes"
              variant="destructive"
            />
            <StatsCard
              title="Última Validação"
              value="14:32"
              icon={Clock}
              description="26/11/2024"
              variant="default"
            />
            <StatsCard
              title="Status SQL"
              value="Online"
              icon={Database}
              description="Conexão ativa"
              variant="success"
            />
          </div>
        </section>

        {/* Parâmetros das Campanhas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Parâmetros das Campanhas</h2>
          <CampaignTable />
        </section>

        {/* Regras de Validação */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Regras de Validação</h2>
          <RulesList />
        </section>

        {/* Divergências */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Divergências Identificadas</h2>
          <DivergenceTable />
        </section>

        {/* Execução de Validação */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Executar Validação</h2>
          <ValidationPanel />
        </section>

        {/* Relatórios */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Relatórios e Histórico</h2>
          <ReportsSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
